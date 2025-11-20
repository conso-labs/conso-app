"use client";

import BadgesBackground from "@/components/backgrounds/Badges";
import ProfileCard from "@/components/profile/ProfileCard";
import ConsoButton from "@/components/common/ConsoButton";

const ProfilePage = () => {
  // Platform icons data
  const platforms = [
    { name: "X", icon: "𝕏", bgColor: "bg-gray-900" },
    { name: "MetaMask", icon: "🦊", bgColor: "bg-orange-500" },
    { name: "Slush", icon: "🧊", bgColor: "bg-blue-400" },
    { name: "MetaMask", icon: "🦊", bgColor: "bg-orange-500" },
    { name: "MetaMask", icon: "🦊", bgColor: "bg-orange-500" },
    { name: "MetaMask", icon: "🦊", bgColor: "bg-orange-500" },
  ];

  return (
    <div className="relative min-h-screen">
      <BadgesBackground />

      <div className="relative z-10 max-w-4xl mx-auto py-8">
        <div className="h-140">
          <ProfileCard
            user={{
              name: "Vintromyth",
              username: "@vintromyth",
              avatar: "/images/pngs/profile.png",
            }}
            zaps={27567}
            platforms={platforms}
            className="h-full"
          />
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <ConsoButton
            text="Mint Onchain"
            className="bg-orange-300 text-black"
          />
          <ConsoButton text="Share on 𝕏" className="bg-white text-black" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
