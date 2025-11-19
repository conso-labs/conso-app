"use client";

import BadgesBackground from "@/components/backgrounds/BadgesBackground";

const BadgesPage = () => {
  return (
    <div className="relative">
      <BadgesBackground />

      {/* Add your badges page content here */}
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold">Badges Page</h1>
      </div>
    </div>
  );
};

export default BadgesPage;
