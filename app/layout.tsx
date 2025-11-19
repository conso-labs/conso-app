import type { Metadata } from "next";
import { Solway, Inter } from "next/font/google";
import "./globals.css";

export const solway = Solway({
  weight: "700",
  variable: "--font-solway",
});

export const inter = Inter({
  weight: "500",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${solway.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
