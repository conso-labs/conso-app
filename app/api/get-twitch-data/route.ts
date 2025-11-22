// app/api/twitch/score/route.ts
// Next.js App Router API Route for Twitch Channel Scoring

import { NextRequest, NextResponse } from "next/server";

// Types
interface TwitchChannelStats {
  channel_id: string;
  channel_name: string;
  display_name: string;
  description: string;
  created_at: string;
  follower_count: number;
  total_views: number;
  broadcaster_type: string; // partner, affiliate, or empty
  profile_image_url: string;
  average_viewers: number;
  stream_count_30_days: number;
  total_stream_hours_30_days: number;
  peak_viewers_30_days: number;
  average_stream_duration_minutes: number;
  engagement_rate: number;
  category: string;
}

interface TwitchChannelScore {
  total_score: number;
  max_score: number;
  breakdown: {
    followers: number;
    average_viewers: number;
    stream_frequency: number;
    stream_duration: number;
    engagement: number;
  };
  rating: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    channel_stats: TwitchChannelStats;
    channel_score: TwitchChannelScore;
  };
  error?: string;
}

// Twitch API Helper Class
class TwitchChannelAnalyzer {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async getAccessToken(): Promise<string> {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    // Get new token
    const params = new URLSearchParams({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "client_credentials",
    });

    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body: params,
    });

    if (!response.ok) {
      throw new Error("Failed to get Twitch access token");
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    // Set expiry to 5 minutes before actual expiry
    this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

    return this.accessToken as string;
  }

  private async makeRequest(endpoint: string, params?: Record<string, string>) {
    const token = await this.getAccessToken();
    const url = new URL(`https://api.twitch.tv/helix${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        "Client-Id": this.clientId,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Twitch API Error:", error);
      throw new Error(`Twitch API request failed: ${response.status}`);
    }

    return response.json();
  }

  async getChannelStats(identifier: string, isUserId: boolean = false): Promise<TwitchChannelStats | null> {
    try {
      // Get user information
      const params = isUserId
        ? { id: identifier }
        : { login: identifier.toLowerCase() };

      const userData = await this.makeRequest("/users", params);

      if (!userData.data || userData.data.length === 0) {
        return null;
      }

      const user = userData.data[0];

      // Get follower count
      const followData = await this.makeRequest("/channels/followers", {
        broadcaster_id: user.id,
      });

      console.log("Follower Data:", followData);

      // Get channel information
      const channelData = await this.makeRequest("/channels", {
        broadcaster_id: user.id,
      });

      console.log("Channel Data:", channelData);

      const channel = channelData.data[0];

      // Get streams data (recent activity)
      const streamStats = await this.getStreamStatistics(user.id);

      return {
        channel_id: user.id,
        channel_name: user.login,
        display_name: user.display_name,
        description: user.description,
        created_at: user.created_at,
        follower_count: followData.total || 0,
        total_views: user.view_count,
        broadcaster_type: user.broadcaster_type || "none",
        profile_image_url: user.profile_image_url,
        average_viewers: streamStats.avg_viewers,
        stream_count_30_days: streamStats.stream_count,
        total_stream_hours_30_days: streamStats.total_hours,
        peak_viewers_30_days: streamStats.peak_viewers,
        average_stream_duration_minutes: streamStats.avg_duration_minutes,
        engagement_rate: streamStats.engagement_rate,
        category: channel.game_name || "Variety",
      };
    } catch (error) {
      console.error("Error fetching Twitch channel stats:", error);
      return null;
    }
  }

  private async getStreamStatistics(userId: string) {
    try {
      // Get recent videos (VODs) to analyze streaming patterns
      const videosData = await this.makeRequest("/videos", {
        user_id: userId,
        first: "100",
        type: "archive", // Get stream archives
      });

      console.log("Videos Data:", videosData);

      const videos = videosData.data || [];

      // Filter videos from last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentVideos = videos;

      // const recentVideos = videos.filter((video: any) => {
      //   const videoDate = new Date(video.created_at);
      //   return videoDate >= thirtyDaysAgo;
      // });

      if (recentVideos.length === 0) {
        return this.emptyStreamStats();
      }

      // Calculate statistics
      let totalViewCount = 0;
      let totalDurationSeconds = 0;
      let maxViewCount = 0;

      recentVideos.forEach((video: { view_count: string; duration: string }) => {
        const views = parseInt(video.view_count);
        totalViewCount += views;
        maxViewCount = Math.max(maxViewCount, views);

        // Parse duration (format: 1h2m3s)
        const duration = this.parseDuration(video.duration);
        totalDurationSeconds += duration;
      });

      const streamCount = recentVideos.length;
      const totalHours = totalDurationSeconds / 3600;
      const avgDurationMinutes =
        streamCount > 0 ? totalDurationSeconds / streamCount / 60 : 0;
      const avgViewers =
        streamCount > 0 ? Math.round(totalViewCount / streamCount) : 0;

      // Calculate engagement rate (views per follower, capped at 100%)
      // This is an approximation since we don't have exact concurrent viewer data
      const engagementRate = Math.min(
        100,
        (avgViewers / Math.max(1, avgViewers)) * 5
      );

      return {
        stream_count: streamCount,
        total_hours: Math.round(totalHours * 100) / 100,
        avg_duration_minutes: Math.round(avgDurationMinutes),
        avg_viewers: avgViewers,
        peak_viewers: maxViewCount,
        engagement_rate: Math.round(engagementRate * 100) / 100,
      };
    } catch (error) {
      console.error("Error getting stream statistics:", error);
      return this.emptyStreamStats();
    }
  }

  private emptyStreamStats() {
    return {
      stream_count: 0,
      total_hours: 0,
      avg_duration_minutes: 0,
      avg_viewers: 0,
      peak_viewers: 0,
      engagement_rate: 0,
    };
  }

  private parseDuration(duration: string): number {
    // Parse Twitch duration format: 1h2m3s
    let seconds = 0;
    const hours = duration.match(/(\d+)h/);
    const minutes = duration.match(/(\d+)m/);
    const secs = duration.match(/(\d+)s/);

    if (hours) seconds += parseInt(hours[1]) * 3600;
    if (minutes) seconds += parseInt(minutes[1]) * 60;
    if (secs) seconds += parseInt(secs[1]);

    return seconds;
  }

  calculateChannelScore(stats: TwitchChannelStats): TwitchChannelScore {
    const scores: {
      followers: number;
      average_viewers: number;
      stream_frequency: number;
      stream_duration: number;
      engagement: number;
    } = {
      followers: 0,
      average_viewers: 0,
      stream_frequency: 0,
      stream_duration: 0,
      engagement: 0,
    };

    // Follower score (0-30 points) - logarithmic scale
    if (stats.follower_count > 0) {
      const followerScore = Math.min(
        30,
        (Math.log10(stats.follower_count) / 7) * 30
      );
      scores.followers = Math.round(followerScore * 100) / 100;
    }

    // Average viewers score (0-30 points) - logarithmic scale
    // This is the most important metric for Twitch
    if (stats.average_viewers > 0) {
      const viewerScore = Math.min(
        30,
        (Math.log10(stats.average_viewers) / 5) * 30
      );
      scores.average_viewers = Math.round(viewerScore * 100) / 100;
    }

    // Stream frequency score (0-20 points)
    // Ideal: 15-30 streams per month
    const frequencyScore = Math.min(20, (stats.stream_count_30_days / 20) * 20);
    scores.stream_frequency = Math.round(frequencyScore * 100) / 100;

    // Stream duration score (0-10 points)
    // Ideal: 2-4 hour streams
    let durationScore = 0;
    if (
      stats.average_stream_duration_minutes >= 120 &&
      stats.average_stream_duration_minutes <= 240
    ) {
      durationScore = 10;
    } else if (stats.average_stream_duration_minutes > 0) {
      durationScore = Math.min(
        10,
        (stats.average_stream_duration_minutes / 180) * 10
      );
    }
    scores.stream_duration = Math.round(durationScore * 100) / 100;

    // Engagement rate score (0-10 points)
    const engagementScore = Math.min(10, (stats.engagement_rate / 10) * 10);
    scores.engagement = Math.round(engagementScore * 100) / 100;

    const totalScore = Object.values(scores).reduce(
      (sum: number, score: number) => sum + score,
      0
    );

    return {
      total_score: Math.round(totalScore * 100) / 100,
      max_score: 100,
      breakdown: scores,
      rating: this.getRating(totalScore),
    };
  }

  private getRating(score: number): string {
    if (score >= 80) return "Elite Streamer";
    if (score >= 60) return "Partner Level";
    if (score >= 40) return "Affiliate Level";
    if (score >= 20) return "Growing Streamer";
    return "Beginner Streamer";
  }
}

// API Route Handler
export async function GET(req: NextRequest) {
  const requestURL = new URL(req.url as string);
  const username = requestURL.searchParams.get("username");
  const userId = requestURL.searchParams.get("id");

  console.log("Received Twitch data request for username:", username, "or id:", userId);
  try {
    // Get credentials from environment variables
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Twitch API credentials not configured. Set TWITCH_CLIENT_ID and TWITCH_CLIENT_SECRET.",
        } as ApiResponse,
        { status: 500 }
      );
    }

    if (!username && !userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Username or ID is required. Use ?username=channelname or ?id=userid",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Initialize analyzer
    const analyzer = new TwitchChannelAnalyzer(clientId, clientSecret);

    // Fetch channel stats - prefer userId if both are provided
    const identifier = userId || username;
    const isUserId = !!userId;
    const stats = await analyzer.getChannelStats(identifier!, isUserId);

    if (!stats) {
      return NextResponse.json(
        {
          success: false,
          error: "Channel not found or error fetching data",
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Calculate score
    const score = analyzer.calculateChannelScore(stats);

    // Return response
    return NextResponse.json(
      {
        success: true,
        data: {
          channel_stats: stats,
          channel_score: score,
        },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}

// // POST method for batch processing
// export async function POST(request: NextRequest) {
//   try {
//     const clientId = process.env.TWITCH_CLIENT_ID;
//     const clientSecret = process.env.TWITCH_CLIENT_SECRET;

//     if (!clientId || !clientSecret) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Twitch API credentials not configured",
//         },
//         { status: 500 }
//       );
//     }

//     const body = await request.json();
//     const { usernames } = body;

//     if (!usernames || !Array.isArray(usernames)) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Usernames array is required in request body",
//         },
//         { status: 400 }
//       );
//     }

//     const analyzer = new TwitchChannelAnalyzer(clientId, clientSecret);
//     const results = [];

//     for (const username of usernames) {
//       try {
//         const stats = await analyzer.getChannelStats(username);
//         if (stats) {
//           const score = analyzer.calculateChannelScore(stats);
//           results.push({
//             channel_name: stats.channel_name,
//             channel_stats: stats,
//             channel_score: score,
//           });
//         }
//       } catch (error) {
//         console.error(`Error processing ${username}:`, error);
//         // Continue with other channels
//       }
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         data: results,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("API Error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }
