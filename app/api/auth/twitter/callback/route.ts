import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken } from "@/lib/utils/twitter-oauth";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  console.log("Twitter OAuth callback received with params:", {
    code,
    state,
    error,
  });

  // Handle OAuth error
  if (error) {
    return NextResponse.redirect(
      new URL(`/test?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  // Validate code and state
  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/test?error=missing_parameters", request.url)
    );
  }

  try {
    // Retrieve code_verifier from session/cookie (stored during authorization)
    const codeVerifier = request.cookies.get("twitter_code_verifier")?.value;
    const storedState = request.cookies.get("twitter_state")?.value;

    console.log("Retrieved from cookies:", {
      hasCodeVerifier: !!codeVerifier,
      hasStoredState: !!storedState,
    });

    if (!codeVerifier || !storedState) {
      console.error("Missing PKCE parameters from cookies");
      return NextResponse.redirect(
        new URL("/test?error=missing_verifier_or_state", request.url)
      );
    }

    // Verify state matches (CSRF protection)
    if (state !== storedState) {
      console.error("State mismatch:", { received: state, stored: storedState });
      return NextResponse.redirect(
        new URL("/test?error=state_mismatch", request.url)
      );
    }

    console.log("Exchanging code for tokens...");
    // Exchange code for access token
    const tokenData = await exchangeCodeForToken(code, codeVerifier);
    console.log("Token exchange successful:", {
      hasAccessToken: !!tokenData.access_token,
      hasRefreshToken: !!tokenData.refresh_token,
    });

    // Redirect back to test page with success indicator
    const redirectUrl = new URL("/test", request.url);
    redirectUrl.searchParams.set("auth", "success");

    // Store tokens in cookies (in production, use secure HTTP-only cookies)
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set("twitter_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in,
    });

    if (tokenData.refresh_token) {
      response.cookies.set("twitter_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    // Clear PKCE parameters
    response.cookies.delete("twitter_code_verifier");
    response.cookies.delete("twitter_state");

    return response;
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.redirect(
      new URL(`/test?error=${encodeURIComponent(String(error))}`, request.url)
    );
  }
}
