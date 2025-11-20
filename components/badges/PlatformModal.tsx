"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ConsoButton from "../common/ConsoButton";

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: {
    name: string;
    icon: React.ReactNode;
    description: string;
    time: string;
    price: string;
    type: string;
  };
  isConnected?: boolean;
  onConnect?: () => void;
  onUpdate?: () => void;
}

const PlatformModal: React.FC<PlatformModalProps> = ({
  isOpen,
  onClose,
  platform,
  isConnected = false,
  onConnect,
  onUpdate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl flex gap-6 border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white rounded-3xl p-8">
        {/* Close Button - Top Right */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Main Modal */}
        <div className="flex-1 flex flex-col">
          {/* Platform Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 shrink-0">{platform.icon}</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {platform.name}
              </h2>
              <p className="text-sm text-gray-600">{platform.description}</p>
            </div>
          </div>

          {/* Info Pills */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border-2 border-black">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 4V8L11 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm font-semibold">
                Time: {platform.time}
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border-2 border-black">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6L7 11L4 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold">
                Price: {platform.price}
              </span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full border-2 border-black">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="7"
                  width="10"
                  height="6"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M6 7V6a2 2 0 114 0v1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-sm font-semibold">
                Type: {platform.type}
              </span>
            </div>
          </div>

          {/* Section Title */}
          {/* <h3 className="text-lg font-bold text-gray-900 mb-4">
            {isConnected ? "Profile Stats" : "Activity"}
          </h3> */}

          {/* Content */}
          {!isConnected ? (
            <div className="bg-gray-50 rounded-2xl border-2 border-black p-4 mb-6">
              <h3 className="text-md font-bold text-gray-900 mb-3">Activity</h3>
              <p className="text-sm text-gray-700 mb-3">
                Connect your {platform.name} account to unlock:
              </p>
              <ul className="space-y-2 mb-3">
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>Channel Overview, Engagement & Audience Insights</span>
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>CONSO Reputation Badges + ZAP Missions</span>
                </li>
              </ul>

              <div className="mt-4">
                <h3 className="text-md font-bold text-gray-900 mb-3">
                  Instruction
                </h3>

                <ol className="space-y-1.5 text-sm text-gray-700">
                  <li>
                    1. Click Connect and authenticate your {platform.name}{" "}
                    account
                  </li>
                  <li>2. Approve read-only analytics access</li>
                  <li>3. Data auto-syncs every 24 h</li>
                  <li>
                    4. Manage or disconnect anytime via ( Passport → Connections
                    )
                  </li>
                </ol>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-gray-300">
                <h3 className="text-md font-bold text-gray-900 mb-3">
                  Scoring
                </h3>
                <p className="text-sm text-gray-700">
                  Subscribers — 25% | Views — 20% | Engagement Rate — 30%
                  Consistency — 15% | Channel Age & Region — 10%
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-2xl border-2 border-black p-4 mb-6">
              <p className="text-sm text-gray-700 mb-3">
                Connect your {platform.name} account to unlock:
              </p>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>Channel Overview, Engagement & Audience Insights</span>
                </li>
                <li className="text-sm text-gray-700 flex items-start">
                  <span className="mr-2">•</span>
                  <span>CONSO Reputation Badges + ZAP Missions</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Platform Badges Side Panel */}
        <div className=" bg-blue-50 rounded-2xl border-3 border-black p-6 flex flex-col">
          {/* Header */}
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Platform Badges
          </h3>

          {/* Badge Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={cn(
                  "rounded-xl border-3 border-black bg-white p-2 flex flex-col items-center justify-between gap-1"
                )}
              >
                <div className="w-full aspect-square flex items-center justify-center">
                  <Image
                    src="/images/svgs/badges/badge.svg"
                    alt="Badge"
                    className="w-full h-full object-contain"
                    width={60}
                    height={60}
                  />
                </div>
                <div className="w-full border-2 border-black bg-black text-white text-[9px] font-bold px-1.5 py-1 rounded-md text-center">
                  Early Bird Access
                </div>
                <span className="text-[10px] font-semibold text-gray-600">
                  Lv1
                </span>
              </div>
            ))}
          </div>

          {/* ZAPs Summary */}
          <div className="bg-gray-900 rounded-2xl border-3 border-black p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-yellow-400 text-lg">⚡</span>
              <h4 className="text-white font-bold text-sm">ZAPs Summary</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-800 rounded-xl border-2 border-black p-3">
                <p className="text-gray-400 text-xs mb-1">Total ZAPs</p>
                <p className="text-white font-bold text-lg">25,000</p>
              </div>

              <div className="bg-gray-800 rounded-xl border-2 border-black p-3">
                <p className="text-gray-400 text-xs mb-1">ZAPs Earned</p>
                <p className="text-white font-bold text-lg">NA</p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <ConsoButton
            text={isConnected ? "Update" : `Login with ${platform.name}`}
            onClick={isConnected ? onUpdate : onConnect}
            className={cn(
              " items-center justify-center",
              isConnected ? "bg-gray-100" : "bg-yellow-400"
            )}
            logo={isConnected && "/images/icons/refresh.svg"}
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformModal;
