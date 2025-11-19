import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ConsoButtonProps {
  logo?: string | React.ReactNode;
  text: string;
  onClick?: () => void;
  className?: string;
  logoClassName?: string;
  textClassName?: string;
  variant?: "default" | "outlined";
  disabled?: boolean;
}

const ConsoButton: React.FC<ConsoButtonProps> = ({
  logo,
  text,
  onClick,
  className,
  logoClassName,
  textClassName,
  variant = "default",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "default" &&
          "bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]  hover:translate-y-[-2px)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px]",
        variant === "outlined" &&
          "bg-transparent border-2 border-gray-300 shadow-sm",
        className
      )}
    >
      {logo && (
        <div className={cn("flex items-center justify-center", logoClassName)}>
          {typeof logo === "string" ? (
            <Image
              src={logo}
              alt={text}
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          ) : (
            logo
          )}
        </div>
      )}
      <span
        className={cn("font-semibold text-base text-gray-800", textClassName)}
      >
        {text}
      </span>
    </button>
  );
};

export default ConsoButton;
