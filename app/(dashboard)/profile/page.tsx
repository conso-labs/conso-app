"use client";

import BadgesBackground from "@/components/backgrounds/Badges";
import ProfileCard from "@/components/profile/ProfileCard";

const ProfilePage = () => {
  // Platform icons data
  const platforms = [
    { name: "Discord", icon: "💬", bgColor: "bg-blue-500" },
    { name: "EA", icon: "🎮", bgColor: "bg-orange-600" },
    { name: "Epic", icon: "⚡", bgColor: "bg-gray-900" },
    { name: "Twitch", icon: "📺", bgColor: "bg-purple-600" },
    { name: "Nintendo", icon: "🎯", bgColor: "bg-red-600" },
    { name: "Kick", icon: "⚽", bgColor: "bg-green-500" },
    { name: "PlayStation", icon: "🎮", bgColor: "bg-blue-800" },
    { name: "Gaming", icon: "🎲", bgColor: "bg-green-600" },
    { name: "YouTube", icon: "▶️", bgColor: "bg-red-600" },
    { name: "Steam", icon: "🎯", bgColor: "bg-blue-700" },
    { name: "X", icon: "𝕏", bgColor: "bg-gray-900" },
    { name: "GOG", icon: "🎮", bgColor: "bg-purple-700" },
  ];

  return (
    <div className="relative min-h-screen">
      <BadgesBackground />

      <div className="relative z-10 max-w-6xl mx-auto py-8">
        <ProfileCard
          user={{
            name: "Vintromyth",
            username: "@vintromyth",
            avatar: "/images/pngs/profile.png",
          }}
          zaps={24576}
          platforms={platforms}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
