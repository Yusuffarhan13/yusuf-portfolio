'use client'

import { motion } from 'framer-motion'
import { profileData } from '@/data/profile'
import TerminalWindow from './TerminalWindow'

export default function Skills() {
  const skills = [
    { 
      category: 'AI/ML Mastery',
      icon: '[AI]',
      command: 'list --ai-capabilities',
      items: profileData.expertise.ai_ml
    },
    {
      category: 'Frameworks',
      icon: '[FW]',
      command: 'show --frameworks',
      items: profileData.expertise.frameworks
    },
    {
      category: 'Languages',
      icon: '[</>]',
      command: 'get --languages',
      items: profileData.expertise.languages
    },
    {
      category: 'Infrastructure',
      icon: '[SYS]',
      command: 'scan --infrastructure',
      items: profileData.expertise.infrastructure
    }
  ]

  return (
    <section id="skills" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-dos-blue overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-rain" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <TerminalWindow title="TECHNICAL_ARSENAL.exe" className="max-w-3xl mx-auto mb-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-dos-cyan">
                Technical Arsenal
              </h2>
              <p className="text-sm sm:text-base text-dos-gray">Mastery across the entire AI/ML stack</p>
            </div>
          </TerminalWindow>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalWindow title={`${skillGroup.category.toLowerCase().replace(/ /g, '_')}.dll`}>
                {/* Header */}
                <div className="mb-4">
                  <div className="text-xs text-dos-gray mb-2">{`> ${skillGroup.command}`}</div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl text-dos-cyan">{skillGroup.icon}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{skillGroup.category}</h3>
                  </div>
                </div>

                {/* Skills list */}
                <div className="space-y-2">
                  {skillGroup.items.map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span className="text-dos-cyan">►</span>
                      <span className="text-white">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>

        {/* Research Areas Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <TerminalWindow title="research_focus.ini" className="max-w-4xl mx-auto">
            <div>
              <div className="text-xs text-dos-gray mb-4">{`> cat research_focus.ini`}</div>
              <h3 className="text-2xl font-bold text-dos-cyan mb-6">Research Focus Areas</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profileData.research_areas.map((area, i) => (
                  <motion.div
                    key={area}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                    className="bg-xp-gray/20 px-4 py-2 border border-dos-cyan/30 text-sm"
                  >
                    <span className="text-dos-yellow">■</span> {area}
                  </motion.div>
                ))}
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}