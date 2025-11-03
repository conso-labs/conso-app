import { NextRequest, NextResponse } from "next/server";
import { buildAuthorizeUrl } from "@/lib/utils/twitter-oauth";

export async function GET(request: NextRequest) {
  try {
    // Step 1: Build authorize URL with PKCE parameters
    const { url, codeVerifier, state } = await buildAuthorizeUrl();

    // Step 2: Store PKCE parameters in HTTP-only cookies for security
    // These will be used in the callback to exchange the code for tokens
    const response = NextResponse.redirect(url);

    response.cookies.set("twitter_code_verifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
      path: "/",
    });

    response.cookies.set("twitter_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error building authorize URL:", error);
    return NextResponse.redirect(
      new URL(`/test?error=${encodeURIComponent(String(error))}`, request.url)
    );
  }
}
