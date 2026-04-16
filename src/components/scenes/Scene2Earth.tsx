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
  { modelUrl: "/planet1.glb", label: "AI AUTOMATION", radius: 7, speed: 0.38, scale: 0.85, angleOffset: 0.4 },
  { modelUrl: "/planet2.glb", label: "WEB DEVELOPMENT", radius: 10, speed: 0.28, scale: 0.95, angleOffset: 1.8 },
  { modelUrl: "/planet3.glb", label: "PERFORMANCE MARKETING", radius: 13, speed: 0.2, scale: 1.0, angleOffset: 2.8 },
  { modelUrl: "/planet4.glb", label: "CONTENT MARKETING", radius: 16, speed: 0.14, scale: 1.12, angleOffset: 4.2 },
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

  // Planet colors for each orbit
  const planetColors = ["#4488ee", "#ff6688", "#44bb44", "#ffdd44"];
  const colorIndex = ORBITS.findIndex((o) => o.modelUrl === modelUrl);
  const planetColor = planetColors[colorIndex] || "#ffffff";

  return (
    <group ref={orbitRef} rotation={[0, 0, angleOffset]}>
      {/* Enhanced orbit ring with glow */}
      <mesh>
        <ringGeometry args={[radius - 0.08, radius + 0.08, 128]} />
        <meshBasicMaterial color={planetColor} transparent opacity={hovered ? 0.35 : 0.15} />
      </mesh>

      {/* Subtle outer glow ring */}
      <mesh>
        <ringGeometry args={[radius - 0.15, radius - 0.05, 128]} />
        <meshBasicMaterial color={planetColor} transparent opacity={hovered ? 0.2 : 0.08} />
      </mesh>

      <Float speed={1.1} floatIntensity={0.5} rotationIntensity={0.18}>
        <group
          ref={planetRef}
          position={[radius, 0, 0]}
          scale={hovered ? scale * 1.15 : scale}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
            setHovered(true);
          }}
          onPointerOut={() => {
            document.body.style.cursor = "default";
            setHovered(false);
          }}
        >
          <primitive object={clonedScene} />
          {/* Planet glow effect */}
          <pointLight
            intensity={hovered ? 3 : 1.5}
            color={planetColor}
            distance={8}
            decay={2}
          />
        </group>
      </Float>

      {/* Label container positioned above the planet */}
      <group position={[radius, radius + scale * 3, 0]}>
        <ProximityHtml targetPosition={SOLAR_CENTER} position={[0, 0, 0]} range={100} distanceFactor={10}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: hovered ? -8 : 0,
              scale: hovered ? 1.08 : 1
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              pointerEvents: "auto",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Planet name label */}
            <div
              style={{
                color: "white",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textAlign: "center",
                textShadow: "0 0 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.7)",
                padding: "6px 12px",
                background: hovered ? `rgba(255,255,255,0.1)` : "rgba(0,0,0,0.3)",
                borderRadius: "16px",
                border: hovered ? `1.5px solid ${planetColor}` : "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
                minWidth: "120px",
                cursor: "pointer",
              }}
            >
              {label}
            </div>

            {/* EXPLORE button - appears on hover */}
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 5, scale: hovered ? 1 : 0.9 }}
              transition={{ duration: 0.25 }}
              style={{
                color: planetColor,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "4px 10px",
                background: `linear-gradient(135deg, ${planetColor}33, ${planetColor}11)`,
                borderRadius: "10px",
                border: `1px solid ${planetColor}`,
                boxShadow: hovered ? `0 0 20px ${planetColor}66, inset 0 0 10px ${planetColor}22` : "none",
                cursor: "pointer",
              }}
            >
              ⬤ EXPLORE
            </motion.div>
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
