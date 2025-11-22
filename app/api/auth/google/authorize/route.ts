import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = `${request.nextUrl.origin}/api/auth/google/callback`;

  if (!clientId) {
    console.error("Missing GOOGLE_CLIENT_ID");
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  console.log("Starting Google OAuth");
  console.log("Redirect URI:", redirectUri);
  console.log("Origin:", request.nextUrl.origin);

  // Build Google OAuth URL
  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "email profile");
  googleAuthUrl.searchParams.set("access_type", "offline");
  googleAuthUrl.searchParams.set("prompt", "consent");

  console.log("Full OAuth URL:", googleAuthUrl.toString());

  return NextResponse.redirect(googleAuthUrl.toString());
}
