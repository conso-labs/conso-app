import {
  YouTubeIcon,
  TwitchIcon,
  XIcon,
  RedditIcon,
  FarcasterIcon,
  InstagramIcon,
  DiscordIcon,
  TelegramIcon,
  PlaystationIcon,
  XboxIcon,
  SteamIcon,
  GooglePlayIcon,
  RobloxIcon,
  ChessIcon,
  EpicGamesIcon,
  RetroachievementsIcon,
  GithubIcon,
  SpotifyIcon,
  MediumIcon,
  SubstackIcon,
  SuiNSIcon,
  SlushIcon,
  SuiPlayIcon,
  SuiPassportIcon,
  ClaynosaurzIcon,
} from "@/components/badges/icons";

export const socialBadges = [
  {
    id: "youtube",
    icon: <YouTubeIcon />,
    title: "YouTube",
    description:
      "Connect your channel to highlight videos, playlists, and subs.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6D5F5]",
    disabled: false,
  },
  {
    id: "twitch",
    icon: <TwitchIcon />,
    title: "Twitch",
    description:
      "Verify your Twitch account to display streams and viewer stats.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5C6D5]",
    disabled: false,
  },

  {
    id: "discord",
    icon: <DiscordIcon />,
    title: "Discord",
    description:
      "Connect Discord to display community roles and participation.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6C6F5]",
    disabled: false,
  },
  {
    id: "reddit",
    icon: <RedditIcon />,
    title: "Reddit",
    description:
      "Verify your Reddit account to display karma and community activity.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6F5D5]",
    disabled: true,
  },
  {
    id: "x",
    icon: <XIcon />,
    title: "X(formally twitter)",
    description:
      "Link your X profile to showcase posts, follower and engagement.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: true,
  },
  {
    id: "farcaster",
    icon: <FarcasterIcon />,
    title: "Farcaster",
    description: "Verify your Farcaster account to showcase pages and posts.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: true,
  },
  {
    id: "instagram",
    icon: <InstagramIcon />,
    title: "Instagram",
    description:
      "Link your Instagram to highlight reels, posts, and followers.",
    zapReward: 10000,
    backgroundColor: "bg-[#C6E5F5]",
    disabled: true,
  },

  {
    id: "telegram",
    icon: <TelegramIcon />,
    title: "Telegram",
    description:
      "Verify your Telegram account ownership for professional identity.",
    zapReward: 10000,
    backgroundColor: "bg-[#D5E6F5]",
    disabled: true,
  },
];

export const gamingBadges = [
  {
    id: "roblox",
    icon: <RobloxIcon />,
    title: "Roblox",
    description:
      "Verify your Roblox account to display creations, badges, and game activity.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: false,
  },
  {
    id: "playstation",
    icon: <PlaystationIcon />,
    title: "PlayStation",
    description:
      "Connect your PSN account to showcase trophies and gameplay stats.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6D5F5]",
    disabled: true,
  },

  {
    id: "steam",
    icon: <SteamIcon />,
    title: "Steam",
    description: "Link your Steam ID to track games, playtime, and badges.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: true,
  },
  {
    id: "xbox",
    icon: <XboxIcon />,
    title: "Xbox",
    description:
      "Verify your Xbox Live account to sync achievements and progress.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5C6D5]",
    disabled: true,
  },
  {
    id: "googleplay",
    icon: <GooglePlayIcon />,
    title: "Google Play",
    description:
      "Connect Google Play Games for mobile achievements and leaderboards.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6F5D5]",
    disabled: true,
  },

  {
    id: "chess",
    icon: <ChessIcon />,
    title: "Chess.com",
    description:
      "Sync your Chess.com profile to highlight ratings and matches.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: true,
  },
  {
    id: "epicgames",
    icon: <EpicGamesIcon />,
    title: "Epic Games",
    description:
      "Link your Epic account to showcase Fortnite and other Epic titles.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: true,
  },
  {
    id: "retroachievements",
    icon: <RetroachievementsIcon />,
    title: "RetroAchievements",
    description: "Connect RA to feature retro game achievements.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: true,
  },
];

export const creativeBadges = [
  {
    id: "github",
    icon: <GithubIcon />,
    title: "GitHub",
    description:
      "Connect your GitHub to showcase repos, commits, and open-source work",
    zapReward: 10000,
    backgroundColor: "bg-[#E6D5F5]",
    disabled: false,
  },
  {
    id: "spotify",
    icon: <SpotifyIcon />,
    title: "Spotify",
    description:
      "Link your Spotify to display playlists, favourites,and listening trends",
    zapReward: 10000,
    backgroundColor: "bg-[#F5C6D5]",
    disabled: true,
  },
  {
    id: "medium",
    icon: <MediumIcon />,
    title: "Medium",
    description: "Verify your Medium profile to highlight blogs and followers.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: true,
  },
  {
    id: "substack",
    icon: <SubstackIcon />,
    title: "Substack",
    description: "Connect your Substack to feature newsletters and readership.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6F5D5]",
    disabled: true,
  },
];

export const onchainBadges = [
  {
    id: "slushwallet",
    icon: <SlushIcon />,
    title: "Slush Wallet",
    description:
      "Link your Slush Wallet to display on-chain assets and activity.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5C6D5]",
    disabled: false,
    skipModal: true,
    customButtonText: "Claim Badge",
  },
  {
    id: "suins",
    icon: <SuiNSIcon />,
    title: "SuiNS",
    description:
      "Connect your SuiNS name to showcase your blockchain identity.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6D5F5]",
    disabled: false,
    skipModal: true,
    customButtonText: "Claim Badge",
  },
  {
    id: "suiplay",
    icon: <SuiPlayIcon />,
    title: "SuiPlay0x1",
    description:
      "Verify ownership of your SuiPlay0x1 console for gaming on Sui.",
    zapReward: 10000,
    backgroundColor: "bg-[#F5E6C6]",
    disabled: true,
    skipModal: true,
    customButtonText: "Claim Badge",
  },
  {
    id: "suipassport",
    icon: <SuiPassportIcon />,
    title: "Sui Passport",
    description:
      "Get recognized for all your activities in the Sui ecosystem events.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6F5D5]",
    disabled: true,
    skipModal: true,
    customButtonText: "Claim Badge",
  },
  {
    id: "claynosaurz",
    icon: <ClaynosaurzIcon />,
    title: "Claynosaurz Holder",
    description: "Verify ownership of Claynosaurz NFT.",
    zapReward: 10000,
    backgroundColor: "bg-[#E6F5D5]",
    disabled: true,
    skipModal: true,
    customButtonText: "Claim Badge",
  },
];
