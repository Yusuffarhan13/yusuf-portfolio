'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import TerminalWindow from './TerminalWindow'
import TypingEffect from './TypingEffect'
import { YUSUF_ASCII, FARHAN_ASCII } from './ASCIIArt'

export default function Hero() {
  const [showName, setShowName] = useState(false)
  const [showTagline, setShowTagline] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  useEffect(() => {
    // Boot sequence
    const lines = [
      '> System.initialize()',
      '> Loading neural networks...',
      '> Connecting to consciousness matrix...',
      '> AGI modules loaded successfully',
      '> Welcome to the future of intelligence',
    ]
    
    lines.forEach((line, index) => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line])
        if (index === lines.length - 1) {
          setTimeout(() => setShowName(true), 500)
        }
      }, index * 800)
    })
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-dos-blue overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-rain" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        {/* Main Terminal Window */}
        <TerminalWindow title="YUSUF_FARHAN.exe" className="mb-8">
          <div className="space-y-4">
            {/* Boot Sequence */}
            <div className="space-y-1 text-sm opacity-70">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono"
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* ASCII Name */}
            {showName && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="ascii-art text-center my-8"
              >
                <pre className="text-xs sm:text-sm md:text-base inline-block">
                  {YUSUF_ASCII}
                </pre>
              </motion.div>
            )}

            {/* Tagline with Typing Effect */}
            {showName && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-xl md:text-2xl font-bold"
              >
                <span className="text-dos-gray">C:\USERS\YUSUF> </span>
                <TypingEffect
                  text="Building AGI at 15 years old"
                  speed={80}
                  onComplete={() => setShowTagline(true)}
                />
              </motion.div>
            )}

            {/* Sub-tagline */}
            {showTagline && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mt-4"
              >
                <p className="text-dos-yellow">
                  Sri Lankan Prodigy | AI Architect | Future Builder
                </p>
              </motion.div>
            )}
          </div>
        </TerminalWindow>

        {/* Stats Grid */}
        {showName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: 'IQ_LEVEL', value: 'INF', command: 'get --iq' },
              { label: 'AWARDS', value: '20+', command: 'list --awards' },
              { label: 'PROJECTS', value: '50+', command: 'count --projects' },
              { label: 'TARGET', value: '90B', command: 'agi --params' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
              >
                <TerminalWindow title={`stat_${i}.sh`} showClose={false}>
                  <div className="text-center py-2">
                    <div className="text-xs opacity-70 mb-1">{`> ${stat.command}`}</div>
                    <div className="text-3xl font-bold text-dos-cyan" data-text={stat.value}>
                      {stat.value}
                    </div>
                    <div className="text-xs mt-1">{stat.label}</div>
                  </div>
                </TerminalWindow>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Buttons */}
        {showTagline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-xp-gray border-2 border-xp-gray-dark text-black font-mono hover:bg-xp-blue hover:text-white transition-all"
            >
              ./view_projects.sh
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-b from-xp-blue-light to-xp-blue text-white font-mono hover:from-xp-blue hover:to-xp-blue-dark transition-all shadow-md"
            >
              ./contact_me.exe
            </button>
          </motion.div>
        )}

        {/* Scroll Indicator */}
        {showTagline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          >
            <div className="text-xs text-dos-gray mb-2">SCROLL_DOWN.exe</div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-white"
            >
              v
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}