import { NextRequest, NextResponse } from "next/server";
import { fetchUserProfile, fetchUserTweets } from "@/lib/utils/twitter-oauth";
import {
  calculateTwitterScore,
  parseUserMetrics,
  parseTweetMetrics
} from "@/lib/utils/twitter-scoring";

export async function GET(request: NextRequest) {
  try {
    // Get access token from cookie
    const accessToken = request.cookies.get("twitter_access_token")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Not authenticated. Please connect your Twitter account." },
        { status: 401 }
      );
    }

    // Fetch user profile
    const userProfileResponse = await fetchUserProfile(accessToken);
    const userData = userProfileResponse.data;

    if (!userData) {
      return NextResponse.json(
        { error: "Failed to fetch user profile" },
        { status: 500 }
      );
    }

    // Fetch user tweets
    const tweetsResponse = await fetchUserTweets(accessToken, userData.id);

    // Parse metrics
    const userMetrics = parseUserMetrics(userData);
    const tweetMetrics = parseTweetMetrics(tweetsResponse);

    // Calculate score
    const scoringResult = calculateTwitterScore(userMetrics, tweetMetrics);

    // Return comprehensive data
    return NextResponse.json({
      user: {
        id: userData.id,
        username: userData.username,
        name: userData.name,
        profileImageUrl: userData.profile_image_url,
        description: userData.description,
        verified: userData.verified,
        metrics: userMetrics
      },
      tweets: {
        count: tweetMetrics.length,
        metrics: tweetMetrics
      },
      score: scoringResult
    });
  } catch (error) {
    console.error("Error fetching user score:", error);
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}
