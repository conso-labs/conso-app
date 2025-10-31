// app/api/youtube/score/route.ts
// Next.js App Router API Route for YouTube Channel Scoring
// TO DO : Optimize no of calls to YouTube API if needed

import { NextRequest, NextResponse } from "next/server";

// Types
interface ChannelStats {
  channel_id: string;
  channel_name: string;
  description: string;
  created_at: string;
  subscriber_count: number;
  total_views: number;
  video_count: number;
  country: string;
  custom_url: string;
  average_views_per_video: number;
  total_watch_time_hours: number;
  engagement_rate: number;
  recent_upload_frequency: number;
}

interface ChannelScore {
  total_score: number;
  max_score: number;
  breakdown: {
    subscribers: number;
    video_count: number;
    engagement: number;
    upload_frequency: number;
    avg_views: number;
  };
  rating: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    channel_stats: ChannelStats;
    channel_score: ChannelScore;
  };
  error?: string;
}

// YouTube API Helper Class
class YouTubeChannelAnalyzer {
  private apiKey: string;
  private baseUrl = "https://www.googleapis.com/youtube/v3";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getChannelStats(
    channelIdentifier: string,
    identifierType: "id" | "username" | "handle" = "handle"
  ): Promise<ChannelStats | null> {
    try {
      // Get channel ID based on identifier type
      let channelId: string | null;

      if (identifierType === "handle") {
        channelId = await this.getChannelIdByHandle(channelIdentifier);
      } else if (identifierType === "username") {
        channelId = await this.getChannelIdByUsername(channelIdentifier);
      } else {
        channelId = channelIdentifier;
      }

      if (!channelId) {
        return null;
      }

      // Get channel statistics
      const channelData = await this.fetchChannelData(channelId);
      if (!channelData) {
        return null;
      }

      // Get video statistics
      const videoStats = await this.getVideoStatistics(channelId);

      return {
        channel_id: channelId,
        channel_name: channelData.snippet.title,
        description: channelData.snippet.description,
        created_at: channelData.snippet.publishedAt,
        subscriber_count: parseInt(
          channelData.statistics.subscriberCount || "0"
        ),
        total_views: parseInt(channelData.statistics.viewCount || "0"),
        video_count: parseInt(channelData.statistics.videoCount || "0"),
        country: channelData.snippet.country || "N/A",
        custom_url: channelData.snippet.customUrl || "N/A",
        average_views_per_video: videoStats.avg_views,
        total_watch_time_hours: videoStats.total_watch_hours,
        engagement_rate: videoStats.engagement_rate,
        recent_upload_frequency: videoStats.upload_frequency,
      };
    } catch (error) {
      console.error("Error fetching channel stats:", error);
      return null;
    }
  }

  private async getChannelIdByHandle(handle: string): Promise<string | null> {
    try {
      const cleanHandle = handle.replace("@", "");
      const url = `${this.baseUrl}/search`;
      const params = new URLSearchParams({
        part: "snippet",
        q: `@${cleanHandle}`,
        type: "channel",
        maxResults: "1",
        key: this.apiKey,
      });

      const response = await fetch(`${url}?${params}`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        return data.items[0].snippet.channelId;
      }
      return null;
    } catch (error) {
      console.error("Error getting channel ID by handle:", error);
      return null;
    }
  }

  private async getChannelIdByUsername(
    username: string
  ): Promise<string | null> {
    try {
      const url = `${this.baseUrl}/channels`;
      const params = new URLSearchParams({
        part: "id",
        forUsername: username,
        key: this.apiKey,
      });

      const response = await fetch(`${url}?${params}`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        return data.items[0].id;
      }
      return null;
    } catch (error) {
      console.error("Error getting channel ID by username:", error);
      return null;
    }
  }

  private async fetchChannelData(channelId: string): Promise<any> {
    try {
      const url = `${this.baseUrl}/channels`;
      const params = new URLSearchParams({
        part: "statistics,snippet,contentDetails",
        id: channelId,
        key: this.apiKey,
      });

      const response = await fetch(`${url}?${params}`);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        return data.items[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching channel data:", error);
      return null;
    }
  }

  private async getVideoStatistics(
    channelId: string,
    maxVideos: number = 50
  ): Promise<{
    avg_views: number;
    total_watch_hours: number;
    engagement_rate: number;
    upload_frequency: number;
  }> {
    try {
      // Get uploads playlist ID
      const channelData = await this.fetchChannelData(channelId);
      if (!channelData) {
        return this.emptyVideoStats();
      }

      const uploadsPlaylist =
        channelData.contentDetails.relatedPlaylists.uploads;

      // Get video IDs from uploads playlist
      const playlistUrl = `${this.baseUrl}/playlistItems`;
      const playlistParams = new URLSearchParams({
        part: "contentDetails",
        playlistId: uploadsPlaylist,
        maxResults: Math.min(maxVideos, 50).toString(),
        key: this.apiKey,
      });

      const playlistResponse = await fetch(`${playlistUrl}?${playlistParams}`);
      const playlistData = await playlistResponse.json();

      if (!playlistData.items || playlistData.items.length === 0) {
        return this.emptyVideoStats();
      }

      const videoIds = playlistData.items.map(
        (item: any) => item.contentDetails.videoId
      );

      // Get detailed video statistics
      const videosUrl = `${this.baseUrl}/videos`;
      const videosParams = new URLSearchParams({
        part: "statistics,contentDetails,snippet",
        id: videoIds.join(","),
        key: this.apiKey,
      });

      const videosResponse = await fetch(`${videosUrl}?${videosParams}`);
      const videosData = await videosResponse.json();

      if (!videosData.items || videosData.items.length === 0) {
        return this.emptyVideoStats();
      }

      // Calculate metrics
      let totalViews = 0;
      let totalLikes = 0;
      let totalComments = 0;
      let totalDurationSeconds = 0;
      let recentVideos = 0;

      videosData.items.forEach((video: any) => {
        const stats = video.statistics;
        const views = parseInt(stats.viewCount || "0");
        const likes = parseInt(stats.likeCount || "0");
        const comments = parseInt(stats.commentCount || "0");

        totalViews += views;
        totalLikes += likes;
        totalComments += comments;

        const duration = this.parseDuration(video.contentDetails.duration);
        totalDurationSeconds += duration;

        const daysSincePublish = this.daysSincePublish(
          video.snippet.publishedAt
        );
        if (daysSincePublish <= 30) {
          recentVideos++;
        }
      });

      const numVideos = videosData.items.length;
      const avgViews = totalViews / numVideos;
      const avgDuration = totalDurationSeconds / numVideos;
      const estimatedWatchHours = (totalViews * avgDuration) / 3600;
      const engagementRate =
        totalViews > 0 ? ((totalLikes + totalComments) / totalViews) * 100 : 0;

      return {
        avg_views: Math.round(avgViews * 100) / 100,
        total_watch_hours: Math.round(estimatedWatchHours * 100) / 100,
        engagement_rate: Math.round(engagementRate * 100) / 100,
        upload_frequency: recentVideos,
      };
    } catch (error) {
      console.error("Error getting video statistics:", error);
      return this.emptyVideoStats();
    }
  }

  private emptyVideoStats() {
    return {
      avg_views: 0,
      total_watch_hours: 0,
      engagement_rate: 0,
      upload_frequency: 0,
    };
  }

  private parseDuration(durationStr: string): number {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const match = durationStr.match(regex);

    if (!match) return 0;

    const hours = parseInt(match[1] || "0");
    const minutes = parseInt(match[2] || "0");
    const seconds = parseInt(match[3] || "0");

    return hours * 3600 + minutes * 60 + seconds;
  }

  private daysSincePublish(publishedAt: string): number {
    const published = new Date(publishedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - published.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateChannelScore(stats: ChannelStats): ChannelScore {
    const scores: any = {};

    // Subscriber score (0-30 points) - logarithmic scale
    if (stats.subscriber_count > 0) {
      const subScore = Math.min(
        30,
        (Math.log10(stats.subscriber_count) / 7) * 30
      );
      scores.subscribers = Math.round(subScore * 100) / 100;
    } else {
      scores.subscribers = 0;
    }

    // Video count score (0-15 points)
    const videoScore = Math.min(15, (stats.video_count / 100) * 15);
    scores.video_count = Math.round(videoScore * 100) / 100;

    // Engagement rate score (0-25 points)
    const engagementScore = Math.min(25, (stats.engagement_rate / 10) * 25);
    scores.engagement = Math.round(engagementScore * 100) / 100;

    // Upload frequency score (0-15 points)
    const frequencyScore = Math.min(
      15,
      (stats.recent_upload_frequency / 10) * 15
    );
    scores.upload_frequency = Math.round(frequencyScore * 100) / 100;

    // Average views score (0-15 points) - logarithmic scale
    if (stats.average_views_per_video > 0) {
      const viewsScore = Math.min(
        15,
        (Math.log10(stats.average_views_per_video) / 6) * 15
      );
      scores.avg_views = Math.round(viewsScore * 100) / 100;
    } else {
      scores.avg_views = 0;
    }

    const totalScore = Object.values(scores).reduce(
      (sum: number, score: any) => sum + score,
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
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Very Good";
    if (score >= 40) return "Good";
    if (score >= 20) return "Fair";
    return "Developing";
  }
}

// API Route Handler
export async function GET(req: NextRequest) {
  const requestURL = new URL(req.url as string);
  const channelHandle = requestURL.searchParams.get("handle");
  try {
    // Get API key from environment variables
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "YouTube API key not configured",
        } as ApiResponse,
        { status: 500 }
      );
    }

    // Get channel handle from query parameters

    if (!channelHandle) {
      return NextResponse.json(
        {
          success: false,
          error: "Channel handle is required. Use ?handle=channelname",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Initialize analyzer
    const analyzer = new YouTubeChannelAnalyzer(apiKey);

    // Fetch channel stats
    const stats = await analyzer.getChannelStats(channelHandle, "handle");

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
