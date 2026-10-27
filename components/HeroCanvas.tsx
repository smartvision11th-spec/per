"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// 3D Dumbbell / Kettlebell Hybrid Mesh with Metallic Material and Glowing Core
function GymCore3D() {
  const meshGroup = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshGroup.current) return;
    const t = state.clock.getElapsedTime();
    // Smooth idle oscillation
    meshGroup.current.rotation.y = t * 0.45;
    meshGroup.current.rotation.x = Math.sin(t * 0.35) * 0.15;
    meshGroup.current.position.y = Math.sin(t * 1.2) * 0.1;

    // Mouse parallax tracking
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    meshGroup.current.rotation.y += (targetX - meshGroup.current.rotation.y) * 0.05;
    meshGroup.current.rotation.x += (-targetY - meshGroup.current.rotation.x) * 0.05;

    // Glowing energy ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.8;
      ringRef.current.rotation.x = Math.cos(t * 0.6) * 0.3;
    }
  });

  return (
    <group
      ref={meshGroup}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.08 : 1}
    >
      {/* Central Brushed Steel Handle */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 2.6, 32]} />
        <meshStandardMaterial
          color="#94A3B8"
          metalness={0.95}
          roughness={0.15}
          bumpScale={0.05}
        />
      </mesh>

      {/* Knurled Grip Texture Rings on Handle */}
      {[-0.5, 0, 0.5].map((pos, idx) => (
        <mesh key={idx} position={[pos, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.23, 0.23, 0.3, 24]} />
          <meshStandardMaterial
            color="#FF5500"
            emissive="#FF5500"
            emissiveIntensity={hovered ? 0.9 : 0.4}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Left Heavy Calibrated Plates (Hexagonal Design) */}
      <group position={[-1.6, 0, 0]}>
        {/* Main Inner Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.35, 1.35, 0.45, 6]} />
          <meshStandardMaterial
            color="#121622"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        {/* Outer Accent Plate */}
        <mesh position={[-0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.15, 1.15, 0.3, 6]} />
          <meshStandardMaterial
            color="#FF5500"
            emissive="#FF3300"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Chrome Collar Cap */}
        <mesh position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 24]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.1} />
        </mesh>
      </group>

      {/* Right Heavy Calibrated Plates (Hexagonal Design) */}
      <group position={[1.6, 0, 0]}>
        {/* Main Inner Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.35, 1.35, 0.45, 6]} />
          <meshStandardMaterial
            color="#121622"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
        {/* Outer Accent Plate */}
        <mesh position={[0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.15, 1.15, 0.3, 6]} />
          <meshStandardMaterial
            color="#FF5500"
            emissive="#FF3300"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>
        {/* Chrome Collar Cap */}
        <mesh position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 24]} />
          <meshStandardMaterial color="#FFFFFF" metalness={0.98} roughness={0.1} />
        </mesh>
      </group>

      {/* Orbiting Kinetic Energy Ring (Performance Indicator) */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.04, 16, 64]} />
        <meshStandardMaterial
          color="#00F2FE"
          emissive="#00F2FE"
          emissiveIntensity={hovered ? 2.0 : 1.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// Sparkle Particle Field
function SparkleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesCount = 70;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#FF5500"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCanvas() {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-surface to-slate-950 rounded-3xl border border-white/10">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-brand-orange/20 border border-brand-orange/40 flex items-center justify-center mb-4">
            <span className="text-4xl">🏋️</span>
          </div>
          <h3 className="font-display text-2xl text-white uppercase">Olympic Heavy Lifting</h3>
          <p className="text-sm text-slate-400 mt-2">3D Performance Acceleration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] sm:h-[550px] lg:h-[650px] relative">
      {/* Background glow behind 3D object */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-brand-orange/20 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-brand-cyan/15 blur-[90px] pointer-events-none" />

      <Canvas
        className="cursor-grab active:cursor-grabbing"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5.5]} fov={45} />
        
        {/* Dynamic Studio Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-4, 3, -2]} intensity={2.5} color="#00F2FE" />
        <pointLight position={[4, -2, 2]} intensity={3.0} color="#FF5500" />
        <pointLight position={[0, 4, 3]} intensity={1.0} color="#FFFFFF" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
          <GymCore3D />
        </Float>

        <SparkleField />

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.65}
          scale={7}
          blur={2.5}
          far={4}
          color="#000000"
        />
      </Canvas>

      {/* Floating 3D Interaction Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md text-[11px] font-medium text-slate-400 pointer-events-none shadow-lg">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-ping" />
        <span>Interactive 3D • Drag to rotate equipment</span>
      </div>
    </div>
  );
}
