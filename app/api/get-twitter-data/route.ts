// app/api/twitter/score/route.ts
// Next.js App Router API Route for Twitter/X User Scoring

import { NextRequest, NextResponse } from "next/server";

// Types
interface TwitterUserStats {
  user_id: string;
  username: string;
  name: string;
  description: string;
  created_at: string;
  followers_count: number;
  following_count: number;
  tweet_count: number;
  listed_count: number;
  verified: boolean;
  verified_type: string; // blue, business, government, none
  profile_image_url: string;
  average_likes: number;
  average_retweets: number;
  average_replies: number;
  tweets_30_days: number;
  engagement_rate: number;
  follower_following_ratio: number;
  posting_frequency: number;
}

interface TwitterUserScore {
  total_score: number;
  max_score: number;
  breakdown: {
    followers: number;
    engagement: number;
    activity: number;
    influence: number;
    verification: number;
  };
  rating: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    user_stats: TwitterUserStats;
    user_score: TwitterUserScore;
  };
  error?: string;
}

// Twitter API Helper Class
class TwitterUserAnalyzer {
  private bearerToken: string;

  constructor(bearerToken: string) {
    this.bearerToken = bearerToken;
  }

  private async makeRequest(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`https://api.twitter.com/2${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Twitter API Error:", error);
      throw new Error(`Twitter API request failed: ${response.status}`);
    }

    return response.json();
  }

  async getUserStats(username: string): Promise<TwitterUserStats | null> {
    try {
      // Remove @ if present
      const cleanUsername = username.replace("@", "");

      // Get user information with detailed fields
      const userData = await this.makeRequest(
        "/users/by/username/" + cleanUsername,
        {
          "user.fields":
            "created_at,description,public_metrics,verified,verified_type,profile_image_url",
        }
      );

      if (!userData.data) {
        return null;
      }

      const user = userData.data;
      const metrics = user.public_metrics;

      // Get user's recent tweets
      const tweetsData = await this.makeRequest(`/users/${user.id}/tweets`, {
        max_results: "100",
        "tweet.fields": "created_at,public_metrics",
      });

      const tweets = tweetsData.data || [];

      // Calculate statistics
      const stats = this.calculateTweetStatistics(tweets);

      return {
        user_id: user.id,
        username: user.username,
        name: user.name,
        description: user.description || "",
        created_at: user.created_at,
        followers_count: metrics.followers_count,
        following_count: metrics.following_count,
        tweet_count: metrics.tweet_count,
        listed_count: metrics.listed_count || 0,
        verified: user.verified || false,
        verified_type: user.verified_type || "none",
        profile_image_url: user.profile_image_url || "",
        average_likes: stats.avg_likes,
        average_retweets: stats.avg_retweets,
        average_replies: stats.avg_replies,
        tweets_30_days: stats.tweets_30_days,
        engagement_rate: stats.engagement_rate,
        follower_following_ratio:
          metrics.following_count > 0
            ? metrics.followers_count / metrics.following_count
            : metrics.followers_count,
        posting_frequency: stats.tweets_30_days,
      };
    } catch (error) {
      console.error("Error fetching Twitter user stats:", error);
      return null;
    }
  }

  private calculateTweetStatistics(tweets: any[]) {
    if (tweets.length === 0) {
      return {
        avg_likes: 0,
        avg_retweets: 0,
        avg_replies: 0,
        tweets_30_days: 0,
        engagement_rate: 0,
      };
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filter recent tweets
    const recentTweets = tweets.filter((tweet) => {
      const tweetDate = new Date(tweet.created_at);
      return tweetDate >= thirtyDaysAgo;
    });

    // Calculate averages
    let totalLikes = 0;
    let totalRetweets = 0;
    let totalReplies = 0;
    let totalEngagement = 0;

    tweets.forEach((tweet) => {
      const metrics = tweet.public_metrics;
      totalLikes += metrics.like_count || 0;
      totalRetweets += metrics.retweet_count || 0;
      totalReplies += metrics.reply_count || 0;
      totalEngagement +=
        (metrics.like_count || 0) +
        (metrics.retweet_count || 0) +
        (metrics.reply_count || 0);
    });

    const avgLikes = tweets.length > 0 ? totalLikes / tweets.length : 0;
    const avgRetweets = tweets.length > 0 ? totalRetweets / tweets.length : 0;
    const avgReplies = tweets.length > 0 ? totalReplies / tweets.length : 0;
    const avgEngagement =
      tweets.length > 0 ? totalEngagement / tweets.length : 0;

    // Calculate engagement rate as percentage
    // (average engagement per tweet / 1000) capped at 100%
    const engagementRate = Math.min(100, avgEngagement / 10);

    return {
      avg_likes: Math.round(avgLikes * 100) / 100,
      avg_retweets: Math.round(avgRetweets * 100) / 100,
      avg_replies: Math.round(avgReplies * 100) / 100,
      tweets_30_days: recentTweets.length,
      engagement_rate: Math.round(engagementRate * 100) / 100,
    };
  }

  calculateUserScore(stats: TwitterUserStats): TwitterUserScore {
    const scores: any = {};

    // Followers score (0-30 points) - logarithmic scale
    // 1K = ~13 pts, 10K = ~17 pts, 100K = ~21 pts, 1M = ~26 pts, 10M+ = ~30 pts
    if (stats.followers_count > 0) {
      const followerScore = Math.min(
        30,
        (Math.log10(stats.followers_count) / 7) * 30
      );
      scores.followers = Math.round(followerScore * 100) / 100;
    } else {
      scores.followers = 0;
    }

    // Engagement score (0-30 points) - most important for Twitter
    // Based on average likes + retweets + replies
    const totalEngagement =
      stats.average_likes + stats.average_retweets + stats.average_replies;
    let engagementScore = 0;
    if (totalEngagement > 0) {
      // Logarithmic scale: 10 eng = ~10 pts, 100 = ~20 pts, 1000 = ~26 pts, 10000+ = ~30 pts
      engagementScore = Math.min(30, (Math.log10(totalEngagement) / 4) * 30);
    }
    scores.engagement = Math.round(engagementScore * 100) / 100;

    // Activity score (0-20 points)
    // Based on tweets in last 30 days
    // 30 tweets = 20 points (1 per day average), 60+ tweets = 20 points
    const activityScore = Math.min(20, (stats.tweets_30_days / 30) * 20);
    scores.activity = Math.round(activityScore * 100) / 100;

    // Influence score (0-15 points)
    // Based on follower/following ratio and listed count
    let influenceScore = 0;

    // Ratio component (0-10 points)
    if (stats.follower_following_ratio > 1) {
      // Good ratio: more followers than following
      influenceScore += Math.min(
        10,
        Math.log10(stats.follower_following_ratio) * 5
      );
    }

    // Listed count component (0-5 points)
    if (stats.listed_count > 0) {
      influenceScore += Math.min(5, (Math.log10(stats.listed_count) / 4) * 5);
    }

    scores.influence = Math.round(influenceScore * 100) / 100;

    // Verification score (0-5 points)
    let verificationScore = 0;
    if (stats.verified_type === "blue") verificationScore = 2;
    else if (stats.verified_type === "business") verificationScore = 4;
    else if (stats.verified_type === "government") verificationScore = 5;
    else if (stats.verified) verificationScore = 3; // Legacy verified

    scores.verification = verificationScore;

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
    if (score >= 80) return "Twitter Influencer";
    if (score >= 60) return "Power User";
    if (score >= 40) return "Active User";
    if (score >= 20) return "Regular User";
    return "New User";
  }
}

// API Route Handler
export async function GET(req: NextRequest) {
  const requestURL = new URL(req.url as string);
  const username = requestURL.searchParams.get("username");

  try {
    // Get bearer token from environment variables
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;

    if (!bearerToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Twitter API bearer token not configured. Set TWITTER_BEARER_TOKEN.",
        } as ApiResponse,
        { status: 500 }
      );
    }

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          error: "Username is required. Use ?username=elonmusk",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Initialize analyzer
    const analyzer = new TwitterUserAnalyzer(bearerToken);

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
//     const bearerToken = process.env.TWITTER_BEARER_TOKEN;

//     if (!bearerToken) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Twitter API bearer token not configured",
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

//     const analyzer = new TwitterUserAnalyzer(bearerToken);
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
//         // Add delay to avoid rate limiting (1.5 seconds between requests)
//         await new Promise((resolve) => setTimeout(resolve, 1500));
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
