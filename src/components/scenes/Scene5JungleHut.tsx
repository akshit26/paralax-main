"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import ProximityHtml from "../ProximityHtml";

/* ═══════════════════════════════════════════
   SCENE 5 — JUNGLE HUT / CONTACT US (z = -235 → -295)
   Dense cartoon trees, a tiki hut with
   contact info, torch lights, mailbox
   ═══════════════════════════════════════════ */

/* Cartoon Tree — doodle-style */
function CartoonTree({ position, height = 6, color = "#44882a" }: {
  position: [number, number, number]; height?: number; color?: string;
}) {
  const leafSway = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    if (leafSway.current) {
      leafSway.current.rotation.z = Math.sin(s.clock.getElapsedTime() * 0.8 + position[0]) * 0.03;
    }
  });

  return (
    <group position={position}>
      {/* Trunk outline */}
      <mesh position={[0, height / 2, 0]} scale={[1.08, 1, 1.08]}>
        <cylinderGeometry args={[0.25, 0.5, height, 8]} />
        <meshBasicMaterial color="#222" side={THREE.BackSide} />
      </mesh>
      {/* Trunk */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[0.25, 0.5, height, 8]} />
        <meshBasicMaterial color="#7a5428" />
      </mesh>

      {/* Canopy outline */}
      <mesh ref={leafSway} position={[0, height + 1, 0]} scale={1.06}>
        <sphereGeometry args={[2.5, 16, 12]} />
        <meshBasicMaterial color="#222" side={THREE.BackSide} />
      </mesh>
      {/* Canopy */}
      <mesh position={[0, height + 1, 0]}>
        <sphereGeometry args={[2.5, 16, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Extra leaf blobs */}
      <mesh position={[-1.2, height + 0.5, 0.5]}>
        <sphereGeometry args={[1.5, 12, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[1.3, height + 0.3, -0.3]}>
        <sphereGeometry args={[1.6, 12, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

/* Tiki / Jungle Hut */
function JungleHut({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base / walls */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[5, 3, 4]} />
        <meshBasicMaterial color="#c8a868" />
      </mesh>
      <mesh position={[0, 1.5, 0]} scale={1.03}>
        <boxGeometry args={[5, 3, 4]} />
        <meshBasicMaterial color="#222" side={THREE.BackSide} />
      </mesh>

      {/* Thatched roof */}
      <mesh position={[0, 3.8, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[4.2, 2.5, 4]} />
        <meshBasicMaterial color="#8a6a30" />
      </mesh>
      <mesh position={[0, 3.8, 0]} rotation={[0, Math.PI / 4, 0]} scale={1.04}>
        <coneGeometry args={[4.2, 2.5, 4]} />
        <meshBasicMaterial color="#222" side={THREE.BackSide} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 1, 2.01]}>
        <planeGeometry args={[1.5, 2]} />
        <meshBasicMaterial color="#5a3a18" />
      </mesh>

      {/* Windows */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={`win-${i}`} position={[x, 2, 2.01]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshBasicMaterial color="#ffeeaa" />
        </mesh>
      ))}

      {/* Porch posts */}
      {[-2, 2].map((x, i) => (
        <mesh key={`post-${i}`} position={[x, 1.5, 2.3]}>
          <cylinderGeometry args={[0.12, 0.12, 3, 6]} />
          <meshBasicMaterial color="#6a4a22" />
        </mesh>
      ))}

      {/* Welcome mat */}
      <mesh position={[0, 0.02, 2.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 1]} />
        <meshBasicMaterial color="#cc8844" />
      </mesh>
    </group>
  );
}

/* Torch */
function Torch({ position }: { position: [number, number, number] }) {
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((s) => {
    if (flameRef.current) {
      const t = s.clock.getElapsedTime();
      flameRef.current.scale.y = 0.8 + Math.sin(t * 8 + position[0]) * 0.3;
      flameRef.current.scale.x = 0.8 + Math.cos(t * 6) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 2, 6]} />
        <meshBasicMaterial color="#5a3a18" />
      </mesh>
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 2.2, 0]}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshBasicMaterial color="#ff8822" />
      </mesh>
      {/* Glow */}
      <pointLight position={[0, 2.2, 0]} intensity={2} color="#ff8822" distance={8} />
    </group>
  );
}

/* Mailbox */
function Mailbox({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Post */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 1.2, 6]} />
        <meshBasicMaterial color="#888" />
      </mesh>
      {/* Box outline */}
      <mesh position={[0, 1.3, 0]} scale={1.08}>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
        <meshBasicMaterial color="#222" side={THREE.BackSide} />
      </mesh>
      {/* Box */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
        <meshBasicMaterial color="#4488cc" />
      </mesh>
      {/* Flag */}
      <mesh position={[0.3, 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.04, 0.3, 0.04]} />
        <meshBasicMaterial color="#cc4444" />
      </mesh>
    </group>
  );
}

export default function Scene5JungleHut() {
  const trees = useMemo(() => {
    const arr = [];
    const greens = ["#3a7a22", "#44882a", "#338820", "#4a9430", "#2d6a1a"];
    for (let z = -240; z > -290; z -= 5) {
      arr.push({
        pos: [-8 - Math.random() * 8, 0, z + Math.random() * 3] as [number, number, number],
        h: 5 + Math.random() * 5,
        c: greens[Math.floor(Math.random() * greens.length)],
      });
      arr.push({
        pos: [8 + Math.random() * 8, 0, z + Math.random() * 3] as [number, number, number],
        h: 5 + Math.random() * 5,
        c: greens[Math.floor(Math.random() * greens.length)],
      });
      if (Math.random() > 0.5) {
        arr.push({
          pos: [(Math.random() - 0.5) * 6, 0, z + Math.random() * 2] as [number, number, number],
          h: 4 + Math.random() * 3,
          c: greens[Math.floor(Math.random() * greens.length)],
        });
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {/* Jungle ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -265]}>
        <planeGeometry args={[80, 70]} />
        <meshBasicMaterial color="#2e6e18" />
      </mesh>
      {/* Dirt path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -265]}>
        <planeGeometry args={[3, 60]} />
        <meshBasicMaterial color="#8a6a3a" />
      </mesh>

      {/* Trees */}
      {trees.map((t, i) => (
        <CartoonTree key={`jt-${i}`} position={t.pos} height={t.h} color={t.c} />
      ))}

      {/* The Hut */}
      <JungleHut position={[0, 0, -268]} />

      {/* Torches */}
      <Torch position={[-3.5, 0, -266]} />
      <Torch position={[3.5, 0, -266]} />

      {/* Mailbox */}
      <Mailbox position={[3, 0, -264]} />

      {/* ── CONTACT US overlay ── */}
      <ProximityHtml position={[0, 5, -268]} targetZ={-268} range={35} distanceFactor={10}>
        <div className="contact-card">
          <h2 className="contact-title">Say Hello!</h2>
          <p className="contact-subtitle">Drop us a message at the jungle hut</p>
          <div className="contact-fields">
            <input type="text" placeholder="Your Name" className="contact-input" />
            <input type="email" placeholder="your@email.com" className="contact-input" />
            <textarea placeholder="Your message..." className="contact-textarea" rows={3} />
            <button className="contact-btn">Send it! 🚀</button>
          </div>
        </div>
      </ProximityHtml>
    </group>
  );
}
