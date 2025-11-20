"use client";

import React from "react";
import Image from "next/image";
import { inter, solway } from "@/app/layout";
import { cn } from "@/lib/utils";

interface AssetLoaderProps {
  progress: number;
  loadedCount: number;
  totalImages: number;
}

const AssetLoader: React.FC<AssetLoaderProps> = ({
  progress,
  loadedCount,
  totalImages,
}) => {
  return (
    <div className="fixed inset-0 z-100 bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Bear Loader with Circular Progress */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Circular Progress Background */}
          <svg
            className="absolute w-full h-full -rotate-90"
            viewBox="0 0 200 200"
          >
            {/* Background circle (light gray) */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Progress circle (blue) */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Bear Image */}
          <div className="relative ">
            <Image
              src="/images/svgs/loader/bearloader.svg"
              alt="Loading"
              width={200}
              height={200}
              className="w-[200px] object-contain"
              priority
            />
          </div>
        </div>

        {/* Loading Text */}
        <div
          className={cn(
            "flex items-center justify-between text-sm gap-4",
            inter.className
          )}
        >
          <span className="text-gray-700 text-2xl">Loading assets...</span>
          {/* <span className="text-yellow-400 font-bold text-lg">
            {Math.round(progress)}%
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default AssetLoader;
