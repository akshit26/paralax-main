"use client";

import type { CSSProperties } from "react";

import ClientConsoleFilters from "@/components/ClientConsoleFilters";
import HeroOverlay from "@/components/HeroOverlay";
import MainCanvasLoader from "@/components/MainCanvasLoader";
import SiteHeader from "@/components/site/SiteHeader";

import { EXPERIENCE_STAGE_COUNT } from "./experienceConfig";
import { useViewportMode } from "./useViewportMode";

export default function ExperienceShell() {
  const viewport = useViewportMode();

  return (
    <main
      className="experience-shell relative min-h-screen stars-bg"
      data-viewport={viewport.mode}
      style={
        {
          "--experience-stage-count": EXPERIENCE_STAGE_COUNT,
          "--experience-scroll-buffer": viewport.isMobile ? 1.05 : viewport.isTablet ? 0.55 : 0.2,
        } as CSSProperties
      }
    >
      <ClientConsoleFilters />
      <SiteHeader />
      <div className="scroll-container relative w-full pointer-events-none" />
      <MainCanvasLoader viewport={viewport.mode} />
      <HeroOverlay viewport={viewport.mode} />
    </main>
  );
}
