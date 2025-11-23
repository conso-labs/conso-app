"use client";
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Solway, Inter } from "next/font/google";
import "./globals.css";
import "@mysten/dapp-kit/dist/index.css";
import { ConsoUserProvider } from "@/contexts/ConsoUserContext";
import { networkConfig } from "@/lib/sui/networkConfig";

const queryClient = new QueryClient();

export const solway = Solway({
  weight: "700",
  variable: "--font-solway",
});

export const inter = Inter({
  weight: ["500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider autoConnect>
            <ConsoUserProvider>
              <body
                className={`${inter.variable} ${solway.variable} antialiased`}
              >
                {children}
              </body>
            </ConsoUserProvider>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </html>
  );
}
