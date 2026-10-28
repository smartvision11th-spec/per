"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// ─── Main Steel Bar ─────────────────────────────────────────────────────────
function SteelBar() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#CBD5E1"),
    metalness: 0.98,
    roughness: 0.08,
    envMapIntensity: 1.6,
  }), []);

  const knurlMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#828B99"),
    metalness: 0.95,
    roughness: 0.25,
    envMapIntensity: 1.2,
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

function Plate({ radius, thickness, color, accentColor = "#FF7300", hasAccent = false }: PlateProps) {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.92,
    roughness: 0.18,
    envMapIntensity: 1.3,
  }), [color]);

  const rimMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentColor),
    metalness: 0.8,
    roughness: 0.25,
    envMapIntensity: 1.2,
    emissive: new THREE.Color(accentColor),
    emissiveIntensity: 0.28,
  }), [accentColor]);

  const holeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#05070A"),
    metalness: 0.7,
    roughness: 0.35,
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
      {/* Spoke holes */}
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
    color: new THREE.Color("#E2E8F0"),
    metalness: 1.0,
    roughness: 0.04,
    envMapIntensity: 2.5,
  }), []);

  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 2]} material={mat} castShadow>
        <cylinderGeometry args={[0.165, 0.165, 0.28, 32]} />
      </mesh>
      {/* Locking ridge with warm gold reflection */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.19, 0.19, 0.08, 32]} />
        <meshStandardMaterial color="#FFB74D" metalness={0.9} roughness={0.1} />
      </mesh>
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
    const rawP = Math.max(0, scrollRef.current - delay) / (1 - delay);
    const clamped = Math.min(1, Math.max(0, rawP));

    localP.current = THREE.MathUtils.lerp(localP.current, clamped, 0.06);
    const t = localP.current * localP.current * (3 - 2 * localP.current);

    ref.current.position.x = assembled[0] + (exploded[0] - assembled[0]) * t;
    ref.current.position.y = assembled[1] + (exploded[1] - assembled[1]) * t;
    ref.current.position.z = assembled[2] + (exploded[2] - assembled[2]) * t;
  });

  return <group ref={ref}>{children}</group>;
}

// ─── Barbell Assembly ───────────────────────────────────────────────────────
interface BarbellAssemblyProps {
  scrollProgress: React.MutableRefObject<number>;
}

function BarbellAssembly({ scrollProgress }: BarbellAssemblyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  const leftOuter = { pos: [-3.4, 0, 0] as [number,number,number], explode: [-6.5, 0.8, 0.5] as [number,number,number] };
  const leftInner = { pos: [-2.9, 0, 0] as [number,number,number], explode: [-5.5, -0.4, -0.4] as [number,number,number] };
  const leftCollar = { pos: [-2.3, 0, 0] as [number,number,number], explode: [-4.0, 1.2, 0.2] as [number,number,number] };
  const rightCollar = { pos: [2.3, 0, 0] as [number,number,number], explode: [4.0, 1.2, -0.2] as [number,number,number] };
  const rightInner = { pos: [2.9, 0, 0] as [number,number,number], explode: [5.5, -0.4, 0.4] as [number,number,number] };
  const rightOuter = { pos: [3.4, 0, 0] as [number,number,number], explode: [6.5, 0.8, -0.5] as [number,number,number] };

  const progRef = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const p = scrollProgress.current;
    progRef.current = THREE.MathUtils.lerp(progRef.current, p, 0.06);

    const assemblyMix = 1 - progRef.current;
    groupRef.current.rotation.y = 
      THREE.MathUtils.lerp(groupRef.current.rotation.y, -Math.PI * 0.04 + state.clock.elapsedTime * 0.04 * assemblyMix, 0.03);
    groupRef.current.rotation.x = 
      THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.sin(state.clock.elapsedTime * 0.3) * 0.03 * assemblyMix, 0.03);

    const targetZ = 8 + progRef.current * 5;
    const targetY = progRef.current * 1.5;
    (camera as THREE.PerspectiveCamera).position.z = THREE.MathUtils.lerp(
      (camera as THREE.PerspectiveCamera).position.z, targetZ, 0.05
    );
    (camera as THREE.PerspectiveCamera).position.y = THREE.MathUtils.lerp(
      (camera as THREE.PerspectiveCamera).position.y, targetY, 0.05
    );
  });

  return (
    <group ref={groupRef}>
      <SteelBar />

      <LivePart assembled={leftOuter.pos} exploded={leftOuter.explode} scrollRef={scrollProgress} delay={0}>
        <Plate radius={0.92} thickness={0.22} color="#111622" hasAccent accentColor="#FF7300" />
      </LivePart>

      <LivePart assembled={leftInner.pos} exploded={leftInner.explode} scrollRef={scrollProgress} delay={0.06}>
        <Plate radius={0.78} thickness={0.18} color="#1B2230" hasAccent={false} />
      </LivePart>

      <LivePart assembled={leftCollar.pos} exploded={leftCollar.explode} scrollRef={scrollProgress} delay={0.12}>
        <Collar />
      </LivePart>

      <LivePart assembled={rightCollar.pos} exploded={rightCollar.explode} scrollRef={scrollProgress} delay={0.12}>
        <Collar />
      </LivePart>

      <LivePart assembled={rightInner.pos} exploded={rightInner.explode} scrollRef={scrollProgress} delay={0.06}>
        <Plate radius={0.78} thickness={0.18} color="#1B2230" hasAccent={false} />
      </LivePart>

      <LivePart assembled={rightOuter.pos} exploded={rightOuter.explode} scrollRef={scrollProgress} delay={0}>
        <Plate radius={0.92} thickness={0.22} color="#111622" hasAccent accentColor="#FF7300" />
      </LivePart>
    </group>
  );
}

// ─── Studio Lighting (Solar / Molten Warm Highlights) ───────────────────────────
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#F1F5F9" />
      {/* Key light */}
      <directionalLight
        position={[8, 12, 6]}
        intensity={2.8}
        color="#FFF6EE"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Warm amber rim light */}
      <directionalLight position={[-6, -3, 4]} intensity={1.2} color="#FF8C00" />
      {/* Background rim */}
      <directionalLight position={[0, 4, -8]} intensity={1.0} color="#FFD180" />
      {/* Amber point light bounce */}
      <pointLight position={[0, -4, 6]} intensity={4.5} color="#FF7300" distance={14} decay={2} />
      {/* Soft fill */}
      <pointLight position={[-8, 6, 2]} intensity={1.8} color="#FFA726" distance={20} decay={2} />
    </>
  );
}

// ─── Ground Plane ────────────────────────────────────────────────────────────
function GroundReflection() {
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color("#05080E"),
    metalness: 0.5,
    roughness: 0.7,
  }), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow material={mat}>
      <planeGeometry args={[32, 32]} />
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
        toneMappingExposure: 1.25,
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
