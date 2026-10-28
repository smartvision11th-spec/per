"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, PerspectiveCamera, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// High-detail Sculpted 3D Dumbbell & Kinetic Rings
function SculptedGymCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse smooth dampening
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Natural athletic floating breathing motion
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.12;
    
    // Interactive cursor parallax (quicker, responsive damping)
    const targetRotY = (state.pointer.x * Math.PI) / 3.5 + t * 0.25;
    const targetRotX = (-state.pointer.y * Math.PI) / 4 + Math.sin(t * 0.6) * 0.1;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);

    // Counter-rotating kinetic energy rings
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = t * 0.7;
      outerRingRef.current.rotation.x = Math.sin(t * 0.5) * 0.4;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 1.1;
      innerRingRef.current.rotation.y = Math.cos(t * 0.7) * 0.5;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.06 : 1}
      position={[0, 0, 0]}
    >
      {/* Central Ergonomic Knurled Steel Bar */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 3.4, 48]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.98}
          roughness={0.12}
        />
      </mesh>

      {/* Textured Diamond Knurl Grips (Neon Orange Insets) */}
      {[-0.8, -0.27, 0.27, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.275, 0.275, 0.38, 32]} />
          <meshStandardMaterial
            color="#FF4D00"
            emissive="#FF3300"
            emissiveIntensity={hovered ? 0.8 : 0.4}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Left Heavy Plate Assembly */}
      <group position={[-2.1, 0, 0]}>
        {/* Main 45LB Calibrated Steel Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.7, 1.7, 0.5, 8]} />
          <meshStandardMaterial
            color="#0B0E16"
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>
        {/* Deep Rim Lip */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.6, 0.08, 16, 48]} />
          <meshStandardMaterial
            color="#FF4D00"
            emissive="#FF4D00"
            emissiveIntensity={hovered ? 1.4 : 0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Secondary 25LB Accent Plate */}
        <mesh position={[-0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.35, 8]} />
          <meshStandardMaterial
            color="#141A29"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        {/* Mirror Chrome Olympic Collar Lock */}
        <mesh position={[-0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.52, 0.52, 0.3, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={1.0}
            roughness={0.05}
          />
        </mesh>
      </group>

      {/* Right Heavy Plate Assembly */}
      <group position={[2.1, 0, 0]}>
        {/* Main 45LB Calibrated Steel Plate */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.7, 1.7, 0.5, 8]} />
          <meshStandardMaterial
            color="#0B0E16"
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>
        {/* Deep Rim Lip */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[1.6, 0.08, 16, 48]} />
          <meshStandardMaterial
            color="#FF4D00"
            emissive="#FF4D00"
            emissiveIntensity={hovered ? 1.4 : 0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Secondary 25LB Accent Plate */}
        <mesh position={[0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[1.4, 1.4, 0.35, 8]} />
          <meshStandardMaterial
            color="#141A29"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>
        {/* Mirror Chrome Olympic Collar Lock */}
        <mesh position={[0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.52, 0.52, 0.3, 32]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={1.0}
            roughness={0.05}
          />
        </mesh>
      </group>

      {/* Outer Gyroscopic Kinetic Energy Halo */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[2.75, 0.045, 24, 80]} />
        <meshStandardMaterial
          color="#00F2FE"
          emissive="#00F2FE"
          emissiveIntensity={hovered ? 2.5 : 1.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Inner Kinetic Velocity Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[2.2, 0.035, 20, 64]} />
        <meshStandardMaterial
          color="#FF4D00"
          emissive="#FF4D00"
          emissiveIntensity={hovered ? 2.8 : 1.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function HeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[520px] lg:h-[680px] flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-brand-orange border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-[520px] sm:h-[600px] lg:h-[700px] relative select-none">
      {/* Background Volumetric Neon Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full bg-brand-orange/20 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full bg-brand-cyan/20 blur-[110px] pointer-events-none" />

      <Canvas
        className="cursor-grab active:cursor-grabbing"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 6.2]} fov={42} />
        
        {/* Professional 3-Point Studio Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 9, 6]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[-5, 4, -2]} intensity={4.5} color="#00F2FE" />
        <pointLight position={[5, -3, 3]} intensity={5.0} color="#FF4D00" />
        <pointLight position={[0, 5, 2]} intensity={1.8} color="#FFFFFF" />

        {/* Floating Sparks & Embers Field */}
        <Sparkles
          count={80}
          scale={7}
          size={2.8}
          speed={0.6}
          opacity={0.7}
          color="#FF631F"
        />
        <Sparkles
          count={40}
          scale={6}
          size={2.2}
          speed={0.4}
          opacity={0.5}
          color="#00F2FE"
        />

        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.5}>
          <SculptedGymCore />
        </Float>

        <ContactShadows
          position={[0, -2.6, 0]}
          opacity={0.7}
          scale={8}
          blur={2.8}
          far={5}
          color="#000000"
        />
      </Canvas>

      {/* Floating 21st.dev Style Interactive Telemetry Pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full glass-card border border-white/10 shadow-2xl backdrop-blur-xl text-xs font-mono text-slate-300 pointer-events-none">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
        </span>
        <span className="tracking-wider uppercase text-[11px] font-bold text-white">
          3D Kinetic Core • Drag To Explore
        </span>
      </div>
    </div>
  );
}
