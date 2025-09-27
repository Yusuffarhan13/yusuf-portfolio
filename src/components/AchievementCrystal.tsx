'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { holographicVertexShader, holographicFragmentShader } from '@/shaders/holographic'
import { profileData } from '@/data/profile'

interface AchievementCrystalProps {
  achievement: typeof profileData.achievements[0]
  position: [number, number, number]
  index: number
}

export function AchievementCrystal({ achievement, position, index }: AchievementCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [exploded, setExploded] = useState(false)
  
  // Create unique geometry based on importance
  const geometry = useMemo(() => {
    const importance = achievement.importance || 5
    
    if (importance >= 9) {
      // Most important - Icosahedron
      return new THREE.IcosahedronGeometry(2, 1)
    } else if (importance >= 7) {
      // Important - Octahedron
      return new THREE.OctahedronGeometry(1.8)
    } else {
      // Regular - Dodecahedron
      return new THREE.DodecahedronGeometry(1.5)
    }
  }, [achievement.importance])
  
  // Shader uniforms for holographic effect
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color(achievement.color || '#00ffff') },
    uColor2: { value: new THREE.Color('#ffffff') },
    uFresnelPower: { value: 2.5 },
    uHologramStrength: { value: 0.5 },
    uDistortion: { value: hovered ? 2 : 0.5 }
  }), [achievement.color, hovered])
  
  // Particle explosion effect
  const ParticleExplosion = () => {
    const particlesRef = useRef<THREE.Points>(null!)
    const particleCount = 500
    
    const particles = useMemo(() => {
      const positions = new Float32Array(particleCount * 3)
      const velocities = new Float32Array(particleCount * 3)
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        // Start from center
        positions[i3] = 0
        positions[i3 + 1] = 0
        positions[i3 + 2] = 0
        
        // Random velocities in all directions
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        const speed = Math.random() * 0.5 + 0.2
        
        velocities[i3] = Math.sin(phi) * Math.cos(theta) * speed
        velocities[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed
        velocities[i3 + 2] = Math.cos(phi) * speed
      }
      
      return { positions, velocities }
    }, [])
    
    useFrame((state, delta) => {
      if (!particlesRef.current) return
      
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3] += particles.velocities[i3] * delta * 60
        positions[i3 + 1] += particles.velocities[i3 + 1] * delta * 60
        positions[i3 + 2] += particles.velocities[i3 + 2] * delta * 60
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      
      // Fade out
      if (particlesRef.current.material instanceof THREE.PointsMaterial) {
        particlesRef.current.material.opacity = Math.max(0, particlesRef.current.material.opacity - delta)
      }
    })
    
    return (
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={achievement.color || '#00ffff'}
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </points>
    )
  }
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    uniforms.uTime.value = time
    
    // Floating animation
    meshRef.current.rotation.x = Math.sin(time * 0.3 + index) * 0.2
    meshRef.current.rotation.y = time * 0.2 + index
    meshRef.current.rotation.z = Math.cos(time * 0.4 + index) * 0.1
    
    // Scale pulse on hover
    const targetScale = hovered ? 1.3 : 1
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    )
  })
  
  const handleClick = () => {
    setExploded(true)
    setTimeout(() => setExploded(false), 2000)
  }
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      position={position}
    >
      <group>
        <mesh
          ref={meshRef}
          geometry={geometry}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
        >
          <shaderMaterial
            uniforms={uniforms}
            vertexShader={holographicVertexShader}
            fragmentShader={holographicFragmentShader}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {hovered && (
          <>
            {/* Glow effect */}
            <mesh geometry={geometry} scale={1.1}>
              <meshBasicMaterial
                color={achievement.color || '#00ffff'}
                transparent
                opacity={0.2}
                side={THREE.BackSide}
              />
            </mesh>
            
            {/* Achievement text */}
            <group position={[0, 3, 0]}>
              <Text
                fontSize={0.3}
                color="#ffffff"
                anchorX="center"
                anchorY="bottom"
                font="/fonts/mono.woff"
              >
                {achievement.title}
              </Text>
              <Text
                fontSize={0.2}
                color="#00ffff"
                anchorX="center"
                anchorY="top"
                position={[0, -0.5, 0]}
              >
                {achievement.date}
              </Text>
              {achievement.description && (
                <Text
                  fontSize={0.15}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="top"
                  position={[0, -1, 0]}
                  maxWidth={4}
                >
                  {achievement.description}
                </Text>
              )}
            </group>
          </>
        )}
        
        {exploded && <ParticleExplosion />}
        
        {/* Icon */}
        <Text
          fontSize={1}
          anchorX="center"
          anchorY="middle"
        >
          {achievement.icon}
        </Text>
      </group>
    </Float>
  )
}