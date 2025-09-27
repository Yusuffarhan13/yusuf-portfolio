'use client'

import { motion } from 'framer-motion'

export default function FloatingElements() {
  const elements = [
    { emoji: '🧠', delay: 0, duration: 20, x: '10%', y: '20%' },
    { emoji: '🤖', delay: 2, duration: 25, x: '80%', y: '30%' },
    { emoji: '⚡', delay: 4, duration: 18, x: '20%', y: '70%' },
    { emoji: '🚀', delay: 1, duration: 22, x: '70%', y: '60%' },
    { emoji: '💡', delay: 3, duration: 19, x: '50%', y: '40%' },
    { emoji: '🔮', delay: 5, duration: 21, x: '30%', y: '50%' },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 2 }}>
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-20"
          style={{ 
            left: element.x, 
            top: element.y,
            filter: 'drop-shadow(0 0 10px #00ff41)'
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  )
}