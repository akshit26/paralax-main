"use client";

import dynamic from "next/dynamic";

const MainCanvas = dynamic(() => import("@/components/MainCanvas"), {
  ssr: false,
  loading: () => (
    <div className="canvas-loader">
      <div className="canvas-loader__orb" />
      <p className="canvas-loader__label">Loading experience</p>
    </div>
  ),
});

export default function MainCanvasLoader() {
  return <MainCanvas />;
}
