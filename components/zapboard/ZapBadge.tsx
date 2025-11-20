import React from "react";
import { cn } from "@/lib/utils";

interface ZapBadgeProps {
  amount: number;
  className?: string;
}

const ZapBadge: React.FC<ZapBadgeProps> = ({ amount, className }) => {
  return (
    <div
      className={cn(
        "bg-[#1a1a2e] text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold",
        className
      )}
    >
      <span className="text-yellow-400 text-lg">⚡</span>
      <span>{amount.toLocaleString()}</span>
    </div>
  );
};

export default ZapBadge;
