"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import PlatformModal from "./PlatformModal";
import GamingPlatformModal from "./GamingPlatformModal";
import { useConsoUser } from "@/contexts/ConsoUserContext";

interface BadgeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  zapReward: number;
  onConnect?: (username: string) => void;
  onUpdate?: () => void;
  isConnected?: boolean;
  isDisabled?: boolean;
  backgroundColor?: string;
  className?: string;
  skipModal?: boolean;
  customButtonText?: string;
  platformDetails?: {
    time: string;
    price: string;
    type: string;
  };
}

const GamingBadgeCard: React.FC<BadgeCardProps> = ({
  icon,
  title,
  description,
  zapReward,
  onConnect,
  onUpdate,
  isConnected = false,
  isDisabled = false,
  backgroundColor = "bg-[#E6D5F5]",
  className,
  skipModal = false,
  customButtonText,
  platformDetails = {
    time: "15 Sec",
    price: "Free",
    type: "Secure Oauth",
  },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { consoUser, updateConsoUser } = useConsoUser();

  const handleConnectClick = () => {
    if (isDisabled) return;

    // If skipModal is true, directly call onConnect without opening modal
    if (skipModal) {
      onConnect?.("");
      return;
    }

    setIsModalOpen(true);
  };

  const handleModalConnect = (username: string) => {
    console.log(`Connecting ${title} with username: ${username}`);

    // Check if already connected
    if (!consoUser.connectedAccounts.includes(title)) {
      // New connection - add to connected accounts, update badge count and zaps
      updateConsoUser({
        badges: consoUser.badges + 1,
        zapsScore: consoUser.zapsScore + zapReward,
        connectedAccounts: [...consoUser.connectedAccounts, title],
        platformData: {
          ...consoUser.platformData,
          [title]: {
            username,
            verified: false,
            connectedAt: new Date().toISOString(),
          },
        },
      });
    } else {
      // Already connected - just update username
      updateConsoUser({
        platformData: {
          ...consoUser.platformData,
          [title]: {
            ...(consoUser.platformData?.[title] || {}),
            username,
          },
        },
      });
    }

    // Call the optional onConnect callback if provided
    onConnect?.(username);
  };

  const handleGamingPlatfromVerify = () => {
    console.log(`Verifying ${title}`);

    // api call here with checks

    // Set verified status to true in platformData
    updateConsoUser({
      platformData: {
        ...consoUser.platformData,
        [title]: {
          ...(consoUser.platformData?.[title] || {}),
          verified: true,
          verifiedAt: new Date().toISOString(),
        },
      },
    });

    // Call the optional onUpdate callback if provided
    onUpdate?.();
  };

  return (
    <>
      <div
        className={cn(
          "relative rounded-2xl border-3 border-black p-6 transition-all duration-200",
          "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ",
          backgroundColor,
          className
        )}
      >
        {/* Zap Reward Badge */}
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full flex items-center gap-1">
          <span className="text-yellow-400">⚡</span>
          <span className="font-semibold text-sm">
            {zapReward.toLocaleString()}
          </span>
        </div>

        {/* Icon */}
        <div className="mb-4">{icon}</div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-6 min-h-10">{description}</p>

        {/* Connect Button */}
        {/* Spacer so content never overlaps the absolutely-positioned button */}
        <div className="h-16" />

        {/* Connect Button anchored to bottom of the card */}
        <button
          onClick={handleConnectClick}
          disabled={isDisabled}
          className={cn(
            "absolute left-6 right-6 bottom-6 z-10 py-3 rounded-xl font-semibold text-base transition-all duration-200",
            "border-3 border-black",
            isDisabled
              ? "bg-gray-200 text-gray-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-not-allowed"
              : isConnected
              ? "bg-green-300 text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5"
              : "bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          )}
        >
          {isDisabled
            ? "Coming soon"
            : isConnected
            ? "Connected"
            : customButtonText
            ? customButtonText
            : "Connect"}
        </button>
      </div>

      <GamingPlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        platform={{
          name: title,
          icon: icon,
          description: description,
          time: platformDetails.time,
          price: platformDetails.price,
          type: platformDetails.type,
        }}
        zapReward={zapReward}
        isConnected={isConnected}
        isVerified={
          consoUser.platformData?.[title]
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              consoUser.platformData[title].verified
            : false
        }
        onConnect={handleModalConnect}
        onVerify={handleGamingPlatfromVerify}
      />
    </>
  );
};

export default GamingBadgeCard;
