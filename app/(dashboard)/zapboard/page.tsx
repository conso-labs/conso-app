"use client";

import BadgesBackground from "@/components/backgrounds/Badges";
import LeaderboardTable from "@/components/zapboard/LeaderboardTable";
import type { LeaderboardEntry } from "@/components/zapboard/LeaderboardTable";
import { solway } from "@/app/layout";
import { cn } from "@/lib/utils";
import HeadingText from "@/components/common/HeadingText";

const ZapboardPage = () => {
  // Sample leaderboard data matching the design
  const leaderboardData: LeaderboardEntry[] = [
    {
      rank: 1,
      user: {
        name: "Henrietta O'Connell",
        username: "@henrietta",
        avatar: "/images/pngs/profile.png",
      },
      badges: 35,
      consumerScore: 2114424,
      zaps: 1000,
    },
    {
      rank: 2,
      user: {
        name: "Darrel Bins",
        username: "@darrel",
        avatar: "/images/pngs/profile.png",
      },
      badges: 34,
      consumerScore: 2114424,
      zaps: 1000,
    },
    {
      rank: 3,
      user: {
        name: "Sally Kovacek",
        username: "@5TxoahjZNtsoVdC",
        avatar: "/images/pngs/profile.png",
      },
      badges: 12241,
      consumerScore: 2114424,
      zaps: 1000,
    },
    {
      rank: 4,
      user: {
        name: "Jose Gulgowski",
        username: "@c6axRR8zNeqsb6G",
        avatar: "/images/pngs/profile.png",
      },
      badges: 12241,
      consumerScore: 2114424,
      zaps: 1000,
    },
    {
      rank: 5,
      user: {
        name: "Ada Leannon",
        username: "@T9rKwtVJ3rawKn_",
        avatar: "/images/pngs/profile.png",
      },
      badges: 12241,
      consumerScore: 2114424,
      zaps: 1000,
    },
    {
      rank: 6,
      user: {
        name: "Mona Bechtelar III",
        username: "@YlBVJw090LfCRDq",
        avatar: "/images/pngs/profile.png",
      },
      badges: 12241,
      consumerScore: 2114424,
      zaps: 1000,
    },
    {
      rank: 10,
      user: {
        name: "Elmer Rau",
        username: "@0jlRhxwSES2o0KI",
        avatar: "/images/pngs/profile.png",
      },
      badges: 12241,
      consumerScore: 2114424,
      zaps: 1000,
      isHighlighted: true,
    },
    {
      rank: 11,
      user: {
        name: "Terrence Sipes",
        username: "@bezpVnNuiRFR3zO",
        avatar: "/images/pngs/profile.png",
      },
      badges: 12241,
      consumerScore: 2114424,
      zaps: 1000,
    },
  ];

  return (
    <div className="relative min-h-screen">
      <BadgesBackground />

      <div className="relative z-10 max-w-6xl mx-auto py-8">
        {/* Header Section */}
        <div className="mb-8">
          <HeadingText
            text="Zaps"
            className={cn("text-5xl mb-2")}
          ></HeadingText>
          <p className="text-gray-700 text-lg">
            Each zones becomes a dimension in your Consumer Graph, together
            forming your 5D profile
          </p>
        </div>

        {/* Leaderboard Table */}
        <LeaderboardTable entries={leaderboardData} />
      </div>
    </div>
  );
};

export default ZapboardPage;
