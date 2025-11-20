import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ZapBadge from "./ZapBadge";

interface LeaderboardRowProps {
  rank: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  badges: number;
  consumerScore: number;
  zaps: number;
  isHighlighted?: boolean;
  className?: string;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  user,
  badges,
  consumerScore,
  zaps,
  isHighlighted = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[80px_1fr_120px_180px_140px] gap-6 items-center py-4 px-6 rounded-xl transition-colors",
        isHighlighted ? "bg-[#F5E6D3]" : "hover:bg-gray-50",
        className
      )}
    >
      {/* Rank */}
      <div className="text-2xl font-bold text-gray-900">{rank}</div>

      {/* User */}
      <div className="flex items-center gap-3">
        <Image
          src={user.avatar}
          alt={user.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full border-2 border-gray-300"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{user.name}</span>
          <span className="text-sm text-gray-500">{user.username}</span>
        </div>
      </div>

      {/* Badges */}
      <div className="text-lg font-semibold text-gray-900 text-center">
        {badges.toLocaleString()}
      </div>

      {/* Consumer Score */}
      <div className="text-lg font-semibold text-gray-900 text-center">
        {consumerScore.toLocaleString()}
      </div>

      {/* Zaps */}
      <div className="flex justify-end">
        <ZapBadge amount={zaps} />
      </div>
    </div>
  );
};

export default LeaderboardRow;
