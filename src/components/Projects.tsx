'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { profileData } from '@/data/profile'

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="projects" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-dos-blue">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-dos-yellow">
            Revolutionary Projects
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white opacity-100 px-4 sm:px-0">Building the future of AI, one breakthrough at a time</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {profileData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
              style={{
                transform: hoveredIndex === index ? 'translateZ(50px)' : 'translateZ(0)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-xp-blue to-xp-blue-light rounded-2xl blur-lg opacity-25 group-hover:opacity-75 transition-opacity" />
              
              {/* Card */}
              <div className="relative h-full bg-xp-silver backdrop-blur-xl rounded-lg p-6 sm:p-8 border-2 border-xp-gray-dark hover:border-xp-blue transition-all shadow-lg">
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs rounded font-semibold ${
                    project.status === 'Live' ? 'bg-accent-green/20 text-accent-green border border-accent-green/50' :
                    project.status === 'Beta Development' ? 'bg-dos-yellow/20 text-dos-yellow border border-dos-yellow/50' :
                    'bg-dos-cyan/20 text-dos-cyan border border-dos-cyan/50'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Project icon */}
                <div className="w-16 h-16 mb-6 rounded bg-gradient-to-br from-xp-blue/20 to-xp-blue-light/20 flex items-center justify-center font-mono text-2xl text-xp-blue">
                  {index === 0 ? '[AI]' : index === 1 ? '[BOT]' : index === 2 ? '[CHAT]' : index === 3 ? '[LANG]' : index === 4 ? '[ZAP]' : '[ORB]'}
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-black">{project.name}</h3>
                <p className="text-sm sm:text-base text-xp-blue font-semibold mb-4">{project.tagline}</p>
                <p className="text-sm sm:text-base text-gray-700 mb-6">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map(tech => (
                    <span key={tech} className="px-3 py-1 bg-xp-blue/10 border border-xp-blue/30 rounded text-xs text-xp-blue-dark">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-xp-blue mt-1">{'>'}</span>
                      <span className="text-sm text-black">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Link */}
                {project.website && (
                  <motion.a
                    href={`https://${project.website}`}
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 text-xp-blue hover:text-xp-blue-dark font-semibold"
                  >
                    Visit Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}