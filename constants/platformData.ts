export interface ScoringParameter {
  parameter: string;
  weight: string;
  description: string;
}

export interface PlatformContent {
  activity: {
    description: string;
    benefits: string[];
  };
  instruction: {
    steps: string[];
  };
  scoring: {
    parameters: ScoringParameter[];
  };
}

export type PlatformName =
  // Social platforms
  | "YouTube"
  | "Twitch"
  | "X(formally twitter)"
  | "Reddit"
  | "Farcaster"
  | "Discord"
  | "Instagram"
  | "Telegram"
  // Gaming platforms
  | "PlayStation"
  | "Roblox"
  | "Steam"
  | "Xbox"
  | "Google Play"
  | "Chess.com"
  | "Epic Games"
  | "RetroAchievements"
  // Creative platforms
  | "GitHub"
  | "Spotify"
  | "Medium"
  | "Substack"
  // Onchain platforms
  | "SuiNS"
  | "Slush Wallet"
  | "SuiPlay0x1"
  | "Sui Passport"
  | "Claynosaurz Holder";

export const PLATFORM_CONTENT: Record<PlatformName, PlatformContent> = {
  YouTube: {
    activity: {
      description:
        "Connect your YouTube account to unlock verified creator analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Channel overview including subscribers, views, and uploads",
        "Insights into audience behaviour and engagement quality",
        "Average video performance across your recent uploads",
        "Posting consistency and long-term creator growth",
        "ZAP Missions for uploads, engagement, milestones, and growth",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with YouTube",
        "Sign in using Google Secure OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Subscribers",
          weight: "25%",
          description: "Measures audience size and creator reach.",
        },
        {
          parameter: "Total Views",
          weight: "20%",
          description: "Reflects overall visibility and long-term impact.",
        },
        {
          parameter: "Engagement Rate",
          weight: "30%",
          description:
            "Evaluates content quality through likes, comments, CTR, and retention.",
        },
        {
          parameter: "Consistency",
          weight: "15%",
          description: "Tracks upload frequency and recent activity.",
        },
        {
          parameter: "Age & Region",
          weight: "10%",
          description:
            "Adds trust based on maturity and geography of the channel.",
        },
      ],
    },
  },
  Instagram: {
    activity: {
      description:
        "Connect your Instagram account to unlock verified creator analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including followers, posts, and engagement",
        "Insights into audience demographics and interaction quality",
        "Average post performance across your recent content",
        "Posting frequency and consistency metrics",
        "ZAP Missions for posts, stories, reels, and engagement milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Instagram",
        "Sign in using Facebook/Instagram OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Followers",
          weight: "25%",
          description: "Measures audience size and creator reach.",
        },
        {
          parameter: "Total Posts",
          weight: "15%",
          description: "Reflects content output and activity level.",
        },
        {
          parameter: "Engagement Rate",
          weight: "35%",
          description:
            "Evaluates content quality through likes, comments, saves, and shares.",
        },
        {
          parameter: "Consistency",
          weight: "15%",
          description: "Tracks posting frequency and recent activity.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and authenticity.",
        },
      ],
    },
  },
  "X(formally twitter)": {
    activity: {
      description:
        "Connect your Twitter account to unlock verified creator analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including followers, tweets, and engagement",
        "Insights into tweet performance and audience interaction",
        "Average tweet metrics across your recent posts",
        "Posting frequency and consistency analysis",
        "ZAP Missions for tweets, retweets, engagement, and follower growth",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Twitter",
        "Sign in using Twitter/X OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Followers",
          weight: "25%",
          description: "Measures audience size and influence.",
        },
        {
          parameter: "Tweet Frequency",
          weight: "15%",
          description: "Reflects activity level and engagement commitment.",
        },
        {
          parameter: "Engagement Rate",
          weight: "35%",
          description:
            "Evaluates content quality through likes, retweets, replies, and impressions.",
        },
        {
          parameter: "Consistency",
          weight: "15%",
          description: "Tracks posting frequency and recent activity.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and authenticity.",
        },
      ],
    },
  },
  Twitch: {
    activity: {
      description:
        "Connect your Twitch account to unlock verified streamer analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Channel overview including followers, streams, and total views",
        "Insights into viewer engagement and stream performance",
        "Average viewer count and peak concurrent viewers",
        "Streaming consistency and growth trends",
        "ZAP Missions for streams, engagement, milestones, and subscriber growth",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Twitch",
        "Sign in using Twitch OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Followers",
          weight: "20%",
          description: "Measures audience size and streamer reach.",
        },
        {
          parameter: "Average Viewers",
          weight: "25%",
          description: "Reflects stream quality and viewer retention.",
        },
        {
          parameter: "Engagement Rate",
          weight: "30%",
          description:
            "Evaluates stream quality through chat activity, follows, and subscriptions.",
        },
        {
          parameter: "Stream Consistency",
          weight: "15%",
          description: "Tracks streaming frequency and schedule adherence.",
        },
        {
          parameter: "Channel Age",
          weight: "10%",
          description:
            "Adds trust based on channel maturity and streaming history.",
        },
      ],
    },
  },
  Discord: {
    activity: {
      description:
        "Connect your Discord account to unlock verified community analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including servers, roles, and activity",
        "Insights into community participation and engagement",
        "Server management and moderation metrics",
        "Communication consistency and community involvement",
        "ZAP Missions for activity, roles, and community milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Discord",
        "Sign in using Discord OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Server Count",
          weight: "20%",
          description: "Measures community involvement and network size.",
        },
        {
          parameter: "Activity Level",
          weight: "30%",
          description:
            "Reflects participation through messages and interactions.",
        },
        {
          parameter: "Role Quality",
          weight: "25%",
          description: "Evaluates reputation through roles and permissions.",
        },
        {
          parameter: "Consistency",
          weight: "15%",
          description: "Tracks regular participation and engagement.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity.",
        },
      ],
    },
  },
  Reddit: {
    activity: {
      description:
        "Connect your Reddit account to unlock verified community analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including karma, posts, and comments",
        "Insights into subreddit participation and engagement",
        "Average post and comment performance metrics",
        "Community contribution consistency and quality",
        "ZAP Missions for karma, awards, posts, and community engagement",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Reddit",
        "Sign in using Reddit OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Karma Score",
          weight: "30%",
          description:
            "Measures overall community reputation and contribution quality.",
        },
        {
          parameter: "Post Quality",
          weight: "25%",
          description: "Reflects content value through upvotes and awards.",
        },
        {
          parameter: "Engagement Rate",
          weight: "25%",
          description:
            "Evaluates interaction quality through comments and discussions.",
        },
        {
          parameter: "Consistency",
          weight: "10%",
          description: "Tracks regular participation across subreddits.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and authenticity.",
        },
      ],
    },
  },
  Farcaster: {
    activity: {
      description:
        "Connect your Farcaster account to unlock verified decentralized social analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including casts, followers, and channels",
        "Insights into decentralized social engagement",
        "Average cast performance and reach metrics",
        "Network activity and consistency tracking",
        "ZAP Missions for casts, engagement, and community growth",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Farcaster",
        "Sign in using Farcaster authentication",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Followers",
          weight: "25%",
          description: "Measures audience size and network reach.",
        },
        {
          parameter: "Cast Quality",
          weight: "30%",
          description: "Reflects content value through reactions and recasts.",
        },
        {
          parameter: "Engagement Rate",
          weight: "25%",
          description: "Evaluates interaction quality and community response.",
        },
        {
          parameter: "Consistency",
          weight: "10%",
          description: "Tracks regular posting and network activity.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity in the network.",
        },
      ],
    },
  },
  Telegram: {
    activity: {
      description:
        "Connect your Telegram account to unlock verified messaging analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile verification and account ownership",
        "Insights into channel and group participation",
        "Community engagement and messaging activity",
        "Network involvement and communication patterns",
        "ZAP Missions for activity, groups, and community milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Telegram",
        "Sign in using Telegram authentication",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Group Participation",
          weight: "25%",
          description: "Measures community involvement and network size.",
        },
        {
          parameter: "Activity Level",
          weight: "30%",
          description: "Reflects engagement through messages and interactions.",
        },
        {
          parameter: "Channel Engagement",
          weight: "20%",
          description: "Evaluates participation in channels and broadcasts.",
        },
        {
          parameter: "Consistency",
          weight: "15%",
          description: "Tracks regular communication and presence.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and authenticity.",
        },
      ],
    },
  },
  PlayStation: {
    activity: {
      description:
        "Connect your PlayStation account to unlock verified gaming analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including trophies, games, and playtime",
        "Insights into gaming achievements and progress",
        "Trophy collection and rarity metrics",
        "Gaming consistency and activity tracking",
        "ZAP Missions for trophies, games completed, and milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with PlayStation",
        "Sign in using PSN OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Trophy Count",
          weight: "30%",
          description: "Measures achievement level and gaming dedication.",
        },
        {
          parameter: "Trophy Rarity",
          weight: "25%",
          description: "Reflects skill through rare and difficult trophies.",
        },
        {
          parameter: "Games Played",
          weight: "20%",
          description: "Evaluates gaming diversity and experience.",
        },
        {
          parameter: "Playtime",
          weight: "15%",
          description: "Tracks gaming consistency and engagement.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and history.",
        },
      ],
    },
  },
  Roblox: {
    activity: {
      description:
        "Connect your Roblox account to unlock verified creator and gaming analytics inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including games, badges, and playtime",
        "Insights into game creation and community engagement",
        "Achievement tracking and badge collection",
        "Gaming consistency and activity metrics",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Roblox",
        "A unique CONSO Verification Code will be generated",
        "Open your Roblox profile and navigate to: Profile → Edit Profile → About / Description",
        "Paste the verification code exactly as shown into your Bio",
        "Return to CONSO and click Verify",
        "Once verified, your Roblox public data will sync",
        "You may delete the code after successful verification",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Badge Count",
          weight: "25%",
          description: "Measures achievement level and gaming dedication.",
        },
        {
          parameter: "Game Creations",
          weight: "30%",
          description: "Reflects creativity and development skill.",
        },
        {
          parameter: "Playtime",
          weight: "20%",
          description: "Evaluates gaming engagement and activity.",
        },
        {
          parameter: "Consistency",
          weight: "15%",
          description: "Tracks regular gaming and creation activity.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity.",
        },
      ],
    },
  },
  Steam: {
    activity: {
      description:
        "Connect your Steam account to unlock verified gaming analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including games, playtime, and achievements",
        "Insights into game library and completion rates",
        "Achievement tracking and rarity metrics",
        "Gaming consistency and activity patterns",
        "ZAP Missions for games, achievements, and playtime milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Steam",
        "Sign in using Steam OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Game Library",
          weight: "20%",
          description: "Measures gaming experience and investment.",
        },
        {
          parameter: "Achievement Count",
          weight: "30%",
          description: "Reflects gaming dedication and skill level.",
        },
        {
          parameter: "Playtime",
          weight: "25%",
          description: "Evaluates gaming engagement and consistency.",
        },
        {
          parameter: "Profile Level",
          weight: "15%",
          description: "Tracks community involvement and activity.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and authenticity.",
        },
      ],
    },
  },
  Xbox: {
    activity: {
      description:
        "Connect your Xbox account to unlock verified gaming analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including achievements, games, and gamerscore",
        "Insights into gaming progress and completion rates",
        "Achievement tracking and rarity metrics",
        "Gaming consistency and activity patterns",
        "ZAP Missions for achievements, games completed, and milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Xbox",
        "Sign in using Microsoft OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Gamerscore",
          weight: "30%",
          description: "Measures overall achievement level and dedication.",
        },
        {
          parameter: "Achievement Rarity",
          weight: "25%",
          description:
            "Reflects skill through rare and difficult achievements.",
        },
        {
          parameter: "Games Played",
          weight: "20%",
          description: "Evaluates gaming diversity and experience.",
        },
        {
          parameter: "Completion Rate",
          weight: "15%",
          description: "Tracks game completion and dedication.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and history.",
        },
      ],
    },
  },
  "Google Play": {
    activity: {
      description:
        "Connect your Google Play Games account to unlock verified mobile gaming analytics inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including achievements, games, and playtime",
        "Insights into mobile gaming activity and progress",
        "Achievement tracking and leaderboard rankings",
        "Gaming consistency and engagement metrics",
        "ZAP Missions for achievements, leaderboards, and milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Google Play",
        "Sign in using Google OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Achievement Count",
          weight: "30%",
          description: "Measures gaming dedication and skill level.",
        },
        {
          parameter: "Leaderboard Rankings",
          weight: "25%",
          description: "Reflects competitive performance and skill.",
        },
        {
          parameter: "Games Played",
          weight: "20%",
          description: "Evaluates gaming diversity and engagement.",
        },
        {
          parameter: "Playtime",
          weight: "15%",
          description: "Tracks gaming consistency and activity.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity.",
        },
      ],
    },
  },
  "Chess.com": {
    activity: {
      description:
        "Connect your Chess.com account to unlock verified chess analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including ratings, games, and win rates",
        "Insights into chess performance across game modes",
        "Rating progression and skill development tracking",
        "Gaming consistency and competitive activity",
        "ZAP Missions for games, ratings, and tournament achievements",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Chess.com",
        "Sign in using Chess.com OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Chess Rating",
          weight: "35%",
          description: "Measures chess skill and competitive level.",
        },
        {
          parameter: "Games Played",
          weight: "20%",
          description: "Reflects gaming experience and activity.",
        },
        {
          parameter: "Win Rate",
          weight: "25%",
          description: "Evaluates performance and skill consistency.",
        },
        {
          parameter: "Tournament Performance",
          weight: "10%",
          description: "Tracks competitive achievements and rankings.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity.",
        },
      ],
    },
  },
  "Epic Games": {
    activity: {
      description:
        "Connect your Epic Games account to unlock verified gaming analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including games, achievements, and playtime",
        "Insights into game library and gaming activity",
        "Achievement tracking and progress metrics",
        "Gaming consistency and engagement patterns",
        "ZAP Missions for games, achievements, and milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Epic Games",
        "Sign in using Epic Games OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Game Library",
          weight: "20%",
          description: "Measures gaming experience and investment.",
        },
        {
          parameter: "Achievement Count",
          weight: "30%",
          description: "Reflects gaming dedication and skill level.",
        },
        {
          parameter: "Playtime",
          weight: "25%",
          description: "Evaluates gaming engagement and consistency.",
        },
        {
          parameter: "Competitive Ranking",
          weight: "15%",
          description: "Tracks performance in competitive titles.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity.",
        },
      ],
    },
  },
  RetroAchievements: {
    activity: {
      description:
        "Connect your RetroAchievements account to unlock verified retro gaming analytics inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including achievements, games, and points",
        "Insights into retro gaming dedication and completion",
        "Achievement tracking across classic games",
        "Gaming consistency and collection metrics",
        "ZAP Missions for achievements, mastery, and milestone points",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with RetroAchievements",
        "Sign in using RetroAchievements authentication",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Achievement Points",
          weight: "35%",
          description: "Measures retro gaming dedication and skill.",
        },
        {
          parameter: "Mastery Count",
          weight: "25%",
          description: "Reflects game completion and achievement depth.",
        },
        {
          parameter: "Games Played",
          weight: "20%",
          description: "Evaluates gaming diversity across retro titles.",
        },
        {
          parameter: "Consistency",
          weight: "10%",
          description: "Tracks regular gaming and achievement activity.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity.",
        },
      ],
    },
  },
  GitHub: {
    activity: {
      description:
        "Connect your GitHub account to unlock verified developer analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including repositories, contributions, and stars",
        "Insights into coding activity and open-source work",
        "Contribution patterns and project involvement",
        "Development consistency and community engagement",
        "ZAP Missions for commits, repos, stars, and contribution milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with GitHub",
        "Sign in using GitHub OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Contributions",
          weight: "30%",
          description: "Measures coding activity and development output.",
        },
        {
          parameter: "Repository Quality",
          weight: "25%",
          description: "Reflects project value through stars and forks.",
        },
        {
          parameter: "Open Source Impact",
          weight: "25%",
          description: "Evaluates community contributions and collaboration.",
        },
        {
          parameter: "Consistency",
          weight: "10%",
          description: "Tracks regular coding and contribution activity.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and authenticity.",
        },
      ],
    },
  },
  Spotify: {
    activity: {
      description:
        "Connect your Spotify account to unlock verified music analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including playlists, favorites, and listening history",
        "Insights into music taste and listening patterns",
        "Top artists, tracks, and genre preferences",
        "Listening consistency and engagement metrics",
        "ZAP Missions for playlists, listening time, and music milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Spotify",
        "Sign in using Spotify OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Playlist Quality",
          weight: "25%",
          description: "Measures curation skill and music taste.",
        },
        {
          parameter: "Listening Time",
          weight: "30%",
          description: "Reflects music engagement and platform activity.",
        },
        {
          parameter: "Artist Diversity",
          weight: "20%",
          description: "Evaluates breadth of music taste and discovery.",
        },
        {
          parameter: "Consistency",
          weight: "15%",
          description: "Tracks regular listening and engagement.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity.",
        },
      ],
    },
  },
  Medium: {
    activity: {
      description:
        "Connect your Medium account to unlock verified creator analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including articles, followers, and engagement",
        "Insights into writing quality and audience response",
        "Average article performance and reach metrics",
        "Publishing consistency and growth tracking",
        "ZAP Missions for articles, claps, followers, and engagement",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Medium",
        "Sign in using Medium OAuth",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Followers",
          weight: "25%",
          description: "Measures audience size and creator reach.",
        },
        {
          parameter: "Article Quality",
          weight: "30%",
          description: "Reflects content value through claps and reads.",
        },
        {
          parameter: "Engagement Rate",
          weight: "25%",
          description: "Evaluates reader interaction and content impact.",
        },
        {
          parameter: "Consistency",
          weight: "10%",
          description: "Tracks regular publishing and content creation.",
        },
        {
          parameter: "Account Age",
          weight: "10%",
          description: "Adds trust based on account maturity and authenticity.",
        },
      ],
    },
  },
  Substack: {
    activity: {
      description:
        "Connect your Substack account to unlock verified newsletter analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview including newsletters, subscribers, and engagement",
        "Insights into content quality and audience growth",
        "Average newsletter performance and open rates",
        "Publishing consistency and readership tracking",
        "ZAP Missions for publications, subscribers, and engagement",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Substack",
        "Sign in using Substack authentication",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Subscribers",
          weight: "30%",
          description: "Measures audience size and newsletter reach.",
        },
        {
          parameter: "Content Quality",
          weight: "30%",
          description:
            "Reflects newsletter value through engagement and reads.",
        },
        {
          parameter: "Open Rate",
          weight: "20%",
          description: "Evaluates audience engagement and content relevance.",
        },
        {
          parameter: "Consistency",
          weight: "10%",
          description: "Tracks regular publishing and content delivery.",
        },
        {
          parameter: "Newsletter Age",
          weight: "10%",
          description: "Adds trust based on newsletter maturity and history.",
        },
      ],
    },
  },
  SuiNS: {
    activity: {
      description:
        "Connect your SuiNS name to unlock verified blockchain identity signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile verification through SuiNS name ownership",
        "Insights into blockchain identity and on-chain presence",
        "Domain ownership and registration metrics",
        "Network activity and identity reputation",
        "ZAP Missions for name ownership, activity, and blockchain milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with SuiNS",
        "Connect your wallet to verify ownership",
        "Confirm SuiNS name association",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Name Quality",
          weight: "30%",
          description: "Measures name value and recognition potential.",
        },
        {
          parameter: "Ownership Duration",
          weight: "25%",
          description: "Reflects commitment through holding period.",
        },
        {
          parameter: "On-chain Activity",
          weight: "25%",
          description: "Evaluates blockchain engagement and transactions.",
        },
        {
          parameter: "Network Participation",
          weight: "10%",
          description: "Tracks involvement in Sui ecosystem.",
        },
        {
          parameter: "Registration Age",
          weight: "10%",
          description: "Adds trust based on name maturity.",
        },
      ],
    },
  },
  "Slush Wallet": {
    activity: {
      description:
        "Connect your Slush Wallet to unlock verified on-chain analytics and reputation signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Wallet overview including assets, transactions, and activity",
        "Insights into on-chain behavior and asset holdings",
        "Transaction patterns and network participation",
        "DeFi engagement and protocol interaction metrics",
        "ZAP Missions for transactions, holdings, and on-chain milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Slush Wallet",
        "Connect your wallet to verify ownership",
        "Approve read-only analytics access",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Transaction Volume",
          weight: "25%",
          description: "Measures on-chain activity and engagement level.",
        },
        {
          parameter: "Asset Holdings",
          weight: "30%",
          description: "Reflects portfolio value and investment commitment.",
        },
        {
          parameter: "Protocol Interaction",
          weight: "25%",
          description: "Evaluates DeFi participation and ecosystem engagement.",
        },
        {
          parameter: "Network Activity",
          weight: "10%",
          description: "Tracks consistency of on-chain transactions.",
        },
        {
          parameter: "Wallet Age",
          weight: "10%",
          description: "Adds trust based on wallet maturity and history.",
        },
      ],
    },
  },
  SuiPlay0x1: {
    activity: {
      description:
        "Verify your SuiPlay0x1 console ownership to unlock gaming device signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Console ownership verification and authentication",
        "Insights into gaming activity on Sui blockchain",
        "Access to exclusive SuiPlay features and communities",
        "Gaming metrics and on-chain gaming participation",
        "ZAP Missions for ownership, gaming, and console milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with SuiPlay0x1",
        "Verify console ownership through wallet connection",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Console Ownership",
          weight: "40%",
          description: "Verifies authentic SuiPlay0x1 console ownership.",
        },
        {
          parameter: "Gaming Activity",
          weight: "30%",
          description: "Measures gaming engagement on the console.",
        },
        {
          parameter: "On-chain Gaming",
          weight: "15%",
          description: "Evaluates blockchain gaming participation.",
        },
        {
          parameter: "Community Engagement",
          weight: "10%",
          description: "Tracks involvement in SuiPlay community.",
        },
        {
          parameter: "Ownership Duration",
          weight: "5%",
          description: "Reflects commitment through holding period.",
        },
      ],
    },
  },
  "Sui Passport": {
    activity: {
      description:
        "Connect your Sui Passport to unlock ecosystem activity signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "Profile overview of Sui ecosystem participation",
        "Insights into event attendance and community involvement",
        "Activity tracking across Sui ecosystem events",
        "Network participation and reputation metrics",
        "ZAP Missions for events, activities, and ecosystem milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Sui Passport",
        "Connect your wallet to verify ownership",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "Event Participation",
          weight: "35%",
          description: "Measures involvement in Sui ecosystem events.",
        },
        {
          parameter: "Activity Diversity",
          weight: "25%",
          description: "Reflects breadth of ecosystem engagement.",
        },
        {
          parameter: "Community Engagement",
          weight: "20%",
          description: "Evaluates active participation and contribution.",
        },
        {
          parameter: "Consistency",
          weight: "10%",
          description: "Tracks regular ecosystem involvement.",
        },
        {
          parameter: "Passport Age",
          weight: "10%",
          description: "Adds trust based on ecosystem participation history.",
        },
      ],
    },
  },
  "Claynosaurz Holder": {
    activity: {
      description:
        "Verify your Claynosaurz NFT ownership to unlock collectible holder signals inside your CONSO Passport. You will gain access to:",
      benefits: [
        "NFT ownership verification and collection metrics",
        "Insights into holding duration and commitment",
        "Community participation in Claynosaurz ecosystem",
        "Collector reputation and network involvement",
        "ZAP Missions for ownership, community, and holder milestones",
      ],
    },
    instruction: {
      steps: [
        "Click Connect with Claynosaurz Holder",
        "Connect your wallet to verify NFT ownership",
        "Approve read-only analytics permissions",
        "Your stats auto-sync every 24 hours",
        "Manage or disconnect anytime via Passport → Connections",
      ],
    },
    scoring: {
      parameters: [
        {
          parameter: "NFT Ownership",
          weight: "35%",
          description: "Verifies authentic Claynosaurz NFT holdings.",
        },
        {
          parameter: "Holding Duration",
          weight: "25%",
          description: "Reflects commitment and collector dedication.",
        },
        {
          parameter: "Collection Size",
          weight: "20%",
          description: "Measures investment level and collection depth.",
        },
        {
          parameter: "Community Engagement",
          weight: "10%",
          description: "Evaluates participation in Claynosaurz community.",
        },
        {
          parameter: "Market Activity",
          weight: "10%",
          description: "Tracks trading and market engagement.",
        },
      ],
    },
  },
};

// Helper function to get platform content
export const getPlatformContent = (
  platformName: string
): PlatformContent | null => {
  return PLATFORM_CONTENT[platformName as PlatformName] || null;
};
