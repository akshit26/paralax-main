"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import ProximityHtml from "../ProximityHtml";

type SectionConfig = {
  y: number;
  modelUrl: string;
  label: string;
  scale: number;
  glowColor?: string;
  glowIntensity?: number;
};

const SOLAR_SECTIONS: SectionConfig[] = [
  { y: -100, modelUrl: "/sun.glb", label: "INTRODUCTION TO\nSERVICES", scale: 2.1, glowColor: "#ffaa33", glowIntensity: 2.4 },
  { y: -162, modelUrl: "/planet1.glb", label: "AI\nAUTOMATION", scale: 1.3 },
  { y: -262, modelUrl: "/planet2.glb", label: "WEB\nDEVELOPMENT", scale: 1.45 },
  { y: -424, modelUrl: "/planet3.glb", label: "PERFORMANCE\nMARKETING", scale: 1.35 },
  { y: -686, modelUrl: "/planet4.glb", label: "CONTENT &\nINFLUENCER\nMARKETING", scale: 1.65 },
];

function SectionPlanet({ y, modelUrl, label, scale, glowColor, glowIntensity }: SectionConfig) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material = child.material.clone() as THREE.Material;
        if (glowColor && glowIntensity && "emissive" in child.material) {
          (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color(glowColor);
          (child.material as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity;
        }
      }
    });
    return clone;
  }, [glowColor, glowIntensity, scene]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * (hovered ? 0.95 : 0.45);
  });

  return (
    <group position={[0, y, -70]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8}>
        <group
          ref={groupRef}
          scale={hovered ? scale * 1.12 : scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <primitive object={clonedScene} />
        </group>
      </Float>

      <ProximityHtml
        position={[0, scale * 3.8, 0]}
        targetPosition={[0, y, -70]}
        range={58}
        distanceFactor={13}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: hovered ? -10 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            color: "white",
            fontFamily: "'Inter', sans-serif",
            fontWeight: "800",
            fontSize: "1.35rem",
            letterSpacing: "1px",
            textShadow: "0px 2px 12px rgba(0,0,0,0.8), 0px 0px 8px rgba(255,255,255,0.6)",
            whiteSpace: "pre-line",
            textAlign: "center",
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {label}
        </motion.div>
      </ProximityHtml>
    </group>
  );
}

useGLTF.preload("/sun.glb");
useGLTF.preload("/planet1.glb");
useGLTF.preload("/planet2.glb");
useGLTF.preload("/planet3.glb");
useGLTF.preload("/planet4.glb");

export default function Scene2Earth() {
  return (
    <group>
      {SOLAR_SECTIONS.map((section) => (
        <SectionPlanet key={`${section.modelUrl}-${section.y}`} {...section} />
      ))}
    </group>
  );
}
