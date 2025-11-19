import React from "react";
import Image from "next/image";

const BadgesBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Background - full width */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/svgs/homepage/bg.svg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Scene - full width on top of background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/svgs/homepage/scene.svg"
          alt="Onboarding Scene"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default BadgesBackground;
