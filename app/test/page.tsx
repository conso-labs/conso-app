"use client";
import { Button } from "@/components/ui/button";
import { getDiscordData } from "@/lib/api/getDiscordData";
import { getRedditData } from "@/lib/api/getRedditData";
// import { getTestData } from "@/lib/api/getTestData";
import { getTwitchData } from "@/lib/api/getTwitchData";
// import { getTwitterData } from "@/lib/api/getTwitterData";
import { getYoutubeData } from "@/lib/api/getYoutubeData";
import { useEffect, useState } from "react";

interface TwitterUserData {
  user: {
    id: string;
    username: string;
    name: string;
    profileImageUrl: string;
    description: string;
    verified: boolean;
    metrics: {
      followersCount: number;
      followingCount: number;
      tweetCount: number;
      listedCount: number;
      verified: boolean;
      accountAge: number;
    };
  };
  tweets: {
    count: number;
    metrics: Array<{
      likeCount: number;
      retweetCount: number;
      replyCount: number;
      quoteCount: number;
    }>;
  };
  score: {
    totalScore: number;
    breakdown: {
      profileScore: number;
      engagementScore: number;
      activityScore: number;
      influenceScore: number;
    };
  };
}

const TestPage = () => {
  const [twitterData, setTwitterData] = useState<TwitterUserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for OAuth errors or successful authentication on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get("error");
    const authParam = params.get("auth");

    if (errorParam) {
      setError(`Authentication error: ${errorParam}`);
      setLoading(false);
    } else if (authParam === "success") {
      // OAuth successful, enable the fetch button
      setIsAuthenticated(true);
      setLoading(false);
      // Clean up URL
      window.history.replaceState({}, "", "/test");
    }
  }, []);

  const handleYoutubeDataLoad = async () => {
    try {
      console.log("API call initiated");
      const result = await getYoutubeData({ handle: "mrbeast" });
      console.log("API response:", result);
    } catch (error) {
      console.error("Error fetching YouTube public data:", error);
    }
  };

  const handleTwitchDataLoad = async () => {
    try {
      console.log("API call initiated");

      const result = await getTwitchData({ username: "Grimm" });
      console.log("API response:", result);
    } catch (error) {
      console.error("Error fetching YouTube public data:", error);
    }
  };

  const handleRedditDataLoad = async () => {
    try {
      console.log("API call initiated");

      const result = await getRedditData({ username: "SafeBuy8771" });
      console.log("API response:", result);
    } catch (error) {
      console.error("Error fetching YouTube public data:", error);
    }
  };

  const handleDiscordDataLoad = async () => {
    try {
      console.log("API call initiated");

      const result = await getDiscordData({ id: "_vintron" });
      console.log("API response:", result);
    } catch (error) {
      console.error("Error fetching YouTube public data:", error);
    }
  };

  /**
   * STEP 1: Initiate OAuth 2.0 with PKCE
   * Redirect to server endpoint that handles PKCE generation
   */
  const handleConnectTwitter = () => {
    setLoading(true);
    setError(null);
    console.log("OAuth 2.0 flow initiated");

    // Redirect to server endpoint that generates PKCE parameters
    // and redirects to X authorize URL
    window.location.href = "/api/auth/twitter/authorize";
  };

  /**
   * STEP 3: After OAuth callback, fetch user data and calculate score
   */
  const handleFetchUserScore = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching user profile and calculating score...");

      // Call API endpoint that uses the access token to fetch user data
      const response = await fetch("/api/twitter/user-score");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch user score");
      }

      const data = await response.json();
      setTwitterData(data);
      setIsAuthenticated(true);
      console.log("User data and score:", data);
    } catch (error) {
      console.error("Error fetching user score:", error);
      setError(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <h1 className="text-3xl font-bold mb-8">Conso App</h1>

      <div className="flex flex-wrap gap-4 mb-8">
        <Button onClick={handleYoutubeDataLoad}>Get Youtube Public Data</Button>
        <Button onClick={handleTwitchDataLoad}>Get Twitch Public Data</Button>
        <Button onClick={handleRedditDataLoad}>Get Reddit Public Data</Button>
        <Button onClick={handleDiscordDataLoad}>Get Discord Public Data</Button>
        {/* <Button onClick={handleTwitterDataLoad}>
          Get Twitter Public Data
        </Button> */}
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Twitter OAuth 2.0 with PKCE</h2>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-4 mb-6">
          <Button
            onClick={handleConnectTwitter}
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Connecting..." : "1. Connect Twitter Account"}
          </Button>

          <Button
            onClick={handleFetchUserScore}
            disabled={loading || !isAuthenticated}
            className="flex-1"
          >
            {loading ? "Loading..." : "2. Fetch Profile & Calculate Score"}
          </Button>
        </div>

        {twitterData && (
          <div className="mt-8 space-y-6">
            {/* User Profile Section */}
            <div className="border-b border-zinc-200 dark:border-zinc-700 pb-6">
              <h3 className="text-xl font-semibold mb-4">User Profile</h3>
              <div className="flex items-start gap-4">
                {twitterData.user.profileImageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={twitterData.user.profileImageUrl}
                    alt={twitterData.user.name}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg">
                      {twitterData.user.name}
                    </h4>
                    {twitterData.user.verified && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    @{twitterData.user.username}
                  </p>
                  <p className="mt-2 text-sm">{twitterData.user.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Followers
                  </div>
                  <div className="text-xl font-bold">
                    {twitterData.user.metrics.followersCount.toLocaleString()}
                  </div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Following
                  </div>
                  <div className="text-xl font-bold">
                    {twitterData.user.metrics.followingCount.toLocaleString()}
                  </div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Tweets
                  </div>
                  <div className="text-xl font-bold">
                    {twitterData.user.metrics.tweetCount.toLocaleString()}
                  </div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Account Age
                  </div>
                  <div className="text-xl font-bold">
                    {Math.floor(twitterData.user.metrics.accountAge / 365)}y
                  </div>
                </div>
              </div>
            </div>

            {/* Score Section */}
            <div className="border-b border-zinc-200 dark:border-zinc-700 pb-6">
              <h3 className="text-xl font-semibold mb-4">
                Twitter Influence Score
              </h3>

              <div className="bg-linear-to-r from-blue-500 to-purple-600 p-6 rounded-lg text-white mb-4">
                <div className="text-center">
                  <div className="text-6xl font-bold">
                    {twitterData.score.totalScore}
                  </div>
                  <div className="text-xl mt-2">out of 100</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Profile Score
                  </div>
                  <div className="text-2xl font-bold">
                    {twitterData.score.breakdown.profileScore}/25
                  </div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Engagement
                  </div>
                  <div className="text-2xl font-bold">
                    {twitterData.score.breakdown.engagementScore}/30
                  </div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Activity
                  </div>
                  <div className="text-2xl font-bold">
                    {twitterData.score.breakdown.activityScore}/20
                  </div>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Influence
                  </div>
                  <div className="text-2xl font-bold">
                    {twitterData.score.breakdown.influenceScore}/25
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Statistics */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Recent Engagement ({twitterData.tweets.count} tweets)
              </h3>

              {twitterData.tweets.count > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Total Likes
                    </div>
                    <div className="text-2xl font-bold">
                      {twitterData.tweets.metrics
                        .reduce((sum, t) => sum + t.likeCount, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Total Retweets
                    </div>
                    <div className="text-2xl font-bold">
                      {twitterData.tweets.metrics
                        .reduce((sum, t) => sum + t.retweetCount, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Total Replies
                    </div>
                    <div className="text-2xl font-bold">
                      {twitterData.tweets.metrics
                        .reduce((sum, t) => sum + t.replyCount, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Total Quotes
                    </div>
                    <div className="text-2xl font-bold">
                      {twitterData.tweets.metrics
                        .reduce((sum, t) => sum + t.quoteCount, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
          <h4 className="font-semibold mb-2">How it works:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>
              Click Connect Twitter Account to initiate OAuth 2.0 with PKCE
            </li>
            <li>Authorize the app on Twitter (redirects to twitter.com)</li>
            <li>After authorization, you will be redirected back here</li>
            <li>
              Click Fetch Profile & Calculate Score to get your data and score
            </li>
            <li>
              Score is calculated based on profile, engagement, activity, and
              influence
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
