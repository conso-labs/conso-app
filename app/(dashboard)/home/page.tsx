"use client";

import HomepageBackground from "@/components/backgrounds/Homepage";
import Image from "next/image";

const HomePage = () => {
  const handleConsoClanClick = () => {
    console.log("Conso Clan clicked");
  };

  const handleSocialZoneClick = () => {
    console.log("Social Zone clicked");
  };

  const handleCreativeZoneClick = () => {
    console.log("Creative Zone clicked");
  };

  const handleGamingZoneClick = () => {
    console.log("Gaming Zone clicked");
  };

  const handleCampaignsClick = () => {
    console.log("Campaigns clicked");
  };

  const handleZapsClick = () => {
    console.log("Zaps clicked");
  };

  const handleShipClick = () => {
    console.log("Ship clicked");
  };

  const handleCalculatorClick = () => {
    console.log("Calculator clicked");
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
          width={250}
          height={280}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>

      <div
        className="fixed top-32/100 left-21/100 -translate-y-1/2 z-10"
        onClick={handleSocialZoneClick}
      >
        <Image
          src="/images/svgs/homepage/social-zone.svg"
          alt="Social Zone"
          width={400}
          height={400}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>

      {/* Creative Zone - Top right */}
      <div
        className="fixed top-33/100 right-0/100 -translate-y-1/2 z-10"
        onClick={handleCreativeZoneClick}
      >
        <Image
          src="/images/svgs/homepage/creative-zone.svg"
          alt="Creative Zone"
          width={370}
          height={380}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>

      {/* Gaming Zone - Bottom right */}
      <div
        className="fixed bottom-18/100 right-18/100 translate-y-1/2 z-10"
        onClick={handleGamingZoneClick}
      >
        <Image
          src="/images/svgs/homepage/gaming-zone.svg"
          alt="Gaming Zone"
          width={400}
          height={285}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>

      {/* Campaigns - Bottom right corner */}
      <div
        className="fixed bottom-15/100 right-2/100 translate-y-1/2 z-10"
        onClick={handleCampaignsClick}
      >
        <Image
          src="/images/svgs/homepage/campaigns.svg"
          alt="Campaigns"
          width={233}
          height={226}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>

      {/* Zaps - Bottom left */}
      <div
        className="fixed bottom-30/100 left-18/100 translate-y-1/2 z-10"
        onClick={handleZapsClick}
      >
        <Image
          src="/images/svgs/homepage/zaps.svg"
          alt="Zaps"
          width={310}
          height={377}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>

      {/* Ship - Top center-right */}
      <div
        className="fixed top-22/100 right-30/100 -translate-y-1/2 z-10"
        onClick={handleShipClick}
      >
        <Image
          src="/images/svgs/homepage/ship.svg"
          alt="Ship"
          width={230}
          height={205}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>

      {/* Calculator - Top right corner */}
      <div
        className="fixed top-15/100 right-6/100 -translate-y-1/2 z-10"
        onClick={handleCalculatorClick}
      >
        <Image
          src="/images/svgs/homepage/calculator.svg"
          alt="Calculator"
          width={100}
          height={120}
          className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_25px_rgba(139,92,246,0.6)]"
        />
      </div>
    </div>
  );
};

export default HomePage;
