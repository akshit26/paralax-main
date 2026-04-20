"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { SCENE_CENTERS, type ViewportMode } from "../experienceConfig";

const CONTACT_CENTER = SCENE_CENTERS.contact;

function PulseRing({
  position,
  baseScale,
  color,
  speed,
  delay,
}: {
  position: [number, number, number];
  baseScale: number;
  color: string;
  speed: number;
  delay: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const pulse = (Math.sin(state.clock.getElapsedTime() * speed + delay) + 1) * 0.5;
    const scale = baseScale + pulse * 0.5;
    ringRef.current.scale.setScalar(scale);
    const material = ringRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = 0.08 + pulse * 0.06;
  });

  return (
    <mesh ref={ringRef} position={position}>
      <ringGeometry args={[1.7, 1.92, 96]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function TransmissionPath() {
  const positions = useMemo(
    () =>
      new Float32Array([
        -14.2, 0.6, 0.3,
        -9.2, 3.2, -1.2,
        -2.8, 1.6, -0.8,
        5.8, 5.4, -1.1,
        12.6, 2.8, -1.4,
        19.2, 4.8, -1.6,
      ]),
    []
  );

  return (
    <group>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#9fc8ff" transparent opacity={0.22} toneMapped={false} />
      </line>

      {Array.from({ length: positions.length / 3 }).map((_, index) => (
        <mesh
          key={`transmission-node-${index}`}
          position={[positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2]]}
          scale={index === 0 ? 0.2 : 0.13}
        >
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#dcecff" : "#ffc36b"} transparent opacity={0.88} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function BeaconCore() {
  return (
    <Float speed={0.42} floatIntensity={0.12} rotationIntensity={0.01}>
      <group position={[-14.4, -0.4, -0.8]}>
        <mesh position={[0, 0, 0]} scale={[0.92, 0.92, 0.92]}>
          <sphereGeometry args={[1, 28, 28]} />
          <meshBasicMaterial color="#ffbd69" transparent opacity={0.8} toneMapped={false} />
        </mesh>

        <mesh position={[0, 0, -0.6]} scale={[2.8, 2.8, 1]}>
          <circleGeometry args={[1, 56]} />
          <meshBasicMaterial
            color="#ffbd69"
            transparent
            opacity={0.04}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        <mesh position={[0.12, 0.18, 1.2]} scale={[0.12, 1.9, 0.12]}>
          <cylinderGeometry args={[1, 1, 1, 12]} />
          <meshBasicMaterial color="#d9ebff" transparent opacity={0.78} toneMapped={false} />
        </mesh>

        <pointLight position={[0, 0.5, 1.3]} intensity={1.8} distance={14} decay={2} color="#ffbd69" />
      </group>
    </Float>
  );
}

function FloatingRelay({
  position,
  tint,
}: {
  position: [number, number, number];
  tint: string;
}) {
  return (
    <Float speed={0.5} floatIntensity={0.18} rotationIntensity={0.05}>
      <group position={position}>
        <mesh scale={[1.8, 1.1, 0.18]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color="#10192a" transparent opacity={0.24} toneMapped={false} />
        </mesh>
        <mesh scale={[1.96, 1.26, 0.05]} position={[0, 0, -0.08]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={tint} transparent opacity={0.08} toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.16]} scale={[0.38, 0.38, 0.38]}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial color={tint} transparent opacity={0.92} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

export default function Scene5Contact({ viewport }: { viewport: ViewportMode }) {
  const sceneScale = viewport === "mobile" ? 0.7 : viewport === "tablet" ? 0.9 : 1;
  const sceneOffsetX = viewport === "mobile" ? 2.6 : viewport === "tablet" ? 0.8 : 0;
  const sceneOffsetY = viewport === "mobile" ? 1.2 : viewport === "tablet" ? 0.35 : 0;

  return (
    <group position={CONTACT_CENTER}>
      <group position={[sceneOffsetX, sceneOffsetY, 0]} scale={sceneScale}>
        <ambientLight intensity={0.16} color="#f5f9ff" />
        <pointLight position={[-12, 4, 4]} intensity={1.2} distance={22} decay={2} color="#ffbe74" />
        <pointLight position={[17, 5.4, 4]} intensity={0.95} distance={26} decay={2} color="#7eb4ff" />

        <mesh position={[15.8, 1, -5.6]} scale={[7.4, 7.4, 1]}>
          <circleGeometry args={[1, 72]} />
          <meshBasicMaterial
            color="#6da6ff"
            transparent
            opacity={0.018}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        <PulseRing position={[-14.4, -0.2, -1.4]} baseScale={1.25} color="#ffbd69" speed={1.8} delay={0} />
        <PulseRing position={[-14.4, -0.2, -1.42]} baseScale={1.95} color="#ffbd69" speed={1.35} delay={1.5} />
        <PulseRing position={[-14.4, -0.2, -1.44]} baseScale={2.65} color="#9ec8ff" speed={1.05} delay={2.2} />

        <BeaconCore />
        <TransmissionPath />
        <FloatingRelay position={[4.2, 5.8, -2.2]} tint="#8ebcff" />
        <FloatingRelay position={[14.8, 3.2, -2.7]} tint="#ffbd69" />
        <FloatingRelay position={[20.6, 5.2, -3.1]} tint="#a4ccff" />
      </group>
    </group>
  );
}
