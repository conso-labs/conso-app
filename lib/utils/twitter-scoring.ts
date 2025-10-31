/**
 * Twitter User Scoring Algorithm
 * Calculates a score between 1-100 based on profile data and engagement metrics
 */

interface UserMetrics {
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  listedCount: number;
  verified: boolean;
  accountAge: number; // in days
}

interface TweetMetrics {
  likeCount: number;
  retweetCount: number;
  replyCount: number;
  quoteCount: number;
}

interface ScoringResult {
  totalScore: number;
  breakdown: {
    profileScore: number;
    engagementScore: number;
    activityScore: number;
    influenceScore: number;
  };
}

/**
 * Calculate comprehensive Twitter score (1-100)
 */
export function calculateTwitterScore(
  userMetrics: UserMetrics,
  tweets: TweetMetrics[]
): ScoringResult {
  // 1. Profile Score (25 points)
  const profileScore = calculateProfileScore(userMetrics);

  // 2. Engagement Score (30 points)
  const engagementScore = calculateEngagementScore(tweets);

  // 3. Activity Score (20 points)
  const activityScore = calculateActivityScore(userMetrics, tweets);

  // 4. Influence Score (25 points)
  const influenceScore = calculateInfluenceScore(userMetrics);

  const totalScore = Math.min(
    100,
    Math.round(profileScore + engagementScore + activityScore + influenceScore)
  );

  return {
    totalScore: Math.max(1, totalScore), // Ensure minimum score of 1
    breakdown: {
      profileScore: Math.round(profileScore),
      engagementScore: Math.round(engagementScore),
      activityScore: Math.round(activityScore),
      influenceScore: Math.round(influenceScore)
    }
  };
}

/**
 * Profile Score (25 points)
 * Based on account completeness and verification
 */
function calculateProfileScore(metrics: UserMetrics): number {
  let score = 0;

  // Verified account: +10 points
  if (metrics.verified) {
    score += 10;
  }

  // Account age (older = more established)
  // Max 5 points for accounts > 2 years old
  const yearsOld = metrics.accountAge / 365;
  score += Math.min(5, yearsOld * 2.5);

  // Listed count (being added to lists shows credibility)
  // Max 5 points for 100+ lists
  score += Math.min(5, (metrics.listedCount / 100) * 5);

  // Activity level (has posted content)
  // Max 5 points for 1000+ tweets
  score += Math.min(5, (metrics.tweetCount / 1000) * 5);

  return Math.min(25, score);
}

/**
 * Engagement Score (30 points)
 * Based on average engagement per tweet
 */
function calculateEngagementScore(tweets: TweetMetrics[]): number {
  if (tweets.length === 0) return 0;

  const totalEngagement = tweets.reduce((sum, tweet) => {
    return (
      sum +
      tweet.likeCount +
      tweet.retweetCount * 2 + // Retweets weighted higher
      tweet.replyCount * 1.5 + // Replies show conversation
      tweet.quoteCount * 2 // Quote tweets weighted higher
    );
  }, 0);

  const avgEngagement = totalEngagement / tweets.length;

  // Score based on average engagement
  // 0-10: minimal (0-5 points)
  // 10-50: low (5-10 points)
  // 50-200: moderate (10-18 points)
  // 200-500: good (18-24 points)
  // 500+: excellent (24-30 points)

  let score = 0;
  if (avgEngagement < 10) {
    score = (avgEngagement / 10) * 5;
  } else if (avgEngagement < 50) {
    score = 5 + ((avgEngagement - 10) / 40) * 5;
  } else if (avgEngagement < 200) {
    score = 10 + ((avgEngagement - 50) / 150) * 8;
  } else if (avgEngagement < 500) {
    score = 18 + ((avgEngagement - 200) / 300) * 6;
  } else {
    score = 24 + Math.min(6, ((avgEngagement - 500) / 1000) * 6);
  }

  return Math.min(30, score);
}

/**
 * Activity Score (20 points)
 * Based on recent activity and consistency
 */
function calculateActivityScore(
  userMetrics: UserMetrics,
  tweets: TweetMetrics[]
): number {
  let score = 0;

  // Recent activity (has tweets in dataset): +10 points
  if (tweets.length > 0) {
    score += 10;
  }

  // Volume of recent tweets (consistency)
  // Max 10 points for 50+ recent tweets
  score += Math.min(10, (tweets.length / 50) * 10);

  return Math.min(20, score);
}

/**
 * Influence Score (25 points)
 * Based on follower metrics and reach
 */
function calculateInfluenceScore(metrics: UserMetrics): number {
  let score = 0;

  // Follower count
  // 0-100: 0-3 points
  // 100-1000: 3-8 points
  // 1000-10000: 8-15 points
  // 10000-100000: 15-20 points
  // 100000+: 20-22 points

  const followers = metrics.followersCount;
  if (followers < 100) {
    score += (followers / 100) * 3;
  } else if (followers < 1000) {
    score += 3 + ((followers - 100) / 900) * 5;
  } else if (followers < 10000) {
    score += 8 + ((followers - 1000) / 9000) * 7;
  } else if (followers < 100000) {
    score += 15 + ((followers - 10000) / 90000) * 5;
  } else {
    score += 20 + Math.min(2, ((followers - 100000) / 400000) * 2);
  }

  // Follower/Following ratio (quality of followers)
  // Good ratio (followers > following): +3 points
  if (metrics.followingCount > 0) {
    const ratio = metrics.followersCount / metrics.followingCount;
    if (ratio > 2) {
      score += 3;
    } else if (ratio > 1) {
      score += 1.5;
    }
  }

  return Math.min(25, score);
}

/**
 * Parse Twitter API user data into UserMetrics
 */
export function parseUserMetrics(userData: any): UserMetrics {
  const createdAt = new Date(userData.created_at);
  const accountAge = Math.floor(
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    followersCount: userData.public_metrics.followers_count,
    followingCount: userData.public_metrics.following_count,
    tweetCount: userData.public_metrics.tweet_count,
    listedCount: userData.public_metrics.listed_count,
    verified: userData.verified || userData.verified_type === "blue",
    accountAge
  };
}

/**
 * Parse Twitter API tweets data into TweetMetrics array
 */
export function parseTweetMetrics(tweetsData: any): TweetMetrics[] {
  if (!tweetsData?.data) return [];

  return tweetsData.data.map((tweet: any) => ({
    likeCount: tweet.public_metrics.like_count,
    retweetCount: tweet.public_metrics.retweet_count,
    replyCount: tweet.public_metrics.reply_count,
    quoteCount: tweet.public_metrics.quote_count
  }));
}
