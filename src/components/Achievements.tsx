'use client'

import { motion } from 'framer-motion'
import { profileData } from '@/data/profile'
import TerminalWindow from './TerminalWindow'

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 px-4 overflow-hidden bg-dos-blue">
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
          <TerminalWindow title="ACHIEVEMENTS.exe" className="max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-dos-cyan">
                Award-Winning Excellence
              </h2>
              <p className="text-dos-gray">International recognition at just 15 years old</p>
              
              {/* Trophy ASCII Art */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="my-8"
              >
                <pre className="text-dos-yellow text-xs sm:text-sm inline-block">
{`     ___________
    '._==_==_=_.'
    .-\\:      /-.
   | (|:.     |) |
    '-|:.     |-'
      \\::.    /
       '::. .'
         ) (
       _.' '._
      '-------'`}
                </pre>
              </motion.div>
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Achievement cards in terminal windows */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profileData.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TerminalWindow 
                title={`award_${achievement.id.substring(0, 8)}.dat`}
                showClose={false}
              >
                <div className="space-y-3">
                  {/* Command prompt style */}
                  <div className="text-xs text-dos-gray">{`> display --award ${achievement.id}`}</div>
                  
                  {/* Icon and category */}
                  <div className="flex justify-between items-start">
                    <span className="text-xl text-dos-cyan">[{achievement.category.substring(0, 3).toUpperCase()}]</span>
                    <div className="flex gap-1">
                      {[...Array(Math.floor(achievement.importance / 2))].map((_, i) => (
                        <span key={i} className="text-dos-yellow">★</span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white">
                    {achievement.title}
                  </h3>

                  {/* Category badge */}
                  <div className="inline-block px-2 py-1 bg-xp-gray/20 border border-dos-cyan/50 text-xs">
                    {achievement.category}
                  </div>

                  {/* Description */}
                  {achievement.description && (
                    <p className="text-dos-gray text-sm">{achievement.description}</p>
                  )}

                  {/* Meta info */}
                  <div className="flex justify-between items-center text-xs text-dos-gray pt-2 border-t border-dos-gray/20">
                    <span>{achievement.date}</span>
                    {achievement.location && (
                      <span className="flex items-center gap-1">
                        <span>📍</span>
                        {achievement.location}
                      </span>
                    )}
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>

        {/* Summary stats terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <TerminalWindow title="achievement_stats.log" className="max-w-2xl mx-auto">
            <div>
              <div className="text-xs text-dos-gray mb-4">{`> calculate --stats achievements/*`}</div>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-dos-cyan">{profileData.achievements.length}</div>
                  <div className="text-sm text-dos-gray mt-1">Total Awards</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-dos-yellow">$20,000</div>
                  <div className="text-sm text-dos-gray mt-1">Scholarship</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-dos-cyan">GLOBAL</div>
                  <div className="text-sm text-dos-gray mt-1">Recognition</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="text-xs text-dos-gray">
                  {`> Achievement level: EXTRAORDINARY`}
                </div>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}