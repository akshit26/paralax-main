"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useMemo } from "react";
import { PerspectiveCamera, Preload } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

import Scene1MilkyWay from "./scenes/Scene1MilkyWay";
import Scene2Earth from "./scenes/Scene2Earth";
import Scene3Sky from "./scenes/Scene3Sky";
import Scene4Fields from "./scenes/Scene4Fields";
import Scene5JungleHut from "./scenes/Scene5JungleHut";
import Scene6Footer from "./scenes/Scene6Footer";

gsap.registerPlugin(ScrollTrigger);

/* ── DepthMask: Prevents 3D elements behind it from rendering without blocking CSS stars ── */
function DepthMask() {
  return (
    <mesh position={[0, 0, -130]} renderOrder={-1}>
      <planeGeometry args={[800, 800]} />
      <meshBasicMaterial colorWrite={false} depthWrite={true} />
    </mesh>
  );
}

/* ── Background + Fog: space-black → sky-blue → fields-green → jungle ── */
/* ── Background + Fog: space-black → sky-blue → fields-green → jungle ── */
function AtmosphereController() {
  const { scene, gl } = useThree();

  const bgStops = useMemo(() => [
    new THREE.Color("#050510"), // 0%   Milkyway (z=0)
    new THREE.Color("#050510"), // 14%  Approaching Solar System
    new THREE.Color("#0a0a1a"), // 28%  Solar System (z=-85)
    new THREE.Color("#1a3060"), // 42%  Upper Sky (z=-140)
    new THREE.Color("#5ab0e8"), // 57%  Bright Sky (z=-190)
    new THREE.Color("#87ceeb"), // 71%  Fields (z=-230)
    new THREE.Color("#70b848"), // 85%  Jungle Approach
    new THREE.Color("#1a3a10"), // 100% Jungle Hut (z=-340)
  ], []);

  useEffect(() => {
    // scene.background = bgStops[0].clone(); // Removed so CSS stars can show through
    scene.fog = new THREE.FogExp2(bgStops[0].clone(), 0.005);
    gl.setClearColor(bgStops[0], 0); // Initially transparent

    const proxy = { t: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    tl.to(proxy, {
      t: 1,
      ease: "none",
      onUpdate: () => {
        const t = proxy.t;
        const n = bgStops.length - 1;
        const seg = t * n;
        const idx = Math.min(Math.floor(seg), n - 1);
        const lt = seg - idx;

        const c = bgStops[idx].clone().lerp(bgStops[idx + 1], lt);
        // if (scene.background instanceof THREE.Color) scene.background.copy(c); // Replaced by gl.setClearColor
        
        // Calculate alpha to fade in the ThreeJS background as we enter the sky
        let alpha = 0;
        if (t > 0.25) {
            alpha = THREE.MathUtils.clamp((t - 0.25) * 5, 0, 1);
        }
        gl.setClearColor(c, alpha);

        if (scene.fog instanceof THREE.FogExp2) {
          scene.fog.color.copy(c);
          if (t > 0.4) {
             scene.fog.density = THREE.MathUtils.lerp(0.005, 0.02, (t - 0.4) / 0.6);
          }
        }
      },
    }, 0);

    return () => { tl.kill(); };
  }, [scene, gl, bgStops]);

  return null;
}

/* ── Camera: descends from space (y=30) → ground (y=2) ── */
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

    tl.to(group.current.position, { z: -340, ease: "none" }, 0);

    // Descend: space → atmosphere → sky → ground
    tl.to(group.current.position, { y: 22, ease: "power1.inOut" }, 0.25);
    tl.to(group.current.position, { y: 12, ease: "power1.inOut" }, 0.50);
    tl.to(group.current.position, { y: 3, ease: "power2.inOut" }, 0.75);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <group ref={group}>
      <PerspectiveCamera makeDefault fov={70} position={[0, 30, 0]} near={0.1} far={500} />
    </group>
  );
}

export default function MainCanvas() {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas>
        <Suspense fallback={null}>
          <AtmosphereController />

          {/* Flat, bright "cartoon" lighting — no harsh shadows */}
          <ambientLight intensity={1.4} color="#ffffff" />
          <directionalLight position={[5, 20, 5]} intensity={0.4} color="#fff8e0" />

          <Scene1MilkyWay />
          <Scene2Earth />
          
          {/* Depth Mask occludes Scene 3+ when at top of page, preventing layers from projecting through space */}
          <DepthMask />

          <Scene3Sky />
          <Scene4Fields />
          <Scene5JungleHut />
          <Scene6Footer />

          <CameraController />
          <Preload all />
          
          {/* Post-Processing for emissive elements (like our shiny new 3D elements) */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
