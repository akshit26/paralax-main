"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, startTransition, useEffect, useState, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

import { CAMERA_STAGE_Y, EXPERIENCE_STAGE_EVENT, SCROLL_SNAP_POINTS, stageFromProgress, type SceneStage } from "./experienceConfig";
import Scene1MilkyWay from "./scenes/Scene1MilkyWay";
import Scene2Earth from "./scenes/Scene2Earth";
import Scene3Sky from "./scenes/Scene3Sky";
import Scene4CaseStudies from "./scenes/Scene4CaseStudies";
import Scene5Contact from "./scenes/Scene5Contact";
import Scene6FooterStage from "./scenes/Scene6FooterStage";

gsap.registerPlugin(ScrollTrigger);

function CameraController({ onStageChange }: { onStageChange: (stage: SceneStage) => void }) {
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!group.current) return;

    let currentStage = 0 as SceneStage;
    const updateStage = (progress: number) => {
      const nextStage = stageFromProgress(progress);
      if (nextStage !== currentStage) {
        currentStage = nextStage;
        window.dispatchEvent(new CustomEvent(EXPERIENCE_STAGE_EVENT, { detail: { stage: nextStage } }));
        onStageChange(nextStage);
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.55,
        onUpdate: (self) => updateStage(self.progress),
        snap: {
          snapTo: [...SCROLL_SNAP_POINTS],
          duration: 0.28,
        },
      },
    });

    CAMERA_STAGE_Y.slice(1).forEach((targetY, index) => {
      tl.to(
        group.current!.position,
        {
          y: targetY,
          duration: 0.2,
          ease: "power2.inOut",
        },
        index * 0.2
      );
    });

    tl.to(group.current.position, { y: CAMERA_STAGE_Y[CAMERA_STAGE_Y.length - 1], duration: 0.12, ease: "none" }, 1);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [onStageChange]);

  return (
    <group ref={group} position={[0, CAMERA_STAGE_Y[0], 0]}>
      <PerspectiveCamera makeDefault fov={70} position={[0, 0, 0]} near={0.1} far={1000} />
    </group>
  );
}

export default function MainCanvas() {
  const [loadedStage, setLoadedStage] = useState<SceneStage>(0);

  return (
    <div className="fixed inset-0 h-screen w-screen">
      <Canvas dpr={[1, 1.25]} gl={{ antialias: false, powerPreference: "low-power" }} performance={{ min: 0.72 }}>
        <ambientLight intensity={0.68} color="#ffffff" />
        <directionalLight position={[5, 14, 6]} intensity={0.16} color="#ffffff" />

        <Suspense fallback={null}>
          <Scene1MilkyWay />
        </Suspense>

        {loadedStage >= 1 ? (
          <Suspense fallback={null}>
            <Scene2Earth />
          </Suspense>
        ) : null}

        {loadedStage >= 2 ? (
          <Suspense fallback={null}>
            <Scene3Sky />
          </Suspense>
        ) : null}

        {loadedStage >= 3 ? (
          <Suspense fallback={null}>
            <Scene4CaseStudies />
          </Suspense>
        ) : null}

        {loadedStage >= 4 ? (
          <Suspense fallback={null}>
            <Scene5Contact />
          </Suspense>
        ) : null}

        {loadedStage >= 5 ? (
          <Suspense fallback={null}>
            <Scene6FooterStage />
          </Suspense>
        ) : null}

        <CameraController
          onStageChange={(stage) => {
            startTransition(() => {
              setLoadedStage((current) => (current >= stage ? current : stage));
            });
          }}
        />
      </Canvas>
    </div>
  );
}
