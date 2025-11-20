"use client";

import { useState } from "react";
import BadgesBackground from "@/components/backgrounds/Badges";
import ZoneTab from "@/components/badges/ZoneTab";
import BadgeSection from "@/components/badges/BadgeSection";
import BadgeCard from "@/components/badges/BadgeCard";
import {
  YouTubeIcon,
  TwitchIcon,
  XIcon,
  RedditIcon,
  FarcasterIcon,
  InstagramIcon,
  DiscordIcon,
  TelegramIcon,
} from "@/components/badges/icons";

type Zone = "social" | "gaming" | "creative" | "onchain";

const BadgesPage = () => {
  const [activeZone, setActiveZone] = useState<Zone>("social");

  const socialBadges = [
    {
      id: "youtube",
      icon: <YouTubeIcon />,
      title: "YouTube",
      description:
        "Connect your channel to highlight videos, playlists, and subs.",
      zapReward: 10000,
      backgroundColor: "bg-[#E6D5F5]",
    },
    {
      id: "twitch",
      icon: <TwitchIcon />,
      title: "Twitch",
      description:
        "Verify your Twitch account to display streams and viewer stats.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5C6D5]",
    },
    {
      id: "x",
      icon: <XIcon />,
      title: "X(formally twitter)",
      description:
        "Link your X profile to showcase posts, follower and engagement.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5E6C6]",
    },
    {
      id: "reddit",
      icon: <RedditIcon />,
      title: "Reddit",
      description:
        "Verify your Reddit account to display karma and community activity.",
      zapReward: 10000,
      backgroundColor: "bg-[#E6F5D5]",
    },
    {
      id: "farcaster",
      icon: <FarcasterIcon />,
      title: "Farcaster",
      description: "Verify your Farcaster account to showcase pages and posts.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5E6C6]",
    },
    {
      id: "instagram",
      icon: <InstagramIcon />,
      title: "Instagram",
      description:
        "Link your Instagram to highlight reels, posts, and followers.",
      zapReward: 10000,
      backgroundColor: "bg-[#C6E5F5]",
    },
    {
      id: "discord",
      icon: <DiscordIcon />,
      title: "Discord",
      description:
        "Connect Discord to display community roles and participation.",
      zapReward: 10000,
      backgroundColor: "bg-[#E6C6F5]",
    },
    {
      id: "telegram",
      icon: <TelegramIcon />,
      title: "Telegram",
      description:
        "Verify your Telegram account ownership for professional identity.",
      zapReward: 10000,
      backgroundColor: "bg-[#D5E6F5]",
    },
  ];

  const gamingBadges = [
    {
      id: "youtube",
      icon: <YouTubeIcon />,
      title: "YouTube",
      description:
        "Connect your channel to highlight videos, playlists, and subs.",
      zapReward: 10000,
      backgroundColor: "bg-[#E6D5F5]",
    },
    {
      id: "twitch",
      icon: <TwitchIcon />,
      title: "Twitch",
      description:
        "Verify your Twitch account to display streams and viewer stats.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5C6D5]",
    },
    {
      id: "x",
      icon: <XIcon />,
      title: "X(formally twitter)",
      description:
        "Link your X profile to showcase posts, follower and engagement.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5E6C6]",
    },
    {
      id: "reddit",
      icon: <RedditIcon />,
      title: "Reddit",
      description:
        "Verify your Reddit account to display karma and community activity.",
      zapReward: 10000,
      backgroundColor: "bg-[#E6F5D5]",
    },
    {
      id: "farcaster",
      icon: <FarcasterIcon />,
      title: "Farcaster",
      description: "Verify your Farcaster account to showcase pages and posts.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5E6C6]",
    },
  ];

  const creativeBadges = [
    {
      id: "reddit",
      icon: <RedditIcon />,
      title: "Reddit",
      description:
        "Verify your Reddit account to display karma and community activity.",
      zapReward: 10000,
      backgroundColor: "bg-[#E6F5D5]",
    },
    {
      id: "farcaster",
      icon: <FarcasterIcon />,
      title: "Farcaster",
      description: "Verify your Farcaster account to showcase pages and posts.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5E6C6]",
    },
  ];

  const onchainBadges = [
    {
      id: "x",
      icon: <XIcon />,
      title: "X(formally twitter)",
      description:
        "Link your X profile to showcase posts, follower and engagement.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5E6C6]",
    },
    {
      id: "reddit",
      icon: <RedditIcon />,
      title: "Reddit",
      description:
        "Verify your Reddit account to display karma and community activity.",
      zapReward: 10000,
      backgroundColor: "bg-[#E6F5D5]",
    },
    {
      id: "farcaster",
      icon: <FarcasterIcon />,
      title: "Farcaster",
      description: "Verify your Farcaster account to showcase pages and posts.",
      zapReward: 10000,
      backgroundColor: "bg-[#F5E6C6]",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <BadgesBackground />

      <div className=" py-8">
        {/* Zone Tabs */}
        <div className="flex gap-4 mb-8 justify-left">
          <ZoneTab
            label="Social Zone"
            isActive={activeZone === "social"}
            onClick={() => setActiveZone("social")}
          />
          <ZoneTab
            label="Gaming Zone"
            isActive={activeZone === "gaming"}
            onClick={() => setActiveZone("gaming")}
          />
          <ZoneTab
            label="Creative Zone"
            isActive={activeZone === "creative"}
            onClick={() => setActiveZone("creative")}
          />
          <ZoneTab
            label="Onchain Zone"
            isActive={activeZone === "onchain"}
            onClick={() => setActiveZone("onchain")}
          />
        </div>

        {/* Badge Section */}
        {activeZone === "social" && (
          <BadgeSection title="Capture your cultural footprint across top social platforms">
            {socialBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
                zapReward={badge.zapReward}
                backgroundColor={badge.backgroundColor}
                onConnect={() => console.log(`Connecting to ${badge.title}`)}
              />
            ))}
          </BadgeSection>
        )}

        {activeZone === "gaming" && (
          <BadgeSection title="Showcase your gaming achievements and stats">
            {gamingBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
                zapReward={badge.zapReward}
                backgroundColor={badge.backgroundColor}
                onConnect={() => console.log(`Connecting to ${badge.title}`)}
              />
            ))}
          </BadgeSection>
        )}

        {activeZone === "creative" && (
          <BadgeSection title="Highlight your creative portfolio and work">
            {creativeBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
                zapReward={badge.zapReward}
                backgroundColor={badge.backgroundColor}
                onConnect={() => console.log(`Connecting to ${badge.title}`)}
              />
            ))}
          </BadgeSection>
        )}

        {activeZone === "onchain" && (
          <BadgeSection title="Connect your blockchain identity and activity">
            {onchainBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
                zapReward={badge.zapReward}
                backgroundColor={badge.backgroundColor}
                onConnect={() => console.log(`Connecting to ${badge.title}`)}
              />
            ))}
          </BadgeSection>
        )}
      </div>
    </div>
  );
};

export default BadgesPage;
