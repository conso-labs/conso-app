# Twitter OAuth 2.0 with PKCE Implementation

This implementation provides a complete Twitter OAuth 2.0 flow with PKCE (Proof Key for Code Exchange) and includes a scoring algorithm to evaluate Twitter user influence.

## Overview

### OAuth 2.0 Flow Steps

1. **Authorization Request (GET /oauth2/authorize)**
   - User clicks "Connect Twitter Account"
   - App generates PKCE code verifier and challenge
   - App constructs authorization URL with PKCE parameters
   - User is redirected to Twitter to authorize the app

2. **Authorization Callback**
   - Twitter redirects back to `/api/auth/twitter/callback` with authorization code
   - Callback handler validates state (CSRF protection)
   - Retrieves code verifier from cookies

3. **Token Exchange (POST /oauth2/token)**
   - App exchanges authorization code + code verifier for access token
   - Access token is stored in secure HTTP-only cookies
   - User is redirected back to the test page

4. **API Requests with Access Token**
   - User clicks "Fetch Profile & Calculate Score"
   - App uses access token to fetch user profile and tweets
   - Score is calculated based on profile and engagement metrics

## File Structure

```
lib/utils/
  ├── pkce.ts                    # PKCE utility functions
  ├── twitter-oauth.ts           # OAuth flow and API calls
  └── twitter-scoring.ts         # Scoring algorithm

app/
  ├── test/page.tsx              # Main UI component
  └── api/
      ├── auth/twitter/callback/
      │   └── route.ts           # OAuth callback handler
      └── twitter/user-score/
          └── route.ts           # User data and score API
```

## Setup Instructions

### 1. Twitter Developer Portal Setup

1. Go to [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new project and app (or use existing)
3. Navigate to your app settings
4. Under "User authentication settings":
   - Enable OAuth 2.0
   - Set Type of App: Web App
   - Add Callback URL: `http://localhost:3000/api/auth/twitter/callback`
   - Add Website URL: `http://localhost:3000`
   - Set Permissions: Read
5. Copy your **Client ID**

### 2. Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_TWITTER_CLIENT_ID=your_client_id_here
NEXT_PUBLIC_TWITTER_REDIRECT_URI=http://localhost:3000/api/auth/twitter/callback
```

For production, update the redirect URI to your production domain.

### 3. Required Twitter API Scopes

The app requests the following scopes:
- `tweet.read` - Read tweets
- `users.read` - Read user profile data
- `follows.read` - Read follow relationships
- `like.read` - Read likes
- `offline.access` - Get refresh token for long-term access

## PKCE Implementation Details

### What is PKCE?

PKCE (Proof Key for Code Exchange) is a security extension to OAuth 2.0 that prevents authorization code interception attacks. It's especially important for public clients (like SPAs and mobile apps).

### How PKCE Works

1. **Code Verifier**: A random 43-128 character string
   ```typescript
   const codeVerifier = generateCodeVerifier();
   // Example: "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"
   ```

2. **Code Challenge**: SHA-256 hash of the code verifier, base64url encoded
   ```typescript
   const codeChallenge = await generateCodeChallenge(codeVerifier);
   // Example: "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM"
   ```

3. **Authorization**: Send code challenge to Twitter
   ```
   GET https://twitter.com/i/oauth2/authorize?
     response_type=code
     &client_id=CLIENT_ID
     &redirect_uri=REDIRECT_URI
     &scope=tweet.read users.read
     &state=RANDOM_STATE
     &code_challenge=CODE_CHALLENGE
     &code_challenge_method=S256
   ```

4. **Token Exchange**: Send code verifier to prove we initiated the request
   ```
   POST https://api.twitter.com/2/oauth2/token
     code=AUTHORIZATION_CODE
     &grant_type=authorization_code
     &client_id=CLIENT_ID
     &redirect_uri=REDIRECT_URI
     &code_verifier=CODE_VERIFIER
   ```

## Scoring Algorithm

The scoring algorithm calculates a comprehensive score (1-100) based on four factors:

### 1. Profile Score (25 points)
- **Verified account**: +10 points
- **Account age**: Up to 5 points (max at 2+ years)
- **Listed count**: Up to 5 points (max at 100+ lists)
- **Tweet count**: Up to 5 points (max at 1000+ tweets)

### 2. Engagement Score (30 points)
Based on average engagement per tweet:
- Likes: 1x weight
- Retweets: 2x weight
- Replies: 1.5x weight
- Quote tweets: 2x weight

Scoring tiers:
- 0-10 avg engagement: 0-5 points
- 10-50: 5-10 points
- 50-200: 10-18 points
- 200-500: 18-24 points
- 500+: 24-30 points

### 3. Activity Score (20 points)
- **Recent tweets**: +10 points (for having tweets)
- **Volume**: Up to 10 points (max at 50+ recent tweets)

### 4. Influence Score (25 points)
- **Follower count**:
  - 0-100: 0-3 points
  - 100-1K: 3-8 points
  - 1K-10K: 8-15 points
  - 10K-100K: 15-20 points
  - 100K+: 20-22 points
- **Follower ratio**: Up to 3 points (followers > 2x following)

## API Endpoints

### GET /api/twitter/user-score

Fetches authenticated user's Twitter data and calculates their score.

**Authentication**: Requires `twitter_access_token` cookie

**Response**:
```json
{
  "user": {
    "id": "123456789",
    "username": "example",
    "name": "Example User",
    "profileImageUrl": "https://...",
    "description": "User bio",
    "verified": false,
    "metrics": {
      "followersCount": 1000,
      "followingCount": 500,
      "tweetCount": 5000,
      "listedCount": 25,
      "accountAge": 1825
    }
  },
  "tweets": {
    "count": 100,
    "metrics": [
      {
        "likeCount": 50,
        "retweetCount": 10,
        "replyCount": 5,
        "quoteCount": 2
      }
    ]
  },
  "score": {
    "totalScore": 67,
    "breakdown": {
      "profileScore": 18,
      "engagementScore": 22,
      "activityScore": 15,
      "influenceScore": 12
    }
  }
}
```

### GET /api/auth/twitter/callback

OAuth callback endpoint that handles the authorization code exchange.

**Query Parameters**:
- `code`: Authorization code from Twitter
- `state`: State parameter for CSRF protection

**Redirects**: Back to `/test` page with tokens stored in cookies

## Security Considerations

1. **PKCE**: Prevents authorization code interception
2. **State Parameter**: Protects against CSRF attacks
3. **HTTP-only Cookies**: Access tokens stored in HTTP-only cookies (not accessible via JavaScript)
4. **Secure Cookies**: Enabled in production
5. **SameSite**: Set to 'Lax' to prevent CSRF

## Usage Example

```typescript
// 1. Initiate OAuth flow
const { url, codeVerifier, state } = await buildAuthorizeUrl();
// Store verifier and state in cookies
document.cookie = `twitter_code_verifier=${codeVerifier}; path=/; max-age=600`;
document.cookie = `twitter_state=${state}; path=/; max-age=600`;
// Redirect to Twitter
window.location.href = url;

// 2. After callback, fetch user data
const response = await fetch("/api/twitter/user-score");
const data = await response.json();
console.log("Score:", data.score.totalScore);
```

## Troubleshooting

### Common Issues

1. **"Not authenticated" error**
   - Ensure you've completed the OAuth flow
   - Check that cookies are enabled
   - Verify access token cookie exists

2. **"State mismatch" error**
   - CSRF protection triggered
   - Clear cookies and try again

3. **"Failed to fetch user profile" error**
   - Check Twitter API credentials
   - Verify scopes are correct
   - Ensure access token is valid

4. **Low scores**
   - Score is based on actual engagement metrics
   - New accounts or low-engagement accounts will score lower
   - Build your Twitter presence to improve score!

## Twitter API Rate Limits

- User lookup: 300 requests per 15 minutes
- Tweets lookup: 300 requests per 15 minutes

The app makes 2 API calls per score calculation.

## References

- [Twitter OAuth 2.0 Documentation](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
- [PKCE RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)
- [Twitter API v2 Reference](https://developer.twitter.com/en/docs/api-reference-index)
