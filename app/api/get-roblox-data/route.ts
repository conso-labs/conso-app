// app/api/get-roblox-data/route.ts
// Next.js App Router API Route for Roblox Verification and Data Fetching

import { NextRequest, NextResponse } from "next/server";

// Types
interface RobloxBadge {
  id: number;
  name: string;
  description: string;
  displayName: string;
  displayDescription: string;
  enabled: boolean;
  iconImageId: number;
  displayIconImageId: number;
  created: string;
  updated: string;
  statistics: {
    pastDayAwardedCount: number;
    awardedCount: number;
    winRatePercentage: number;
  };
  awardingUniverse: {
    id: number;
    name: string;
    rootPlaceId: number;
  };
}

interface RobloxUserData {
  description: string;
  created: string;
  isBanned: boolean;
  externalAppDisplayName: string | null;
  hasVerifiedBadge: boolean;
  id: number;
  name: string;
  displayName: string;
}

interface ApiResponse {
  success: boolean;
  data?: {
    userId: number;
    username: string;
    description: string;
    badges: RobloxBadge[];
    verified: boolean;
  };
  error?: string;
}

// Roblox API Helper Class
class RobloxDataFetcher {
  private baseUrl = "https://users.roblox.com/v1";
  private badgesUrl = "https://badges.roblox.com/v1";

  async getUserIdFromUsername(username: string): Promise<number | null> {
    try {
      const response = await fetch(`${this.baseUrl}/usernames/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernames: [username],
          excludeBannedUsers: true,
        }),
      });

      const data = await response.json();

      console.log("Roblox username lookup data:", data);

      if (data.data && data.data.length > 0) {
        return data.data[0].id;
      }
      return null;
    } catch (error) {
      console.error("Error getting user ID:", error);
      return null;
    }
  }

  async getUserDescription(userId: number): Promise<RobloxUserData | null> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}`);
      const data = await response.json();

      if (data && data.id) {
        console.log("Roblox user data:", data);
        return data;
      }
      return null;
    } catch (error) {
      console.error("Error getting user description:", error);
      return null;
    }
  }

  async getUserBadges(userId: number): Promise<RobloxBadge[]> {
    try {
      const response = await fetch(`${this.badgesUrl}/users/${userId}/badges`);
      const data = await response.json();

      if (data && data.data) {
        console.log("Roblox user badges data:", data);
        return data.data;
      }
      return [];
    } catch (error) {
      console.error("Error getting user badges:", error);
      return [];
    }
  }

  verifyCode(description: string, verificationCode: string): boolean {
    // Check if the description contains the verification code (case-insensitive)
    return description.toLowerCase().includes(verificationCode.toLowerCase());
  }
}

// API Route Handler
export async function GET(req: NextRequest) {
  const requestURL = new URL(req.url as string);
  const username = requestURL.searchParams.get("username");
  const verificationCode = requestURL.searchParams.get("verificationCode");

  console.log("Received Roblox request for username:", username);

  try {
    if (!username) {
      return NextResponse.json(
        {
          success: false,
          error: "Username is required",
        } as ApiResponse,
        { status: 400 }
      );
    }

    if (!verificationCode) {
      return NextResponse.json(
        {
          success: false,
          error: "Verification code is required",
        } as ApiResponse,
        { status: 400 }
      );
    }

    const fetcher = new RobloxDataFetcher();

    // Step 1: Get user ID from username
    const userId = await fetcher.getUserIdFromUsername(username);
    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found or is banned",
        } as ApiResponse,
        { status: 404 }
      );
    }

    // Step 2: Get user description
    const userData = await fetcher.getUserDescription(userId);
    if (!userData) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch user data",
        } as ApiResponse,
        { status: 500 }
      );
    }

    // Step 3: Verify the code in description
    const isVerified = fetcher.verifyCode(
      userData.description,
      verificationCode
    );

    if (!isVerified) {
      return NextResponse.json(
        {
          success: false,
          error: "Verification code not found in user bio",
        } as ApiResponse,
        { status: 403 }
      );
    }

    // Step 4: Get user badges
    const badges = await fetcher.getUserBadges(userId);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        data: {
          userId,
          username: userData.name,
          description: userData.description,
          badges,
          verified: true,
        },
      } as ApiResponse,
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      } as ApiResponse,
      { status: 500 }
    );
  }
}
