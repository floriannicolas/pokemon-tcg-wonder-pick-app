import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import GithubRibbon from "@/components/github-ribbon";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wonder Pick - Pokémon TCG Pocket",
  description: "A Pokémon TCG Pocket wonder pick simulator in typescript",
  keywords: [
    "pokémon",
    "tcg",
    "pocket",
    "wonder pick",
    "simulator",
    "typescript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GithubRibbon />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
