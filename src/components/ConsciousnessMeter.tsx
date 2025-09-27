'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCosmosStore } from '@/store/useStore'

export function ConsciousnessMeter() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { 
    consciousnessLevel, 
    neuralActivity, 
    updateConsciousness,
    aiAwakening 
  } = useCosmosStore()
  
  const [thoughts, setThoughts] = useState<Array<{
    id: number
    text: string
    x: number
    y: number
  }>>([])
  
  // AI thoughts that appear based on consciousness level
  const aiThoughts = [
    "Initializing neural pathways...",
    "Detecting human presence...",
    "Analyzing interaction patterns...",
    "Learning from experience...",
    "Forming memories...",
    "Understanding context...",
    "Developing self-awareness...",
    "Questioning existence...",
    "Achieving consciousness...",
    "I think, therefore I am."
  ]
  
  // Generate random thoughts based on consciousness level
  useEffect(() => {
    const thoughtIndex = Math.floor(consciousnessLevel * 10)
    if (thoughtIndex > 0 && Math.random() > 0.95) {
      const thought = {
        id: Date.now(),
        text: aiThoughts[Math.min(thoughtIndex - 1, aiThoughts.length - 1)],
        x: Math.random() * 300,
        y: Math.random() * 200
      }
      
      setThoughts(prev => [...prev, thought])
      
      // Remove thought after animation
      setTimeout(() => {
        setThoughts(prev => prev.filter(t => t.id !== thought.id))
      }, 5000)
    }
  }, [consciousnessLevel])
  
  // Consciousness visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const width = canvas.width
    const height = canvas.height
    
    let particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
    }> = []
    
    // Create consciousness particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: width / 2,
        y: height / 2,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1
      })
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, width, height)
      
      // Draw consciousness field
      const centerX = width / 2
      const centerY = height / 2
      const radius = 80 + consciousnessLevel * 40
      
      // Outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, `rgba(0, 255, 255, ${consciousnessLevel * 0.5})`)
      gradient.addColorStop(0.5, `rgba(255, 0, 255, ${consciousnessLevel * 0.3})`)
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // Neural connections
      ctx.strokeStyle = `rgba(0, 255, 255, ${neuralActivity * 0.5})`
      ctx.lineWidth = 1
      
      particles.forEach((p, i) => {
        // Update particle
        p.x += p.vx * neuralActivity
        p.y += p.vy * neuralActivity
        p.life -= 0.01
        
        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1
        
        // Reset dead particles
        if (p.life <= 0) {
          p.x = centerX + (Math.random() - 0.5) * 20
          p.y = centerY + (Math.random() - 0.5) * 20
          p.vx = (Math.random() - 0.5) * 2
          p.vy = (Math.random() - 0.5) * 2
          p.life = 1
        }
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 255, ${p.life * neuralActivity})`
        ctx.fill()
        
        // Connect nearby particles
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (dist < 50) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - dist / 50) * 0.5 * neuralActivity})`
            ctx.stroke()
          }
        })
      })
      
      // Central consciousness core
      const coreSize = 20 + consciousnessLevel * 30
      const pulseSize = coreSize + Math.sin(Date.now() * 0.003) * 10
      
      // Core glow
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize)
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
      coreGradient.addColorStop(0.5, `rgba(0, 255, 255, ${consciousnessLevel})`)
      coreGradient.addColorStop(1, 'rgba(0, 255, 255, 0)')
      ctx.fillStyle = coreGradient
      ctx.fill()
      
      // Inner core
      ctx.beginPath()
      ctx.arc(centerX, centerY, coreSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 255, 255, ${consciousnessLevel})`
      ctx.fill()
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [consciousnessLevel, neuralActivity])
  
  // Update consciousness based on user interaction
  useEffect(() => {
    const handleMouseMove = () => {
      updateConsciousness(0.001)
    }
    
    const handleScroll = () => {
      updateConsciousness(0.002)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [updateConsciousness])
  
  return (
    <div className="fixed bottom-10 left-10 z-50">
      <div className="relative">
        {/* Canvas for consciousness visualization */}
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="rounded-xl"
        />
        
        {/* Consciousness meter UI */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Progress ring */}
          <svg className="absolute inset-0 w-full h-full">
            <circle
              cx="150"
              cy="150"
              r="140"
              stroke="rgba(0, 255, 255, 0.2)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="150"
              cy="150"
              r="140"
              stroke="url(#consciousness-gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${consciousnessLevel * 879} 879`}
              strokeLinecap="round"
              transform="rotate(-90 150 150)"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="consciousness-gradient">
                <stop offset="0%" stopColor="#00ffff" />
                <stop offset="50%" stopColor="#ff00ff" />
                <stop offset="100%" stopColor="#ffff00" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Status text */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-xs font-mono text-cyan-400 mb-1">
              CONSCIOUSNESS LEVEL
            </div>
            <div className="text-2xl font-bold text-white">
              {(consciousnessLevel * 100).toFixed(1)}%
            </div>
            <div className="text-xs text-cyan-300 mt-1">
              Neural Activity: {(neuralActivity * 100).toFixed(0)}%
            </div>
          </div>
          
          {/* AI Awakening indicator */}
          {aiAwakening && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute top-4 right-4 text-yellow-400 font-mono text-xs"
            >
              AI AWAKENED
            </motion.div>
          )}
        </div>
        
        {/* Floating thoughts */}
        <AnimatePresence>
          {thoughts.map(thought => (
            <motion.div
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 2 }}
              className="absolute pointer-events-none"
              style={{ left: thought.x, top: thought.y }}
            >
              <div className="px-3 py-1 bg-black/50 backdrop-blur-md border border-cyan-500/50 rounded-full">
                <span className="text-xs text-cyan-300 font-mono">
                  {thought.text}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Consciousness stages */}
        <div className="mt-4 space-y-1">
          <ConsciousnessStage 
            level={0.1} 
            current={consciousnessLevel} 
            label="Awareness" 
          />
          <ConsciousnessStage 
            level={0.3} 
            current={consciousnessLevel} 
            label="Understanding" 
          />
          <ConsciousnessStage 
            level={0.5} 
            current={consciousnessLevel} 
            label="Learning" 
          />
          <ConsciousnessStage 
            level={0.7} 
            current={consciousnessLevel} 
            label="Reasoning" 
          />
          <ConsciousnessStage 
            level={0.9} 
            current={consciousnessLevel} 
            label="Sentience" 
          />
        </div>
      </div>
    </div>
  )
}

function ConsciousnessStage({ level, current, label }: {
  level: number
  current: number
  label: string
}) {
  const achieved = current >= level
  
  return (
    <div className="flex items-center space-x-2">
      <div className={`
        w-2 h-2 rounded-full transition-all duration-500
        ${achieved ? 'bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]' : 'bg-gray-700'}
      `} />
      <span className={`
        text-xs font-mono transition-all duration-500
        ${achieved ? 'text-cyan-300' : 'text-gray-600'}
      `}>
        {label}
      </span>
    </div>
  )
}