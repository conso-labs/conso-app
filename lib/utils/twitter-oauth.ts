import { generateCodeChallenge, generateCodeVerifier, generateState } from "./pkce";

// Twitter OAuth 2.0 configuration
const TWITTER_CLIENT_ID = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID || "";
const REDIRECT_URI = process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI || "http://localhost:3000/api/auth/twitter/callback";
const TWITTER_AUTHORIZE_URL = "https://twitter.com/i/oauth2/authorize";
const TWITTER_TOKEN_URL = "https://api.twitter.com/2/oauth2/token";

// Scopes for Twitter API v2
const SCOPES = [
  "tweet.read",
  "users.read",
  "follows.read",
  "like.read",
  "offline.access"
].join(" ");

/**
 * Construct the Twitter OAuth 2.0 authorize URL with PKCE
 */
export async function buildAuthorizeUrl(): Promise<{ url: string; codeVerifier: string; state: string }> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateState();

  const params = new URLSearchParams({
    response_type: "code",
    client_id: TWITTER_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    state: state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256"
  });

  const authorizeUrl = `${TWITTER_AUTHORIZE_URL}?${params.toString()}`;

  return {
    url: authorizeUrl,
    codeVerifier,
    state
  };
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(code: string, codeVerifier: string): Promise<any> {
  const params = new URLSearchParams({
    code,
    grant_type: "authorization_code",
    client_id: TWITTER_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    code_verifier: codeVerifier
  });

  const response = await fetch(TWITTER_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString()
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json();
}

/**
 * Fetch user profile data using access token
 */
export async function fetchUserProfile(accessToken: string): Promise<any> {
  const url = "https://api.twitter.com/2/users/me?user.fields=created_at,description,public_metrics,verified,profile_image_url";

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch user profile: ${error}`);
  }

  return response.json();
}

/**
 * Fetch user's recent tweets with engagement metrics
 */
export async function fetchUserTweets(accessToken: string, userId: string): Promise<any> {
  const url = `https://api.twitter.com/2/users/${userId}/tweets?max_results=100&tweet.fields=created_at,public_metrics,referenced_tweets&expansions=referenced_tweets.id`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to fetch user tweets: ${error}`);
  }

  return response.json();
}
