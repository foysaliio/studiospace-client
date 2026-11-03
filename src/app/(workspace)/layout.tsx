import type { Metadata } from "next";
import type { ReactNode } from "react";

import WorkspaceNav from "./workspace-nav";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-container py-5 sm:py-8 lg:py-12">
      <div className="grid min-w-0 gap-7 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[14rem_minmax(0,1fr)] xl:gap-14">
        <WorkspaceNav />

        <main id="workspace-content" className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
