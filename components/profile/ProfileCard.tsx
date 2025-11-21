import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PlatformIcon {
  name: string;
  icon: string;
  bgColor: string;
  iconColor?: string;
}

interface ProfileCardProps {
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  zaps: number;
  badges: number;
  consumerScore: number;
  platforms?: PlatformIcon[];
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  zaps,
  badges = 0,
  consumerScore = 0,
  platforms = [],
  className,
}) => {
  return (
    <div
      className={cn("flex w-full h-full relative", className)}
      style={{
        boxShadow: "2.28px 2.28px 0px 0px rgba(176, 228, 255, 1)",
      }}
    >
      <style jsx>{`
        @keyframes bounce-float-0 {
          0%,
          100% {
            transform: scale(1) translate(0, 0);
          }
          25% {
            transform: scale(1) translate(15px, -10px);
          }
          50% {
            transform: scale(1) translate(-10px, -15px);
          }
          75% {
            transform: scale(1) translate(20px, 8px);
          }
        }
        @keyframes bounce-float-1 {
          0%,
          100% {
            transform: scale(0.9) translate(0, 0);
          }
          30% {
            transform: scale(0.9) translate(-18px, 12px);
          }
          60% {
            transform: scale(0.9) translate(8px, -18px);
          }
          80% {
            transform: scale(0.9) translate(-12px, 5px);
          }
        }
        @keyframes bounce-float-2 {
          0%,
          100% {
            transform: scale(0.8) translate(0, 0);
          }
          20% {
            transform: scale(0.8) translate(-22px, 8px);
          }
          50% {
            transform: scale(0.8) translate(-25px, -20px);
          }
          70% {
            transform: scale(0.8) translate(-15px, 15px);
          }
        }
        @keyframes bounce-float-3 {
          0%,
          100% {
            transform: scale(1.1) translate(0, 0);
          }
          35% {
            transform: scale(1.1) translate(22px, -12px);
          }
          65% {
            transform: scale(1.1) translate(12px, 18px);
          }
          85% {
            transform: scale(1.1) translate(25px, -5px);
          }
        }
        @keyframes bounce-float-4 {
          0%,
          100% {
            transform: scale(0.7) translate(0, 0);
          }
          25% {
            transform: scale(0.7) translate(-12px, 20px);
          }
          55% {
            transform: scale(0.7) translate(18px, 12px);
          }
          75% {
            transform: scale(0.7) translate(-8px, -18px);
          }
        }
        @keyframes bounce-float-5 {
          0%,
          100% {
            transform: scale(1) translate(0, 0);
          }
          30% {
            transform: scale(1) translate(-18px, -8px);
          }
          60% {
            transform: scale(1) translate(-25px, 12px);
          }
          90% {
            transform: scale(1) translate(-8px, -20px);
          }
        }
      `}</style>
      {/* Left blue line */}
      <div
        className="absolute left-0 z-20 w-1"
        style={{
          top: "36px",
          bottom: "38px",
          background:
            "linear-gradient(180deg, #0A3669 0%, #438BB5 50%, #0B386B 100%)",
        }}
      />

      {/* Right blue line */}
      <div
        className="absolute right-0 z-20 w-1"
        style={{
          top: "36px",
          bottom: "38px",
          background:
            "linear-gradient(180deg, #0A3669 0%, #438BB5 50%, #0B386B 100%)",
        }}
      />

      {/* Top blue bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 rounded-t-3xl"
        style={{
          background:
            "linear-gradient(90deg, #0A3669 0%, #438BB5 51.79%, #0A3B72 100%)",
          height: "36px",
        }}
      >
        {/* Date Header in blue bar */}
        <div
          className="flex items-center justify-end h-full px-4 gap-1"
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontStyle: "Medium",
            fontSize: "12px",
            lineHeight: "100%",
            letterSpacing: "-1%",
          }}
        >
          <span className="text-white">8 Nov 2025</span>
          <span style={{ color: "rgba(196, 196, 196, 1)" }}>
            (updated every week)
          </span>
        </div>
      </div>

      {/* Left Sidebar */}
      <div
        className="w-90 p-4 flex flex-col"
        style={{
          backgroundImage: `url('/images/svgs/profile/bg-1.svg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: "1.52px solid",
          borderImageSource:
            "linear-gradient(180deg, #012F77 0%, #0257DD 100%)",
          borderImageSlice: 1,
          marginTop: "20px",
          marginBottom: "22px",
        }}
      >
        {/* User Profile */}
        <div className="flex items-center gap-3 mb-4 mt-4">
          <div
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "43.93px",
              borderWidth: "2.69px",
              borderStyle: "solid",
              borderColor: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/others/profile.jpg"
              alt="Vin"
              width={100}
              height={100}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div>
            <h2 className="font-bold text-base">{user.username}</h2>
          </div>
        </div>

        {/* Badges and Score */}
        <div className="mb-4">
          <div
            className="text-xs p-2"
            style={{
              height: "45px",
              borderRadius: "6.07px",
              background: "rgba(215, 237, 251, 0.8)",
              border: "0.76px solid rgba(95, 144, 199, 1)",
              boxShadow: "2.28px 2.28px 0px 0px rgba(4, 68, 150, 1)",
            }}
          >
            <div
              style={{
                width: "264.7038879394531px",
                height: "54.01665496826172px",
                display: "flex",
                flexDirection: "column",
                gap: "12.14px",
                marginTop: "8px",
              }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/images/icons/badges.svg"
                  alt="Badges"
                  width={16.35088539123535}
                  height={16.0950927734375}
                />
                <span
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "-1%",
                  }}
                >
                  Badges earned:
                  <span
                    style={{
                      marginLeft: "3px",
                      fontFamily: "Inter",
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "-1%",
                    }}
                  >
                    {badges}
                  </span>
                </span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Image
                  src="/images/icons/badges.svg"
                  alt="Star"
                  width={16}
                  height={16}
                />
                <span
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "-1%",
                  }}
                >
                  Consumer Score:
                  <span
                    style={{
                      marginLeft: "3px",
                      fontFamily: "Inter",
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "100%",
                      letterSpacing: "-1%",
                    }}
                  >
                    {consumerScore} th percentile
                  </span>
                </span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Creative Profile - Radar Graph */}
        <div
          style={{
            height: "203.4545440673828px",
            padding: "12px",
            borderRadius: "6.07px",
            background: "rgba(215, 237, 251, 0.8)",
            border: "0.76px solid rgba(95, 144, 199, 1)",
            boxShadow: "2.28px 2.28px 0px 0px rgba(4, 68, 150, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/images/svgs/profile/radar-graph.svg"
            alt="Radar Graph"
            width={250}
            height={220}
          />
        </div>
      </div>

      {/* Right Panel - 3D Cube with Platform Icons */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage: `url('/images/svgs/profile/bg-2.svg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          marginTop: "20px",
          marginBottom: "22px",
        }}
      >
        {/* 3D Cube Grid Background - using bg-2.svg */}
        <div className="absolute inset-0 opacity-90" />

        {/* Platform Icons in bubbles positioned in 3D space */}
        <div className="absolute inset-0 flex items-center justify-center">
          {platforms.slice(0, 6).map((platform, index) => {
            const positions = [
              {
                top: "18%",
                left: "35%",
                transform: "scale(1.0)",
                width: 80,
                iconWidth: 32,
              },
              {
                top: "15%",
                left: "70%",
                transform: "scale(1.0)",
                width: 80,
                iconWidth: 32,
              },
              {
                top: "35%",
                left: "85%",
                transform: "scale(1.0)",
                width: 80,
                iconWidth: 32,
              },
              {
                top: "38%",
                left: "15%",
                transform: "scale(1.0)",
                width: 80,
                iconWidth: 32,
              },
              {
                top: "60%",
                left: "45%",
                transform: "scale(1.0)",
                width: 80,
                iconWidth: 32,
              },
              {
                top: "70%",
                left: "75%",
                transform: "scale(1.0)",
                width: 80,
                iconWidth: 32,
              },
            ];

            const position = positions[index];

            // Map platform names to icon file names
            const getIconPath = (name: string) => {
              const iconMap: { [key: string]: string } = {
                X: "x.svg",
                MetaMask: "metamask.svg",
                Slush: "slush.svg",
              };
              return iconMap[name] || "metamask.svg";
            };

            return (
              <div
                key={index}
                className="absolute transition-all duration-300 hover:scale-110 animate-bounce-float"
                style={{
                  top: position.top,
                  left: position.left,
                  transform: position.transform,
                  animation: `bounce-float-${index} ${
                    6 + index
                  }s infinite ease-in-out`,
                  animationDelay: `${index * 0.5}s`,
                }}
              >
                <div className="relative">
                  <Image
                    src="/images/svgs/profile/bubble.svg"
                    alt="Bubble"
                    width={position.width}
                    height={position.width}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={`/images/icons/${getIconPath(platform.name)}`}
                      alt={platform.name}
                      width={position.iconWidth}
                      height={position.iconWidth}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Zaps Counter - Positioned like in the image */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div
            className="text-white flex items-center"
            style={{
              background: "rgba(1, 96, 185, 1)",
              border: "1.35px solid rgba(188, 219, 255, 1)",
              boxShadow: "0px 1.98px 7.56px 0px rgba(19, 66, 92, 1)",
              width: "194.1934051513672px",
              height: "52.998626708984375px",
              borderRadius: "10.8px",
              paddingTop: "10.8px",
              paddingRight: "14.06px",
              paddingBottom: "10.8px",
              paddingLeft: "14.06px",
              gap: "5.4px",
            }}
          >
            <Image
              src="/images/icons/Zaps.svg"
              alt="Zaps"
              width={11.47764778137207}
              height={25.24072265625}
            />
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontStyle: "Medium",
                fontSize: "21.6px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                color: "white",
              }}
            >
              ZAPS:{" "}
            </span>
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontStyle: "Bold",
                fontSize: "21.6px",
                lineHeight: "100%",
                letterSpacing: "-1%",
                color: "rgba(255, 217, 119, 1)",
              }}
            >
              {zaps.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom blue bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 rounded-b-3xl flex items-center justify-between text-white"
        style={{
          background:
            "linear-gradient(90deg, #0B386B 0%, #4288B3 41.22%, #0C3D74 96.58%)",
          height: "38px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <Image
              src="/images/icons/conso.svg"
              alt="Conso"
              width={16.99527931213379}
              height={22.99374008178711}
            />
          </div>
          <Image
            src="/images/svgs/profile/logo.svg"
            alt="CONSO Logo"
            width={60}
            height={20}
          />
        </div>
        <span
          className="text-white"
          style={{
            fontFamily: "Inter",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "100%",
            letterSpacing: "-1%",
          }}
        >
          zaps.conso.xyz
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
