import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const next = requestUrl.searchParams.get("next") || "/badges";

  console.log("Supabase OAuth callback received");
  console.log("Request URL:", requestUrl.toString());
  console.log("Search params:", Object.fromEntries(requestUrl.searchParams));

  if (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(
      new URL(`${next}?error=${error}`, requestUrl.origin)
    );
  }

  if (!code) {
    console.error("Missing authorization code");
    console.log("All query params:", requestUrl.search);
    return NextResponse.redirect(
      new URL(`${next}?error=missing_code`, requestUrl.origin)
    );
  }

  try {
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Exchange code for session
    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      return NextResponse.redirect(
        new URL(
          `${next}?error=${exchangeError.message}`,
          requestUrl.origin
        )
      );
    }

    if (!data.session) {
      console.error("No session returned");
      return NextResponse.redirect(
        new URL(`${next}?error=no_session`, requestUrl.origin)
      );
    }

    console.log("Session established:", {
      provider: data.session.user.app_metadata?.provider,
      email: data.session.user.email,
    });

    // Get the provider from the session
    const provider = data.session.user.app_metadata?.provider;

    // Redirect back to badges page with success
    const redirectUrl = new URL(
      `${next}?auth=success&provider=${provider}`,
      requestUrl.origin
    );

    const response = NextResponse.redirect(redirectUrl);

    // Set the session cookies
    response.cookies.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: data.session.expires_in,
      path: "/",
    });

    response.cookies.set("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    console.log("Redirecting to:", redirectUrl.toString());

    return response;
  } catch (error) {
    console.error("Unexpected OAuth error:", error);
    return NextResponse.redirect(
      new URL(`${next}?error=unexpected`, requestUrl.origin)
    );
  }
}
