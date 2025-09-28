'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { MotionValue } from 'framer-motion'

// Country locations for awards
const countryMarkers = [
  { name: 'USA', lat: 40.7128, lng: -74.0060, color: '#00ffff' },
  { name: 'UK', lat: 51.5074, lng: -0.1278, color: '#00ffff' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, color: '#00ffff' },
  { name: 'India', lat: 20.5937, lng: 78.9629, color: '#00ffff' },
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718, color: '#ffff00' }, // Home country in yellow
  { name: 'Japan', lat: 36.2048, lng: 138.2529, color: '#00ffff' },
  { name: 'Australia', lat: -25.2744, lng: 133.7751, color: '#00ffff' },
  { name: 'Germany', lat: 51.1657, lng: 10.4515, color: '#00ffff' },
]

function CountryMarkers({ radius = 2.05 }: { radius?: number }) {
  const markers = useMemo(() => {
    return countryMarkers.map(country => {
      // Convert lat/lng to 3D coordinates
      const phi = (90 - country.lat) * (Math.PI / 180)
      const theta = (country.lng + 180) * (Math.PI / 180)
      
      const x = -(radius * Math.sin(phi) * Math.cos(theta))
      const y = radius * Math.cos(phi)
      const z = radius * Math.sin(phi) * Math.sin(theta)
      
      return {
        ...country,
        position: new THREE.Vector3(x, y, z)
      }
    })
  }, [radius])

  return (
    <>
      {markers.map((marker, i) => (
        <group key={i} position={marker.position}>
          {/* Glowing dot */}
          <mesh>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial 
              color={marker.color}
              emissive={marker.color}
              emissiveIntensity={3}
            />
          </mesh>
          {/* Outer glow */}
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial 
              color={marker.color}
              transparent
              opacity={0.3}
            />
          </mesh>
          {/* Pulse ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.08, 0.1, 16]} />
            <meshStandardMaterial 
              color={marker.color}
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Globe({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
    if (groupRef.current) {
      // Rotate based on scroll
      const progress = scrollProgress.get()
      groupRef.current.rotation.y = progress * Math.PI * 2
      groupRef.current.rotation.x = Math.sin(progress * Math.PI) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Globe wireframe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshStandardMaterial 
          color="#00aaaa"
          wireframe
          opacity={0.15}
          transparent
        />
      </mesh>
      
      {/* Inner dark sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshStandardMaterial 
          color="#000033"
          opacity={0.95}
          transparent
        />
      </mesh>
      
      {/* Country markers */}
      <CountryMarkers />
      
      {/* Equator line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.02, 0.005, 2, 100]} />
        <meshStandardMaterial color="#00ffff" opacity={0.3} transparent />
      </mesh>
      
      {/* Meridian lines */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[2.02, 0.005, 2, 100]} />
        <meshStandardMaterial color="#00aaaa" opacity={0.2} transparent />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[2.02, 0.005, 2, 100]} />
        <meshStandardMaterial color="#00aaaa" opacity={0.2} transparent />
      </mesh>
    </group>
  )
}

export default function NeuralGlobe({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00aaaa" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0066cc" />
        
        <Globe scrollProgress={scrollProgress} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}