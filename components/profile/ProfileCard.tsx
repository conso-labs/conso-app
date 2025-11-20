import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ConsoButton from "../common/ConsoButton";

interface PlatformIcon {
  name: string;
  icon: string;
  bgColor: string;
  iconColor?: string;
}

interface ProfileCardProps {
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  zaps: number;
  platforms?: PlatformIcon[];
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  zaps,
  platforms = [],
  className,
}) => {
  // Calculate positions for icons in an ellipse
  const radiusX = 280; // Horizontal radius
  const radiusY = 180; // Vertical radius (smaller for ellipse)
  const centerX = 50; // Percentage
  const centerY = 50; // Percentage

  const iconPositions = platforms.map((_, index) => {
    const angle = (index * 360) / platforms.length - 90; // Start from top
    const rad = (angle * Math.PI) / 180;
    return {
      x: centerX + (radiusX / 10) * Math.cos(rad), // Convert to percentage
      y: centerY + (radiusY / 10) * Math.sin(rad),
    };
  });

  return (
    <div
      className={cn(
        "bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col",
        className
      )}
      style={{ height: "calc(100vh - 12rem)" }}
    >
      {/* Main Content Area with Purple Gradient Background */}
      <div
        className="relative flex-1 px-8 py-6 flex flex-col"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, white 2px, transparent 2px)
              `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* CONSO Title */}
        <div className="text-center mb-4 relative z-10">
          <h1 className="text-4xl font-bold text-white tracking-wider drop-shadow-lg">
            CONSO
          </h1>
        </div>

        {/* Diamond Icon */}
        <div className="absolute top-6 right-6 z-10">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rotate-45 border-2 border-white/40 shadow-lg" />
        </div>

        {/* Central Platform Icons Ellipse - Takes remaining space */}
        <div className="relative flex-1 flex items-center justify-center">
          <div className="relative w-full h-full max-w-4xl">
            {/* Platform Icons */}
            {platforms.map((platform, index) => {
              const position = iconPositions[index];
              return (
                <div
                  key={platform.name}
                  className="absolute transition-all duration-300 hover:scale-110 hover:z-20"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center border-3 border-yellow-400 shadow-lg backdrop-blur-sm",
                      platform.bgColor
                    )}
                  >
                    <span
                      className={cn(
                        "text-xl",
                        platform.iconColor || "text-white"
                      )}
                    >
                      {platform.icon}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* SVG for connecting lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ left: 0, top: 0 }}
            >
              {iconPositions.map((pos, index) => (
                <line
                  key={index}
                  x1="50%"
                  y1="50%"
                  x2={`${pos.x}%`}
                  y2={`${pos.y}%`}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>

            {/* Center User Avatar */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-purple-300 rounded-3xl blur-2xl opacity-60 scale-110" />

                {/* Avatar */}
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={160}
                  height={160}
                  className="relative w-40 h-40 rounded-3xl border-4 border-yellow-400 shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Zaps Counter */}
        <div className="text-center mt-4 relative z-10">
          <div className="inline-flex items-center gap-2 bg-black/80 backdrop-blur-sm border-3 border-yellow-400 rounded-xl px-6 py-2 shadow-lg">
            <span className="text-yellow-400 text-2xl">⚡</span>
            <span className="text-white text-lg font-semibold">ZAPs:</span>
            <span className="text-yellow-400 text-xl font-bold">
              {zaps.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Buttons Section */}
      <div className="bg-white px-8 py-4 flex justify-end gap-3 border-t-4 border-black">
        <ConsoButton text="Mint Onchain" className="bg-[#FFE2B8]" />
        {/* <button className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-semibold text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-2">
          Share on
          <span className="font-bold">𝕏</span>
        </button> */}
      </div>
    </div>
  );
};

export default ProfileCard;
