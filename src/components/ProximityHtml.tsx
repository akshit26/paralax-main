"use client";

import { useRef, useState, ReactNode } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";

/**
 * ProximityHtml — an Html overlay that only appears when
 * the camera is within `range` units of `targetZ`.
 * Prevents layer bleed-through of DOM elements.
 */
export default function ProximityHtml({
  position,
  targetZ,
  range = 25,
  children,
  distanceFactor = 10,
  ...htmlProps
}: {
  position: [number, number, number];
  targetZ: number;
  range?: number;
  children: ReactNode;
  distanceFactor?: number;
  [key: string]: unknown;
}) {
  const [visible, setVisible] = useState(false);
  const { camera } = useThree();

  useFrame(() => {
    const dist = Math.abs(camera.position.z - targetZ);
    const shouldShow = dist < range;
    if (shouldShow !== visible) setVisible(shouldShow);
  });

  if (!visible) return null;

  return (
    <Html
      position={position}
      center
      transform
      distanceFactor={distanceFactor}
      zIndexRange={[100, 0]}
      {...htmlProps}
    >
      {children}
    </Html>
  );
}
