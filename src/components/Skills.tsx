'use client'

import { motion } from 'framer-motion'
import { profileData } from '@/data/profile'

export default function Skills() {
  const skills = [
    { 
      category: 'AI/ML Mastery',
      icon: '[AI]',
      color: 'from-xp-blue to-xp-blue-light',
      items: profileData.expertise.ai_ml
    },
    {
      category: 'Frameworks',
      icon: '[FW]',
      color: 'from-xp-blue-light to-xp-blue',
      items: profileData.expertise.frameworks
    },
    {
      category: 'Languages',
      icon: '[</>]',
      color: 'from-xp-blue-dark to-xp-blue',
      items: profileData.expertise.languages
    },
    {
      category: 'Infrastructure',
      icon: '[SYS]',
      color: 'from-xp-blue to-xp-blue-dark',
      items: profileData.expertise.infrastructure
    }
  ]

  return (
    <section id="skills" className="relative py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text-xp">
            Technical Arsenal
          </h2>
          <p className="text-xl text-white opacity-100">Mastery across the entire AI/ML stack</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* Background glow */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${skillGroup.color} rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity`} />
              
              {/* Card */}
              <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-8 border border-xp-blue/30 hover:border-xp-blue-light h-full transition-all hover:shadow-blue-glow">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-2xl font-mono text-xp-blue-light"
                  >
                    {skillGroup.icon}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white opacity-100">{skillGroup.category}</h3>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 gap-3">
                  {skillGroup.items.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="relative group/skill"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${skillGroup.color} rounded-lg opacity-0 group-hover/skill:opacity-20 transition-opacity`} />
                      <div className="relative bg-xp-blue/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-xp-blue/30 hover:border-xp-blue-light transition-all">
                        <span className="text-sm text-white opacity-100">{skill}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-xp-blue-light">Research Focus Areas</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {profileData.research_areas.map((area, i) => (
              <motion.div
                key={area}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="px-6 py-3 bg-gradient-to-r from-xp-blue/10 to-xp-blue-light/10 rounded-full border border-xp-blue/30 hover:border-xp-blue-light transition-all hover:shadow-blue-glow"
              >
                <span className="text-white opacity-100">{area}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}