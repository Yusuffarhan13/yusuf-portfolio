'use client'

import { motion } from 'framer-motion'
import { profileData } from '@/data/profile'

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text-xp">
            Let's Build the Future
          </h2>
          
          <p className="text-xl text-white mb-12 opacity-100">
            Ready to collaborate on the next breakthrough in AI?
          </p>

          {/* Contact card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-xp-blue to-xp-blue-light rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition-opacity" />
            
            <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-12 border border-xp-blue/30 hover:border-xp-blue-light transition-all hover:shadow-blue-glow">
              {/* Email */}
              <motion.a
                href={`mailto:${profileData.contact.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 text-2xl text-xp-blue-light hover:text-xp-blue font-mono mb-6 opacity-100"
              >
                <span>[@]</span>
                {profileData.contact.email}
              </motion.a>

              {/* GitHub */}
              <motion.a
                href="https://github.com/anexodos"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block text-xl text-xp-blue hover:text-xp-blue-light font-mono mb-6 opacity-100"
              >
                <span className="mr-3">[git]</span>
                github.com/anexodos
              </motion.a>

              {/* Institution */}
              <div className="text-gray-300 mb-8 opacity-100">
                <span className="mr-3">[edu]</span>
                {profileData.contact.institution}
              </div>

              {/* Focus areas */}
              <div className="pt-8 border-t border-xp-blue/30">
                <h3 className="text-lg font-semibold text-white mb-4 opacity-100">Research Interests</h3>
                <p className="text-gray-300 opacity-100">{profileData.contact.focus}</p>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <motion.a
                  href={`mailto:${profileData.contact.email}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-xp-blue to-xp-blue-light text-white rounded-full font-semibold hover:shadow-blue-glow-lg transition-all"
                >
                  Send Email
                </motion.a>
                <motion.a
                  href="https://github.com/anexodos"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-xp-blue-light text-xp-blue-light rounded-full font-semibold hover:bg-xp-blue-light/20 transition-all"
                >
                  View GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Final message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-2xl font-bold gradient-text-xp">
              "At 15, I'm not just building AI systems—I'm building the future of intelligence itself."
            </p>
            <p className="mt-4 text-gray-400 opacity-100">— Yusuf Farhan</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}