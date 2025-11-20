import React from "react";
import { cn } from "@/lib/utils";

interface ZoneTabProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const ZoneTab: React.FC<ZoneTabProps> = ({
  label,
  isActive = false,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-xl font-semibold text-base transition-all duration-200",
        "border-3 border-black",
        isActive
          ? "bg-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          : "bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
        "active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]",
        className
      )}
    >
      {label}
    </button>
  );
};

export default ZoneTab;
