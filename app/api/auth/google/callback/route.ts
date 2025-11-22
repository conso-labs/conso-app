import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  console.log("Google OAuth callback received");

  if (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(
      new URL("/badges?error=" + error, request.url)
    );
  }

  if (!code) {
    console.error("Missing code");
    return NextResponse.redirect(
      new URL("/badges?error=missing_code", request.url)
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${request.nextUrl.origin}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    console.error("Missing credentials");
    return NextResponse.redirect(
      new URL("/badges?error=config_error", request.url)
    );
  }

  try {
    console.log("Exchanging code for tokens");

    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Token exchange failed");
      return NextResponse.redirect(
        new URL("/badges?error=token_failed", request.url)
      );
    }

    const tokenData = await tokenResponse.json();
    console.log("Tokens received:", {
      access_token: !!tokenData.access_token,
      refresh_token: !!tokenData.refresh_token,
    });

    // Get user info
    console.log("Fetching user info");
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    if (!userInfoResponse.ok) {
      console.error("User info fetch failed");
      return NextResponse.redirect(
        new URL("/badges?error=user_info_failed", request.url)
      );
    }

    const userInfo = await userInfoResponse.json();
    console.log("User info received:", {
      email: userInfo.email,
      name: userInfo.name,
    });

    // Redirect to badges with success
    const response = NextResponse.redirect(
      new URL("/badges?auth=success", request.url)
    );

    // Store tokens and user info in cookies
    response.cookies.set("google_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
    });

    if (tokenData.refresh_token) {
      response.cookies.set("google_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    response.cookies.set("google_user_info", JSON.stringify(userInfo), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 3600,
    });

    console.log("Auth complete, redirecting to /badges");

    return response;
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(
      new URL("/badges?error=unexpected", request.url)
    );
  }
}
