"use client";

import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import ProximityHtml from "../ProximityHtml";
import { SCENE_CENTERS } from "../experienceConfig";

type OrbitConfig = {
  modelUrl?: string;
  labelLines: string[];
  semiMajor: number;
  semiMinor: number;
  phase: number;
  orbitSpeed: number;
  scale: number;
  zOffset: number;
  labelWidth: number;
  hasRing?: boolean;
  proceduralVariant?: "signal";
};

const SOLAR_CENTER = SCENE_CENTERS.services;
const ORBIT_COLOR = "#d9dfeb";
const ORBIT_DEPTH = -1.8;

const ORBITS: OrbitConfig[] = [
  {
    modelUrl: "/planet1.glb",
    labelLines: ["AI", "AUTOMATION"],
    semiMajor: 10.6,
    semiMinor: 6.4,
    phase: 2.15,
    orbitSpeed: 0.016,
    scale: 2.1,
    zOffset: 0.7,
    labelWidth: 220,
  },
  {
    modelUrl: "/planet2.glb",
    labelLines: ["WEB", "DEVELOPMENT"],
    semiMajor: 18.8,
    semiMinor: 10.8,
    phase: 3.92,
    orbitSpeed: 0.01,
    scale: 2.35,
    zOffset: 1.1,
    labelWidth: 240,
  },
  {
    labelLines: ["PERFORMANCE", "MARKETING"],
    semiMajor: 14.8,
    semiMinor: 8.3,
    phase: 5.24,
    orbitSpeed: 0.013,
    scale: 2.15,
    zOffset: 1.05,
    labelWidth: 250,
    hasRing: true,
    proceduralVariant: "signal",
  },
  {
    modelUrl: "/planet4.glb",
    labelLines: ["CONTENT", "MARKETING"],
    semiMajor: 21.5,
    semiMinor: 12.4,
    phase: 0.46,
    orbitSpeed: 0.008,
    scale: 2.95,
    zOffset: 1.35,
    labelWidth: 260,
  },
];

function Sun() {
  const { scene } = useGLTF("/sun.glb");
  const ref = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material && "emissive" in child.material) {
        child.material = child.material.clone() as THREE.Material;
        const material = child.material as THREE.MeshStandardMaterial;
        material.emissive = new THREE.Color("#ffb347");
        material.emissiveIntensity = 0.18;
        material.roughness = Math.min(material.roughness ?? 0.6, 0.5);
        material.metalness = 0.02;
        material.needsUpdate = true;
      }
    });

    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    clone.position.sub(center);

    return clone;
  }, [scene]);

  useFrame((_state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.16;
  });

  return (
    <group ref={ref} scale={2.25} position={[0, 0.15, 0.75]}>
      <primitive object={clonedScene} />
      <directionalLight position={[5, 3, 8]} intensity={0.95} color="#fff0ca" />
      <directionalLight position={[-4, -1, 5]} intensity={0.28} color="#ffd58f" />
      <pointLight intensity={4.4} color="#ffd58f" distance={36} decay={2.15} />
    </group>
  );
}

function OrbitPath({
  semiMajor,
  semiMinor,
  hovered,
}: {
  semiMajor: number;
  semiMinor: number;
  hovered: boolean;
}) {
  const positions = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, semiMajor, semiMinor, 0, Math.PI * 2, false, 0);
    const points = curve.getPoints(220);
    return new Float32Array(points.flatMap((point) => [point.x, point.y, ORBIT_DEPTH]));
  }, [semiMajor, semiMinor]);

  return (
    <lineLoop>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={ORBIT_COLOR}
        transparent
        opacity={hovered ? 0.28 : 0.14}
        depthWrite={false}
        toneMapped={false}
      />
    </lineLoop>
  );
}

function PerformanceRing() {
  return (
    <>
      <mesh rotation={[1.14, 0.15, 0.4]} scale={1.96}>
        <ringGeometry args={[1.45, 2.15, 128]} />
        <meshBasicMaterial
          color="#edf1f7"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[1.14, 0.15, 0.4]} scale={2.22}>
        <ringGeometry args={[1.7, 2.45, 128]} />
        <meshBasicMaterial
          color="#edf1f7"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

function SignalPlanet() {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#556f93" roughness={0.48} metalness={0.18} />
      </mesh>

      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 42, 42]} />
        <meshStandardMaterial
          color="#cfdcf4"
          transparent
          opacity={0.08}
          roughness={0.2}
          metalness={0.08}
        />
      </mesh>

      {[
        { y: 0.32, color: "#ff9f43", scale: [0.98, 0.1, 0.98] as [number, number, number] },
        { y: 0.06, color: "#8fd0ff", scale: [1.02, 0.09, 1.02] as [number, number, number] },
        { y: -0.22, color: "#ffe9a8", scale: [0.94, 0.08, 0.94] as [number, number, number] },
      ].map((band) => (
        <mesh key={`${band.color}-${band.y}`} position={[0, band.y, 0]} scale={band.scale}>
          <torusGeometry args={[0.62, 0.12, 24, 120]} />
          <meshBasicMaterial color={band.color} transparent opacity={0.32} toneMapped={false} />
        </mesh>
      ))}

      <mesh position={[0.18, 0.18, 0.78]} scale={[0.28, 0.28, 0.12]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#f7fbff" transparent opacity={0.24} toneMapped={false} />
      </mesh>
    </group>
  );
}

function GltfPlanet({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return <primitive object={clonedScene} />;
}

function PlanetVisual({
  modelUrl,
  proceduralVariant,
}: {
  modelUrl?: string;
  proceduralVariant?: OrbitConfig["proceduralVariant"];
}) {
  if (proceduralVariant === "signal") {
    return <SignalPlanet />;
  }

  if (modelUrl) {
    return <GltfPlanet modelUrl={modelUrl} />;
  }

  return null;
}

function OrbitPlanet({
  modelUrl,
  proceduralVariant,
  labelLines,
  semiMajor,
  semiMinor,
  phase,
  orbitSpeed,
  scale,
  zOffset,
  labelWidth,
  hasRing = false,
}: OrbitConfig) {
  const orbitAngle = useRef(phase);
  const orbitPositionRef = useRef<THREE.Group>(null);
  const planetSpinRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_state, delta) => {
    orbitAngle.current += delta * orbitSpeed;

    if (orbitPositionRef.current) {
      orbitPositionRef.current.position.set(
        semiMajor * Math.cos(orbitAngle.current),
        semiMinor * Math.sin(orbitAngle.current),
        zOffset
      );
    }

    if (planetSpinRef.current) {
      planetSpinRef.current.rotation.y += delta * (hovered ? 0.22 : 0.12);
    }
  });

  return (
    <group>
      <OrbitPath semiMajor={semiMajor} semiMinor={semiMinor} hovered={hovered} />

      <Float speed={0.6} floatIntensity={0.12} rotationIntensity={0.02}>
        <group ref={orbitPositionRef}>
          <group scale={hovered ? scale * 1.045 : scale}>
            <group
              ref={planetSpinRef}
              onPointerOver={(event) => {
                event.stopPropagation();
                document.body.style.cursor = "pointer";
                setHovered(true);
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default";
                setHovered(false);
              }}
            >
              {hasRing ? <PerformanceRing /> : null}

              <PlanetVisual modelUrl={modelUrl} proceduralVariant={proceduralVariant} />
              <pointLight intensity={hovered ? 0.85 : 0.5} color="#f7fbff" distance={5.5} decay={2.25} />
            </group>

            <ProximityHtml
              targetPosition={SOLAR_CENTER}
              position={[0, 0, 1.5]}
              range={105}
              distanceFactor={6.6}
              sprite
            >
              <motion.div
                className="planet-title-overlay"
                style={{ width: `${labelWidth}px` }}
                animate={{ opacity: 1, scale: hovered ? 1.03 : 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {labelLines.map((line) => (
                  <span key={line} className="planet-title-line">
                    {line}
                  </span>
                ))}
              </motion.div>
            </ProximityHtml>
          </group>
        </group>
      </Float>
    </group>
  );
}

export default function Scene2Earth() {
  return (
    <group position={SOLAR_CENTER}>
      <Sun />
      {ORBITS.map((orbit, index) => (
        <OrbitPlanet key={orbit.modelUrl ?? orbit.labelLines.join("-") ?? String(index)} {...orbit} />
      ))}
    </group>
  );
}
