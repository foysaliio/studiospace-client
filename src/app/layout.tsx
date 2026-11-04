import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

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
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body
        id="site-start"
        tabIndex={-1}
        className="flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased"
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteNavbar />

          <div className="min-w-0 flex-1">{children}</div>

          <SiteFooter />

          <Toaster
            position="top-center"
            duration={3000}
            toastOptions={{
              style: {
                width: "fit-content",
                maxWidth: "100%",
                left: 0,
                right: 0,
                marginInline: "auto",
                padding: "10px 14px",
                gap: "8px",
                justifyContent: "center",
                textAlign: "center",
                background: "var(--popover)",
                color: "var(--popover-foreground)",
                borderColor: "var(--border)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
