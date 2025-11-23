"use client";

import BadgesBackground from "@/components/backgrounds/Badges";
import ProfileCard from "@/components/profile/ProfileCard";
import ConsoButton from "@/components/common/ConsoButton";
import { useConsoUser } from "@/contexts/ConsoUserContext";

const ProfilePage = () => {
  const { consoUser } = useConsoUser();

  const platforms = consoUser.connectedAccounts;

  return (
    <div className="relative overflow-hidden">
      <BadgesBackground />

      <div className="fixed left-1/2 -translate-x-1/3 z-10 max-w-4xl w-full py-8">
        <div className="h-140">
          <ProfileCard
            user={{
              name: "Vintromyth",
              username: consoUser.substringSuiAddress || "@vintromyth",
              avatar: "/images/others/profile.jpg",
            }}
            zaps={consoUser.zapsScore}
            badges={consoUser.badges}
            consumerScore={consoUser.consumerPercentile}
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
          <ConsoButton
            disabled
            text="Share on 𝕏"
            className="bg-white text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
