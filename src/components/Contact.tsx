'use client'

import { motion } from 'framer-motion'
import { profileData } from '@/data/profile'
import TerminalWindow from './TerminalWindow'

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 px-4 bg-dos-blue overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="matrix-rain" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Main Title Terminal */}
          <TerminalWindow title="CONTACT.exe" className="mb-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4 text-dos-cyan">
                Let's Build the Future
              </h2>
              <p className="text-dos-gray">Ready to collaborate on the next breakthrough in AI?</p>
            </div>
          </TerminalWindow>

          {/* Contact Info Terminal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <TerminalWindow title="contact_info.ini">
              <div className="space-y-6">
                {/* Command prompt */}
                <div className="text-xs text-dos-gray">{`> cat contact_info.ini`}</div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="text-dos-cyan font-bold">[EMAIL]</div>
                  <motion.a
                    href={`mailto:${profileData.contact.email}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 text-xl text-white hover:text-dos-yellow font-mono"
                  >
                    <span className="text-dos-cyan">@</span>
                    {profileData.contact.email}
                  </motion.a>
                </div>

                {/* GitHub */}
                <div className="space-y-2">
                  <div className="text-dos-cyan font-bold">[GITHUB]</div>
                  <motion.a
                    href="https://github.com/anexodos"
                    target="_blank"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 text-xl text-white hover:text-dos-yellow font-mono"
                  >
                    <span className="text-dos-cyan">$</span>
                    github.com/anexodos
                  </motion.a>
                </div>

                {/* Institution */}
                <div className="space-y-2">
                  <div className="text-dos-cyan font-bold">[INSTITUTION]</div>
                  <div className="text-white font-mono">
                    <span className="text-dos-cyan">{'>'}</span> {profileData.contact.institution}
                  </div>
                </div>

                {/* Research Focus */}
                <div className="space-y-2 pt-4 border-t border-dos-gray/30">
                  <div className="text-dos-cyan font-bold">[RESEARCH_INTERESTS]</div>
                  <p className="text-dos-gray">{profileData.contact.focus}</p>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>

          {/* CTA Buttons in Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <TerminalWindow title="actions.bat" showClose={false}>
              <div className="space-y-4">
                <div className="text-xs text-dos-gray mb-4">{`> list --available-actions`}</div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.a
                    href={`mailto:${profileData.contact.email}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-xp-blue text-white text-center font-semibold hover:bg-xp-blue-light transition-all"
                  >
                    [1] Send Email
                  </motion.a>
                  <motion.a
                    href="https://github.com/anexodos"
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-xp-gray text-black text-center font-semibold hover:bg-xp-gray-dark hover:text-white transition-all"
                  >
                    [2] View GitHub
                  </motion.a>
                </div>
                
                <div className="text-xs text-dos-gray mt-4">
                  {`> Select action [1-2]: _`}
                </div>
              </div>
            </TerminalWindow>
          </motion.div>

          {/* Final Message Terminal */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <TerminalWindow title="message.txt" className="max-w-3xl mx-auto">
              <div className="text-center space-y-4">
                <div className="text-xs text-dos-gray mb-4">{`> type message.txt`}</div>
                
                <p className="text-xl font-bold text-dos-cyan">
                  "At 15, I'm not just building AI systems—
                </p>
                <p className="text-xl font-bold text-dos-cyan">
                  I'm building the future of intelligence itself."
                </p>
                
                <p className="mt-4 text-dos-gray">— Yusuf Farhan</p>
                
                <div className="mt-6">
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-block text-dos-yellow"
                  >
                    _
                  </motion.div>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}