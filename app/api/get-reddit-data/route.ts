// app/api/reddit/score/route.ts
// Next.js App Router API Route for Reddit User/Subreddit Scoring

import { NextRequest, NextResponse } from "next/server";

// Types
interface RedditUserStats {
  username: string;
  user_id: string;
  created_at: string;
  karma_total: number;
  karma_post: number;
  karma_comment: number;
  is_gold: boolean;
  is_mod: boolean;
  verified: boolean;
  average_post_score: number;
  average_comment_score: number;
  post_count_30_days: number;
  comment_count_30_days: number;
  activity_rate: number;
  top_subreddits: string[];
  engagement_rate: number;
}

interface RedditUserScore {
  total_score: number;
  max_score: number;
  breakdown: {
    karma: number;
    activity: number;
    engagement: number;
    consistency: number;
    quality: number;
  };
  rating: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    user_stats: RedditUserStats;
    user_score: RedditUserScore;
  };
  error?: string;
}

// Reddit API Helper Class
class RedditUserAnalyzer {
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

    // Get new token using client credentials
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      "base64"
    );

    const response = await fetch("https://www.reddit.com/api/v1/access_token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "RedditScorer/1.0",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error("Failed to get Reddit access token");
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    // Set expiry to 5 minutes before actual expiry
    this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;

    return this.accessToken as string;
  }

  private async makeRequest(endpoint: string) {
    const token = await this.getAccessToken();

    const response = await fetch(`https://oauth.reddit.com${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "RedditScorer/1.0",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Reddit API Error:", error);
      throw new Error(`Reddit API request failed: ${response.status}`);
    }

    return response.json();
  }

  async getUserStats(username: string): Promise<RedditUserStats | null> {
    try {
      // Get user information
      const userData = await this.makeRequest(`/user/${username}/about`);

      if (!userData.data) {
        return null;
      }

      const user = userData.data;

      // Get user's recent posts
      const postsData = await this.makeRequest(
        `/user/${username}/submitted?limit=100`
      );
      const posts = postsData.data?.children || [];

      // Get user's recent comments
      const commentsData = await this.makeRequest(
        `/user/${username}/comments?limit=100`
      );
      const comments = commentsData.data?.children || [];

      // Calculate statistics
      const stats = this.calculateUserStatistics(user, posts, comments);

      return {
        username: user.name,
        user_id: user.id,
        created_at: new Date(user.created_utc * 1000).toISOString(),
        karma_total: user.total_karma || user.link_karma + user.comment_karma,
        karma_post: user.link_karma,
        karma_comment: user.comment_karma,
        is_gold: user.is_gold || false,
        is_mod: user.is_mod || false,
        verified: user.verified || false,
        average_post_score: stats.avg_post_score,
        average_comment_score: stats.avg_comment_score,
        post_count_30_days: stats.post_count_30_days,
        comment_count_30_days: stats.comment_count_30_days,
        activity_rate: stats.activity_rate,
        top_subreddits: stats.top_subreddits,
        engagement_rate: stats.engagement_rate,
      };
    } catch (error) {
      console.error("Error fetching Reddit user stats:", error);
      return null;
    }
  }

  private calculateUserStatistics(user: any, posts: any[], comments: any[]) {
    const thirtyDaysAgo = Date.now() / 1000 - 30 * 24 * 60 * 60;

    // Filter recent posts and comments
    const recentPosts = posts.filter(
      (p) => p.data.created_utc >= thirtyDaysAgo
    );
    const recentComments = comments.filter(
      (c) => c.data.created_utc >= thirtyDaysAgo
    );

    // Calculate average scores
    let totalPostScore = 0;
    let totalCommentScore = 0;

    posts.forEach((post) => {
      totalPostScore += post.data.score || 0;
    });

    comments.forEach((comment) => {
      totalCommentScore += comment.data.score || 0;
    });

    const avgPostScore = posts.length > 0 ? totalPostScore / posts.length : 0;
    const avgCommentScore =
      comments.length > 0 ? totalCommentScore / comments.length : 0;

    // Get top subreddits
    const subredditCounts: Record<string, number> = {};
    [...posts, ...comments].forEach((item) => {
      const subreddit = item.data.subreddit;
      subredditCounts[subreddit] = (subredditCounts[subreddit] || 0) + 1;
    });

    const topSubreddits = Object.entries(subredditCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([subreddit]) => subreddit);

    // Calculate activity rate (posts + comments per day in last 30 days)
    const activityRate = recentPosts.length + recentComments.length;

    // Calculate engagement rate (average score relative to karma)
    const totalRecentScore =
      recentPosts.reduce((sum, p) => sum + (p.data.score || 0), 0) +
      recentComments.reduce((sum, c) => sum + (c.data.score || 0), 0);

    const engagementRate =
      activityRate > 0 ? totalRecentScore / activityRate : 0;

    return {
      avg_post_score: Math.round(avgPostScore * 100) / 100,
      avg_comment_score: Math.round(avgCommentScore * 100) / 100,
      post_count_30_days: recentPosts.length,
      comment_count_30_days: recentComments.length,
      activity_rate: activityRate,
      top_subreddits: topSubreddits,
      engagement_rate: Math.round(engagementRate * 100) / 100,
    };
  }

  calculateUserScore(stats: RedditUserStats): RedditUserScore {
    const scores: any = {};

    // Karma score (0-30 points) - logarithmic scale
    // 1K karma = ~13 pts, 10K = ~17 pts, 100K = ~21 pts, 1M = ~26 pts
    if (stats.karma_total > 0) {
      const karmaScore = Math.min(30, (Math.log10(stats.karma_total) / 6) * 30);
      scores.karma = Math.round(karmaScore * 100) / 100;
    } else {
      scores.karma = 0;
    }

    // Activity score (0-25 points)
    // Based on posts + comments in last 30 days
    // 30 activities = 25 points (1 per day average)
    const activityScore = Math.min(25, (stats.activity_rate / 30) * 25);
    scores.activity = Math.round(activityScore * 100) / 100;

    // Engagement score (0-20 points)
    // Based on average score per post/comment
    // Higher engagement = better content quality
    const engagementScore = Math.min(20, (stats.engagement_rate / 20) * 20);
    scores.engagement = Math.round(engagementScore * 100) / 100;

    // Consistency score (0-15 points)
    // Balance between posts and comments
    const postCommentRatio =
      stats.post_count_30_days > 0 && stats.comment_count_30_days > 0
        ? Math.min(stats.post_count_30_days, stats.comment_count_30_days) /
          Math.max(stats.post_count_30_days, stats.comment_count_30_days)
        : 0;
    const consistencyScore = postCommentRatio * 15;
    scores.consistency = Math.round(consistencyScore * 100) / 100;

    // Quality score (0-10 points)
    // Bonus for verified, gold, mod status
    let qualityScore = 0;
    if (stats.verified) qualityScore += 3;
    if (stats.is_gold) qualityScore += 3;
    if (stats.is_mod) qualityScore += 4;
    scores.quality = qualityScore;

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
    if (score >= 80) return "Reddit Legend";
    if (score >= 60) return "Power User";
    if (score >= 40) return "Active Redditor";
    if (score >= 20) return "Regular User";
    return "New Redditor";
  }
}

// API Route Handler
export async function GET(req: NextRequest) {
  const requestURL = new URL(req.url as string);
  const username = requestURL.searchParams.get("username");

  console.log("Received Twitch data request for username:", username);

  try {
    // Get credentials from environment variables
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Reddit API credentials not configured. Set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET.",
        } as ApiResponse,
        { status: 500 }
      );
    }

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          error: "Username is required. Use ?username=spez",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Initialize analyzer
    const analyzer = new RedditUserAnalyzer(clientId, clientSecret);

    // Fetch user stats
    const stats = await analyzer.getUserStats(username);

    if (!stats) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found or error fetching data",
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Calculate score
    const score = analyzer.calculateUserScore(stats);

    // Return response
    return NextResponse.json(
      {
        success: true,
        data: {
          user_stats: stats,
          user_score: score,
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

// POST method for batch processing
// export async function POST(request: NextRequest) {
//   try {
//     const clientId = process.env.REDDIT_CLIENT_ID;
//     const clientSecret = process.env.REDDIT_CLIENT_SECRET;

//     if (!clientId || !clientSecret) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Reddit API credentials not configured",
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

//     const analyzer = new RedditUserAnalyzer(clientId, clientSecret);
//     const results = [];

//     for (const username of usernames) {
//       try {
//         const stats = await analyzer.getUserStats(username);
//         if (stats) {
//           const score = analyzer.calculateUserScore(stats);
//           results.push({
//             username: stats.username,
//             user_stats: stats,
//             user_score: score,
//           });
//         }
//         // Add small delay to avoid rate limiting
//         await new Promise((resolve) => setTimeout(resolve, 100));
//       } catch (error) {
//         console.error(`Error processing ${username}:`, error);
//         // Continue with other users
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
