"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { SCENE_CENTERS, type ViewportMode } from "../experienceConfig";

const CASE_STUDIES_CENTER = SCENE_CENTERS.caseStudies;

function GlowDisc({
  position,
  color,
  scale,
  opacity,
}: {
  position: [number, number, number];
  color: string;
  scale: [number, number, number];
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

function DataFrame({
  position,
  rotation,
  accent,
  floatOffset,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  accent: string;
  floatOffset: number;
}) {
  const frameRef = useRef<THREE.Group>(null);

  const graphPositions = useMemo(
    () =>
      new Float32Array([
        -1.82, -0.66, 0.06,
        -0.92, -0.18, 0.06,
        -0.2, -0.42, 0.06,
        0.78, 0.2, 0.06,
        1.68, 0.74, 0.06,
      ]),
    []
  );

  useFrame((state) => {
    if (!frameRef.current) return;
    const t = state.clock.getElapsedTime() * 0.45 + floatOffset;
    frameRef.current.rotation.z = rotation[2] + Math.sin(t) * 0.018;
    frameRef.current.rotation.y = rotation[1] + Math.cos(t * 1.2) * 0.03;
  });

  return (
    <Float speed={0.45} floatIntensity={0.12} rotationIntensity={0.018}>
      <group ref={frameRef} position={position} rotation={rotation}>
        <mesh scale={[5.8, 3.8, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#0d1420" transparent opacity={0.2} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0, -0.05]} scale={[6.02, 4.02, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#6e92cf" transparent opacity={0.055} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        <mesh position={[-1.42, 1.1, 0.04]} scale={[1.8, 0.14, 1]}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={accent} transparent opacity={0.48} toneMapped={false} />
        </mesh>

        {[-1.62, -0.78, 0.08, 0.92].map((x, index) => (
          <mesh
            key={`${accent}-bar-${index}`}
            position={[x, -0.86 + (index * 0.16), 0.04]}
            scale={[0.38, 0.86 + index * 0.34, 0.2]}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={accent} transparent opacity={0.2 + index * 0.08} toneMapped={false} />
          </mesh>
        ))}

        <line>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[graphPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={accent} transparent opacity={0.62} toneMapped={false} />
        </line>

        {Array.from({ length: graphPositions.length / 3 }).map((_, index) => (
          <mesh
            key={`${accent}-node-${index}`}
            position={[
              graphPositions[index * 3],
              graphPositions[index * 3 + 1],
              graphPositions[index * 3 + 2],
            ]}
            scale={0.14}
          >
            <sphereGeometry args={[1, 10, 10]} />
            <meshBasicMaterial color="#d9ebff" transparent opacity={0.9} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function TelemetryArc({
  radiusX,
  radiusY,
  rotation,
  opacity,
}: {
  radiusX: number;
  radiusY: number;
  rotation: [number, number, number];
  opacity: number;
}) {
  const positions = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, radiusX, radiusY, Math.PI * 0.16, Math.PI * 0.9, false, 0);
    const points = curve.getPoints(120);
    return new Float32Array(points.flatMap((point) => [point.x, point.y, 0]));
  }, [radiusX, radiusY]);

  return (
    <group rotation={rotation}>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#8ab7ff" transparent opacity={opacity} toneMapped={false} />
      </line>
    </group>
  );
}

export default function Scene4CaseStudies({ viewport }: { viewport: ViewportMode }) {
  const sceneScale = viewport === "mobile" ? 0.76 : viewport === "tablet" ? 0.88 : 1;
  const sceneOffsetX = viewport === "mobile" ? 2.8 : viewport === "tablet" ? 1.2 : 0;

  return (
    <group position={CASE_STUDIES_CENTER}>
      <group position={[sceneOffsetX, 0, 0]} scale={sceneScale}>
        <ambientLight intensity={0.2} color="#f4f8ff" />
        <pointLight position={[-14, 2.6, 5]} intensity={1.3} distance={26} decay={2} color="#ffbd69" />
        <pointLight position={[15, 4.2, 3]} intensity={1.1} distance={28} decay={2} color="#83b8ff" />

        <GlowDisc position={[-10.8, 0.6, -5.2]} color="#ffb347" scale={[5.8, 5.8, 1]} opacity={0.032} />
        <GlowDisc position={[16.4, 1.8, -5.8]} color="#82b2ff" scale={[6.4, 6.4, 1]} opacity={0.024} />

        <group position={[7.8, 0.8, -4.8]}>
          <TelemetryArc radiusX={9.8} radiusY={4.4} rotation={[0.1, 0.08, 0]} opacity={0.16} />
          <TelemetryArc radiusX={8} radiusY={3.2} rotation={[-0.1, -0.04, 0.06]} opacity={0.11} />
        </group>

        <DataFrame position={[13.8, 5.4, -3.8]} rotation={[-0.12, -0.4, -0.12]} accent="#8bb8ff" floatOffset={0.5} />
        <DataFrame position={[18.8, -0.6, -4.1]} rotation={[0.08, -0.48, 0.14]} accent="#ffbd69" floatOffset={1.2} />
        <DataFrame position={[11.2, -5.1, -4.6]} rotation={[0.02, -0.3, -0.08]} accent="#a5cbff" floatOffset={2.1} />
      </group>
    </group>
  );
}
