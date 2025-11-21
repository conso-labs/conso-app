import React from "react";
import { cn } from "@/lib/utils";
import LeaderboardRow from "./LeaderboardRow";

export interface LeaderboardEntry {
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
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  className?: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  entries,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden",
        className
      )}
    >
      {/* Table Header */}
      <div className="grid grid-cols-[80px_1fr_120px_180px_140px] gap-6 items-center py-4 px-6 border-b-2 border-gray-200 bg-gray-50">
        <div className="text-sm font-bold text-gray-700">Rank</div>
        <div className="text-sm font-bold text-gray-700">User name</div>
        <div className="text-sm font-bold text-gray-700 text-center">
          Badges
        </div>
        {/* <div className="text-sm font-bold text-gray-700 text-center">
          Consumer score
        </div> */}
        <div className="text-sm font-bold text-gray-700 text-right">Zaps</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {entries.map((entry, index) => (
          <LeaderboardRow
            key={index}
            rank={entry.rank}
            user={entry.user}
            badges={entry.badges}
            consumerScore={entry.consumerScore}
            zaps={entry.zaps}
            isHighlighted={entry.isHighlighted}
          />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardTable;
