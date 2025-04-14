import type { Metadata } from "next";
import localFont from "next/font/local";

import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PathSnap",
  description: "A link shortener",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased relative min-h-screen flex flex-col bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
