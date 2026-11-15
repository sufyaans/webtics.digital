"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * A field of bars that rise and fall like a live chart, viewed in 3D.
 * Illustrative only: the motion is generated, not real data.
 */
const COLS = 18;
const ROWS = 10;
const GAP = 0.36;

function Bars() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const highlight = useMemo(() => new Set([2 * COLS + 13, 5 * COLS + 6, 7 * COLS + 15]), []);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    const t = state.clock.elapsedTime * 0.6;
    const px = state.pointer.x * 3;
    let i = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = (c - COLS / 2) * GAP;
        const z = (r - ROWS / 2) * GAP;
        const wave = Math.sin(c * 0.45 + t) * 0.5 + Math.cos(r * 0.6 + t * 0.8) * 0.4;
        const lift = Math.exp(-((x - px) ** 2) / 1.5) * 0.9;
        const h = 0.12 + Math.max(0, 0.8 + wave + lift) * 0.7;
        dummy.position.set(x, h / 2, z);
        dummy.scale.set(1, h, 1);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
        const isHi = highlight.has(i);
        color.set(isHi ? "#EB2F33" : r % 4 === 0 ? "#2B5C8A" : (r + c) % 5 === 0 ? "#A9C8E0" : "#639CC5");
        m.setColorAt(i, color);
        i++;
      }
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COLS * ROWS]}>
      <boxGeometry args={[0.26, 1, 0.26]} />
      <meshStandardMaterial roughness={0.45} metalness={0.05} />
    </instancedMesh>
  );
}

export default function DataFieldCanvas({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      flat
      dpr={[1, 1.75]}
      camera={{ position: [6.2, 5.4, 7.4], fov: 30 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.3, 0)}
      gl={{ antialias: true, alpha: true }}
      frameloop={active ? "always" : "never"}
      aria-hidden="true"
    >
      <hemisphereLight args={["#FAF8F4", "#03203D", 1.4]} />
      <directionalLight position={[4, 8, 3]} intensity={1.6} />
      <directionalLight position={[6, 2, 8]} intensity={0.9} />
      <Bars />
    </Canvas>
  );
}
