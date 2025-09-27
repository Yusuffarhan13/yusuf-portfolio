'use client'

import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, MeshTransmissionMaterial, Float, Box, Sphere, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { profileData } from '@/data/profile'

interface ProjectShowcaseProps {
  project: typeof profileData.projects[0]
  index: number
  position: [number, number, number]
}

export function ProjectShowcase({ project, index, position }: ProjectShowcaseProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  const [morphTarget, setMorphTarget] = useState(0)
  
  // Different shapes for different projects
  const getProjectGeometry = useMemo(() => {
    switch(index % 4) {
      case 0: // Brain for APOLA AI
        return (
          <Sphere args={[2, 32, 32]}>
            <meshStandardMaterial color={project.color} />
          </Sphere>
        )
      case 1: // Torus for AGI Research
        return (
          <Torus args={[2, 0.8, 16, 32]}>
            <meshStandardMaterial color={project.color} />
          </Torus>
        )
      case 2: // Box for LLM
        return (
          <Box args={[3, 3, 3]}>
            <meshStandardMaterial color={project.color} />
          </Box>
        )
      default: // Complex shape
        return (
          <mesh>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial color={project.color} />
          </mesh>
        )
    }
  }, [index, project.color])
  
  // Displacement shader for morphing effect
  const displacementShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uColor: { value: new THREE.Color(project.color) },
      uDisplacement: { value: 0 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uMorph;
      uniform float uDisplacement;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        vUv = uv;
        vNormal = normal;
        vPosition = position;
        
        vec3 pos = position;
        
        // Morphing displacement
        float noise = snoise(pos * 0.5 + uTime * 0.2);
        float displacement = noise * uDisplacement * uMorph;
        
        // Apply displacement along normal
        pos += normal * displacement;
        
        // Additional wave distortion
        pos.x += sin(pos.y * 2.0 + uTime) * 0.1 * uMorph;
        pos.y += cos(pos.z * 2.0 + uTime * 1.3) * 0.1 * uMorph;
        pos.z += sin(pos.x * 2.0 + uTime * 0.7) * 0.1 * uMorph;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uMorph;
      
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      
      void main() {
        // Calculate fresnel
        vec3 viewDirection = normalize(cameraPosition - vPosition);
        float fresnel = 1.0 - dot(viewDirection, vNormal);
        fresnel = pow(fresnel, 2.0);
        
        // Animated color shift
        vec3 color = uColor;
        color.r += sin(uTime * 2.0) * 0.1 * uMorph;
        color.g += cos(uTime * 1.5) * 0.1 * uMorph;
        color.b += sin(uTime * 3.0) * 0.1 * uMorph;
        
        // Add glow effect
        color += fresnel * vec3(0.3, 0.5, 1.0);
        
        // Energy lines
        float lines = sin(vPosition.y * 20.0 + uTime * 3.0) * 0.5 + 0.5;
        lines = pow(lines, 10.0) * uMorph;
        color += vec3(lines) * vec3(0.0, 1.0, 1.0);
        
        gl_FragColor = vec4(color, 0.9 + fresnel * 0.1);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  }), [project.color])
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.getElapsedTime()
    
    // Update shader uniforms
    if (meshRef.current.material instanceof THREE.ShaderMaterial) {
      meshRef.current.material.uniforms.uTime.value = time
      meshRef.current.material.uniforms.uMorph.value = morphTarget
      meshRef.current.material.uniforms.uDisplacement.value = hovered ? 2 : 0.5
    }
    
    // Smooth morph transition
    const targetMorph = hovered ? 1 : 0
    setMorphTarget(prev => prev + (targetMorph - prev) * 0.05)
    
    // Rotation
    meshRef.current.rotation.y = time * 0.1 + index
    meshRef.current.rotation.x = Math.sin(time * 0.2 + index) * 0.1
    
    // Floating effect
    meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.3
  })
  
  return (
    <Float
      speed={1}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      position={position}
    >
      <group>
        {/* Main morphing mesh */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <icosahedronGeometry args={[2, 4]} />
          <shaderMaterial
            {...displacementShader}
            uniforms-uTime-value={0}
            uniforms-uMorph-value={morphTarget}
            uniforms-uDisplacement-value={hovered ? 2 : 0.5}
          />
        </mesh>
        
        {/* Project name */}
        <Text
          position={[0, -3, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          font="/fonts/mono.woff"
        >
          {project.name}
        </Text>
        
        {/* Project tagline */}
        <Text
          position={[0, -3.5, 0]}
          fontSize={0.3}
          color="#00ffff"
          anchorX="center"
        >
          {project.tagline}
        </Text>
        
        {/* Hover details */}
        {hovered && (
          <group position={[0, 3, 0]}>
            <Text
              fontSize={0.25}
              color="#ffffff"
              anchorX="center"
              maxWidth={5}
            >
              {project.description}
            </Text>
            
            {/* Tech stack */}
            <group position={[0, -0.8, 0]}>
              {project.technologies.slice(0, 3).map((tech, i) => (
                <Text
                  key={tech}
                  position={[(i - 1) * 1.5, 0, 0]}
                  fontSize={0.15}
                  color="#00ff00"
                  anchorX="center"
                >
                  {tech}
                </Text>
              ))}
            </group>
            
            {/* Status indicator */}
            <mesh position={[0, -1.5, 0]}>
              <boxGeometry args={[1.5, 0.3, 0.1]} />
              <meshBasicMaterial 
                color={project.status === 'Live' ? '#00ff00' : '#ffff00'}
                transparent
                opacity={0.8}
              />
            </mesh>
            <Text
              position={[0, -1.5, 0.1]}
              fontSize={0.15}
              color="#000000"
              anchorX="center"
            >
              {project.status}
            </Text>
          </group>
        )}
        
        {/* Orbiting features */}
        {hovered && project.features.slice(0, 3).map((feature, i) => {
          const angle = (i / 3) * Math.PI * 2
          const radius = 3
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.2]} />
              <meshBasicMaterial color="#00ffff" />
            </mesh>
          )
        })}
      </group>
    </Float>
  )
}