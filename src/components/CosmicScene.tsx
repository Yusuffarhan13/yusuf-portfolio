'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { 
  Preload, 
  PerformanceMonitor, 
  AdaptiveDpr, 
  AdaptiveEvents,
  Stars,
  Environment
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing'
import { CosmicParticles } from './CosmicParticles'
import { AchievementShowcase } from './AchievementShowcase'
import { ProjectShowcase } from './ProjectShowcase'
import { profileData } from '@/data/profile'
import { useCosmosStore } from '@/store/useStore'

export function CosmicScene() {
  const { performanceMode } = useCosmosStore()
  
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        gl={{ 
          antialias: performanceMode === 'high',
          alpha: true,
          powerPreference: performanceMode === 'high' ? 'high-performance' : 'default'
        }}
      >
        <Suspense fallback={null}>
          {/* Performance optimization */}
          <PerformanceMonitor
            onIncline={() => useCosmosStore.getState().setPerformanceMode('high')}
            onDecline={() => useCosmosStore.getState().setPerformanceMode('balanced')}
          />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff00ff" />
          
          {/* Environment */}
          <Environment preset="night" />
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />
          
          {/* Main components */}
          <CosmicParticles count={performanceMode === 'high' ? 100000 : 50000} />
          
          <group position={[0, 0, -10]}>
            <AchievementShowcase />
          </group>
          
          {/* Project showcases in a grid */}
          <group position={[0, 0, 0]}>
            {profileData.projects.map((project, index) => {
              const row = Math.floor(index / 3)
              const col = index % 3
              const x = (col - 1) * 8
              const y = (row - 1) * 8
              const z = -5
              
              return (
                <ProjectShowcase
                  key={project.id}
                  project={project}
                  index={index}
                  position={[x, y, z]}
                />
              )
            })}
          </group>
          
          {/* Post-processing effects */}
          {performanceMode !== 'low' && (
            <EffectComposer>
              <Bloom 
                intensity={1.5} 
                luminanceThreshold={0.4} 
                luminanceSmoothing={0.9} 
              />
              <ChromaticAberration 
                offset={[0.002, 0.002]} 
                radialModulation={false}
                modulationOffset={0}
              />
              <Vignette 
                eskil={false} 
                offset={0.1} 
                darkness={0.5} 
              />
            </EffectComposer>
          )}
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}