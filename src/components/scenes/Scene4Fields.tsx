"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { rangeFromSeed, seededRandom } from "@/utils/seededRandom";

/* ═══════════════════════════════════════════
   SCENE 4 — FIELDS  (z = -175 → -235)
   Rolling green hills, cartoon flowers,
   windmill, fence, butterflies
   ═══════════════════════════════════════════ */

/* Rolling Hill */
function Hill({ position, width = 20, height = 4, color = "#5aaa38" }: {
  position: [number, number, number]; width?: number; height?: number; color?: string;
}) {
  return (
    <group position={position}>
      {/* Outline */}
      <mesh scale={[1.02, 1.04, 1.02]}>
        <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#2a5a18" side={THREE.BackSide} />
      </mesh>
      {/* Hill body */}
      <mesh scale={[width, height, width * 0.6]}>
        <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* Cartoon Flower */
function Flower({ position, petalColor = "#ff6688" }: {
  position: [number, number, number]; petalColor?: string;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(s.clock.getElapsedTime() * 1.5 + position[0]) * 0.1;
    }
  });

  return (
    <group ref={ref} position={position}>
      {/* Stem */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.05, 0.8, 6]} />
        <meshBasicMaterial color="#44882a" />
      </mesh>
      {/* Petals */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh key={`p-${i}`}
            position={[Math.cos(angle) * 0.18, 0.85, Math.sin(angle) * 0.18]}>
            <sphereGeometry args={[0.12, 8, 6]} />
            <meshBasicMaterial color={petalColor} />
          </mesh>
        );
      })}
      {/* Center */}
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.08, 8, 6]} />
        <meshBasicMaterial color="#ffdd22" />
      </mesh>
    </group>
  );
}

/* Cartoon Windmill */
function Windmill({ position }: { position: [number, number, number] }) {
  const bladesRef = useRef<THREE.Group>(null);

  useFrame((s) => {
    if (bladesRef.current) bladesRef.current.rotation.z = s.clock.getElapsedTime() * 0.8;
  });

  return (
    <group position={position}>
      {/* Tower/body outline */}
      <mesh position={[0, 2.5, 0]} scale={[1, 1, 1]}>
        <boxGeometry args={[1.6, 5.2, 1.2]} />
        <meshBasicMaterial color="#222" side={THREE.BackSide} />
      </mesh>
      {/* Tower body */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[1.5, 5, 1]} />
        <meshBasicMaterial color="#d4a868" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 5.3, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[1.2, 1.5, 4]} />
        <meshBasicMaterial color="#cc4444" />
      </mesh>
      <mesh position={[0, 5.3, 0]} scale={1.05}>
        <coneGeometry args={[1.2, 1.5, 4]} />
        <meshBasicMaterial color="#222" side={THREE.BackSide} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.6, 0.51]}>
        <planeGeometry args={[0.6, 1.2]} />
        <meshBasicMaterial color="#6a4422" />
      </mesh>
      {/* Window */}
      <mesh position={[0, 3.2, 0.51]}>
        <circleGeometry args={[0.3, 12]} />
        <meshBasicMaterial color="#88ccff" />
      </mesh>
      {/* Blades */}
      <group ref={bladesRef} position={[0, 4, 0.6]}>
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh key={`blade-${i}`} rotation={[0, 0, angle]}
            position={[Math.cos(angle) * 1.5, Math.sin(angle) * 1.5, 0]}>
            <boxGeometry args={[0.3, 2.8, 0.05]} />
            <meshBasicMaterial color="#e8e0d0" />
          </mesh>
        ))}
        {/* Hub */}
        <mesh>
          <sphereGeometry args={[0.2, 8, 6]} />
          <meshBasicMaterial color="#888" />
        </mesh>
      </group>
    </group>
  );
}

/* Wooden Fence */
function Fence({ position, count = 8 }: {
  position: [number, number, number]; count?: number;
}) {
  return (
    <group position={position}>
      {/* Horizontal rail */}
      <mesh position={[count * 0.5, 0.6, 0]}>
        <boxGeometry args={[count * 1.1, 0.1, 0.08]} />
        <meshBasicMaterial color="#9a7744" />
      </mesh>
      <mesh position={[count * 0.5, 0.3, 0]}>
        <boxGeometry args={[count * 1.1, 0.1, 0.08]} />
        <meshBasicMaterial color="#9a7744" />
      </mesh>
      {/* Vertical posts */}
      {Array.from({ length: count }).map((_, i) => (
        <group key={`post-${i}`}>
          <mesh position={[i * 1.1, 0.55, 0]}>
            <boxGeometry args={[0.1, 1.2, 0.08]} />
            <meshBasicMaterial color="#8a6634" />
          </mesh>
          {/* Pointed top */}
          <mesh position={[i * 1.1, 1.2, 0]}>
            <coneGeometry args={[0.07, 0.15, 4]} />
            <meshBasicMaterial color="#8a6634" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Butterfly particles */
function Butterflies({ count = 15, zCenter = -205 }: { count?: number; zCenter?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const seed = i * 13.37 + zCenter * 0.1;
      a[i * 3] = rangeFromSeed(seed + 1, -15, 15);
      a[i * 3 + 1] = rangeFromSeed(seed + 2, 1, 6);
      a[i * 3 + 2] = zCenter + rangeFromSeed(seed + 3, -20, 20);
    }
    return a;
  }, [count, zCenter]);

  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.getElapsedTime();
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += Math.sin(t * 1.5 + i * 2) * 0.01;
      arr[i * 3 + 1] += Math.cos(t * 2 + i) * 0.008;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.25} color="#ff88cc" transparent opacity={0.8}
        sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function Scene4Fields() {
  const flowers = useMemo(() => {
    const arr: { pos: [number, number, number]; color: string }[] = [];
    const petalColors = ["#ff6688", "#ff88aa", "#ffaa44", "#ff4466", "#ee66cc", "#ffdd66"];
    for (let i = 0; i < 40; i++) {
      const seed = i * 17.71;
      arr.push({
        pos: [rangeFromSeed(seed + 1, -15, 15), 0, rangeFromSeed(seed + 2, -230, -180)],
        color: petalColors[Math.floor(seededRandom(seed + 3) * petalColors.length)],
      });
    }
    return arr;
  }, []);

  return (
    <group>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -205]}>
        <planeGeometry args={[80, 70]} />
        <meshBasicMaterial color="#5aaa38" />
      </mesh>

      {/* Rolling hills */}
      <Hill position={[-12, 0, -185]} width={15} height={3} color="#60b840" />
      <Hill position={[10, 0, -195]} width={18} height={4} color="#55a835" />
      <Hill position={[-8, 0, -210]} width={20} height={3.5} color="#4da830" />
      <Hill position={[15, 0, -225]} width={14} height={3} color="#58b040" />
      <Hill position={[0, 0, -230]} width={25} height={5} color="#50a035" />

      {/* Windmill */}
      <Windmill position={[8, 0, -195]} />

      {/* Fences */}
      <Fence position={[-10, 0, -188]} count={10} />
      <Fence position={[5, 0, -218]} count={8} />

      {/* Flowers */}
      {flowers.map((f, i) => (
        <Flower key={`fl-${i}`} position={f.pos} petalColor={f.color} />
      ))}

      {/* Butterflies */}
      <Butterflies count={20} zCenter={-205} />

      {/* Warm light */}
      <pointLight position={[0, 10, -200]} intensity={1} color="#ffe8c8" distance={40} />
    </group>
  );
}
