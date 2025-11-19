"use client";

import HomepageBackground from "@/components/backgrounds/Homepage";
import Image from "next/image";

const App = () => {
  const handleConsoClanClick = () => {
    console.log("Conso Clan clicked");
  };

  const handleSocialZoneClick = () => {
    console.log("Social Zone clicked");
  };
  return (
    <div className="relative">
      <HomepageBackground />
      <div
        className="fixed top-1/2 left-63/100 -translate-x-1/2 -translate-y-1/2 z-20"
        onClick={handleConsoClanClick}
      >
        <Image
          src="/images/svgs/homepage/conso-clan.svg"
          alt="Conso Clan"
          width={280}
          height={280}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>

      <div
        className="fixed top-32/100 left-18/100 -translate-y-1/2 z-10"
        onClick={handleSocialZoneClick}
      >
        <Image
          src="/images/svgs/homepage/social-zone.svg"
          alt="Social Zone"
          width={450}
          height={400}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>
    </div>
  );
};

export default App;
