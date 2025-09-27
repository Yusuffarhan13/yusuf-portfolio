'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCosmosStore } from '@/store/useStore'
import { profileData } from '@/data/profile'

export function TechHUD() {
  const [time, setTime] = useState(new Date())
  const [fps, setFps] = useState(60)
  const [memoryUsage, setMemoryUsage] = useState(0)
  const [cpuTemp, setCpuTemp] = useState(45)
  const [dataProcessed, setDataProcessed] = useState(0)
  const [glitchActive, setGlitchActive] = useState(false)
  const [matrixRain, setMatrixRain] = useState<string[]>([])
  
  const fpsRef = useRef<number[]>([])
  const lastFrameTime = useRef(performance.now())
  
  const { 
    consciousnessLevel, 
    neuralActivity, 
    particleIntensity,
    hackerMode,
    activeSection 
  } = useCosmosStore()
  
  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  
  // Calculate FPS
  useEffect(() => {
    const calculateFPS = () => {
      const currentTime = performance.now()
      const deltaTime = currentTime - lastFrameTime.current
      const currentFPS = Math.round(1000 / deltaTime)
      
      fpsRef.current.push(currentFPS)
      if (fpsRef.current.length > 10) {
        fpsRef.current.shift()
      }
      
      const avgFPS = fpsRef.current.reduce((a, b) => a + b, 0) / fpsRef.current.length
      setFps(Math.round(avgFPS))
      
      lastFrameTime.current = currentTime
      requestAnimationFrame(calculateFPS)
    }
    
    const animationId = requestAnimationFrame(calculateFPS)
    return () => cancelAnimationFrame(animationId)
  }, [])
  
  // Simulate system metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMemoryUsage(prev => {
        const delta = (Math.random() - 0.5) * 10
        return Math.max(20, Math.min(95, prev + delta))
      })
      
      setCpuTemp(prev => {
        const delta = (Math.random() - 0.5) * 2
        return Math.max(40, Math.min(85, prev + delta))
      })
      
      setDataProcessed(prev => prev + Math.random() * 1000000)
      
      // Random glitch effect
      if (Math.random() > 0.98) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  // Matrix rain effect
  useEffect(() => {
    if (!hackerMode) {
      setMatrixRain([])
      return
    }
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?'
    const columns = 20
    const rain: string[] = []
    
    for (let i = 0; i < columns; i++) {
      let column = ''
      for (let j = 0; j < 30; j++) {
        column += chars[Math.floor(Math.random() * chars.length)]
      }
      rain.push(column)
    }
    
    setMatrixRain(rain)
    
    const interval = setInterval(() => {
      setMatrixRain(prev => prev.map(column => {
        const newChar = chars[Math.floor(Math.random() * chars.length)]
        return newChar + column.slice(0, -1)
      }))
    }, 100)
    
    return () => clearInterval(interval)
  }, [hackerMode])
  
  const formatBytes = (bytes: number) => {
    if (bytes < 1000) return `${bytes} B`
    if (bytes < 1000000) return `${(bytes / 1000).toFixed(1)} KB`
    if (bytes < 1000000000) return `${(bytes / 1000000).toFixed(1)} MB`
    return `${(bytes / 1000000000).toFixed(2)} GB`
  }
  
  return (
    <div className={`fixed top-0 left-0 right-0 p-4 z-40 pointer-events-none ${glitchActive ? 'glitch' : ''}`}>
      {/* Top bar */}
      <div className="flex justify-between items-start">
        {/* Left side - System metrics */}
        <div className="space-y-2 pointer-events-auto">
          <motion.div 
            className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg p-3 font-mono text-xs"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-cyan-400 mb-2">SYSTEM DIAGNOSTICS</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">FPS:</span>
                <span className={`${fps < 30 ? 'text-red-400' : fps < 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {fps}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">MEMORY:</span>
                <span className={`${memoryUsage > 80 ? 'text-red-400' : memoryUsage > 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {memoryUsage.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">CPU TEMP:</span>
                <span className={`${cpuTemp > 75 ? 'text-red-400' : cpuTemp > 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                  {cpuTemp.toFixed(1)}°C
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">PARTICLES:</span>
                <span className="text-cyan-300">{(particleIntensity * 100000).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Neural metrics */}
          <motion.div 
            className="bg-black/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-3 font-mono text-xs"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-purple-400 mb-2">NEURAL METRICS</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">CONSCIOUSNESS:</span>
                <span className="text-purple-300">{(consciousnessLevel * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">NEURAL ACTIVITY:</span>
                <span className="text-purple-300">{(neuralActivity * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SYNAPSES:</span>
                <span className="text-purple-300">{Math.floor(neuralActivity * 1000000).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">THOUGHTS/SEC:</span>
                <span className="text-purple-300">{Math.floor(consciousnessLevel * 1000)}</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Center - Status display */}
        <motion.div 
          className="text-center pointer-events-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-mono">
              YUSUF FARHAN
            </h1>
            <p className="text-xs text-cyan-300 mt-1 font-mono">
              AI ARCHITECT | AGE 15 | SRI LANKA
            </p>
            <div className="mt-3 text-xs font-mono text-gray-400">
              {time.toLocaleTimeString('en-US', { hour12: false })}
            </div>
            <div className="text-xs font-mono text-gray-500">
              SECTION: {activeSection.toUpperCase()}
            </div>
          </div>
        </motion.div>
        
        {/* Right side - Data stream */}
        <div className="space-y-2 pointer-events-auto">
          <motion.div 
            className="bg-black/50 backdrop-blur-md border border-green-500/30 rounded-lg p-3 font-mono text-xs"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-green-400 mb-2">DATA STREAM</div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">PROCESSED:</span>
                <span className="text-green-300">{formatBytes(dataProcessed)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">MODELS:</span>
                <span className="text-green-300">{profileData.projects.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ACHIEVEMENTS:</span>
                <span className="text-green-300">{profileData.achievements.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">PARAMETERS:</span>
                <span className="text-green-300">90B TARGET</span>
              </div>
            </div>
          </motion.div>
          
          {/* Status indicators */}
          <motion.div 
            className="bg-black/50 backdrop-blur-md border border-yellow-500/30 rounded-lg p-3 font-mono text-xs"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-yellow-400 mb-2">STATUS</div>
            <div className="space-y-1">
              <StatusIndicator label="APOLA AI" status="online" />
              <StatusIndicator label="AGI RESEARCH" status="active" />
              <StatusIndicator label="7B LLM" status="training" />
              <StatusIndicator label="QUANTUM FIELD" status="stable" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Matrix rain effect for hacker mode */}
      {hackerMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="flex justify-around h-full">
            {matrixRain.map((column, i) => (
              <div
                key={i}
                className="text-green-400 font-mono text-xs opacity-20"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  animation: `matrix-fall ${10 + i % 5}s linear infinite`
                }}
              >
                {column}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .glitch {
          animation: glitch 0.2s infinite;
        }
        
        @keyframes glitch {
          0% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          80% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </div>
  )
}

function StatusIndicator({ label, status }: { label: string; status: 'online' | 'active' | 'training' | 'stable' }) {
  const colors = {
    online: 'text-green-400',
    active: 'text-blue-400',
    training: 'text-yellow-400',
    stable: 'text-cyan-400'
  }
  
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}:</span>
      <div className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${colors[status]} animate-pulse`} />
        <span className={colors[status]}>{status.toUpperCase()}</span>
      </div>
    </div>
  )
}