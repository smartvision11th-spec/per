"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

// ─── Procedural Knurl Bump & Roughness Texture Generator ─────────────────────
function createKnurlTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, 256, 256);

  // Cross-hatch diamond knurling pattern
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
  for (let i = -256; i < 512; i += 12) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 256, 256);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i + 256, 0);
    ctx.lineTo(i, 256);
    ctx.stroke();
  }

  // Add micro noise dots
  for (let j = 0; j < 3000; j++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const val = Math.floor(Math.random() * 255);
    ctx.fillStyle = `rgb(${val},${val},${val})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 2);
  return texture;
}

// ─── High-Fidelity Olympic Barbell Shaft ──────────────────────────────────────
function PrecisionBarbellShaft() {
  const knurlTexture = useMemo(() => {
    if (typeof window !== "undefined") return createKnurlTexture();
    return null;
  }, []);

  const steelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#D8DFE8",
        metalness: 0.98,
        roughness: 0.12,
        envMapIntensity: 2.2,
      }),
    []
  );

  const knurledMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9EAAB8",
        metalness: 0.94,
        roughness: 0.35,
        bumpMap: knurlTexture || undefined,
        bumpScale: 0.04,
        envMapIntensity: 1.8,
      }),
    [knurlTexture]
  );

  const darkAlloyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1A202C",
        metalness: 0.9,
        roughness: 0.25,
      }),
    []
  );

  return (
    <group>
      {/* Center 28mm Olympic Shaft */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={steelMaterial} castShadow>
        <cylinderGeometry args={[0.075, 0.075, 7.4, 48]} />
      </mesh>

      {/* Knurled Grip Zones (Left & Right Competition Markings) */}
      {[-1.5, -0.6, 0.6, 1.5].map((x, idx) => (
        <mesh key={idx} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={knurledMaterial} castShadow>
          <cylinderGeometry args={[0.079, 0.079, 0.72, 48]} />
        </mesh>
      ))}

      {/* Precision Center Passive Knurl Ring */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={knurledMaterial} castShadow>
        <cylinderGeometry args={[0.078, 0.078, 0.22, 48]} />
      </mesh>

      {/* Left/Right Inner Collar Stops with Bevel */}
      {[-2.2, 2.2].map((x, idx) => (
        <group key={`stop-${idx}`} position={[x, 0, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]} material={steelMaterial} castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.12, 48]} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} material={darkAlloyMaterial}>
            <torusGeometry args={[0.178, 0.02, 16, 48]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ─── 45LB / 20KG Competition Calibrated Bumper Plate ─────────────────────────
interface CalibratedPlateProps {
  color: string;
  radius: number;
  thickness: number;
  weightLabel: string;
  accentAmber?: boolean;
}

function CalibratedPlate({
  color,
  radius,
  thickness,
  weightLabel,
  accentAmber = false,
}: CalibratedPlateProps) {
  const plateMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.88,
        roughness: 0.22,
        envMapIntensity: 1.4,
      }),
    [color]
  );

  const chromeHubMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FFFFFF",
        metalness: 1.0,
        roughness: 0.06,
        envMapIntensity: 3.0,
      }),
    []
  );

  const amberGlowMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FF7300",
        emissive: "#FF7300",
        emissiveIntensity: 0.45,
        metalness: 0.8,
        roughness: 0.2,
      }),
    []
  );

  return (
    <group>
      {/* Outer Rubber/Urethane Bumper Body */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={plateMat} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, thickness, 56]} />
      </mesh>

      {/* Outer Flange Lip (Molded Rim) */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={accentAmber ? amberGlowMat : plateMat}>
        <torusGeometry args={[radius * 0.92, thickness * 0.14, 16, 56]} />
      </mesh>

      {/* Inner Precision Stainless Hub Ring */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={chromeHubMat} castShadow>
        <cylinderGeometry args={[0.32, 0.32, thickness + 0.015, 48]} />
      </mesh>

      {/* Center 50mm Olympic Sleeve Hole */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.135, 0.135, thickness + 0.03, 32]} />
        <meshBasicMaterial color="#05070B" />
      </mesh>

      {/* Symmetric Kinetic Weight Relief Cutouts */}
      {[0, Math.PI / 1.5, (Math.PI * 2) / 1.5].map((angle, idx) => (
        <group
          key={idx}
          position={[
            Math.cos(angle) * radius * 0.58,
            0,
            Math.sin(angle) * radius * 0.58,
          ]}
        >
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[radius * 0.12, radius * 0.12, thickness + 0.02, 24]} />
            <meshBasicMaterial color="#05070B" />
          </mesh>
          {/* Subtle amber chamfer glow inside cutout */}
          {accentAmber && (
            <mesh rotation={[0, 0, Math.PI / 2]} material={amberGlowMat}>
              <torusGeometry args={[radius * 0.12, 0.01, 8, 24]} />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
}

// ─── Competition Quick-Release Olympic Collar ────────────────────────────────
function OlympicCollar() {
  const chromeMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F8FAFC",
        metalness: 1.0,
        roughness: 0.05,
        envMapIntensity: 2.8,
      }),
    []
  );

  const latchMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FF7300",
        metalness: 0.9,
        roughness: 0.2,
        emissive: "#FF7300",
        emissiveIntensity: 0.25,
      }),
    []
  );

  return (
    <group>
      {/* Cylindrical Clamping Ring */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={chromeMat} castShadow>
        <cylinderGeometry args={[0.19, 0.19, 0.24, 40]} />
      </mesh>
      {/* Center lock flange */}
      <mesh rotation={[0, 0, Math.PI / 2]} material={chromeMat}>
        <cylinderGeometry args={[0.22, 0.22, 0.06, 40]} />
      </mesh>
      {/* Quick Release Tension Lever */}
      <mesh position={[0, 0.24, 0]} material={latchMat}>
        <boxGeometry args={[0.08, 0.16, 0.1]} />
      </mesh>
    </group>
  );
}

// ─── Smooth Per-Component Exploded Dynamic Trajectory ────────────────────────
interface ExplodedComponentProps {
  assembledPos: [number, number, number];
  explodedPos: [number, number, number];
  progress: number;
  delay?: number;
  children: React.ReactNode;
}

function ExplodedComponent({
  assembledPos,
  explodedPos,
  progress,
  delay = 0,
  children,
}: ExplodedComponentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentPos = useRef(new THREE.Vector3(...assembledPos));

  useFrame(() => {
    if (!groupRef.current) return;

    // Staggered calculation
    const effectiveP = Math.min(1, Math.max(0, (progress - delay) / (1 - delay * 0.8)));
    // Cubic Bezier easeInOut
    const ease = effectiveP < 0.5 ? 4 * effectiveP * effectiveP * effectiveP : 1 - Math.pow(-2 * effectiveP + 2, 3) / 2;

    const targetX = assembledPos[0] + (explodedPos[0] - assembledPos[0]) * ease;
    const targetY = assembledPos[1] + (explodedPos[1] - assembledPos[1]) * ease;
    const targetZ = assembledPos[2] + (explodedPos[2] - assembledPos[2]) * ease;

    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, 0.08);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, 0.08);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, 0.08);

    groupRef.current.position.copy(currentPos.current);
  });

  return <group ref={groupRef}>{children}</group>;
}

// ─── Spatial Master Camera & Apparatus Rig ────────────────────────────────────
interface SpatialBarbellExperienceProps {
  scrollProgress: React.MutableRefObject<number>;
}

function SpatialBarbellRig({ scrollProgress }: SpatialBarbellExperienceProps) {
  const masterGroup = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const smoothProgress = useRef(0);

  // Coordinated Explode Trajectories (Isometric Engineered Spacing)
  const leftOuterPlate = { assembled: [-3.35, 0, 0] as [number, number, number], exploded: [-6.8, 1.1, 0.6] as [number, number, number] };
  const leftInnerPlate = { assembled: [-2.9, 0, 0] as [number, number, number], exploded: [-5.6, -0.6, -0.4] as [number, number, number] };
  const leftCollar = { assembled: [-2.4, 0, 0] as [number, number, number], exploded: [-4.2, 1.3, 0.3] as [number, number, number] };

  const rightCollar = { assembled: [2.4, 0, 0] as [number, number, number], exploded: [4.2, 1.3, -0.3] as [number, number, number] };
  const rightInnerPlate = { assembled: [2.9, 0, 0] as [number, number, number], exploded: [5.6, -0.6, 0.4] as [number, number, number] };
  const rightOuterPlate = { assembled: [3.35, 0, 0] as [number, number, number], exploded: [6.8, 1.1, -0.6] as [number, number, number] };

  useFrame((state) => {
    if (!masterGroup.current) return;
    const p = scrollProgress.current;
    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, p, 0.05);
    const sp = smoothProgress.current;

    // Continuous dynamic camera orbit across the entire page scroll:
    // When p is 0.0: Close heroic angle
    // When p is 0.5: Wide dramatic exploded isometric view
    // When p is 1.0: Intimate mechanical detail
    const camZ = 7.5 + sp * 4.8;
    const camY = 0.4 + Math.sin(sp * Math.PI) * 2.2;
    const camX = Math.sin(sp * Math.PI * 1.5) * 1.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, camX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.06);
    camera.lookAt(0, 0, 0);

    // Subtle atmospheric breathing rotation
    const t = state.clock.getElapsedTime();
    masterGroup.current.rotation.y = THREE.MathUtils.lerp(
      masterGroup.current.rotation.y,
      -0.15 + sp * 0.6 + Math.sin(t * 0.4) * 0.04,
      0.05
    );
    masterGroup.current.rotation.x = THREE.MathUtils.lerp(
      masterGroup.current.rotation.x,
      0.08 + Math.cos(t * 0.5) * 0.03,
      0.05
    );
  });

  return (
    <group ref={masterGroup}>
      {/* Structural Central Steel Bar */}
      <PrecisionBarbellShaft />

      {/* Left Heavy Plate Assemblage */}
      <ExplodedComponent
        assembledPos={leftOuterPlate.assembled}
        explodedPos={leftOuterPlate.exploded}
        progress={smoothProgress.current}
        delay={0.0}
      >
        <CalibratedPlate
          radius={0.96}
          thickness={0.24}
          color="#0F131A"
          weightLabel="20KG"
          accentAmber={true}
        />
      </ExplodedComponent>

      <ExplodedComponent
        assembledPos={leftInnerPlate.assembled}
        explodedPos={leftInnerPlate.exploded}
        progress={smoothProgress.current}
        delay={0.08}
      >
        <CalibratedPlate
          radius={0.82}
          thickness={0.2}
          color="#1A202C"
          weightLabel="15KG"
          accentAmber={false}
        />
      </ExplodedComponent>

      <ExplodedComponent
        assembledPos={leftCollar.assembled}
        explodedPos={leftCollar.exploded}
        progress={smoothProgress.current}
        delay={0.15}
      >
        <OlympicCollar />
      </ExplodedComponent>

      {/* Right Heavy Plate Assemblage */}
      <ExplodedComponent
        assembledPos={rightCollar.assembled}
        explodedPos={rightCollar.exploded}
        progress={smoothProgress.current}
        delay={0.15}
      >
        <OlympicCollar />
      </ExplodedComponent>

      <ExplodedComponent
        assembledPos={rightInnerPlate.assembled}
        explodedPos={rightInnerPlate.exploded}
        progress={smoothProgress.current}
        delay={0.08}
      >
        <CalibratedPlate
          radius={0.82}
          thickness={0.2}
          color="#1A202C"
          weightLabel="15KG"
          accentAmber={false}
        />
      </ExplodedComponent>

      <ExplodedComponent
        assembledPos={rightOuterPlate.assembled}
        explodedPos={rightOuterPlate.exploded}
        progress={smoothProgress.current}
        delay={0.0}
      >
        <CalibratedPlate
          radius={0.96}
          thickness={0.24}
          color="#0F131A"
          weightLabel="20KG"
          accentAmber={true}
        />
      </ExplodedComponent>
    </group>
  );
}

// ─── Studio Lighting (Luxury Automotive Solar Grading) ────────────────────────
function ArchitecturalStudioLights() {
  return (
    <>
      <ambientLight intensity={0.4} color="#F8FAFC" />
      {/* High Key Light */}
      <directionalLight
        position={[10, 14, 8]}
        intensity={3.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Warm Solar Rim Bounce */}
      <directionalLight position={[-8, -4, 5]} intensity={1.8} color="#FF7300" />
      {/* Backlight Edge Hairline */}
      <directionalLight position={[0, 6, -10]} intensity={1.4} color="#FED7AA" />
      {/* Point lights for metallic hot spots */}
      <pointLight position={[0, -3, 5]} intensity={3.5} color="#F59E0B" distance={15} decay={2} />
      <pointLight position={[-6, 5, 2]} intensity={2.0} color="#FF9800" distance={18} decay={2} />
    </>
  );
}

// ─── Main Export Component ───────────────────────────────────────────────────
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
        toneMappingExposure: 1.3,
      }}
      shadows
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 7.8]} fov={38} near={0.1} far={100} />
      <ArchitecturalStudioLights />
      <SpatialBarbellRig scrollProgress={scrollProgress} />
    </Canvas>
  );
}
