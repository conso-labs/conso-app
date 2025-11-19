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
    avatar: "/images/avatars/user-avatar.png",
    name: "Vintromyth",
    shareLink: "Share to X",
  };

  return (
    <div className="my-6 ">
      {/* Navigation Menu */}
      <div className="fixed left-6 top-6 z-50 ">
        <NavigationMenu items={navigationItems} user={user} />
      </div>

      {/* Page Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
