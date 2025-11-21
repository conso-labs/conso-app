"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { ConsoUser } from "@/lib/types";

interface ConsoUserContextType {
  consoUser: ConsoUser;
  setConsoUser: (user: ConsoUser) => void;
  updateConsoUser: (updates: Partial<ConsoUser>) => void;
}

const defaultConsoUser: ConsoUser = {
  suiAddress: "",
  substringSuiAddress: "",
  connectedAccounts: [],
  badges: 0,
  zapsScore: 0,
  consumerPercentile: 0,
};

const ConsoUserContext = createContext<ConsoUserContextType | undefined>(
  undefined
);

export const ConsoUserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const currentAccount = useCurrentAccount();
  const [consoUser, setConsoUser] = useState<ConsoUser>(defaultConsoUser);

  useEffect(() => {
    if (!currentAccount?.address) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setConsoUser(defaultConsoUser);
      return;
    }

    try {
      const storedUser = localStorage.getItem(currentAccount.address);

      if (storedUser) {
        setConsoUser(JSON.parse(storedUser));
      } else {
        const newUser: ConsoUser = {
          suiAddress: currentAccount.address,
          substringSuiAddress:
            currentAccount.address.slice(0, 4) +
            "..." +
            currentAccount.address.slice(-4),
          connectedAccounts: [],
          badges: 0,
          zapsScore: 0,
          consumerPercentile: 0,
        };
        localStorage.setItem(currentAccount.address, JSON.stringify(newUser));
        setConsoUser(newUser);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setConsoUser(defaultConsoUser);
    }
  }, [currentAccount?.address]);

  const updateConsoUser = (updates: Partial<ConsoUser>) => {
    setConsoUser((prev) => {
      const updated = { ...prev, ...updates };

      // Persist to localStorage if we have an address
      if (updated.suiAddress) {
        try {
          localStorage.setItem(updated.suiAddress, JSON.stringify(updated));
        } catch (error) {
          console.error("Failed to save user data:", error);
        }
      }

      return updated;
    });
  };

  const value = {
    consoUser,
    setConsoUser: (user: ConsoUser) => {
      setConsoUser(user);

      // Persist to localStorage
      if (user.suiAddress) {
        try {
          localStorage.setItem(user.suiAddress, JSON.stringify(user));
        } catch (error) {
          console.error("Failed to save user data:", error);
        }
      }
    },
    updateConsoUser,
  };

  return (
    <ConsoUserContext.Provider value={value}>
      {children}
    </ConsoUserContext.Provider>
  );
};

export const useConsoUser = () => {
  const context = useContext(ConsoUserContext);
  if (context === undefined) {
    throw new Error("useConsoUser must be used within a ConsoUserProvider");
  }
  return context;
};
