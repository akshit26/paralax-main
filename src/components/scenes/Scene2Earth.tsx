"use client";

import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, useTexture } from "@react-three/drei";
import ProximityHtml from "../ProximityHtml";

/* ═══════════════════════════════════════════
   SCENE 2 — SOLAR SYSTEM SERVICES
   z = -55 → -115
   Shows central sun and 4 orbiting planets
   representing service categories.
   ═══════════════════════════════════════════ */

/* ── Central Sun ── */
function Sun() {
  const { scene } = useGLTF("/sun.glb");
  const sunRef = useRef<THREE.Group>(null);
  
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material = child.material.clone() as THREE.Material;
        if ('emissive' in child.material) {
            (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color("#ffaa33");
            (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 2.0;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((_state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={sunRef} scale={1.8}>
      <primitive object={clonedScene} />
      {/* Intense inner point light to illuminate planets */}
      <pointLight intensity={25} color="#fff1cc" distance={150} decay={1.5} />
      <pointLight intensity={10} color="#ff9c3a" distance={80} decay={2} />
    </group>
  );
}

/* ── Orbital Ring ── */
function OrbitRing({ radius }: { radius: number }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.05, 16, 120]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </mesh>
  );
}

/* ── Service Planet ── */
function ServicePlanet({ 
  modelUrl, 
  radius, 
  angle, 
  label, 
  scale = 1 
}: { 
  modelUrl: string; 
  radius: number; 
  angle: number; 
  label: string;
  scale?: number;
}) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Fixed position on orbit
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Slow idle rotation of the planet itself
      groupRef.current.rotation.y += delta * (hovered ? 0.8 : 0.4);
    }
  });

  return (
    <group position={[x, 0, z]}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group 
          ref={groupRef} 
          scale={hovered ? scale * 1.15 : scale}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
          onPointerOut={() => setHovered(false)}
        >
          <primitive object={clonedScene} />
        </group>
      </Float>
      
      {/* HTML Label floating above planet */}
      <ProximityHtml position={[0, scale * 3.5, 0]} targetZ={-85 + z} range={70} distanceFactor={14}>
        <div style={{
          color: "white",
          fontFamily: "'Inter', sans-serif",
          fontWeight: "800",
          fontSize: "1.4rem",
          letterSpacing: "1px",
          textShadow: "0px 2px 12px rgba(0,0,0,0.8), 0px 0px 8px rgba(255,255,255,0.6)",
          whiteSpace: "pre-line",
          textAlign: "center",
          textTransform: "uppercase",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: hovered ? "scale(1.1) translateY(-10px)" : "scale(1)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          {label}
          {hovered && (
             <div style={{ 
                fontSize: "0.85rem", 
                marginTop: "8px", 
                color: "#aaccff", 
                fontWeight: "600",
                letterSpacing: "2px",
                textShadow: "0px 2px 6px rgba(0,0,0,0.8)",
                opacity: 0.9,
             }}>
                KNOW MORE <span style={{ fontSize: "1.1rem", verticalAlign: "middle" }}>→</span>
             </div>
          )}
        </div>
      </ProximityHtml>
    </group>
  );
}

/* ── Deep Space Backdrop ── */
// Removed SpaceBackdrop to use global CSS stars


// Preload models
useGLTF.preload("/sun.glb");
useGLTF.preload("/planet1.glb");
useGLTF.preload("/planet2.glb");
useGLTF.preload("/planet3.glb");
useGLTF.preload("/planet4.glb");

export default function Scene2Earth() {
  // Center of our solar system
  const centerPos: [number, number, number] = [0, 18, -85];

  return (
    <group position={centerPos}>
      
      {/* Background that spans behind the solar system */}
      {/* <SpaceBackdrop /> */}

      {/* Tilt the entire solar system slightly forward so orbits look like nested ellipses */}
      <group rotation={[Math.PI * 0.18, 0, 0]}>
          <Sun />
          
          <OrbitRing radius={15} />
          <ServicePlanet modelUrl="/planet1.glb" radius={15} angle={Math.PI * 1.2} label="AI\nAUTOMATION" scale={1.2} />
          
          <OrbitRing radius={22} />
          <ServicePlanet modelUrl="/planet2.glb" radius={22} angle={Math.PI * 0.8} label="WEB\nDEVELOPMENT" scale={1.4} />
          
          <OrbitRing radius={30} />
          <ServicePlanet modelUrl="/planet3.glb" radius={30} angle={Math.PI * 0.15} label="PERFORMANCE\nMARKETING" scale={1.3} />
          
          <OrbitRing radius={42} />
          <ServicePlanet modelUrl="/planet4.glb" radius={42} angle={Math.PI * 1.8} label="CONTENT &\nINFLUENCER\nMARKETING" scale={1.6} />
      </group>
      
    </group>
  );
}
