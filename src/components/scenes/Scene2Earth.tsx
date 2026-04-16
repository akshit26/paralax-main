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

const SOLAR_CENTER: [number, number, number] = [0, -96, -72];
// final merge choice: compact solar system in one viewport section

const ORBITS: OrbitConfig[] = [
  { modelUrl: "/planet1.glb", label: "AI\nAUTOMATION", radius: 12, speed: 0.2, scale: 1.0, angleOffset: 0.4 },
  { modelUrl: "/planet2.glb", label: "WEB\nDEVELOPMENT", radius: 18, speed: 0.15, scale: 1.15, angleOffset: 1.8 },
  { modelUrl: "/planet3.glb", label: "PERFORMANCE\nMARKETING", radius: 24, speed: 0.11, scale: 1.1, angleOffset: 2.8 },
  { modelUrl: "/planet4.glb", label: "CONTENT\nMARKETING", radius: 30, speed: 0.08, scale: 1.3, angleOffset: 4.2 },
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
    <group ref={ref} scale={2.3}>
      <primitive object={clonedScene} />
      <pointLight intensity={24} color="#ffd38a" distance={140} decay={1.4} />
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
    if (orbitRef.current) orbitRef.current.rotation.y += delta * speed;
    if (planetRef.current) planetRef.current.rotation.y += delta * (hovered ? 0.9 : 0.45);
  });

  return (
    <group ref={orbitRef} rotation={[0, angleOffset, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.05, 12, 100]} />
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
        </group>
      </Float>

      <group position={[radius, scale * 3.3, 0]}>
        <ProximityHtml targetPosition={SOLAR_CENTER} position={[0, 0, 0]} range={62} distanceFactor={12}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: hovered ? -6 : 0, scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              color: "white",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "1rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
              textAlign: "center",
              textShadow: "0px 2px 10px rgba(0,0,0,0.9)",
              whiteSpace: "pre-line",
            }}
          >
            {label}
          </motion.div>
        </ProximityHtml>
      </group>
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
