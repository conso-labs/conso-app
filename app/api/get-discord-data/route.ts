// app/api/discord/score/route.ts
// Next.js App Router API Route for Discord User/Server Scoring

import { NextRequest, NextResponse } from "next/server";

// Types
interface DiscordUserStats {
  user_id: string;
  username: string;
  discriminator: string;
  global_name: string | null;
  avatar: string;
  banner: string | null;
  accent_color: number | null;
  created_at: string;
  public_flags: number;
  is_bot: boolean;
  // Server-specific stats (if server_id provided)
  server_member_since?: string;
  server_roles?: string[];
  server_nickname?: string;
  server_permissions?: string[];
}

interface DiscordServerStats {
  server_id: string;
  server_name: string;
  description: string | null;
  icon: string | null;
  banner: string | null;
  owner_id: string;
  member_count: number;
  created_at: string;
  verification_level: number;
  premium_tier: number;
  premium_subscription_count: number;
  text_channels_count: number;
  voice_channels_count: number;
  role_count: number;
  emoji_count: number;
  features: string[];
  vanity_url: string | null;
}

interface DiscordScore {
  total_score: number;
  max_score: number;
  breakdown: {
    size: number;
    activity: number;
    features: number;
    boost_level: number;
    engagement: number;
  };
  rating: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    stats: DiscordUserStats | DiscordServerStats;
    score: DiscordScore;
  };
  error?: string;
}

// Discord API Helper Class
class DiscordAnalyzer {
  private botToken: string;

  constructor(botToken: string) {
    this.botToken = botToken;
  }

  private async makeRequest(endpoint: string) {
    const response = await fetch(`https://discord.com/api/v10${endpoint}`, {
      headers: {
        Authorization: `Bot ${this.botToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Discord API Error:", error);
      throw new Error(`Discord API request failed: ${response.status}`);
    }

    return response.json();
  }

  async getUserStats(
    userId: string,
    serverId?: string
  ): Promise<DiscordUserStats | null> {
    try {
      // Get user information
      const user = await this.makeRequest(`/users/${userId}`);

      const stats: DiscordUserStats = {
        user_id: user.id,
        username: user.username,
        discriminator: user.discriminator,
        global_name: user.global_name || null,
        avatar: user.avatar,
        banner: user.banner || null,
        accent_color: user.accent_color || null,
        created_at: this.getCreatedAt(user.id),
        public_flags: user.public_flags || 0,
        is_bot: user.bot || false,
      };

      // If server ID provided, get member info
      if (serverId) {
        try {
          const member = await this.makeRequest(
            `/guilds/${serverId}/members/${userId}`
          );
          stats.server_member_since = member.joined_at;
          stats.server_roles = member.roles || [];
          stats.server_nickname = member.nick || null;
        } catch (error) {
          console.error("Error fetching member data:", error);
        }
      }

      return stats;
    } catch (error) {
      console.error("Error fetching Discord user stats:", error);
      return null;
    }
  }

  // async getServerStats(serverId: string): Promise<DiscordServerStats | null> {
  //   try {
  //     // Get guild/server information with counts
  //     const guild = await this.makeRequest(`/guilds/${serverId}?with_counts=true`);

  //     // Get channels
  //     const channels = await this.makeRequest(`/guilds/${serverId}/channels`);
  //     const textChannels = channels.filter((c: any) => c.type === 0 || c.type === 5).length;
  //     const voiceChannels = channels.filter((c: any) => c.type === 2).length;

  //     // Get roles
  //     const roles = await this.makeRequest(`/guilds/${serverId}/roles`);

  //     // Get emojis
  //     const emojis = await this.makeRequest(`/guilds/${serverId}/emojis`);

  //     return {
  //       server_id: guild.id,
  //       server_name: guild.name,
  //       description: guild.description || null,
  //       icon: guild.icon || null,
  //       banner: guild.banner || null,
  //       owner_id: guild.owner_id,
  //       member_count: guild.approximate_member_count || 0,
  //       created_at: this.getCreatedAt(guild.id),
  //       verification_level: guild.verification_level,
  //       premium_tier: guild.premium_tier,
  //       premium_subscription_count: guild.premium_subscription_count || 0,
  //       text_channels_count: textChannels,
  //       voice_channels_count: voiceChannels,
  //       role_count: roles.length,
  //       emoji_count: emojis.length,
  //       features: guild.features || [],
  //       vanity_url: guild.vanity_url_code || null,
  //     };
  //   } catch (error) {
  //     console.error('Error fetching Discord server stats:', error);
  //     return null;
  //   }
  // }

  private getCreatedAt(snowflake: string): string {
    // Discord snowflake to timestamp conversion
    const timestamp = (BigInt(snowflake) >> BigInt(22)) + BigInt(1420070400000);
    return new Date(Number(timestamp)).toISOString();
  }

  calculateServerScore(stats: DiscordServerStats): DiscordScore {
    const scores: any = {};

    // Size score (0-30 points) - logarithmic scale
    // 100 members = ~13 pts, 1K = ~17 pts, 10K = ~21 pts, 100K+ = ~26 pts
    if (stats.member_count > 0) {
      const sizeScore = Math.min(30, (Math.log10(stats.member_count) / 5) * 30);
      scores.size = Math.round(sizeScore * 100) / 100;
    } else {
      scores.size = 0;
    }

    // Activity score (0-25 points)
    // Based on channels and recent activity indicators
    const channelScore = Math.min(15, (stats.text_channels_count / 50) * 15);
    const voiceScore = Math.min(10, (stats.voice_channels_count / 20) * 10);
    scores.activity = Math.round((channelScore + voiceScore) * 100) / 100;

    // Features score (0-20 points)
    // Premium features, verification, vanity URL
    let featureScore = 0;

    // Verification level (0-5 points)
    featureScore += Math.min(5, stats.verification_level * 1.25);

    // Features (0-10 points)
    const premiumFeatures = [
      "PARTNERED",
      "VERIFIED",
      "VANITY_URL",
      "VIP_REGIONS",
      "ANIMATED_ICON",
      "BANNER",
      "COMMERCE",
    ];
    const featuresCount = stats.features.filter((f) =>
      premiumFeatures.includes(f)
    ).length;
    featureScore += Math.min(10, featuresCount * 1.5);

    // Emojis (0-5 points)
    featureScore += Math.min(5, (stats.emoji_count / 100) * 5);

    scores.features = Math.round(featureScore * 100) / 100;

    // Boost level score (0-15 points)
    // Based on premium tier and boost count
    let boostScore = 0;
    boostScore += stats.premium_tier * 5; // Max 15 for tier 3
    scores.boost_level = Math.min(15, boostScore);

    // Engagement score (0-10 points)
    // Based on roles and structure
    const roleScore = Math.min(10, (stats.role_count / 50) * 10);
    scores.engagement = Math.round(roleScore * 100) / 100;

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
    if (score >= 80) return "Elite Community";
    if (score >= 60) return "Thriving Server";
    if (score >= 40) return "Active Server";
    if (score >= 20) return "Growing Server";
    return "New Server";
  }
}

// API Route Handler
export async function GET(req: NextRequest) {
  const requestURL = new URL(req.url as string);
  const id = requestURL.searchParams.get("id");
  const serverId = requestURL.searchParams.get("server_id");
  try {
    // Get bot token from environment variables
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!botToken) {
      return NextResponse.json(
        {
          success: false,
          error: "Discord bot token not configured. Set DISCORD_BOT_TOKEN.",
        } as ApiResponse,
        { status: 500 }
      );
    }

    // Get parameters
    const type = "user"; // 'user' or 'server'

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "ID is required. Use ?type=server&id=SERVER_ID or ?type=user&id=USER_ID",
        } as ApiResponse,
        { status: 400 }
      );
    }

    // Initialize analyzer
    const analyzer = new DiscordAnalyzer(botToken);

    if (type === "user") {
      // Fetch user stats
      const stats = await analyzer.getUserStats(id, serverId || undefined);

      if (!stats) {
        return NextResponse.json(
          {
            success: false,
            error: "User not found",
          } as ApiResponse,
          { status: 404 }
        );
      }

      // For users, we don't calculate a score (would need message history)
      // Just return the stats
      return NextResponse.json(
        {
          success: true,
          data: {
            stats,
            score: {
              total_score: 0,
              max_score: 100,
              breakdown: {
                size: 0,
                activity: 0,
                features: 0,
                boost_level: 0,
                engagement: 0,
              },
              rating: "User Profile",
            },
          },
        } as ApiResponse,
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid type. Use "user" account',
        } as ApiResponse,
        { status: 400 }
      );
    }
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
