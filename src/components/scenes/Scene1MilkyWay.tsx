"use client";

import { motion } from "framer-motion";
import * as THREE from "three";

import ProximityHtml from "../ProximityHtml";
import type { ViewportMode } from "../experienceConfig";
import { HERO } from "@/data/siteConfig";

function HeroGlow() {
  return (
    <>
      <mesh position={[-8, 34, -24]} scale={[10, 10, 1]}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color="#7aa4ff" transparent opacity={0.06} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
      <mesh position={[9, 26, -26]} scale={[8.5, 8.5, 1]}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color="#ffc56f" transparent opacity={0.05} blending={THREE.AdditiveBlending} toneMapped={false} />
      </mesh>
    </>
  );
}

export default function Scene1MilkyWay({ viewport }: { viewport: ViewportMode }) {
  const heroDistanceFactor = viewport === "mobile" ? 8.8 : viewport === "tablet" ? 9.4 : 10;

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={0.42} />
      <pointLight position={[0, 35, 4]} intensity={4.2} color="#8b7bea" distance={92} decay={1.7} />
      <pointLight position={[14, 28, -18]} intensity={3.4} color="#5a9eff" distance={72} decay={1.8} />
      <pointLight position={[-15, 25, -24]} intensity={2.4} color="#ffcf7b" distance={66} decay={1.9} />

      <HeroGlow />

      <ProximityHtml position={[0, 30, -12]} targetPosition={[0, 30, -12]} range={42} distanceFactor={heroDistanceFactor}>
        <motion.div
          className="hero-container"
          initial={{ opacity: 0, y: 22, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <h1 className="hero-title">{HERO.title}</h1>
          <p className="hero-tagline">{HERO.tagline}</p>
        </motion.div>
      </ProximityHtml>
    </group>
  );
}
