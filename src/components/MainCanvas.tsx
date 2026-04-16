"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Scene1MilkyWay from "./scenes/Scene1MilkyWay";
import Scene2Earth from "./scenes/Scene2Earth";

gsap.registerPlugin(ScrollTrigger);

const CAMERA_START_Y = 30;
const CAMERA_END_Y = -96;

function CameraController() {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!group.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.to(group.current.position, { y: CAMERA_END_Y, ease: "none" }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <group ref={group} position={[0, CAMERA_START_Y, 0]}>
      <PerspectiveCamera makeDefault fov={70} position={[0, 0, 0]} near={0.1} far={1000} />
    </group>
  );
}

export default function MainCanvas() {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} color="#ffffff" />
          <directionalLight position={[5, 20, 5]} intensity={0.35} color="#fff8e0" />

          <Scene1MilkyWay />
          <Scene2Earth />

          <CameraController />
          <Preload all />

          <EffectComposer>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
