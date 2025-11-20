"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import PlatformModal from "./PlatformModal";

interface BadgeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  zapReward: number;
  onConnect?: () => void;
  onUpdate?: () => void;
  isConnected?: boolean;
  isDisabled?: boolean;
  backgroundColor?: string;
  className?: string;
  platformDetails?: {
    time: string;
    price: string;
    type: string;
  };
}

const BadgeCard: React.FC<BadgeCardProps> = ({
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
  platformDetails = {
    time: "15 Sec",
    price: "Free",
    type: "Secure Oauth",
  },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConnectClick = () => {
    if (isDisabled) return;
    setIsModalOpen(true);
  };

  const handleModalConnect = () => {
    onConnect?.();
    setIsModalOpen(false);
  };

  const handleModalUpdate = () => {
    onUpdate?.();
    setIsModalOpen(false);
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
          {isDisabled ? "Coming soon" : isConnected ? "Connected" : "Connect"}
        </button>
      </div>

      <PlatformModal
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
        isConnected={isConnected}
        onConnect={handleModalConnect}
        onUpdate={handleModalUpdate}
      />
    </>
  );
};

export default BadgeCard;
