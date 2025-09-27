'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { AchievementCrystal } from './AchievementCrystal'
import { profileData } from '@/data/profile'

export function AchievementShowcase() {
  const coreRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  
  // Position achievements in a spiral around the core
  const getAchievementPosition = (index: number, total: number): [number, number, number] => {
    const angle = (index / total) * Math.PI * 2
    const radius = 8 + Math.sin(index * 0.5) * 2
    const height = Math.sin(index * 0.8) * 3
    
    return [
      Math.cos(angle) * radius,
      height,
      Math.sin(angle) * radius
    ]
  }
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Pulsing AI Core
    if (coreRef.current) {
      const pulse = Math.sin(time * 2) * 0.1 + 1
      coreRef.current.scale.setScalar(pulse)
      
      // Neural activity simulation
      if (coreRef.current.material instanceof THREE.ShaderMaterial) {
        coreRef.current.material.uniforms.uTime.value = time
      }
    }
    
    // Rotate the entire achievement system
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05
    }
  })
  
  // AI Core shader material
  const coreShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#00ffff') },
      uColor2: { value: new THREE.Color('#ff00ff') }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        // Neural activity pattern
        float pattern = sin(vPosition.x * 10.0 + uTime * 2.0) * 
                       sin(vPosition.y * 10.0 + uTime * 1.5) * 
                       sin(vPosition.z * 10.0 + uTime);
        pattern = pattern * 0.5 + 0.5;
        
        // Pulsing gradient
        vec3 color = mix(uColor1, uColor2, pattern);
        
        // Add glow
        float glow = pow(pattern, 2.0);
        color += glow * vec3(0.2, 0.5, 1.0);
        
        gl_FragColor = vec4(color, 0.9);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  })
  
  return (
    <group ref={groupRef}>
      {/* AI Core at the center */}
      <Trail
        width={3}
        length={10}
        color={new THREE.Color('#00ffff')}
        attenuation={(width) => width}
      >
        <Sphere ref={coreRef} args={[2, 32, 32]}>
          <primitive object={coreShaderMaterial} attach="material" />
        </Sphere>
      </Trail>
      
      {/* Energy field around core */}
      <Sphere args={[2.5, 16, 16]}>
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>
      
      {/* Orbiting achievements */}
      {profileData.achievements.map((achievement, index) => (
        <AchievementCrystal
          key={achievement.id}
          achievement={achievement}
          position={getAchievementPosition(index, profileData.achievements.length)}
          index={index}
        />
      ))}
      
      {/* Connecting lines between achievements and core */}
      {profileData.achievements.map((_, index) => {
        const pos = getAchievementPosition(index, profileData.achievements.length)
        return (
          <line key={`line-${index}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([0, 0, 0, ...pos])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.2}
            />
          </line>
        )
      })}
      
      <OrbitControls
        enablePan={false}
        maxDistance={30}
        minDistance={5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </group>
  )
}