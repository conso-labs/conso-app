import React from "react";
import { cn } from "@/lib/utils";

interface BadgeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  zapReward: number;
  onConnect?: () => void;
  isConnected?: boolean;
  backgroundColor?: string;
  className?: string;
}

const BadgeCard: React.FC<BadgeCardProps> = ({
  icon,
  title,
  description,
  zapReward,
  onConnect,
  isConnected = false,
  backgroundColor = "bg-[#E6D5F5]",
  className,
}) => {
  return (
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
        onClick={onConnect}
        disabled={isConnected}
        className={cn(
          "absolute left-6 right-6 bottom-6 z-10 py-3 rounded-xl font-semibold text-base transition-all duration-200",
          "border-3 border-black",
          isConnected
            ? "bg-green-300 text-gray-600 cursor-not-allowed"
            : "bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
        )}
      >
        {isConnected ? "Connected" : "Connect"}
      </button>
    </div>
  );
};

export default BadgeCard;
