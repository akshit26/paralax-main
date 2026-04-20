import type { ReactNode } from "react";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="stars-bg min-h-screen bg-black text-white">
      <div className="relative isolate min-h-screen overflow-x-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(255,196,111,0.16),transparent_58%)]" />
        <div className="pointer-events-none absolute left-1/2 top-40 h-80 w-[min(92vw,72rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(126,180,255,0.14),transparent_68%)] blur-3xl" />
        <SiteHeader />
        <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 pb-16 pt-32 sm:px-6 sm:pt-36 lg:px-10">
          {children}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
