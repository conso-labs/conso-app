"use client";

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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

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
      label: "Missions",
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
    avatar: "/images/pngs/profile.png",
    name: "Vintromyth",
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
                alt={"Lgo"}
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
                27,567
              </span>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2">
              <Image
                src={"/images/icons/badges.svg"}
                alt={"Lgo"}
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
                40
              </span>
            </div>

            {/* Stats Button */}
            <button className="flex items-center gap-2">
              <Image
                src={"/images/icons/stats.svg"}
                alt={"Lgo"}
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
        <NavigationMenu items={navigationItems} user={user} />
      </div>

      {/* Page Content */}
      <div className="pt-20 px-6">{children}</div>
    </div>
  );
}
