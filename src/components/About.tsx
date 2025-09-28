'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import TerminalWindow from './TerminalWindow'
import TypingEffect from './TypingEffect'
import { ASCII_LOGOS } from './ASCIIArt'

export default function About() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const commands = [
    { cmd: 'whoami', output: 'Yusuf Farhan - 15 year old AI Architect' },
    { cmd: 'pwd', output: '/home/yusuf/consciousness/agi_development' },
    { cmd: 'cat mission.txt', output: 'Building human-level AI with 90B parameters' },
    { cmd: 'ls beliefs/', output: 'intelligence_is_architecture.md\nexperience_over_exposure.md\ncultural_intelligence.md\nconsciousness_is_computable.md' },
  ]

  return (
    <section id="about" className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-dos-blue">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
        >
          {/* Left - Terminal Bio */}
          <TerminalWindow title="about_me.sh">
            <div className="space-y-4">
              <div className="ascii-art text-xs mb-4">
                <pre>{ASCII_LOGOS.brain}</pre>
              </div>
              
              <div className="space-y-2">
                {commands.map((cmd, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.3 }}
                    className="font-mono text-sm"
                  >
                    <div className="text-dos-yellow">
                      <span className="text-dos-gray">C:\{'>'}</span> {cmd.cmd}
                    </div>
                    <div className="text-white ml-4">
                      {cmd.output}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="border-t border-dos-gray/30 pt-4 mt-4"
              >
                <p className="text-sm text-white">
                  <TypingEffect
                    text="At just 15 years old, I'm not building AI systems—I'm architecting the cognitive scaffolding for machines that think, learn, and understand like humans."
                    speed={30}
                  />
                </p>
              </motion.div>
            </div>
          </TerminalWindow>

          {/* Right - System Info */}
          <div className="space-y-4">
            <TerminalWindow title="system_info.exe">
              <div className="font-mono text-sm space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-dos-gray">OS:</span>
                  <span className="text-dos-cyan">Human Brain v15.0</span>
                  
                  <span className="text-dos-gray">RAM:</span>
                  <span className="text-dos-cyan">INF TB</span>
                  
                  <span className="text-dos-gray">CPU:</span>
                  <span className="text-dos-cyan">Neural Network</span>
                  
                  <span className="text-dos-gray">Location:</span>
                  <span className="text-dos-cyan">Colombo, Sri Lanka</span>
                  
                  <span className="text-dos-gray">School:</span>
                  <span className="text-dos-cyan">Zahira College</span>
                  
                  <span className="text-dos-gray">Focus:</span>
                  <span className="text-dos-cyan">AGI Development</span>
                </div>
              </div>
            </TerminalWindow>

            <TerminalWindow title="core_beliefs.json">
              <div className="font-mono text-xs space-y-1">
                <div className="text-dos-yellow">{`{`}</div>
                <div className="ml-4">
                  <span className="text-dos-cyan">"intelligence"</span>: <span className="text-white">"Architecture {'>'} Scale"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-dos-cyan">"learning"</span>: <span className="text-white">"Experience {'>'} Exposure"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-dos-cyan">"true_ai"</span>: <span className="text-white">"Cultural Intelligence"</span>,
                </div>
                <div className="ml-4">
                  <span className="text-dos-cyan">"consciousness"</span>: <span className="text-white">"Computable"</span>
                </div>
                <div className="text-dos-yellow">{`}`}</div>
              </div>
            </TerminalWindow>
          </div>
        </motion.div>

        {/* Philosophy Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <TerminalWindow title="philosophy.md" className="max-w-3xl mx-auto">
            <div className="text-center">
              <div className="ascii-art text-xs mb-4">
                <pre>{ASCII_LOGOS.code}</pre>
              </div>
              <blockquote className="text-lg font-mono text-dos-cyan">
                "I don't just code AI—I teach it to dream, learn, and evolve."
              </blockquote>
              <p className="mt-4 text-sm text-dos-gray">— Core Philosophy</p>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>
    </section>
  )
}