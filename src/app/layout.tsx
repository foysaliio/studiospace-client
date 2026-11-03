import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/shared/site-footer";
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
  authors: [{ name: "Foysal" }],
  creator: "Foysal",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={geist.variable}>
      <body
        id="site-start"
        tabIndex={-1}
        className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased"
      >
        <SiteNavbar />
        <div className="min-w-0 flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
