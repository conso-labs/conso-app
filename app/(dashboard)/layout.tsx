"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavigationMenu from "@/components/navigation/NavigationMenu";
import {
  HomeIcon,
  BadgesIcon,
  ZapboardIcon,
  MissionsIcon,
  NFTsIcon,
} from "@/components/navigation/NavigationIcons";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { inter, solway } from "../layout";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import AssetLoader from "@/components/loaders/AssetLoader";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useConsoUser } from "@/contexts/ConsoUserContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  const currentAccount = useCurrentAccount();
  const { consoUser } = useConsoUser();

  // useEffect(() => {
  //   if (!currentAccount) {
  //     router.push("/login");
  //   }
  // }, [currentAccount, router]);

  // Centralized list of ALL assets used across the entire dashboard
  const allAssets = [
    // Top bar icons
    "/images/icons/conso.svg",
    "/images/icons/zaps.svg",
    "/images/icons/badges.svg",
    "/images/icons/stats.svg",
    // Profile avatar
    "/images/others/profile.jpg",
    // Homepage assets
    "/images/svgs/homepage/bg.svg",
    "/images/svgs/homepage/scene.svg",
    "/images/svgs/homepage/conso-clan.svg",
    "/images/svgs/homepage/social-zone.svg",
    "/images/svgs/homepage/creative-zone.svg",
    "/images/svgs/homepage/gaming-zone.svg",
    "/images/svgs/homepage/campaigns.svg",
    "/images/svgs/homepage/zaps.svg",
    "/images/svgs/homepage/ship.svg",
    "/images/svgs/homepage/calculator.svg",
  ];

  const { loading, loadedCount, progress } = useImagePreloader({
    images: allAssets,
    onLoadComplete: () => {
      setTimeout(() => setIsReady(true), 300);
    },
  });

  // Show loader only once when the app first loads
  if (loading || !isReady) {
    return (
      <AssetLoader
        progress={progress}
        loadedCount={loadedCount}
        totalImages={allAssets.length}
      />
    );
  }

  const navigationItems = [
    {
      icon: <HomeIcon />,
      label: "Home",
      isActive: pathname === "/home",
      onClick: () => router.push("/home"),
    },
    {
      icon: <BadgesIcon />,
      label: "Badges",
      isActive: pathname === "/badges",
      onClick: () => router.push("/badges"),
    },
    {
      icon: <ZapboardIcon />,
      label: "Zapboard",
      isActive: pathname === "/zapboard",
      onClick: () => router.push("/zapboard"),
    },
    {
      icon: <MissionsIcon />,
      label: "Campaigns",
      badge: "Soon",
      disabled: true,
      isActive: pathname === "/missions",
      onClick: () => console.log("Navigate to Missions"),
    },
    {
      icon: <NFTsIcon />,
      label: "NFTs",
      badge: "Soon",
      disabled: true,
      isActive: pathname === "/nfts",
      onClick: () => console.log("Navigate to NFTs"),
    },
  ];

  const user = {
    avatar: "/images/others/profile.jpg",
    name: consoUser.substringSuiAddress || "Connect Wallet",
    isActive: pathname === "/profile",
    onClick: () => router.push("/profile"),
  };

  return (
    <div className="min-h-screen">
      {/* Top Bar - Fixed */}
      <div className="fixed top-0 left-0 right-0 bg-[#0A3669] border-b border-[#2a3f5f] z-50 px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <Image
                src={"/images/icons/conso.svg"}
                alt={"Lgo"}
                width={24}
                height={24}
                className="w-20 h-20 object-contain"
              />
            </div>
            <span
              className={cn("text-white text-3xl font-bold", solway.className)}
            >
              CONSO
            </span>
          </div>

          {/* Stats Section */}
          <div className="flex items-center gap-6">
            {/* Zaps */}
            <div className="flex items-center gap-2">
              <Image
                src={"/images/icons/zaps.svg"}
                alt={"Zaps"}
                width={10}
                height={10}
                className="w-6 h-6 object-contain"
              />
              <span className={cn("text-white text-md", inter.className)}>
                ZAPS:
              </span>
              <span
                className={cn("text-yellow-400 font-bold", inter.className)}
              >
                {consoUser.zapsScore.toLocaleString()}
              </span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
              <Image
                src={"/images/icons/badges.svg"}
                alt={"Badges"}
                width={10}
                height={10}
                className="w-6 h-6 object-contain"
              />
              <span className={cn("text-white text-md", inter.className)}>
                BADGES:
              </span>
              <span
                className={cn("text-yellow-400 font-bold", inter.className)}
              >
                {consoUser.badges}
              </span>
            </div>

            {/* Stats Button */}
            <button className="flex items-center gap-2">
              <Image
                src={"/images/icons/stats.svg"}
                alt={"Stats"}
                width={10}
                height={10}
                className="w-6 h-6 object-contain"
              />
              <span className={cn("text-white text-md", inter.className)}>
                STATS
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="fixed left-6 top-24 z-40">
        <NavigationMenu
          items={navigationItems}
          user={user}
          consoUser={consoUser}
        />
      </div>

      {/* Page Content */}
      <div className="pt-20 pl-[calc(16vw+4rem)] pr-6">{children}</div>
    </div>
  );
}
