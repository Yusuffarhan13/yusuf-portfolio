'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { profileData } from '@/data/profile'
import TerminalWindow from './TerminalWindow'
import dynamic from 'next/dynamic'
import { useRef } from 'react'

const NeuralGlobe = dynamic(() => import('./NeuralGlobe'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-dos-cyan animate-pulse">Loading Globe...</div>
    </div>
  )
})

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  // Transform scroll progress to 0-1 for globe rotation
  const globeProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section 
      ref={containerRef}
      id="achievements" 
      className="relative bg-dos-blue"
    >
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="matrix-rain" />
      </div>
      
      {/* Terminal Window */}
      <div className="relative z-10">
        <TerminalWindow 
          title="GLOBAL_ACHIEVEMENTS.exe" 
          className="min-h-screen"
        >
          <div className="flex flex-col lg:flex-row relative">
            {/* Left side - Globe (Sticky on desktop) */}
            <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-0 lg:h-screen">
              <div className="h-full flex flex-col justify-center p-8">
                {/* Title Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-dos-cyan">
                    Award-Winning Excellence
                  </h2>
                  <p className="text-sm sm:text-base lg:text-lg text-dos-gray">International recognition at just 15 years old</p>
                </div>
                
                <motion.div 
                  className="relative h-[500px]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <NeuralGlobe scrollProgress={globeProgress} />
                </motion.div>
              </div>
            </div>

            {/* Mobile view - Globe at top */}
            <div className="lg:hidden w-full p-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-dos-cyan">
                  Award-Winning Excellence
                </h2>
                <p className="text-sm sm:text-base text-dos-gray">International recognition at just 15 years old</p>
              </div>
              <motion.div 
                className="relative h-[300px] sm:h-[350px] md:h-[400px] mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <NeuralGlobe scrollProgress={globeProgress} />
              </motion.div>
            </div>

            {/* Right side - Scrollable Awards List */}
            <div className="w-full lg:w-1/2 p-4 lg:p-8">
                <div className="space-y-4">
                    {/* Command prompt */}
                    <div className="text-sm text-dos-gray mb-4">
                      {`> dir /achievements/*.award`}
                    </div>
                
                    {profileData.achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-dos-cyan/30 p-4 hover:border-dos-cyan transition-all hover:bg-dos-cyan/5"
                      >
                        {/* Award Header */}
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-dos-cyan font-mono">
                            [{achievement.category.substring(0, 3).toUpperCase()}]
                          </span>
                          <div className="flex gap-1">
                            {[...Array(Math.floor(achievement.importance / 2))].map((_, i) => (
                              <span key={i} className="text-dos-yellow text-xs">★</span>
                            ))}
                          </div>
                        </div>

                        {/* Award Title */}
                        <h3 className="text-lg font-bold text-white mb-2">
                          {achievement.title}
                        </h3>

                        {/* Award Details */}
                        {achievement.description && (
                          <p className="text-dos-gray text-sm mb-2">
                            {achievement.description}
                          </p>
                        )}

                        {/* Award Meta */}
                        <div className="flex justify-between items-center text-xs text-dos-gray/70">
                          <span>{achievement.date}</span>
                          {achievement.location && (
                            <span className="flex items-center gap-1">
                              <span className="text-dos-cyan">@</span>
                              {achievement.location}
                            </span>
                          )}
                        </div>

                        {/* Loading bar animation */}
                        <motion.div 
                          className="mt-2 h-[2px] bg-dos-cyan/20"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          style={{ transformOrigin: "left" }}
                        >
                          <div className="h-full bg-dos-cyan" />
                        </motion.div>
                      </motion.div>
                    ))}
                
                    {/* End of list */}
                    <div className="text-center py-4 text-dos-gray text-sm">
                      -- END OF ACHIEVEMENTS --
                    </div>
                </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  )
}