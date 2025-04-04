import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const lastik = localFont({
  src: [
    {
      path: "../../public/fonts/lastik/Lastik-Regular.otf",
      style: "normal",
    },
  ],
  variable: "--font-lastik",
  display: "swap",
});
const nacelle = localFont({
  src: [
    {
      path: "../../public/fonts/nacelle/Nacelle-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/../../public/fonts/nacelle/Nacelle-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "/../../public/fonts/nacelle/Nacelle-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
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
        className={`${nacelle.variable} ${lastik.variable} antialiased relative min-h-screen flex flex-col bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
