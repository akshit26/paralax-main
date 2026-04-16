"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import ProximityHtml from "../ProximityHtml";

type OrbitConfig = {
  modelUrl: string;
  label: string;
  radius: number;
  speed: number;
  scale: number;
  angleOffset: number;
};

// Keep the whole solar system close to camera and in an XY-facing layout.
const SOLAR_CENTER: [number, number, number] = [0, -82, -26];

const ORBITS: OrbitConfig[] = [
  { modelUrl: "/planet1.glb", label: "AI\nAUTOMATION", radius: 7, speed: 0.38, scale: 0.85, angleOffset: 0.4 },
  { modelUrl: "/planet2.glb", label: "WEB\nDEVELOPMENT", radius: 10, speed: 0.28, scale: 0.95, angleOffset: 1.8 },
  { modelUrl: "/planet3.glb", label: "PERFORMANCE\nMARKETING", radius: 13, speed: 0.2, scale: 1.0, angleOffset: 2.8 },
  { modelUrl: "/planet4.glb", label: "CONTENT\nMARKETING", radius: 16, speed: 0.14, scale: 1.12, angleOffset: 4.2 },
];

function Sun() {
  const { scene } = useGLTF("/sun.glb");
  const ref = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material && "emissive" in child.material) {
        child.material = child.material.clone() as THREE.Material;
        (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color("#ffaa33");
        (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.2;
      }
    });
    return clone;
  }, [scene]);

  useFrame((_state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });

  return (
    <group ref={ref} scale={1.6}>
      <primitive object={clonedScene} />
      <pointLight intensity={16} color="#ffd38a" distance={90} decay={1.4} />
    </group>
  );
}

function OrbitPlanet({ modelUrl, label, radius, speed, scale, angleOffset }: OrbitConfig) {
  const { scene } = useGLTF(modelUrl);
  const orbitRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useFrame((_state, delta) => {
    if (orbitRef.current) orbitRef.current.rotation.z += delta * speed;
    if (planetRef.current) planetRef.current.rotation.y += delta * (hovered ? 0.9 : 0.45);
  });

  return (
    <group ref={orbitRef} rotation={[0, 0, angleOffset]}>
      <mesh>
        <ringGeometry args={[radius - 0.05, radius + 0.05, 96]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>

      <Float speed={1.1} floatIntensity={0.5} rotationIntensity={0.18}>
        <group
          ref={planetRef}
          position={[radius, 0, 0]}
          scale={hovered ? scale * 1.1 : scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          <primitive object={clonedScene} />

          <ProximityHtml
            targetPosition={SOLAR_CENTER}
            position={[0, scale * 2.35, 0]}
            range={62}
            distanceFactor={10}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: hovered ? -8 : 0, scale: hovered ? 1.09 : 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 800,
                fontSize: "1.05rem",
                lineHeight: 1.15,
                letterSpacing: "1px",
                textTransform: "uppercase",
                textAlign: "center",
                textShadow: "0px 2px 14px rgba(0,0,0,0.95)",
                whiteSpace: "pre-line",
                padding: "0.35rem 0.55rem",
                borderRadius: "10px",
                background: "linear-gradient(180deg, rgba(8,13,34,0.75), rgba(8,13,34,0.4))",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              {label}
            </motion.div>
          </ProximityHtml>
        </group>
      </Float>
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
    <group position={SOLAR_CENTER}>
      <Sun />
      {ORBITS.map((orbit) => (
        <OrbitPlanet key={orbit.modelUrl} {...orbit} />
      ))}
    </group>
  );
}
