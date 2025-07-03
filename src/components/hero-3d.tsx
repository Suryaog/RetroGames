'use client'

import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, Sphere, Torus, Box } from '@react-three/drei'
import * as THREE from 'three'

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group>
      <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
        <Torus ref={meshRef} args={[1, 0.3, 16, 32]} position={[-4, 0, 0]}>
          <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.2} />
        </Torus>
      </Float>
      
      <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.5}>
        <Box args={[1.5, 1.5, 1.5]} position={[4, 0, 0]}>
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.15} />
        </Box>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={2.5}>
        <Sphere args={[0.8]} position={[0, 2, -2]}>
          <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.1} />
        </Sphere>
      </Float>
    </group>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#7c3aed" transparent opacity={0.6} />
    </points>
  )
}

export function Hero3D() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
          
          <ParticleField />
          <FloatingGeometry />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-game font-bold mb-6 bg-gradient-to-r from-primary-400 via-neon-pink to-neon-blue bg-clip-text text-transparent animate-glow">
            RETRO GAMES 3D
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience classic games like never before in stunning 3D. 
            Compete on global leaderboards and relive the golden age of gaming.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="#games" 
            className="neon-button text-lg px-8 py-4 inline-flex items-center space-x-2 animate-pulse-slow"
          >
            <span>Start Playing</span>
            <span className="animate-bounce">🎮</span>
          </a>
          <a 
            href="#leaderboard" 
            className="glass-effect px-8 py-4 rounded-lg text-lg hover:bg-white/10 transition-all duration-300 border border-primary-400/30"
          >
            View Leaderboards
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          <div className="glass-effect p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-primary-400 font-game">25+</div>
            <div className="text-sm text-gray-400">Games</div>
          </div>
          <div className="glass-effect p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-neon-pink font-game">∞</div>
            <div className="text-sm text-gray-400">Fun</div>
          </div>
          <div className="glass-effect p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-neon-blue font-game">3D</div>
            <div className="text-sm text-gray-400">Graphics</div>
          </div>
          <div className="glass-effect p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-neon-green font-game">FREE</div>
            <div className="text-sm text-gray-400">To Play</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}