import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import { SiteNavbar } from "@/components/shared/site-navbar";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "StudioSpace",
  title: {
    default: "StudioSpace | Discover Creative Spaces",
    template: "%s | StudioSpace",
  },
  description:
    "Discover and book creative spaces for photography, filmmaking, podcasting, music, and art. Find the right studio for your next project.",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
