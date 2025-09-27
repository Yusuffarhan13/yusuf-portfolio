'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { cosmicVertexShader, cosmicFragmentShader } from '@/shaders/cosmicParticles'
import { useCosmosStore } from '@/store/useStore'

interface CosmicParticlesProps {
  count?: number
}

export function CosmicParticles({ count = 100000 }: CosmicParticlesProps) {
  const points = useRef<THREE.Points>(null!)
  const { mouse } = useThree()
  const { particleIntensity, cosmicEvent, performanceMode } = useCosmosStore()
  
  // Adjust particle count based on performance mode
  const actualCount = useMemo(() => {
    if (performanceMode === 'low') return Math.floor(count * 0.3)
    if (performanceMode === 'balanced') return Math.floor(count * 0.6)
    return count
  }, [count, performanceMode])
  
  // Generate particle attributes
  const particles = useMemo(() => {
    const positions = new Float32Array(actualCount * 3)
    const randoms = new Float32Array(actualCount)
    const targets = new Float32Array(actualCount * 3)
    
    // Create different formations
    const formations = {
      galaxy: (i: number) => {
        const angle = (i / actualCount) * Math.PI * 2 * 10
        const radius = Math.random() * 50 + (i / actualCount) * 30
        const height = (Math.random() - 0.5) * 5
        return [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ]
      },
      dna: (i: number) => {
        const t = (i / actualCount) * Math.PI * 10
        const radius = 10
        return [
          Math.cos(t) * radius,
          (i / actualCount) * 100 - 50,
          Math.sin(t) * radius
        ]
      },
      neural: (i: number) => {
        // Create neural network-like structure
        const nodeIndex = Math.floor(Math.random() * 20)
        const layerIndex = Math.floor(Math.random() * 5)
        const angleInNode = Math.random() * Math.PI * 2
        const radiusInNode = Math.random() * 3
        return [
          Math.cos(angleInNode) * radiusInNode + nodeIndex * 5 - 50,
          layerIndex * 10 - 20,
          Math.sin(angleInNode) * radiusInNode + (Math.random() - 0.5) * 20
        ]
      }
    }
    
    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3
      
      // Initial positions - spread across space
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 100
      
      randoms[i] = Math.random()
      
      // Set target formation based on random selection
      const formationType = Math.random()
      let target: number[]
      
      if (formationType < 0.33) {
        target = formations.galaxy(i)
      } else if (formationType < 0.66) {
        target = formations.dna(i)
      } else {
        target = formations.neural(i)
      }
      
      targets[i3] = target[0]
      targets[i3 + 1] = target[1]
      targets[i3 + 2] = target[2]
    }
    
    return { positions, randoms, targets }
  }, [actualCount])
  
  // Shader uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouseX: { value: 0.5 },
    uMouseY: { value: 0.5 },
    uIntensity: { value: particleIntensity },
    uColor1: { value: new THREE.Color('#00ffff') }, // Cyan
    uColor2: { value: new THREE.Color('#ff00ff') }, // Magenta
    uColor3: { value: new THREE.Color('#ffff00') }, // Yellow
    uOpacity: { value: 0.8 }
  }), [particleIntensity])
  
  // Handle cosmic events
  useEffect(() => {
    if (!points.current) return
    
    switch(cosmicEvent) {
      case 'supernova':
        // Explosion effect
        uniforms.uIntensity.value = 5
        setTimeout(() => {
          uniforms.uIntensity.value = particleIntensity
        }, 2000)
        break
      case 'blackhole':
        // Implosion effect
        uniforms.uIntensity.value = -2
        setTimeout(() => {
          uniforms.uIntensity.value = particleIntensity
        }, 2000)
        break
      case 'quantum-tunnel':
        // Distortion effect
        uniforms.uColor1.value.set('#00ff00')
        setTimeout(() => {
          uniforms.uColor1.value.set('#00ffff')
        }, 3000)
        break
    }
  }, [cosmicEvent, uniforms, particleIntensity])
  
  useFrame((state) => {
    if (!points.current) return
    
    const time = state.clock.getElapsedTime()
    uniforms.uTime.value = time
    uniforms.uMouseX.value = (mouse.x + 1) / 2
    uniforms.uMouseY.value = (mouse.y + 1) / 2
    
    // Gentle rotation
    points.current.rotation.y = time * 0.02
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1
  })
  
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={actualCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={actualCount}
          array={particles.randoms}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aTarget"
          count={actualCount}
          array={particles.targets}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={cosmicVertexShader}
        fragmentShader={cosmicFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  )
}