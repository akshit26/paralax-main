"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { rangeFromSeed } from "@/utils/seededRandom";

/* ═══════════════════════════════════════════
   SCENE 3 — SKY  (z = -115 → -175)
   Bright blue sky, puffy cartoon clouds,
   doodle sun with rays, birds
   ═══════════════════════════════════════════ */

/* Puffy Cartoon Cloud with outline */
function CartoonCloud({ position, scale = 1 }: {
  position: [number, number, number]; scale?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const driftSpeed = useMemo(() => rangeFromSeed(position[0] * 7 + position[1] * 11, 0.05, 0.15), [position]);
  const baseX = position[0];

  useFrame((s) => {
    if (ref.current) {
      ref.current.position.x = baseX + Math.sin(s.clock.getElapsedTime() * driftSpeed) * 2;
    }
  });

  // Cloud blob layout — overlapping spheres
  const blobs = useMemo(() => [
    { p: [0, 0, 0] as [number, number, number], r: 2 },
    { p: [-1.6, 0.3, 0.2] as [number, number, number], r: 1.7 },
    { p: [1.8, 0.2, -0.1] as [number, number, number], r: 1.8 },
    { p: [0, 0.9, 0] as [number, number, number], r: 1.4 },
    { p: [-0.8, 0.6, 0.3] as [number, number, number], r: 1.3 },
    { p: [1, 0.7, 0.2] as [number, number, number], r: 1.2 },
  ], []);

  return (
    <group ref={ref} position={position} scale={[scale, scale, scale]}>
      {blobs.map((b, i) => (
        <group key={i}>
          {/* Outline */}
          <mesh position={b.p} scale={1.05}>
            <sphereGeometry args={[b.r, 16, 12]} />
            <meshBasicMaterial color="#333" side={THREE.BackSide} />
          </mesh>
          {/* White body */}
          <mesh position={b.p}>
            <sphereGeometry args={[b.r, 16, 12]} />
            <meshBasicMaterial color="#f8f8ff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Cartoon Sun with triangular rays */
function CartoonSun({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.getElapsedTime() * 0.05;
  });

  return (
    <group position={position}>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[5, 24, 18]} />
        <meshBasicMaterial color="#fff4aa" transparent opacity={0.15} />
      </mesh>

      <group ref={ref}>
        {/* Sun body outline */}
        <mesh scale={1.06}>
          <sphereGeometry args={[3, 24, 18]} />
          <meshBasicMaterial color="#cc8800" side={THREE.BackSide} />
        </mesh>
        {/* Sun body */}
        <mesh>
          <sphereGeometry args={[3, 24, 18]} />
          <meshBasicMaterial color="#ffdd44" />
        </mesh>

        {/* Cartoon rays — triangles pointing outward */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i / 10) * Math.PI * 2;
          const dist = 4.2;
          return (
            <mesh key={`ray-${i}`}
              position={[Math.cos(angle) * dist, Math.sin(angle) * dist, 0]}
              rotation={[0, 0, angle - Math.PI / 2]}>
              <coneGeometry args={[0.8, 2, 3]} />
              <meshBasicMaterial color="#ffcc22" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* Simple V-shaped bird */
function Bird({ position, speed = 1 }: {
  position: [number, number, number]; speed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const baseX = position[0];

  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime();
    ref.current.position.x = baseX + Math.sin(t * speed * 0.3) * 8;
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
    // Wing-flap: rotate child meshes
    const wingAngle = Math.sin(t * speed * 4) * 0.3;
    ref.current.children[0].rotation.z = wingAngle;
    ref.current.children[1].rotation.z = -wingAngle;
  });

  return (
    <group ref={ref} position={position}>
      {/* Left wing */}
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.6, 0.06, 0.12]} />
        <meshBasicMaterial color="#333" />
      </mesh>
      {/* Right wing */}
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.6, 0.06, 0.12]} />
        <meshBasicMaterial color="#333" />
      </mesh>
    </group>
  );
}

/* Rainbow arc */
function Rainbow({ position }: { position: [number, number, number] }) {
  const colors = ["#ff4444", "#ff8844", "#ffdd44", "#44dd44", "#4488ff", "#6644cc", "#aa44cc"];
  return (
    <group position={position} rotation={[0, 0.3, 0]}>
      {colors.map((c, i) => (
        <mesh key={`rb-${i}`} rotation={[0, 0, 0]}>
          <torusGeometry args={[12 + i * 0.4, 0.18, 8, 32, Math.PI]} />
          <meshBasicMaterial color={c} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3Sky() {
  const clouds = useMemo(() => [
    { pos: [-12, 14, -150] as [number, number, number], s: 1.2 },
    { pos: [10, 18, -155] as [number, number, number], s: 1.5 },
    { pos: [-8, 10, -165] as [number, number, number], s: 1.0 },
    { pos: [14, 12, -170] as [number, number, number], s: 1.3 },
    { pos: [-15, 16, -175] as [number, number, number], s: 0.9 },
    { pos: [5, 8, -180] as [number, number, number], s: 1.4 },
    { pos: [-6, 20, -160] as [number, number, number], s: 1.1 },
    { pos: [18, 15, -185] as [number, number, number], s: 0.8 },
    { pos: [0, 6, -190] as [number, number, number], s: 1.6 },
    { pos: [-20, 11, -195] as [number, number, number], s: 1.0 },
  ], []);

  const birds = useMemo(() => [
    { pos: [5, 16, -155] as [number, number, number], speed: 0.8 },
    { pos: [-3, 18, -165] as [number, number, number], speed: 1.1 },
    { pos: [8, 14, -175] as [number, number, number], speed: 0.6 },
    { pos: [-10, 20, -160] as [number, number, number], speed: 0.9 },
    { pos: [2, 22, -170] as [number, number, number], speed: 1.3 },
  ], []);

  return (
    <group>
      {/* Cartoon Sun */}
      <CartoonSun position={[20, 25, -165]} />

      {/* Rainbow */}
      <Rainbow position={[-10, 6, -180]} />

      {/* Clouds */}
      {clouds.map((c, i) => (
        <CartoonCloud key={`cl-${i}`} position={c.pos} scale={c.s} />
      ))}

      {/* Birds */}
      {birds.map((b, i) => (
        <Bird key={`bird-${i}`} position={b.pos} speed={b.speed} />
      ))}
    </group>
  );
}
