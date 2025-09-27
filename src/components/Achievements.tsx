'use client'

import { motion } from 'framer-motion'
import { profileData } from '@/data/profile'

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 px-4 overflow-hidden bg-black">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-xp-blue/10 to-xp-blue-light/10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text-xp">
            Award-Winning Excellence
          </h2>
          <p className="text-xl text-white opacity-100">International recognition at just 15 years old</p>
        </motion.div>

        {/* 3D Trophy showcase */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-block relative">
            <motion.div
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-6xl font-mono text-xp-blue-light"
              style={{ transformStyle: 'preserve-3d' }}
            >
              [TROPHY]
            </motion.div>
            <div className="absolute -inset-10 bg-gradient-to-r from-xp-blue/30 to-xp-blue-light/30 rounded-full blur-3xl" />
          </div>
        </motion.div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5
              }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-xp-blue/20 to-xp-blue-light/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative bg-black/90 backdrop-blur-sm rounded-xl p-6 border border-xp-blue/30 hover:border-xp-blue-light transition-all h-full hover:shadow-blue-glow">
                {/* Icon and importance */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-2xl font-mono text-xp-blue-light">[{achievement.category.substring(0, 3).toUpperCase()}]</span>
                  <div className="flex gap-1">
                    {[...Array(Math.floor(achievement.importance / 2))].map((_, i) => (
                      <span key={i} className="text-xp-blue-light">*</span>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 text-white opacity-100">
                  {achievement.title}
                </h3>

                {/* Category badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                  achievement.category === 'International' ? 'bg-xp-blue-light/20 text-xp-blue-light border border-xp-blue-light/50' :
                  achievement.category === 'Financial' ? 'bg-dos-cyan/20 text-dos-cyan border border-dos-cyan/50' :
                  'bg-xp-blue/20 text-xp-blue border border-xp-blue/50'
                }`}>
                  {achievement.category}
                </span>

                {/* Description */}
                {achievement.description && (
                  <p className="text-gray-300 text-sm mb-3 opacity-100">{achievement.description}</p>
                )}

                {/* Meta info */}
                <div className="flex justify-between items-center text-xs text-gray-400 opacity-100">
                  <span>{achievement.date}</span>
                  {achievement.location && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {achievement.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-gradient-to-r from-xp-blue/10 to-xp-blue-light/10 rounded-full border border-xp-blue/30">
            <div>
              <span className="text-3xl font-bold text-xp-blue-light">{profileData.achievements.length}</span>
              <p className="text-sm text-white opacity-100">Total Awards</p>
            </div>
            <div className="w-px h-12 bg-xp-blue/30" />
            <div>
              <span className="text-3xl font-bold text-dos-cyan">$20,000</span>
              <p className="text-sm text-white opacity-100">Scholarship</p>
            </div>
            <div className="w-px h-12 bg-xp-blue/30" />
            <div>
              <span className="text-3xl font-bold text-xp-blue">Global</span>
              <p className="text-sm text-white opacity-100">Recognition</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}