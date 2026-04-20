"use client";

import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { SCENE_CENTERS, type ViewportMode } from "../experienceConfig";

const CLIENTS_CENTER = SCENE_CENTERS.clients;

const CONSTELLATION_POINTS: [number, number, number][] = [
  [8.2, 4.9, -1.8],
  [10.8, 1.5, -1.6],
  [14, 5.8, -1.9],
  [18, 3.4, -1.7],
  [16.2, -0.8, -1.8],
  [20.1, 0.6, -1.9],
];

function AstronautPlaceholder() {
  return (
    <Float speed={0.52} floatIntensity={0.14} rotationIntensity={0.02}>
      <group position={[-23.2, 0.56, 1.92]} scale={6.05}>
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.35, 24, 24]} />
          <meshBasicMaterial color="#eef4ff" toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.24, 0]} scale={[0.74, 1.18, 0.54]}>
          <capsuleGeometry args={[0.28, 0.88, 8, 16]} />
          <meshBasicMaterial color="#dbe6ff" toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

function cloneMaterial(material: THREE.Material, meshIndex: number) {
  const fallbackPalette = ["#f2f5fb", "#d9e4f4", "#2a3344", "#7ab4ff"];

  if (material instanceof THREE.MeshStandardMaterial || material instanceof THREE.MeshPhysicalMaterial) {
    const cloned = material.clone();

    if (cloned.map || cloned.emissiveMap || cloned.normalMap || cloned.metalnessMap || cloned.roughnessMap) {
      if (cloned.map) cloned.map.colorSpace = THREE.SRGBColorSpace;
      cloned.envMapIntensity = 1.1;
      cloned.needsUpdate = true;
      return cloned;
    }
  }

  return new THREE.MeshStandardMaterial({
    color: fallbackPalette[Math.min(meshIndex, fallbackPalette.length - 1)],
    roughness: meshIndex === 2 ? 0.24 : 0.54,
    metalness: meshIndex === 2 ? 0.42 : 0.12,
    emissive:
      meshIndex === 3 ? new THREE.Color("#7ab4ff").multiplyScalar(0.22) : new THREE.Color("#000000"),
    emissiveIntensity: meshIndex === 3 ? 0.45 : 0,
    side: THREE.DoubleSide,
  });
}

function AstronautModel() {
  const { scene } = useGLTF("/astronaut.glb");
  const astronautRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => {
    const clone = cloneSkeleton(scene) as THREE.Group;
    let meshIndex = 0;

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.frustumCulled = false;
      child.castShadow = false;
      child.receiveShadow = false;

      if (Array.isArray(child.material)) {
        child.material = child.material.map((material) => cloneMaterial(material, meshIndex));
      } else if (child.material) {
        child.material = cloneMaterial(child.material, meshIndex);
      }

      meshIndex += 1;
    });

    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    clone.position.sub(center);
    clone.position.y += size.y * 0.08;

    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!astronautRef.current) return;
    const t = state.clock.getElapsedTime();
    astronautRef.current.position.y = 0.42 + Math.sin(t * 0.8) * 0.2;
    astronautRef.current.rotation.z = -0.06 + Math.sin(t * 0.42) * 0.03;
    astronautRef.current.rotation.y = 0.36 + Math.sin(t * 0.34) * 0.06;
    astronautRef.current.rotation.x = 0.05 + Math.cos(t * 0.36) * 0.022;
  });

  return (
    <Float speed={0.44} floatIntensity={0.08} rotationIntensity={0.012}>
      <group ref={astronautRef} position={[-23.2, 0.56, 1.92]} scale={6.8}>
        <primitive object={clonedScene} />

        <mesh position={[0.05, 0.18, -0.7]} scale={[1.02, 1.18, 1]}>
          <circleGeometry args={[1, 56]} />
          <meshBasicMaterial
            color="#83b8ff"
            transparent
            opacity={0.026}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        <pointLight position={[0.55, 0.62, 1.9]} intensity={2.3} distance={8.6} decay={2} color="#edf5ff" />
        <pointLight position={[-1.3, 0.05, 1.2]} intensity={1.1} distance={7.8} decay={2} color="#78afff" />
      </group>
    </Float>
  );
}

function Astronaut() {
  return (
    <Suspense fallback={<AstronautPlaceholder />}>
      <AstronautModel />
    </Suspense>
  );
}

function SubtleGlow({
  position,
  scale,
  color,
  opacity,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  opacity: number;
}) {
  return (
    <mesh position={position} scale={scale}>
      <circleGeometry args={[1, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
}

function ClientConstellation() {
  const linePositions = useMemo(() => {
    const pairs = [
      [CONSTELLATION_POINTS[0], CONSTELLATION_POINTS[1]],
      [CONSTELLATION_POINTS[1], CONSTELLATION_POINTS[2]],
      [CONSTELLATION_POINTS[2], CONSTELLATION_POINTS[3]],
      [CONSTELLATION_POINTS[2], CONSTELLATION_POINTS[4]],
      [CONSTELLATION_POINTS[3], CONSTELLATION_POINTS[5]],
    ];

    return new Float32Array(
      pairs.flatMap(([a, b]) => [a[0], a[1], a[2], b[0], b[1], b[2]])
    );
  }, []);

  return (
    <group>
      <SubtleGlow position={[14.5, 2.2, -4.1]} scale={2.2} color="#4d81d7" opacity={0.026} />

      {CONSTELLATION_POINTS.map((point, index) => (
        <group key={index} position={point}>
          <mesh>
            <sphereGeometry args={[0.115, 12, 12]} />
            <meshBasicMaterial color="#c7deff" transparent opacity={0.9} toneMapped={false} />
          </mesh>
          <mesh scale={1.8}>
            <sphereGeometry args={[0.115, 10, 10]} />
            <meshBasicMaterial
              color="#6aa8ff"
              transparent
              opacity={0.05}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#b5d1ff" transparent opacity={0.16} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

export default function Scene3Sky({ viewport }: { viewport: ViewportMode }) {
  const sceneScale = viewport === "mobile" ? 0.78 : viewport === "tablet" ? 0.9 : 1;
  const sceneOffsetX = viewport === "mobile" ? 2.2 : viewport === "tablet" ? 1 : 0;

  return (
    <group position={CLIENTS_CENTER}>
      <group position={[sceneOffsetX, 0, 0]} scale={sceneScale}>
        <hemisphereLight position={[0, 6, 3]} intensity={0.34} color="#e4eeff" groundColor="#04070d" />
        <directionalLight position={[-2.4, 5.7, 5]} intensity={0.46} color="#ffffff" />

        <SubtleGlow position={[-22.9, 0.96, -4.2]} scale={3.2} color="#ffb347" opacity={0.04} />
        <SubtleGlow position={[-22.6, 0.5, -4.1]} scale={2.5} color="#79b0ff" opacity={0.02} />
        <Astronaut />
        <ClientConstellation />
      </group>
    </group>
  );
}
