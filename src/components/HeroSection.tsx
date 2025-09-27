'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCosmosStore } from '@/store/useStore'
import { profileData } from '@/data/profile'

export function HeroSection() {
  const [typedText, setTypedText] = useState('')
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const fullText = "Building the future of intelligence itself"
  
  const { updateConsciousness, triggerCosmicEvent } = useCosmosStore()
  
  // Typing animation
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [])
  
  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex(prev => (prev + 1) % profileData.quotes.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmos-dark via-black to-cosmos-dark opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Glitch effect on name */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-4 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          onHoverStart={() => triggerCosmicEvent('supernova')}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neural-blue via-quantum-purple to-ai-green animate-gradient">
            {profileData.name}
          </span>
          
          {/* Glitch layers */}
          <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-200 animate-glitch-1">
            {profileData.name}
          </span>
          <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-200 animate-glitch-2">
            {profileData.name}
          </span>
        </motion.h1>
        
        {/* Age and title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mb-6"
        >
          <p className="text-2xl md:text-3xl text-cyan-400 font-mono mb-2">
            Age {profileData.age} • {profileData.location}
          </p>
          <p className="text-xl text-purple-400">
            {profileData.subtitle}
          </p>
        </motion.div>
        
        {/* Typing text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mb-8"
        >
          <p className="text-2xl md:text-4xl font-mono text-white">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <StatCard label="Awards Won" value={profileData.metrics.awards_count} />
          <StatCard label="Scholarship" value={`$${profileData.metrics.scholarship_value.toLocaleString()}`} />
          <StatCard label="Students Impacted" value={`${profileData.metrics.students_impacted}+`} />
          <StatCard label="Parameters Target" value="90B" />
        </motion.div>
        
        {/* Rotating quotes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mb-8 h-20"
        >
          <motion.p
            key={currentQuoteIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-lg md:text-xl italic text-gray-300"
          >
            "{profileData.quotes[currentQuoteIndex]}"
          </motion.p>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() => {
              updateConsciousness(0.1)
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-mono text-white hover:scale-105 transition-transform duration-200 shadow-[0_0_20px_rgba(0,255,255,0.5)]"
          >
            Explore Projects
          </button>
          <a
            href="https://apolaai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-purple-500 rounded-full font-mono text-purple-400 hover:bg-purple-500/20 hover:scale-105 transition-all duration-200"
          >
            Visit APOLA AI
          </a>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
        
        .animate-glitch-1 {
          animation: glitch-1 0.3s infinite;
        }
        
        .animate-glitch-2 {
          animation: glitch-2 0.3s infinite reverse;
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
      `}</style>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-lg p-4">
      <p className="text-3xl font-bold text-cyan-400 font-mono">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  )
}