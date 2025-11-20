"use client";

import OnboardingBackground from "@/components/backgrounds/Onboarding";
import ConsoButton from "@/components/common/ConsoButton";
import HeadingText from "@/components/common/HeadingText";

const App = () => {
  return (
    <div className="min-h-screen relative">
      <OnboardingBackground />

      {/* Login Card */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white/95 backdrop-blur-sm rounded-3xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]  p-12">
          {/* Heading */}
          <HeadingText
            text="Login or Sign up"
            className="text-4xl text-center mb-10 "
          />

          {/* Login Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Slush Button */}
            <ConsoButton
              logo={"/images/icons/slush.svg"}
              text="Slush"
              onClick={() => console.log("Slush login")}
              logoClassName="text-blue-500"
            />

            {/* Google Button */}
            <ConsoButton
              logo={"/images/icons/google.svg"}
              text="Google"
              onClick={() => console.log("Google login")}
              disabled={true}
            />

            {/* X (Twitter) Button */}
            <ConsoButton
              logo={"/images/icons/x.svg"}
              text="X (formally twitter)"
              onClick={() => console.log("X login")}
              disabled={true}
            />

            {/* Metamask Button */}
            <ConsoButton
              logo={"/images/icons/metamask.svg"}
              text="Metamask"
              onClick={() => console.log("Metamask login")}
              logoClassName="text-orange-500"
              disabled={true}
            />
          </div>

          {/* Terms Text */}
          <p className="text-center text-gray-600 text-sm">
            By registering, you accept{" "}
            <a href="#" className="text-gray-800 font-semibold hover:underline">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-gray-800 font-semibold hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
