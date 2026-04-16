"use client";

import { useRef, useMemo, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture, Float, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import ProximityHtml from "../ProximityHtml";

/* ═══════════════════════════════════════════
   SCENE 1 — DEEP SPACE  (z = 0 → -55)
   Minimal, sleek composition using golden ratio
   placement. Free asteroids loaded from public/
   ═══════════════════════════════════════════ */

/* ── Milky Way backdrop ── */
// Removed SpaceBackdrop to use global CSS stars

/* ── Interactable Asteroid ──
   Loads .glb model. Gently floats on its own; 
   on hover it scales up. On click, it flicks away. */
function Asteroid({
  position,
  size = 1,
  modelIndex = 1,
}: {
  position: [number, number, number];
  size?: number;
  modelIndex?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [flicked, setFlicked] = useState(false);
  const velocity = useRef(new THREE.Vector3());

  // Load the corresponding GLB user added
  const modelUrl = modelIndex === 1 ? "/asteroid_1.glb" : "/asteroid_2.glb";
  const { scene } = useGLTF(modelUrl);
  
  // Clone the scene and its materials so each asteroid instance is independent
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        child.material = child.material.clone() as THREE.Material;
        // Inject an emissive property to enable glowing interaction
        if ('emissive' in child.material) {
            (child.material as THREE.MeshStandardMaterial).emissive = new THREE.Color("#6a5acd");
            (child.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.1;
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    if (flicked) {
      // Flick away rapidly
      groupRef.current.position.add(velocity.current.clone().multiplyScalar(delta));
      groupRef.current.rotation.x += delta * 12;
      groupRef.current.rotation.y += delta * 12;
      groupRef.current.rotation.z += delta * 12;
    } else {
      // Normal idle/hover state
      groupRef.current.rotation.x += delta * (hovered ? 1.6 : 0.12);
      groupRef.current.rotation.y += delta * (hovered ? 1.2 : 0.08);

      const targetScale = hovered ? size * 1.25 : size;
      easing.damp3(groupRef.current.scale, targetScale, 0.15, delta);

      // Emissive glow dampening
      clonedScene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material && 'emissiveIntensity' in child.material) {
              easing.damp(child.material as any, "emissiveIntensity", hovered ? 1.5 : 0.1, 0.2, delta);
          }
      });
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (!flicked) {
      setFlicked(true);
      setHovered(false);
      // Shoot backwards and randomly to the sides
      velocity.current.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        -150 - Math.random() * 100
      );
    }
  };

  return (
    <Float speed={0.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <group
        ref={groupRef}
        position={position}
        scale={size}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

// Preload the requested models
useGLTF.preload("/asteroid_1.glb");
useGLTF.preload("/asteroid_2.glb");

/* ═══════════════════════════════════════════
   GOLDEN RATIO LAYOUT
   φ = 1.618
   5 asteroids placed at golden-ratio offsets.
   Centre is completely clear for the hero text.
   ═══════════════════════════════════════════ */

const ASTEROIDS: { pos: [number, number, number]; size: number; model: number }[] = [
  // Top-left — far from text, medium
  { pos: [-18, 40, -22], size: 1.4, model: 1 },
  // Right side — small accent, mid-depth
  { pos: [20, 35, -30], size: 1.0, model: 2 },
  // Bottom-left — tiny, far
  { pos: [-12, 22, -40], size: 0.7, model: 1 },
  // Far upper-right — small wisp
  { pos: [26, 42, -36], size: 0.5, model: 2 },
  // Deep centre-bottom — very small, adds depth
  { pos: [3, 20, -44], size: 0.4, model: 1 },
];

export default function Scene1MilkyWay() {
  return (
    <group>
      {/* Lighting — bright enough to illuminate the imported asteroids */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 35, 5]} intensity={6} color="#8b7bea" distance={100} decay={1.5} />
      <pointLight position={[15, 40, -15]} intensity={4} color="#5a9eff" distance={80} decay={1.5} />
      <pointLight position={[-15, 25, -25]} intensity={3} color="#9370db" distance={60} decay={2} />

      {/* Galactic backdrop */}
      {/* <SpaceBackdrop /> */}

      {/* Minimal asteroids — golden-ratio placed */}
      {ASTEROIDS.map((a, i) => (
        <Asteroid key={`ast-${i}`} position={a.pos} size={a.size} modelIndex={a.model} />
      ))}

      {/* ── HERO TEXT ── */}
      <ProximityHtml position={[0, 29.5, -12]} targetZ={-12} range={30} distanceFactor={10}>
        <div className="hero-container">
          <h1 className="hero-title">ZYFLUS</h1>
          <p className="hero-tagline">OUT OF THIS WORLD</p>
        </div>
      </ProximityHtml>
    </group>
  );
}
