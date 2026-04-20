"use client";

import { Float } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

import { SCENE_CENTERS, type ViewportMode } from "../experienceConfig";

const FOOTER_CENTER = SCENE_CENTERS.footer;

function FooterGlow({
  position,
  scale,
  color,
  opacity,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  opacity: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <circleGeometry args={[1, 72]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

function HorizonArc({
  radiusX,
  radiusY,
  position,
  opacity,
}: {
  radiusX: number;
  radiusY: number;
  position: [number, number, number];
  opacity: number;
}) {
  const positions = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, Math.PI * 0.08, Math.PI * 0.92, false, 0);
    const points = curve.getPoints(180);
    return new Float32Array(points.flatMap((point) => [point.x, point.y, 0]));
  }, [radiusX, radiusY]);

  return (
    <group position={position}>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#93bbff" transparent opacity={opacity} toneMapped={false} />
      </line>
    </group>
  );
}

function SparkCluster() {
  const positions = useMemo(() => {
    const values: number[] = [];
    const stars = [
      [-18, 6, -2],
      [-11, 4.6, -2.4],
      [-4, 5.3, -1.9],
      [2.6, 7.1, -2.2],
      [10.2, 4.8, -2.5],
      [16.4, 5.9, -2],
    ];

    stars.forEach((star) => values.push(star[0], star[1], star[2]));
    return new Float32Array(values);
  }, []);

  return (
    <Float speed={0.35} floatIntensity={0.08} rotationIntensity={0.01}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.18} color="#dcecff" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>
    </Float>
  );
}

export default function Scene6FooterStage({ viewport }: { viewport: ViewportMode }) {
  const sceneScale = viewport === "mobile" ? 0.76 : viewport === "tablet" ? 0.92 : 1;
  const sceneOffsetY = viewport === "mobile" ? 1.6 : viewport === "tablet" ? 0.45 : 0;
  const arcScale = viewport === "mobile" ? 0.88 : 1;

  return (
    <group position={FOOTER_CENTER}>
      <group position={[0, sceneOffsetY, 0]} scale={sceneScale}>
        <ambientLight intensity={0.14} color="#eef4ff" />
        <pointLight position={[-8, 3, 4]} intensity={0.7} distance={18} decay={2} color="#ffbd69" />
        <pointLight position={[8, 4, 4]} intensity={0.7} distance={18} decay={2} color="#82b4ff" />

        <FooterGlow position={[0, -4.4, -7]} scale={[12, 4.8, 1]} color="#ffb862" opacity={0.016} />
        <FooterGlow position={[0, -4.8, -7.2]} scale={[15.5, 6.4, 1]} color="#7fb2ff" opacity={0.012} />

        <HorizonArc radiusX={20 * arcScale} radiusY={4.8 * arcScale} position={[0, -4.1, -3.8]} opacity={0.16} />
        <HorizonArc radiusX={16.2 * arcScale} radiusY={3.4 * arcScale} position={[0, -4.35, -3.95]} opacity={0.1} />
        <HorizonArc radiusX={12.8 * arcScale} radiusY={2.5 * arcScale} position={[0, -4.55, -4.1]} opacity={0.07} />
        <SparkCluster />
      </group>
    </group>
  );
}
