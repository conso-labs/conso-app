"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ConsoButton from "../common/ConsoButton";
import { getPlatformContent } from "@/constants/platformData";

interface RobloxVerificationData {
  userId: number;
  username: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  badges: any[];
  verified: boolean;
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
  isVerified?: boolean;
  onConnect?: (username: string) => void;
  onVerify?: (data?: RobloxVerificationData) => void;
  platformUsername?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  platformData?: any;
}

const GamingPlatformModal: React.FC<PlatformModalProps> = ({
  isOpen,
  onClose,
  platform,
  zapReward,
  isConnected = false,
  isVerified = false,
  onConnect,
  onVerify,
  platformUsername = "",
  platformData,
}) => {
  const [username, setUsername] = useState("");
  const [copied, setCopied] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  const verificationCode = "CONSO-12345";

  if (!isOpen) return null;

  const platformContent = getPlatformContent(platform.name);

  const handleConnect = () => {
    if (username.trim()) {
      onConnect?.(username.trim());
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(verificationCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleVerifyRoblox = async () => {
    // Use platformUsername from consoUser context if available, otherwise use local state
    const usernameToVerify = platformUsername || username;

    if (!usernameToVerify) {
      setVerificationError("Username is required");
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);

    try {
      const response = await fetch(
        `/api/get-roblox-data?username=${encodeURIComponent(
          usernameToVerify
        )}&verificationCode=${encodeURIComponent(verificationCode)}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setVerificationError(
          data.error || "Verification failed. Please try again."
        );
        setIsVerifying(false);
        return;
      }

      // Call the onVerify callback to update parent state with the data
      onVerify?.(data.data);

      setIsVerifying(false);
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationError("An error occurred during verification");
      setIsVerifying(false);
    }
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

          {/* Section Title */}
          {/* <h3 className="text-lg font-bold text-gray-900 mb-4">
            {isConnected ? "Profile Stats" : "Activity"}
          </h3> */}

          {/* Content */}
          {isVerified ? (
            <div className="bg-green-50 rounded-2xl border-2 border-black p-4 h-130 overflow-y-auto">
              {/* Verified Content Section */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-green-300">
                <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center border-2 border-black">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Account Verified!
                  </h3>
                  <p className="text-sm text-gray-700">
                    Your {platform.name} account has been successfully verified
                  </p>
                </div>
              </div>

              {/* User Stats & Details */}
              {platform.name === "Roblox" && platformData ? (
                <>
                  <h3 className="text-md font-bold text-gray-900 mb-3">
                    Account Overview
                  </h3>
                  <div className="space-y-3 mb-4">
                    <div className="bg-white rounded-xl border-2 border-black p-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Username</p>
                          <p className="text-sm font-bold text-gray-900">
                            {platformData.username || "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">User ID</p>
                          <p className="text-sm font-bold text-gray-900">
                            {platformData.userId || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-black p-3">
                      <p className="text-xs text-gray-600 mb-1">Total Badges</p>
                      <p className="text-lg font-bold text-gray-900">
                        {platformData.badges?.length || 0}
                      </p>
                    </div>

                    {platformData.badges && platformData.badges.length > 0 && (
                      <div className="bg-white rounded-xl border-2 border-black p-3">
                        <p className="text-xs text-gray-600 mb-3">
                          Your Badges ({platformData.badges.length})
                        </p>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                          {platformData.badges
                            .slice(0, 10)
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            .map((badge: any, idx: number) => (
                              <div
                                key={badge.id || idx}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-lg border-2 border-gray-200 p-3 hover:border-blue-400 transition-colors"
                              >
                                {/* Badge Header */}
                                <div className="flex items-start gap-3 mb-2">
                                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center text-2xl shrink-0 border-2 border-yellow-300">
                                    🏆
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-gray-900 mb-0.5">
                                      {badge.displayName || badge.name}
                                    </h4>
                                    {badge.displayDescription && (
                                      <p className="text-xs text-gray-600 line-clamp-2">
                                        {badge.displayDescription}
                                      </p>
                                    )}
                                  </div>
                                  {badge.enabled && (
                                    <div className="px-2 py-0.5 bg-green-100 border border-green-300 rounded text-[9px] font-semibold text-green-700">
                                      ACTIVE
                                    </div>
                                  )}
                                </div>

                                {/* Game/Universe Info */}
                                {badge.awardingUniverse?.name && (
                                  <div className="bg-blue-50 rounded-md px-2 py-1.5 mb-2 border border-blue-200">
                                    <div className="flex items-center gap-1.5">
                                      <span className="text-xs">🎮</span>
                                      <span className="text-xs font-semibold text-gray-700">
                                        {badge.awardingUniverse.name}
                                      </span>
                                    </div>
                                  </div>
                                )}

                                {/* Statistics Grid */}
                                {badge.statistics && (
                                  <div className="grid grid-cols-3 gap-2 mb-2">
                                    <div className="bg-purple-50 rounded-md p-1.5 border border-purple-200">
                                      <p className="text-[9px] text-gray-600 mb-0.5">
                                        Total Awarded
                                      </p>
                                      <p className="text-xs font-bold text-gray-900">
                                        {badge.statistics.awardedCount?.toLocaleString() ||
                                          "N/A"}
                                      </p>
                                    </div>
                                    <div className="bg-orange-50 rounded-md p-1.5 border border-orange-200">
                                      <p className="text-[9px] text-gray-600 mb-0.5">
                                        Win Rate
                                      </p>
                                      <p className="text-xs font-bold text-gray-900">
                                        {badge.statistics.winRatePercentage !== undefined
                                          ? `${(badge.statistics.winRatePercentage * 100).toFixed(1)}%`
                                          : "N/A"}
                                      </p>
                                    </div>
                                    <div className="bg-green-50 rounded-md p-1.5 border border-green-200">
                                      <p className="text-[9px] text-gray-600 mb-0.5">
                                        24h Awards
                                      </p>
                                      <p className="text-xs font-bold text-gray-900">
                                        {badge.statistics.pastDayAwardedCount?.toLocaleString() ||
                                          "0"}
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {/* Creator & Metadata */}
                                <div className="flex items-center justify-between text-[10px] text-gray-500 pt-2 border-t border-gray-200">
                                  {badge.creator && (
                                    <div className="flex items-center gap-1">
                                      <span>By:</span>
                                      <span className="font-semibold text-gray-700">
                                        {badge.creator.name}
                                      </span>
                                      <span className="px-1 py-0.5 bg-gray-200 rounded text-[8px]">
                                        {badge.creator.type}
                                      </span>
                                    </div>
                                  )}
                                  {badge.created && (
                                    <div className="text-gray-500">
                                      {new Date(
                                        badge.created
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}

                          {platformData.badges.length > 10 && (
                            <div className="text-center py-2">
                              <p className="text-xs text-gray-600 font-semibold">
                                + {platformData.badges.length - 10} more badges
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-md font-bold text-gray-900 mb-3">
                    Profile Stats
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Your gaming profile is now connected and verified. Stats and
                    achievements will be displayed on your CONSO profile.
                  </p>
                </>
              )}

              {/* Benefits */}
              <div className="mt-4">
                <h3 className="text-md font-bold text-gray-900 mb-3">
                  Active Benefits
                </h3>
                <ul className="space-y-2">
                  {platformContent?.activity.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700 flex items-start"
                    >
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  )) || (
                    <>
                      <li className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Real-time stats synchronization</span>
                      </li>
                      <li className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Achievement tracking enabled</span>
                      </li>
                      <li className="text-sm text-gray-700 flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>ZAP rewards active</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : !isConnected ? (
            <div className="bg-gray-50 rounded-2xl border-2 border-black p-4 h-130 overflow-y-auto">
              {/* Activity Section */}
              <h3 className="text-md font-bold text-gray-900 mb-3">Activity</h3>
              <p className="text-sm text-gray-700 mb-3">
                {platformContent?.activity.description ||
                  `Connect your ${platform.name} account to unlock:`}
              </p>
              <ul className="space-y-2 mb-3">
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
                      <span>
                        Channel Overview, Engagement & Audience Insights
                      </span>
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
                <h3 className="text-md font-bold text-gray-900 mb-3">
                  Instruction
                </h3>
                <ol className="space-y-1.5 text-sm text-gray-700">
                  {platformContent?.instruction.steps.map((step, index) => (
                    <li key={index}>
                      {index + 1}. {step}
                    </li>
                  )) || (
                    <>
                      <li>
                        1. Click Connect and authenticate your {platform.name}{" "}
                        account
                      </li>
                      <li>2. Approve read-only analytics access</li>
                      <li>3. Data auto-syncs every 24 h</li>
                      <li>
                        4. Manage or disconnect anytime via ( Passport →
                        Connections )
                      </li>
                    </>
                  )}
                </ol>
              </div>

              {/* Scoring Section */}
              <div className="mt-4 pt-4 border-t-2 border-gray-300">
                <h3 className="text-md font-bold text-gray-900 mb-3">
                  Scoring
                </h3>
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
                        {platformContent.scoring.parameters.map(
                          (param, index) => (
                            <tr
                              key={index}
                              className="border-b border-gray-200"
                            >
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
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">
                    Scoring metrics are being configured for this platform.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 rounded-2xl border-2 border-black p-4 h-130 overflow-y-auto">
              {/* Connected - Pending Verification Section */}
              {platform.name === "Roblox" ? (
                <>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-blue-300">
                    <div className="w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center border-2 border-black">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M12 6v6l4 2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Verify Your Account
                      </h3>
                      <p className="text-sm text-gray-700">
                        Complete the verification to connect your Roblox account
                      </p>
                    </div>
                  </div>

                  {/* Verification Instructions */}
                  <div className="mb-4">
                    <h3 className="text-md font-bold text-gray-900 mb-3">
                      Verification Steps
                    </h3>
                    <ol className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600 shrink-0">
                          1.
                        </span>
                        <span>Copy your unique verification code below</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600 shrink-0">
                          2.
                        </span>
                        <span>
                          Open your Roblox profile and navigate to:{" "}
                          <span className="font-semibold">
                            Profile → Edit Profile → About / Description
                          </span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600 shrink-0">
                          3.
                        </span>
                        <span>
                          Paste the verification code exactly as shown into your
                          Bio
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600 shrink-0">
                          4.
                        </span>
                        <span>Return to CONSO and click the Verify button</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="font-bold text-blue-600 shrink-0">
                          5.
                        </span>
                        <span>
                          Once verified, you may delete the code from your Bio
                        </span>
                      </li>
                    </ol>
                  </div>

                  {/* Verification Code Box */}
                  <div className="bg-white rounded-xl border-3 border-black p-4 mb-4">
                    <label className="text-xs font-semibold text-gray-600 mb-2 block">
                      YOUR VERIFICATION CODE
                    </label>
                    <div className="bg-gray-50 rounded-lg border-2 border-gray-300 p-3 mb-3">
                      <code className="text-lg font-mono font-bold text-gray-900 break-all">
                        {verificationCode}
                      </code>
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className={cn(
                        "w-full px-4 py-2 rounded-lg border-2 border-black font-semibold text-sm transition-all flex items-center justify-center gap-2",
                        copied
                          ? "bg-green-100 hover:bg-green-200"
                          : "bg-blue-100 hover:bg-blue-200"
                      )}
                    >
                      {copied ? (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 4L6 11L3 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="5"
                              y="5"
                              width="9"
                              height="9"
                              rx="1"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M3 11V3a1 1 0 011-1h8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Copy Code
                        </>
                      )}
                    </button>
                  </div>

                  {/* Important Notice */}
                  <div className="bg-yellow-50 rounded-xl border-2 border-yellow-300 p-3">
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
                          stroke="#D97706"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="text-xs text-gray-700">
                        <p className="font-semibold text-gray-900 mb-1">
                          Safe & Secure Verification
                        </p>
                        <p>
                          This is a read-only verification method. No Roblox
                          login or access permissions are required. We only
                          verify account ownership through your public profile.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {verificationError && (
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
                            Verification Failed
                          </p>
                          <p>{verificationError}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-700 mb-3">
                    {platformContent?.activity.description ||
                      `Connect your ${platform.name} account to unlock:`}
                  </p>
                  <ul className="space-y-2">
                    {platformContent?.activity.benefits.map(
                      (benefit, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 flex items-start"
                        >
                          <span className="mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      )
                    ) || (
                      <>
                        <li className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>
                            Channel Overview, Engagement & Audience Insights
                          </span>
                        </li>
                        <li className="text-sm text-gray-700 flex items-start">
                          <span className="mr-2">•</span>
                          <span>CONSO Reputation Badges + ZAP Missions</span>
                        </li>
                      </>
                    )}
                  </ul>
                </>
              )}
            </div>
          )}
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

          {/* Username Display - Show when connected but not verified */}
          {isConnected && !isVerified && platformUsername && (
            <div className="bg-blue-50 rounded-2xl border-2 border-blue-300 p-4 mb-4">
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
                      d="M10 10a3 3 0 100-6 3 3 0 000 6zM10 12c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    VERIFYING FOR
                  </p>
                  <p className="text-base font-bold text-gray-900 break-all">
                    {platformUsername}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {platform.name} Username
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Username Input - Only show when not connected */}
          {!isConnected && (
            <div className="mb-4">
              <label
                htmlFor="username-input"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Enter {platform.name} Username
              </label>
              <input
                id="username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={`Your ${platform.name} username`}
                className="w-full px-4 py-3 rounded-xl border-3 border-black bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
              />
            </div>
          )}

          {/* Login Button */}
          <ConsoButton
            text={
              isVerified
                ? "Verified"
                : isConnected
                ? isVerifying
                  ? "Verifying..."
                  : "Verify"
                : `Connect ${platform.name}`
            }
            onClick={
              isConnected
                ? platform.name === "Roblox"
                  ? handleVerifyRoblox
                  : onVerify
                : handleConnect
            }
            disabled={isVerified || isVerifying}
            className={cn(
              " items-center justify-center",
              isVerified
                ? "bg-green-300 cursor-not-allowed opacity-80"
                : isConnected
                ? "bg-gray-100"
                : "bg-yellow-400",
              isVerifying && "opacity-70 cursor-wait"
            )}
            logo={
              isVerified
                ? "/images/icons/check.svg"
                : isConnected && "/images/icons/refresh.svg"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default GamingPlatformModal;
