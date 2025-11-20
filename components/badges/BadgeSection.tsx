import React from "react";
import { cn } from "@/lib/utils";

interface BadgeSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const BadgeSection: React.FC<BadgeSectionProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl border-4 border-black bg-white p-8",
        "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        className
      )}
    >
      {/* Section Title */}
      <div className=" border-dashed border-black pb-4 mb-4">
        <h2 className="text-xl  text-gray-900">{title}</h2>
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
};

export default BadgeSection;
