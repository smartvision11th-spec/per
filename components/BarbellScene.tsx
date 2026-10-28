"use client";

import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─── Barbell Component Parts ───────────────────────────────────────────────

interface BarbellPartProps {
  position: [number, number, number];
  targetPosition: [number, number, number];
  progress: number; // 0 = assembled, 1 = exploded
  children: React.ReactNode;
}

function BarbellPart({ position, targetPosition, progress, children }: BarbellPartProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const p = progress;
    groupRef.current.position.x = position[0] + (targetPosition[0] - position[0]) * p;
    groupRef.current.position.y = position[1] + (targetPosition[1] - position[1]) * p;
    groupRef.current.position.z = position[2] + (targetPosition[2] - position[2]) * p;
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Main Steel Bar ─────────────────────────────────────────────────────────
function SteelBar() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#B8BEC8"),
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 1.4,
  }), []);

  const knurlMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#7A808E"),
    metalness: 0.96,
    roughness: 0.22,
    envMapIntensity: 1.0,
  }), []);

  return (
    <group>
      {/* Main shaft */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={mat} castShadow>
        <cylinderGeometry args={[0.085, 0.085, 7.2, 32]} />
      </mesh>
      {/* Knurl zones — left */}
      <mesh position={[-1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={knurlMat} castShadow>
        <cylinderGeometry args={[0.094, 0.094, 1.2, 32]} />
      </mesh>
      {/* Knurl zones — right */}
      <mesh position={[1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={knurlMat} castShadow>
        <cylinderGeometry args={[0.094, 0.094, 1.2, 32]} />
      </mesh>
      {/* Center knurl */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={knurlMat} castShadow>
        <cylinderGeometry args={[0.094, 0.094, 0.28, 32]} />
      </mesh>
    </group>
  );
}

// ─── Weight Plate ────────────────────────────────────────────────────────────
interface PlateProps {
  radius: number;
  thickness: number;
  color: string;
  accentColor?: string;
  hasAccent?: boolean;
}

function Plate({ radius, thickness, color, accentColor = "#C8E63A", hasAccent = false }: PlateProps) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.2,
  }), [color]);

  const rimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.7,
    roughness: 0.3,
    envMapIntensity: 0.8,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.08,
  }), [accentColor]);

  const holeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#080A0D"),
    metalness: 0.6,
    roughness: 0.4,
  }), []);

  return (
    <group>
      {/* Main disc */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={mat} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, thickness, 40]} />
      </mesh>
      {/* Accent rim */}
      {hasAccent && (
        <mesh rotation={[0, 0, Math.PI / 2]} material={rimMat}>
          <torusGeometry args={[radius * 0.88, thickness * 0.12, 12, 40]} />
        </mesh>
      )}
      {/* Center hole */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={holeMat}>
        <cylinderGeometry args={[0.132, 0.132, thickness + 0.01, 24]} />
      </mesh>
      {/* Spoke holes (3 evenly spaced) */}
      {[0, Math.PI / 1.5, (Math.PI * 2) / 1.5].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * radius * 0.55,
            0,
            Math.sin(angle) * radius * 0.55,
          ]}
          rotation={[0, 0, Math.PI / 2]}
          material={holeMat}
        >
          <cylinderGeometry args={[radius * 0.1, radius * 0.1, thickness + 0.01, 16]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Collar ─────────────────────────────────────────────────────────────────
function Collar() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#D8DCE4"),
    metalness: 1.0,
    roughness: 0.04,
    envMapIntensity: 2.0,
  }), []);

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]} material={mat} castShadow>
        <cylinderGeometry args={[0.165, 0.165, 0.28, 32]} />
      </mesh>
      {/* Locking ridge */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={mat}>
        <cylinderGeometry args={[0.19, 0.19, 0.08, 32]} />
      </mesh>
    </group>
  );
}

// ─── Barbell Assembly ───────────────────────────────────────────────────────

interface BarbellAssemblyProps {
  scrollProgress: React.MutableRefObject<number>;
}

function BarbellAssembly({ scrollProgress }: BarbellAssemblyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Part positions: assembled vs. exploded
  // Left outer plate
  const leftOuter = { pos: [-3.4, 0, 0] as [number,number,number], explode: [-6.5, 0.8, 0.5] as [number,number,number] };
  // Left inner plate
  const leftInner = { pos: [-2.9, 0, 0] as [number,number,number], explode: [-5.5, -0.4, -0.4] as [number,number,number] };
  // Left collar
  const leftCollar = { pos: [-2.3, 0, 0] as [number,number,number], explode: [-4.0, 1.2, 0.2] as [number,number,number] };
  // Right collar
  const rightCollar = { pos: [2.3, 0, 0] as [number,number,number], explode: [4.0, 1.2, -0.2] as [number,number,number] };
  // Right inner plate
  const rightInner = { pos: [2.9, 0, 0] as [number,number,number], explode: [5.5, -0.4, 0.4] as [number,number,number] };
  // Right outer plate
  const rightOuter = { pos: [3.4, 0, 0] as [number,number,number], explode: [6.5, 0.8, -0.5] as [number,number,number] };

  const progRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const p = scrollProgress.current;

    // Smooth interpolation
    progRef.current = THREE.MathUtils.lerp(progRef.current, p, 0.06);

    // Gentle ambient rotation when fully assembled
    const assemblyMix = 1 - progRef.current;
    groupRef.current.rotation.y = 
      THREE.MathUtils.lerp(groupRef.current.rotation.y, -Math.PI * 0.04 + state.clock.elapsedTime * 0.04 * assemblyMix, 0.03);
    groupRef.current.rotation.x = 
      THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(state.clock.elapsedTime * 0.3) * 0.03 * assemblyMix, 0.03);

    // Camera movement: pull back as exploded
    const targetZ = 8 + progRef.current * 5;
    const targetY = progRef.current * 1.5;
    (camera as THREE.PerspectiveCamera).position.z = THREE.MathUtils.lerp(
      (camera as THREE.PerspectiveCamera).position.z, targetZ, 0.05
    );
    (camera as THREE.PerspectiveCamera).position.y = THREE.MathUtils.lerp(
      (camera as THREE.PerspectiveCamera).position.y, targetY, 0.05
    );
  });

  const p = progRef; // will be updated each frame

  // We render the sub-parts; each reads progRef via useFrame inside BarbellPart
  // But BarbellPart needs current progress snapshot - we pass the ref directly
  // to avoid re-renders, and each part will lerp using useFrame
  return (
    <group ref={groupRef}>
      {/* BAR — always centered */}
      <SteelBar />

      {/* LEFT OUTER PLATE */}
      <LivePart
        assembled={leftOuter.pos}
        exploded={leftOuter.explode}
        scrollRef={scrollProgress}
        delay={0}
      >
        <Plate radius={0.92} thickness={0.22} color="#14181F" hasAccent accentColor="#C8E63A" />
      </LivePart>

      {/* LEFT INNER PLATE */}
      <LivePart
        assembled={leftInner.pos}
        exploded={leftInner.explode}
        scrollRef={scrollProgress}
        delay={0.06}
      >
        <Plate radius={0.78} thickness={0.18} color="#1A1F2A" hasAccent={false} />
      </LivePart>

      {/* LEFT COLLAR */}
      <LivePart
        assembled={leftCollar.pos}
        exploded={leftCollar.explode}
        scrollRef={scrollProgress}
        delay={0.12}
      >
        <Collar />
      </LivePart>

      {/* RIGHT COLLAR */}
      <LivePart
        assembled={rightCollar.pos}
        exploded={rightCollar.explode}
        scrollRef={scrollProgress}
        delay={0.12}
      >
        <Collar />
      </LivePart>

      {/* RIGHT INNER PLATE */}
      <LivePart
        assembled={rightInner.pos}
        exploded={rightInner.explode}
        scrollRef={scrollProgress}
        delay={0.06}
      >
        <Plate radius={0.78} thickness={0.18} color="#1A1F2A" hasAccent={false} />
      </LivePart>

      {/* RIGHT OUTER PLATE */}
      <LivePart
        assembled={rightOuter.pos}
        exploded={rightOuter.explode}
        scrollRef={scrollProgress}
        delay={0}
      >
        <Plate radius={0.92} thickness={0.22} color="#14181F" hasAccent accentColor="#C8E63A" />
      </LivePart>
    </group>
  );
}

// ─── LivePart: position driven per-frame by scroll ref ───────────────────────

interface LivePartProps {
  assembled: [number, number, number];
  exploded: [number, number, number];
  scrollRef: React.MutableRefObject<number>;
  delay: number;
  children: React.ReactNode;
}

function LivePart({ assembled, exploded, scrollRef, delay, children }: LivePartProps) {
  const ref = useRef<THREE.Group>(null);
  const localP = useRef(0);

  useFrame(() => {
    if (!ref.current) return;
    // Delayed progress
    const rawP = Math.max(0, scrollRef.current - delay) / (1 - delay);
    const clamped = Math.min(1, Math.max(0, rawP));

    // Smooth eased interpolation
    localP.current = THREE.MathUtils.lerp(localP.current, clamped, 0.05);

    // Ease function: smooth step
    const t = localP.current * localP.current * (3 - 2 * localP.current);

    ref.current.position.x = assembled[0] + (exploded[0] - assembled[0]) * t;
    ref.current.position.y = assembled[1] + (exploded[1] - assembled[1]) * t;
    ref.current.position.z = assembled[2] + (exploded[2] - assembled[2]) * t;
  });

  return <group ref={ref}>{children}</group>;
}

// ─── Lighting ─────────────────────────────────────────────────────────────────
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.3} color="#E8EEF4" />
      {/* Key light — high above left */}
      <directionalLight
        position={[8, 12, 6]}
        intensity={2.5}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      {/* Fill light — low right */}
      <directionalLight position={[-6, -4, 4]} intensity={0.6} color="#B8C4D0" />
      {/* Rim light — behind */}
      <directionalLight position={[0, 4, -8]} intensity={0.8} color="#D0D8E0" />
      {/* Acid accent bounce */}
      <pointLight position={[0, -4, 6]} intensity={3} color="#C8E63A" distance={12} decay={2} />
      {/* Cool fill */}
      <pointLight position={[-8, 6, 2]} intensity={1.5} color="#8BB4E0" distance={20} decay={2} />
    </>
  );
}

// ─── Ground Plane ────────────────────────────────────────────────────────────
function GroundReflection() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#0A0C12"),
    metalness: 0.3,
    roughness: 0.8,
  }), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow material={mat}>
      <planeGeometry args={[30, 30]} />
    </mesh>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
interface BarbellSceneProps {
  scrollProgress: React.MutableRefObject<number>;
  className?: string;
}

export default function BarbellScene({ scrollProgress, className }: BarbellSceneProps) {
  return (
    <Canvas
      className={className}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      shadows
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} near={0.1} far={100} />
      <StudioLighting />
      <GroundReflection />
      <BarbellAssembly scrollProgress={scrollProgress} />
    </Canvas>
  );
}
