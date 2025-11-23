"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ConsoButton from "../common/ConsoButton";
import { getPlatformContent } from "@/constants/platformData";
import { useConsoUser } from "@/contexts/ConsoUserContext";

// YouTube API Response Types
interface YouTubeChannelStats {
  channel_id: string;
  channel_name: string;
  description: string;
  created_at: string;
  subscriber_count: number;
  total_views: number;
  video_count: number;
  country: string;
  custom_url: string;
  average_views_per_video: number;
  total_watch_time_hours: number;
  engagement_rate: number;
  recent_upload_frequency: number;
}

interface YouTubeChannelScore {
  total_score: number;
  max_score: number;
  breakdown: {
    subscribers: number;
    video_count: number;
    engagement: number;
    upload_frequency: number;
    avg_views: number;
  };
  rating: string;
}

// Twitch API Response Types
interface TwitchChannelStats {
  channel_id: string;
  channel_name: string;
  display_name: string;
  description: string;
  created_at: string;
  follower_count: number;
  total_views: number;
  broadcaster_type: string;
  profile_image_url: string;
  average_viewers: number;
  stream_count_30_days: number;
  total_stream_hours_30_days: number;
  peak_viewers_30_days: number;
  average_stream_duration_minutes: number;
  engagement_rate: number;
  category: string;
}

interface TwitchChannelScore {
  total_score: number;
  max_score: number;
  breakdown: {
    followers: number;
    average_viewers: number;
    stream_frequency: number;
    stream_duration: number;
    engagement: number;
  };
  rating: string;
}

// Discord API Response Types
interface DiscordUserStats {
  user_id: string;
  username: string;
  discriminator: string;
  global_name: string | null;
  avatar: string;
  banner: string | null;
  accent_color: number | null;
  created_at: string;
  public_flags: number;
  is_bot: boolean;
  server_member_since?: string;
  server_roles?: string[];
  server_nickname?: string;
  server_permissions?: string[];
}

interface DiscordScore {
  total_score: number;
  max_score: number;
  breakdown: {
    size: number;
    activity: number;
    features: number;
    boost_level: number;
    engagement: number;
  };
  rating: string;
}

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  zapReward: number;
  platform: {
    name: string;
    icon: React.ReactNode;
    description: string;
    time: string;
    price: string;
    type: string;
  };
  isConnected?: boolean;
  onConnect?: () => void;
}

const PlatformModal: React.FC<PlatformModalProps> = ({
  isOpen,
  onClose,
  platform,
  zapReward,
  isConnected = false,
  onConnect,
}) => {
  const { consoUser, updateConsoUser } = useConsoUser();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [channelHandle, setChannelHandle] = useState("");

  if (!isOpen) return null;

  const platformContent = getPlatformContent(platform.name);

  // Get stored platform data from OAuth (for Twitch, Discord, Github)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storedPlatformData = consoUser.platformData?.[platform.name] as any;

  // Get stored user data (for YouTube and other platforms that don't need OAuth)
  // This persists across page refreshes and doesn't get overwritten by OAuth sync
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storedUserData = consoUser.userData?.[platform.name] as any;

  // For YouTube, use userData; for OAuth platforms (Twitch), use platformData

  const platformInsights =
    platform.name === "YouTube" ||
    platform.name === "Twitch" ||
    platform.name === "Discord"
      ? storedUserData?.insights
      : storedPlatformData?.insights;

  const hasInsights = !!platformInsights;

  const getApiEndpoint = (platformName: string): string | null => {
    const endpoints: Record<string, string> = {
      YouTube: "/api/get-youtube-data",
      Twitch: "/api/get-twitch-data",
      Discord: "/api/get-discord-data",
      // Add more platforms as needed
    };
    return endpoints[platformName] || null;
  };

  const handleUpdate = async () => {
    const apiEndpoint = getApiEndpoint(platform.name);

    if (!apiEndpoint) {
      setUpdateError(`API endpoint not configured for ${platform.name}`);
      return;
    }

    // For YouTube, check if channel handle is provided
    if (platform.name === "YouTube" && !channelHandle.trim()) {
      setUpdateError("Please enter a YouTube channel name");
      return;
    }

    // For Twitch and Discord, check if platform is connected
    if (
      (platform.name === "Twitch" || platform.name === "Discord") &&
      !storedPlatformData
    ) {
      setUpdateError("Platform not connected. Please connect first.");
      return;
    }

    setIsUpdating(true);
    setUpdateError(null);

    try {
      // Build query parameters based on platform
      let queryParam = "";

      if (platform.name === "YouTube") {
        // For YouTube, use the channel handle directly from input
        queryParam = `?handle=${encodeURIComponent(channelHandle.trim())}`;
      } else if (platform.name === "Twitch" || platform.name === "Discord") {
        const id = storedPlatformData.sub || storedPlatformData.provider_id;
        if (!id) {
          setUpdateError(
            `Unable to find ${platform.name} ID. Please reconnect.`
          );
          setIsUpdating(false);
          return;
        }
        queryParam = `?id=${encodeURIComponent(id)}`;
      }

      const response = await fetch(`${apiEndpoint}${queryParam}`);
      const data = await response.json();

      if (!response.ok || !data.success) {
        setUpdateError(data.error || "Failed to fetch data. Please try again.");
        setIsUpdating(false);
        return;
      }

      // Update consoUser context with the new data
      // For YouTube: Store in userData to avoid being overwritten by OAuth sync
      // For Twitch/others: Store in platformData as usual
      if (platform.name === "YouTube") {
        const updatedUserData = {
          ...consoUser.userData,
          [platform.name]: {
            ...storedUserData,
            insights: data.data,
            lastUpdated: new Date().toISOString(),
            channelHandle: channelHandle.trim(),
          },
        };

        updateConsoUser({
          userData: updatedUserData,
        });
      } else if (platform.name === "Twitch" || platform.name === "Discord") {
        const updatedUserData = {
          ...consoUser.userData,
          [platform.name]: {
            ...storedUserData,
            insights: data.data,
            lastUpdated: new Date().toISOString(),
          },
        };

        updateConsoUser({
          userData: updatedUserData,
        });
      } else {
        const updatedPlatformData = {
          ...consoUser.platformData,
          [platform.name]: {
            ...storedPlatformData,
            insights: data.data,
            lastUpdated: new Date().toISOString(),
          },
        };

        updateConsoUser({
          platformData: updatedPlatformData,
        });
      }

      setIsUpdating(false);
    } catch (error) {
      console.error("Error fetching platform data:", error);
      setUpdateError("An error occurred while fetching data");
      setIsUpdating(false);
    }
  };

  const renderYouTubeData = () => {
    if (!platformInsights?.channel_stats) return null;

    const stats = platformInsights.channel_stats as YouTubeChannelStats;
    const score = platformInsights.channel_score as YouTubeChannelScore;

    return (
      <>
        <h3 className="text-md font-bold text-gray-900 mb-3">
          Channel Overview
        </h3>
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Channel Name</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.channel_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Subscribers</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.subscriber_count.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Views</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.total_views.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Videos</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.video_count.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Views/Video</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.average_views_per_video.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Engagement Rate</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.engagement_rate.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {score && (
          <>
            <h3 className="text-md font-bold text-gray-900 mb-3">
              Channel Score
            </h3>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl border-2 border-black p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Overall Rating</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {score.rating}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {score.total_score.toFixed(1)}/{score.max_score}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(score.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-gray-700 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {(value as number).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  const renderTwitchData = () => {
    if (!platformInsights?.channel_stats) return null;

    const stats = platformInsights.channel_stats as TwitchChannelStats;
    const score = platformInsights.channel_score as TwitchChannelScore;

    return (
      <>
        <h3 className="text-md font-bold text-gray-900 mb-3">
          Channel Overview
        </h3>
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Channel Name</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.display_name}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Followers</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.follower_count.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Total Views</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.total_views.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Avg Viewers</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.average_viewers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Streams (30d)</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.stream_count_30_days}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Stream Hours (30d)</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.total_stream_hours_30_days.toFixed(1)}h
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Category</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.category}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Status</p>
                <p className="text-sm font-bold text-gray-900 capitalize">
                  {stats.broadcaster_type || "None"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {score && (
          <>
            <h3 className="text-md font-bold text-gray-900 mb-3">
              Channel Score
            </h3>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl border-2 border-black p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Overall Rating</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {score.rating}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {score.total_score.toFixed(1)}/{score.max_score}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(score.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-gray-700 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {(value as number).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  const renderDiscordData = () => {
    if (!platformInsights?.stats) return null;

    const stats = platformInsights.stats as DiscordUserStats;
    const score = platformInsights.score as DiscordScore;

    return (
      <>
        <h3 className="text-md font-bold text-gray-900 mb-3">User Overview</h3>
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Username</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.global_name || stats.username}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Discriminator</p>
                <p className="text-sm font-bold text-gray-900">
                  #{stats.discriminator}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">User ID</p>
                <p className="text-sm font-bold text-gray-900 break-all">
                  {stats.user_id}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Account Type</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.is_bot ? "Bot" : "User"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Account Created</p>
                <p className="text-sm font-bold text-gray-900">
                  {new Date(stats.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {stats.server_member_since && (
            <div className="bg-white rounded-xl border-2 border-black p-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">
                    Server Member Since
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(stats.server_member_since).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {stats.server_roles && stats.server_roles.length > 0 && (
            <div className="bg-white rounded-xl border-2 border-black p-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Server Roles</p>
                <p className="text-sm font-bold text-gray-900">
                  {stats.server_roles.length} role(s)
                </p>
              </div>
            </div>
          )}
        </div>

        {score && score.rating !== "User Profile" && (
          <>
            <h3 className="text-md font-bold text-gray-900 mb-3">
              Profile Score
            </h3>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl border-2 border-black p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Overall Rating</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {score.rating}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600 mb-1">Score</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {score.total_score.toFixed(1)}/{score.max_score}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(score.breakdown).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-gray-700 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="font-semibold text-gray-900">
                      {(value as number).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  const renderGitHubData = () => {
    // For GitHub, show generic connected message without fetching data
    if (!storedPlatformData) return null;

    return (
      <>
        <h3 className="text-md font-bold text-gray-900 mb-3">
          Account Overview
        </h3>
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-xl border-2 border-black p-3">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Account Connected</p>
                <p className="text-sm font-bold text-gray-900">
                  {storedPlatformData.user_name || storedPlatformData.name || "GitHub Account"}
                </p>
              </div>
            </div>
          </div>

          {storedPlatformData.email && (
            <div className="bg-white rounded-xl border-2 border-black p-3">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Email</p>
                  <p className="text-sm font-bold text-gray-900">
                    {storedPlatformData.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl border-2 border-blue-300 p-3">
            <div className="flex items-start gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 mt-0.5"
              >
                <path
                  d="M10 6v4m0 4h.01M10 18a8 8 0 100-16 8 8 0 000 16z"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-xs text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">
                  Account Successfully Connected
                </p>
                <p>
                  Your GitHub account is connected and verified. Detailed analytics
                  and insights will be available soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderGenericPlatformData = () => {
    if (!platformInsights) return null;

    return (
      <>
        <h3 className="text-md font-bold text-gray-900 mb-3">Platform Data</h3>
        <div className="bg-white rounded-xl border-2 border-black p-3">
          <pre className="text-xs overflow-auto max-h-96">
            {JSON.stringify(platformInsights, null, 2)}
          </pre>
        </div>
      </>
    );
  };

  const renderPlatformSpecificData = () => {
    if (platform.name === "YouTube") {
      return renderYouTubeData();
    } else if (platform.name === "Twitch") {
      return renderTwitchData();
    } else if (platform.name === "Discord") {
      return renderDiscordData();
    } else if (platform.name === "GitHub") {
      return renderGitHubData();
    } else {
      return renderGenericPlatformData();
    }
  };

  const renderContentBasedOnPlatform = () => {
    // For GitHub: If connected, show generic data directly
    if (platform.name === "GitHub" && isConnected) {
      return (
        <>
          <div className="bg-green-50 rounded-xl border-2 border-green-300 p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center border-2 border-black">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 6L7.5 14.5L4 11"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Account Connected Successfully
                </p>
                <p className="text-xs text-gray-600">
                  Your GitHub account is verified and connected
                </p>
              </div>
            </div>
          </div>

          {renderGitHubData()}
        </>
      );
    }

    // For YouTube, Twitch, Discord: Show info message if no insights yet
    if (
      (platform.name === "YouTube" ||
        platform.name == "Twitch" ||
        platform.name == "Discord") &&
      !hasInsights
    ) {
      return (
        <>
          <div className="bg-blue-50 rounded-xl border-2 border-blue-300 p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center border-2 border-black shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 6v4m0 4h.01M10 18a8 8 0 100-16 8 8 0 000 16z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Generate Your Persona & Insights
                </p>
                <p className="text-sm text-gray-700">
                  Enter your YouTube channel name in the field on the right and
                  click the <span className="font-bold">Update</span> button to
                  generate your persona and insights. They will be displayed
                  here once fetched.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-md font-bold text-gray-900 mb-3">
            What You&apos;ll Get
          </h3>
          <ul className="space-y-2">
            {platformContent?.activity.benefits.map((benefit, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 flex items-start"
              >
                <span className="mr-2">•</span>
                <span>{benefit}</span>
              </li>
            )) || (
              <>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>Channel Overview, Engagement & Audience Insights</span>
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>CONSO Reputation Badges + ZAP Missions</span>
                </li>
              </>
            )}
          </ul>
        </>
      );
    }

    // For other platforms: Show connect message if not connected
    if (!isConnected) {
      return (
        <>
          <div className="bg-blue-50 rounded-xl border-2 border-blue-300 p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center border-2 border-black shrink-0">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 6v4m0 4h.01M10 18a8 8 0 100-16 8 8 0 000 16z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Generate Your Persona & Insights
                </p>
                <p className="text-sm text-gray-700">
                  Click the <span className="font-bold">Update</span> button
                  below to generate your persona and insights. They will be
                  displayed here once fetched.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-md font-bold text-gray-900 mb-3">
            What You&apos;ll Get
          </h3>
          <ul className="space-y-2">
            {platformContent?.activity.benefits.map((benefit, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 flex items-start"
              >
                <span className="mr-2">•</span>
                <span>{benefit}</span>
              </li>
            )) || (
              <>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>Channel Overview, Engagement & Audience Insights</span>
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>CONSO Reputation Badges + ZAP Missions</span>
                </li>
              </>
            )}
          </ul>
        </>
      );
    }

    // Show insights if available
    if (hasInsights) {
      return (
        <>
          <div className="bg-green-50 rounded-xl border-2 border-green-300 p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-300 rounded-full flex items-center justify-center border-2 border-black">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 6L7.5 14.5L4 11"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Data Updated Successfully
                </p>
                <p className="text-xs text-gray-600">
                  Last updated:{" "}
                  {(
                    platform.name === "YouTube" ||
                    platform.name === "Twitch" ||
                    platform.name === "Discord"
                      ? storedUserData?.lastUpdated
                      : storedPlatformData?.lastUpdated
                  )
                    ? new Date(
                        platform.name === "YouTube" ||
                        platform.name === "Twitch" ||
                        platform.name === "Discord"
                          ? storedUserData.lastUpdated
                          : storedPlatformData.lastUpdated
                      ).toLocaleString()
                    : "Just now"}
                </p>
              </div>
            </div>
          </div>

          {renderPlatformSpecificData()}
        </>
      );
    }

    // Default return (shouldn't reach here)
    return null;
  };

  const renderNotConnectedContent = () => {
    return (
      <>
        {/* Activity Section */}
        <h3 className="text-md font-bold text-gray-900 mb-3">Activity</h3>
        <p className="text-sm text-gray-700 mb-3">
          {platformContent?.activity.description ||
            `Connect your ${platform.name} account to unlock:`}
        </p>
        <ul className="space-y-2 mb-3">
          {platformContent?.activity.benefits.map((benefit, index) => (
            <li key={index} className="text-sm text-gray-700 flex items-start">
              <span className="mr-2">•</span>
              <span>{benefit}</span>
            </li>
          )) || (
            <>
              <li className="text-sm text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>Channel Overview, Engagement & Audience Insights</span>
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>CONSO Reputation Badges + ZAP Missions</span>
              </li>
            </>
          )}
        </ul>

        {/* Instruction Section */}
        <div className="mt-4">
          <h3 className="text-md font-bold text-gray-900 mb-3">Instruction</h3>
          <ol className="space-y-1.5 text-sm text-gray-700">
            {platformContent?.instruction.steps.map((step, index) => (
              <li key={index}>
                {index + 1}. {step}
              </li>
            )) || (
              <>
                <li>
                  1. Click Connect and authenticate your {platform.name} account
                </li>
                <li>2. Approve read-only analytics access</li>
                <li>3. Data auto-syncs every 24 h</li>
                <li>
                  4. Manage or disconnect anytime via ( Passport → Connections )
                </li>
              </>
            )}
          </ol>
        </div>

        {/* Scoring Section */}
        <div className="mt-4 pt-4 border-t-2 border-gray-300">
          <h3 className="text-md font-bold text-gray-900 mb-3">Scoring</h3>
          {platformContent?.scoring.parameters ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-2 pr-4 font-bold text-gray-900">
                      Parameter
                    </th>
                    <th className="text-left py-2 pr-4 font-bold text-gray-900">
                      Weight
                    </th>
                    <th className="text-left py-2 font-bold text-gray-900">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {platformContent.scoring.parameters.map((param, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 pr-4 text-gray-700">
                        {param.parameter}
                      </td>
                      <td className="py-2 pr-4 text-gray-700">
                        {param.weight}
                      </td>
                      <td className="py-2 text-gray-700">
                        {param.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-700">
              Scoring metrics are being configured for this platform.
            </p>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl flex gap-6 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white rounded-3xl p-8">
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Main Modal */}
        <div className="flex-1 flex flex-col">
          {/* Platform Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 shrink-0">{platform.icon}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {platform.name}
              </h2>
              <p className="text-sm text-gray-600">{platform.description}</p>
            </div>
          </div>

          {/* Info Pills */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border-2 border-black">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 4V8L11 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm font-semibold">
                Time: {platform.time}
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border-2 border-black">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6L7 11L4 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold">
                Price: {platform.price}
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full border-2 border-black">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="7"
                  width="10"
                  height="6"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M6 7V6a2 2 0 114 0v1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold">
                Type: {platform.type}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-50 rounded-2xl border-2 border-black p-4 h-130 overflow-y-auto">
            {platform.name === "YouTube"
              ? renderContentBasedOnPlatform()
              : isConnected
              ? renderContentBasedOnPlatform()
              : renderNotConnectedContent()}

            {/* Error Message */}
            {updateError && (
              <div className="bg-red-50 rounded-xl border-2 border-red-300 p-3 mt-4">
                <div className="flex items-start gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0 mt-0.5"
                  >
                    <path
                      d="M10 6v4m0 4h.01M10 18a8 8 0 100-16 8 8 0 000 16z"
                      stroke="#DC2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="text-xs text-red-700">
                    <p className="font-semibold text-red-900 mb-1">
                      Update Failed
                    </p>
                    <p>{updateError}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Platform Badges Side Panel */}
        <div className=" bg-blue-50 rounded-2xl border-3 border-black p-6 flex flex-col">
          {/* Header */}
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Platform Badges
          </h3>

          {/* Badge Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl border-3 border-black bg-white p-2 flex flex-col items-center justify-between gap-1"
                )}
              >
                <div className="w-full aspect-square flex items-center justify-center">
                  <Image
                    src="/images/svgs/badges/badge.svg"
                    alt="Badge"
                    className="w-full h-full object-contain"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="w-full border-2 border-black bg-black text-white text-[9px] font-bold px-1.5 py-1 rounded-md text-center">
                  Early Bird Access
                </div>
                <span className="text-[10px] font-semibold text-gray-600">
                  Lv1
                </span>
              </div>
            ))}
          </div>

          {/* ZAPs Summary */}
          <div className="bg-gray-900 rounded-2xl border-3 border-black p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-400 text-lg">⚡</span>
              <h4 className="text-white font-bold text-sm">ZAPs Summary</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800 rounded-xl border-2 border-black p-3">
                <p className="text-gray-400 text-xs mb-1">Total ZAPs</p>
                <p className="text-white font-bold text-lg">
                  {zapReward.toLocaleString()}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl border-2 border-black p-3">
                <p className="text-gray-400 text-xs mb-1">ZAPs Earned</p>
                <p className="text-white font-bold text-lg">
                  {isConnected ? "1,000" : "NA"}
                </p>
              </div>
            </div>
          </div>

          {/* Channel Handle Input - Only for YouTube */}
          {platform.name === "YouTube" && (
            <div className="mb-4">
              <label
                htmlFor="channel-handle-input"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                YouTube Channel Name
              </label>
              <input
                id="channel-handle-input"
                type="text"
                value={channelHandle}
                onChange={(e) => setChannelHandle(e.target.value)}
                placeholder="@channelname or channel handle"
                className="w-full px-4 py-3 rounded-xl border-3 border-black bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
              <p className="text-xs text-gray-600 mt-1">
                Enter your YouTube channel handle (e.g., @mkbhd)
              </p>
            </div>
          )}

          {/* Connect/Update Button */}
          <ConsoButton
            text={
              platform.name === "GitHub" && isConnected
                ? "Connected"
                : platform.name === "YouTube"
                ? isUpdating
                  ? "Updating..."
                  : "Update"
                : isConnected
                ? isUpdating
                  ? "Updating..."
                  : "Update"
                : `Connect ${platform.name}`
            }
            onClick={
              platform.name === "GitHub" && isConnected
                ? undefined
                : platform.name === "YouTube"
                ? handleUpdate
                : isConnected
                ? handleUpdate
                : onConnect
            }
            disabled={isUpdating || (platform.name === "GitHub" && isConnected)}
            className={cn(
              " items-center justify-center",
              platform.name === "GitHub" && isConnected
                ? "bg-green-300 cursor-not-allowed opacity-80"
                : platform.name === "YouTube"
                ? "bg-gray-100"
                : isConnected
                ? "bg-gray-100"
                : "bg-yellow-400",
              isUpdating && "opacity-70 cursor-wait"
            )}
            logo={
              platform.name === "GitHub" && isConnected
                ? "/images/icons/check.svg"
                : (platform.name === "YouTube" || isConnected) && !isUpdating
                ? "/images/icons/refresh.svg"
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformModal;
