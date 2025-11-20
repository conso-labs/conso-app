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
    <div className="fixed inset-0 z-[100] bg-[#1a2845] flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3 animate-pulse">
          <div className="w-16 h-16 rounded flex items-center justify-center">
            <Image
              src="/images/icons/conso.svg"
              alt="Logo"
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
          </div>
          <span
            className={cn("text-white text-4xl font-bold", solway.className)}
          >
            CONSO
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-80 space-y-3">
          {/* Progress Bar */}
          <div className="relative h-3 bg-[#2a3f5f] rounded-full overflow-hidden border-2 border-[#3a4f6f]">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
            </div>
          </div>

          {/* Loading Text */}
          <div
            className={cn(
              "flex items-center justify-between text-sm",
              inter.className
            )}
          >
            <span className="text-gray-400">
              Loading assets... {loadedCount}/{totalImages}
            </span>
            <span className="text-yellow-400 font-bold">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Loading Spinner */}
        {/* <div className="flex gap-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
        </div> */}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default AssetLoader;
