"use client";

import { ReactNode, useMemo, useState } from "react";
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
  targetPosition,
  range = 25,
  children,
  distanceFactor = 10,
  ...htmlProps
}: {
  position: [number, number, number];
  targetZ?: number;
  targetPosition?: [number, number, number];
  range?: number;
  children: ReactNode;
  distanceFactor?: number;
  [key: string]: unknown;
}) {
  const [visible, setVisible] = useState(false);
  const { camera } = useThree();
  const fallbackZ = useMemo(() => targetZ ?? position[2], [position, targetZ]);

  useFrame(() => {
    const dist = targetPosition
      ? Math.hypot(
          camera.position.x - targetPosition[0],
          camera.position.y - targetPosition[1],
          camera.position.z - targetPosition[2]
        )
      : Math.abs(camera.position.z - fallbackZ);
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
