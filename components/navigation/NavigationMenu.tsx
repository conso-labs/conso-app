"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { inter } from "@/app/layout";

interface NavigationItem {
  icon: React.ReactNode | string;
  label: string;
  onClick?: () => void;
  badge?: string;
  disabled?: boolean;
  isActive?: boolean;
}

interface NavigationMenuProps {
  items: NavigationItem[];
  className?: string;
  user?: {
    avatar: string;
    name: string;
    isActive?: boolean;
    onClick?: () => void;
    // shareLink?: string;
  };
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  items,
  className,
  user,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between bg-white rounded-3xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 w-[230px] h-[calc(100vh-8rem)]",
        className
      )}
    >
      {/* Navigation Items */}
      <nav className="flex flex-col gap-2 ">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            disabled={item.disabled}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 text-left",
              "relative",
              item.isActive
                ? "bg-[#F5E6D3] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white border-2 border-gray-300 hover:bg-[#F5E6D3] hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:bg-[#F5E6D3] active:border-black active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            )}
          >
            {/* Icon */}
            <div className="flex items-center justify-center w-6 h-6">
              {typeof item.icon === "string" ? (
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              ) : (
                item.icon
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                " text-base text-gray-900 flex-1 font-inter",
                inter.className
              )}
            >
              {item.label}
            </span>

            {/* Badge */}
            {item.badge && (
              <span
                className={cn(
                  "px-2 py-0.5 bg-orange-100 border border-orange-300 rounded-full text-xs font-semibold text-orange-700",
                  inter.className
                )}
              >
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Divider */}
      {/* {user && <div className="border-t border-gray-200 mb-4" />} */}

      {/* User Section */}
      {user && (
        <>
          <div className="flex flex-col gap-2">
            {/* Passport Button */}
            {/* <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-all duration-150 text-left">
            <div className="flex items-center justify-center w-6 h-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="font-semibold text-base text-gray-900">
              Passport
            </span>
          </button> */}

            {/* User Profile Card */}

            <button
              // className="flex items-center gap-3 mb-2"
              onClick={user.onClick}
              className={cn(
                "bg-white border-2 border-black rounded-2xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-center items-center gap-2 w-full",
                "relative",
                user.isActive
                  ? "bg-[#F5E6D3] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "hover:bg-[#F5E6D3] hover:border-2 hover:border-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:bg-[#F5E6D3] active:border-2 active:border-black active:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              )}
            >
              <Image
                src={user.avatar}
                alt={user.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-black"
              />
              <span className="font-bold text-base text-gray-900">
                {user.name}
              </span>
            </button>
            {/* {user.shareLink && (
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline">
                {user.shareLink}
              </button>
            )} */}
          </div>
        </>
      )}
    </div>
  );
};

export default NavigationMenu;
