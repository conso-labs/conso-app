export type ConsoUser = {
  suiAddress: string;
  substringSuiAddress: string;
  connectedAccounts: activePlatforms[];
  badges: number;
  zapsScore: number;
  consumerPercentile: number;
};

enum activePlatforms {
  "Twitter" = "Twitter",
  "Discord" = "Discord",
  "Reddit" = "Reddit",
  "GitHub" = "GitHub",
  "Telegram" = "Telegram",
  "Twitch" = "Twitch",
  "YouTube" = "YouTube",
  "Instagram" = "Instagram",
  "Facebook" = "Facebook",
  "LinkedIn" = "LinkedIn",
}
