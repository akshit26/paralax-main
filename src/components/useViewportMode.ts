"use client";

import { useEffect, useState } from "react";

import { resolveViewportMode, type ViewportMode } from "./experienceConfig";

type ViewportState = {
  width: number;
  height: number;
  mode: ViewportMode;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

function getViewportState(): ViewportState {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const mode = resolveViewportMode(width);

  return {
    width,
    height,
    mode,
    isMobile: mode === "mobile",
    isTablet: mode === "tablet",
    isDesktop: mode === "desktop",
  };
}

export function useViewportMode() {
  const [viewport, setViewport] = useState<ViewportState | null>(null);

  useEffect(() => {
    const updateViewport = () => {
      setViewport(getViewportState());
    };

    updateViewport();
    window.addEventListener("resize", updateViewport, { passive: true });
    window.addEventListener("orientationchange", updateViewport, { passive: true });

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  return (
    viewport ?? {
      width: 1280,
      height: 720,
      mode: "desktop" as ViewportMode,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    }
  );
}
