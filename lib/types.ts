export type ConsoUser = {
  suiAddress: string;
  substringSuiAddress: string;
  connectedAccounts: string[];
  badges: number;
  zapsScore: number;
  consumerPercentile: number;
  platformData?: Record<string, object>;
  userData?: Record<string, object>; // Stores user-input data (e.g., YouTube) that persists across OAuth syncs
};
