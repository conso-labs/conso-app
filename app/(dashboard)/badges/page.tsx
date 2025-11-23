"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BadgesBackground from "@/components/backgrounds/Badges";
import ZoneTab from "@/components/badges/ZoneTab";
import BadgeSection from "@/components/badges/BadgeSection";
import BadgeCard from "@/components/badges/BadgeCard";
import { useConsoUser } from "@/contexts/ConsoUserContext";
import { supabase } from "@/lib/supabase/client";
import {
  socialBadges,
  gamingBadges,
  creativeBadges,
  onchainBadges,
} from "@/constants/badges";
import { Provider, Session } from "@supabase/supabase-js";
import GamingBadgeCard from "@/components/badges/GamingBadgeCard";

type Zone = "social" | "gaming" | "creative" | "onchain";

type Badge = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  zapReward: number;
  backgroundColor: string;
  disabled?: boolean;
  skipModal?: boolean;
  customButtonText?: string;
};

// Map badge IDs to Supabase OAuth providers
const PROVIDER_MAP: Record<string, string> = {
  youtube: "google",
  twitch: "twitch",
  x: "twitter",
  discord: "discord",
  reddit: "reddit",
  github: "github",
  // Add more providers as Supabase supports them
};

const BadgesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const zoneParam = searchParams.get("activeZone") as Zone | null;

  const { consoUser, updateConsoUser } = useConsoUser();
  const processedSessionRef = useRef<string | null>(null);

  const [activeZone, setActiveZone] = useState<Zone>(() => {
    if (
      zoneParam &&
      ["social", "gaming", "creative", "onchain"].includes(zoneParam)
    ) {
      return zoneParam;
    }
    return "social";
  });

  // Handle OAuth callback with Supabase auth state listener
  useEffect(() => {
    const processSession = async (session: Session | null) => {
      if (!session?.user) return;

      const sessionId = session.user.id;

      // Skip if we've already processed this session
      if (processedSessionRef.current === sessionId) {
        console.log("Session already processed, skipping");
        return;
      }

      // Mark this session as processed
      processedSessionRef.current = sessionId;

      // Get all connected providers from app_metadata
      const providers = session.user.app_metadata?.providers || [];
      const currentProvider = session.user.app_metadata?.provider;

      console.log(`Session detected. Current provider: ${currentProvider}`);
      console.log(`All connected providers:`, providers);

      const allBadges = [
        ...socialBadges,
        ...gamingBadges,
        ...creativeBadges,
        ...onchainBadges,
      ];

      // Track new connections for batch update
      let newBadgesCount = 0;
      let newZapsScore = 0;
      const newConnectedAccounts = [...consoUser.connectedAccounts];
      const newPlatformData = { ...consoUser.platformData };

      // Process all providers
      const providersToProcess =
        providers.length > 0 ? providers : [currentProvider];

      for (const provider of providersToProcess) {
        if (!provider) continue;

        // Find the badge from the provider
        const badgeEntry = Object.entries(PROVIDER_MAP).find(
          ([, p]) => p === provider
        );
        const badgeId = badgeEntry?.[0];

        if (!badgeId) {
          console.log(`No badge mapping for provider: ${provider}`);
          continue;
        }

        const connectedBadge = allBadges.find((b) => b.id === badgeId);

        if (connectedBadge) {
          // Check if already connected
          const isAlreadyConnected = newConnectedAccounts.includes(
            connectedBadge.title
          );

          if (!isAlreadyConnected) {
            console.log(`New connection detected: ${connectedBadge.title}`);
            newBadgesCount++;
            newZapsScore += 1000;
            newConnectedAccounts.push(connectedBadge.title);
          }

          // Get basic user data from Supabase OAuth session
          // Provider-specific data might be in identities array
          const identity = session.user.identities?.find(
            (id) => id.provider === provider
          );

          const userData = {
            email: session.user.email,
            name:
              identity?.identity_data?.name || session.user.user_metadata?.name,
            avatar:
              identity?.identity_data?.avatar_url ||
              identity?.identity_data?.picture ||
              session.user.user_metadata?.avatar_url,
            username:
              identity?.identity_data?.user_name ||
              identity?.identity_data?.preferred_username ||
              session.user.user_metadata?.user_name,
            fullName:
              identity?.identity_data?.full_name ||
              session.user.user_metadata?.full_name,
            provider: provider,
            providerId: identity?.id || session.user.user_metadata?.provider_id,
            preferredUsername:
              identity?.identity_data?.preferred_username ||
              session.user.user_metadata?.preferred_username,
            picture:
              identity?.identity_data?.picture ||
              session.user.user_metadata?.picture,
            // Store provider access token for API calls (if this was the active session)
            // Note: provider_token is only available for the most recent OAuth sign-in
            provider_access_token:
              session.user.app_metadata?.provider === provider
                ? session.provider_token
                : undefined,
            // Additional provider-specific fields
            ...identity?.identity_data,
          };

          console.log(`${connectedBadge.title} user data:`, userData);

          // Update platform data (even if already connected, to refresh data)
          newPlatformData[connectedBadge.title] = userData;
        }
      }

      // Batch update all changes at once
      if (newBadgesCount > 0 || Object.keys(newPlatformData).length > 0) {
        updateConsoUser({
          badges: consoUser.badges + newBadgesCount,
          zapsScore: consoUser.zapsScore + newZapsScore,
          connectedAccounts: newConnectedAccounts,
          platformData: newPlatformData,
        });

        console.log(
          `Successfully processed ${newBadgesCount} new connection(s) and saved to localStorage`
        );
        console.log(`Total connected accounts:`, newConnectedAccounts);
      }

      // Clean up URL hash if present
      if (window.location.hash) {
        setTimeout(() => router.replace("/badges"), 100);
      }
    };

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);

      if (event === "SIGNED_IN" && session) {
        await processSession(session);
      }
    });

    // Also check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        processSession(session);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleZoneChange = (zone: Zone) => {
    setActiveZone(zone);
    router.push(`/badges?activeZone=${zone}`);
  };

  const handleConnectFlow = async (badge: Badge) => {
    console.log(`Connecting ${badge.title}`);

    // Check if platform is supported by Supabase OAuth
    const provider = PROVIDER_MAP[badge.id];

    if (!provider) {
      console.error(
        `OAuth provider not configured for ${badge.title}. Please add to PROVIDER_MAP.`
      );
      // For platforms without OAuth, you might want to show a modal or redirect to custom auth
      return;
    }

    console.log(`Initiating ${provider} OAuth flow...`);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          redirectTo: `${window.location.origin}/badges`,
          skipBrowserRedirect: false,
        },
      });

      if (error) {
        console.error("Error initiating OAuth flow:", error.message);
        alert(
          `OAuth Error: ${error.message}. Make sure ${provider} is enabled in Supabase dashboard.`
        );
      } else if (data.url) {
        console.log("OAuth flow initiated, redirecting to provider...");
        console.log("OAuth URL:", data.url);
        // Browser will redirect automatically
      } else {
        console.error("No OAuth URL returned from Supabase");
        alert(
          `OAuth failed: No redirect URL. Make sure ${provider} is enabled in Supabase dashboard.`
        );
      }
    } catch (err) {
      console.error("Unexpected error during OAuth:", err);
      alert(`Unexpected error: ${err}`);
    }
  };

  return (
    <div className="relative min-h-screen">
      <BadgesBackground />

      <div className=" py-8">
        {/* Zone Tabs */}
        <div className="flex gap-4 mb-8 justify-left">
          <ZoneTab
            label="Social Zone"
            isActive={activeZone === "social"}
            onClick={() => handleZoneChange("social")}
          />
          <ZoneTab
            label="Gaming Zone"
            isActive={activeZone === "gaming"}
            onClick={() => handleZoneChange("gaming")}
          />
          <ZoneTab
            label="Creative Zone"
            isActive={activeZone === "creative"}
            onClick={() => handleZoneChange("creative")}
          />
          <ZoneTab
            label="Onchain Zone"
            isActive={activeZone === "onchain"}
            onClick={() => handleZoneChange("onchain")}
          />
        </div>

        {/* Badge Section */}
        {activeZone === "social" && (
          <BadgeSection title="Capture your cultural footprint across top social platforms">
            {socialBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                isConnected={consoUser.connectedAccounts.includes(badge.title)}
                description={badge.description}
                zapReward={badge.zapReward}
                isDisabled={badge.disabled}
                backgroundColor={badge.backgroundColor}
                onConnect={() => handleConnectFlow(badge)}
              />
            ))}
          </BadgeSection>
        )}

        {activeZone === "gaming" && (
          <BadgeSection title="Showcase your gaming achievements and stats">
            {gamingBadges.map((badge) => (
              <GamingBadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                isConnected={consoUser.connectedAccounts.includes(badge.title)}
                description={badge.description}
                zapReward={badge.zapReward}
                isDisabled={badge.disabled}
                backgroundColor={badge.backgroundColor}
                onConnect={() => {
                  console.log("Gaming badge connect clicked");
                }}
              />
            ))}
          </BadgeSection>
        )}

        {activeZone === "creative" && (
          <BadgeSection title="Highlight your creative portfolio and work">
            {creativeBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                isConnected={consoUser.connectedAccounts.includes(badge.title)}
                description={badge.description}
                zapReward={badge.zapReward}
                isDisabled={badge.disabled}
                backgroundColor={badge.backgroundColor}
                onConnect={() => handleConnectFlow(badge)}
              />
            ))}
          </BadgeSection>
        )}

        {activeZone === "onchain" && (
          <BadgeSection title="Connect your blockchain identity and activity">
            {onchainBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                icon={badge.icon}
                title={badge.title}
                isConnected={consoUser.connectedAccounts.includes(badge.title)}
                description={badge.description}
                zapReward={badge.zapReward}
                isDisabled={badge.disabled}
                backgroundColor={badge.backgroundColor}
                skipModal={badge.skipModal}
                customButtonText={badge.customButtonText}
                onConnect={() => {
                  console.log("Onchain badge connect clicked");
                }}
              />
            ))}
          </BadgeSection>
        )}
      </div>
    </div>
  );
};

export default BadgesPage;
