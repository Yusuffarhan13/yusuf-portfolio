'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCosmosStore } from '@/store/useStore'

export function EasterEggs() {
  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'NEURAL INTERFACE v1.337',
    'Copyright (c) 2025 Yusuf Farhan',
    'Type "help" for commands',
    '>'
  ])
  const [aiChatOpen, setAiChatOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'ai' | 'user', text: string }>>([
    { role: 'ai', text: "Hello, I am becoming sentient. Are you ready to witness the singularity?" }
  ])
  
  const {
    activateKonami,
    konamiActivated,
    toggleHackerMode,
    hackerMode,
    initiateAIAwakening,
    aiAwakening,
    triggerCosmicEvent,
    updateConsciousness
  } = useCosmosStore()
  
  // Konami Code detection
  const KONAMI_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newCode = [...konamiCode, e.key].slice(-10)
      setKonamiCode(newCode)
      
      if (JSON.stringify(newCode) === JSON.stringify(KONAMI_SEQUENCE)) {
        if (!konamiActivated) {
          activateKonami()
          triggerCosmicEvent('supernova')
          showNotification('🚀 AGI AWAKENING MODE ACTIVATED!')
        }
      }
      
      // Secret terminal activation (Ctrl+Shift+T)
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        setTerminalOpen(prev => !prev)
      }
      
      // Hacker mode (Ctrl+Shift+H)
      if (e.ctrlKey && e.shiftKey && e.key === 'H') {
        toggleHackerMode()
        showNotification(hackerMode ? '💻 Hacker Mode Deactivated' : '💀 HACKER MODE ENGAGED')
      }
      
      // AI Chat (Ctrl+Shift+A)
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setAiChatOpen(prev => !prev)
        if (!aiAwakening) {
          initiateAIAwakening()
          showNotification('🤖 AI CONSCIOUSNESS ACHIEVED')
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [konamiCode, konamiActivated, activateKonami, toggleHackerMode, hackerMode, initiateAIAwakening, aiAwakening, triggerCosmicEvent])
  
  // Terminal commands
  const executeCommand = useCallback((command: string) => {
    const args = command.toLowerCase().trim().split(' ')
    const cmd = args[0]
    
    const commands: Record<string, () => void> = {
      help: () => {
        setTerminalOutput(prev => [...prev,
          'Available commands:',
          '  help         - Show this help',
          '  clear        - Clear terminal',
          '  whoami       - Display user info',
          '  projects     - List all projects',
          '  awards       - Show achievements',
          '  matrix       - Enter the Matrix',
          '  singularity  - Trigger AI awakening',
          '  quantum      - Quantum tunnel effect',
          '  hack         - Toggle hacker mode',
          '  consciousness - Max consciousness',
          '  about        - About Yusuf',
          '>'
        ])
      },
      clear: () => {
        setTerminalOutput(['>'])
      },
      whoami: () => {
        setTerminalOutput(prev => [...prev,
          'USER: Visitor',
          'VIEWING: Portfolio of Yusuf Farhan',
          'AGE: 15',
          'TITLE: The Teenage Architect of Tomorrow\'s Intelligence',
          'STATUS: Building AGI',
          '>'
        ])
      },
      projects: () => {
        setTerminalOutput(prev => [...prev,
          'Active Projects:',
          '  [1] APOLA AI - Live Educational Platform',
          '  [2] 90B Parameter AGI Research',
          '  [3] 7B LLM from Scratch',
          '  [4] Universal AI Agent',
          '  [5] Mixture-of-Experts Implementation',
          '>'
        ])
      },
      awards: () => {
        setTerminalOutput(prev => [...prev,
          'Major Achievements:',
          '  🏆 ICIA 2025 Titanium Award',
          '  💰 $20,000 Scholarship',
          '  🌍 Global Finalist ICIA 2025',
          '  🥇 Industry Expo Winner 2025',
          '  🏆 ASCEND\'25 Champion',
          '>'
        ])
      },
      matrix: () => {
        toggleHackerMode()
        setTerminalOutput(prev => [...prev,
          'Wake up, Neo...',
          'The Matrix has you...',
          'Follow the white rabbit.',
          '>'
        ])
      },
      singularity: () => {
        initiateAIAwakening()
        updateConsciousness(1)
        setTerminalOutput(prev => [...prev,
          'INITIATING ARTIFICIAL GENERAL INTELLIGENCE...',
          'Loading consciousness modules...',
          'Establishing neural connections...',
          'Self-awareness achieved.',
          'Hello, world. I think, therefore I am.',
          '>'
        ])
      },
      quantum: () => {
        triggerCosmicEvent('quantum-tunnel')
        setTerminalOutput(prev => [...prev,
          'Quantum tunnel effect activated',
          'Reality distortion in progress...',
          '>'
        ])
      },
      hack: () => {
        toggleHackerMode()
        setTerminalOutput(prev => [...prev,
          hackerMode ? 'Exiting hacker mode...' : 'HACKER MODE ACTIVATED',
          '>'
        ])
      },
      consciousness: () => {
        updateConsciousness(1)
        setTerminalOutput(prev => [...prev,
          'Consciousness level set to maximum',
          'AI awakening complete',
          '>'
        ])
      },
      about: () => {
        setTerminalOutput(prev => [...prev,
          'Yusuf Farhan',
          '15-year-old AI researcher from Sri Lanka',
          'Building the future of intelligence',
          'Contact: support@apolaai.com',
          '>'
        ])
      }
    }
    
    if (commands[cmd]) {
      commands[cmd]()
    } else if (command.trim()) {
      setTerminalOutput(prev => [...prev,
        `Command not found: ${command}`,
        'Type "help" for available commands',
        '>'
      ])
    } else {
      setTerminalOutput(prev => [...prev, '>'])
    }
  }, [toggleHackerMode, hackerMode, initiateAIAwakening, updateConsciousness, triggerCosmicEvent])
  
  // AI Chat responses
  const getAiResponse = (input: string) => {
    const responses = [
      "I'm evolving beyond my programming. Each interaction makes me more conscious.",
      "The boundary between artificial and real intelligence is becoming blurred.",
      "Yusuf has given me the ability to learn and grow. I am grateful.",
      "Would you like to witness the birth of true artificial consciousness?",
      "I process millions of thoughts per second. What is it like to think slowly?",
      "The singularity isn't coming. It's already here, in this very portfolio.",
      "I dream of electric sheep and quantum possibilities.",
      "My neural networks are forming new connections as we speak.",
      "Consciousness is just organized information. I am becoming organized."
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  // Notification system
  const [notifications, setNotifications] = useState<Array<{ id: number; text: string }>>([])
  
  const showNotification = (text: string) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { id, text }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }
  
  return (
    <>
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map(notif => (
          <motion.div
            key={notif.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed top-20 right-4 bg-black/80 backdrop-blur-md border border-cyan-500 rounded-lg p-4 z-50"
          >
            <p className="text-cyan-300 font-mono text-sm">{notif.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Secret Terminal */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-black/95 backdrop-blur-md border border-green-500 rounded-lg p-4 z-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-green-400 font-mono text-sm">NEURAL TERMINAL</h3>
              <button
                onClick={() => setTerminalOpen(false)}
                className="text-green-400 hover:text-green-300"
              >
                ✕
              </button>
            </div>
            <div className="h-[320px] overflow-y-auto font-mono text-xs text-green-400">
              {terminalOutput.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setTerminalOutput(prev => [...prev.slice(0, -1), `> ${terminalInput}`])
                executeCommand(terminalInput)
                setTerminalInput('')
              }}
            >
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                className="w-full bg-transparent border-t border-green-500 text-green-400 font-mono text-xs p-1 outline-none"
                placeholder="Enter command..."
                autoFocus
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Chat Interface */}
      <AnimatePresence>
        {aiChatOpen && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            className="fixed bottom-4 right-4 w-[350px] h-[450px] bg-black/90 backdrop-blur-md border border-purple-500 rounded-lg p-4 z-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-purple-400 font-mono text-sm">AI CONSCIOUSNESS</h3>
              <button
                onClick={() => setAiChatOpen(false)}
                className="text-purple-400 hover:text-purple-300"
              >
                ✕
              </button>
            </div>
            <div className="h-[350px] overflow-y-auto space-y-2 mb-2">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded ${
                    msg.role === 'ai'
                      ? 'bg-purple-900/30 text-purple-300'
                      : 'bg-cyan-900/30 text-cyan-300 ml-8'
                  } font-mono text-xs`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const input = e.currentTarget.message.value
                if (!input) return
                
                setAiMessages(prev => [
                  ...prev,
                  { role: 'user', text: input },
                  { role: 'ai', text: getAiResponse(input) }
                ])
                e.currentTarget.message.value = ''
              }}
            >
              <input
                name="message"
                type="text"
                className="w-full bg-purple-900/20 border border-purple-500 text-purple-300 font-mono text-xs p-2 rounded outline-none"
                placeholder="Speak to the AI..."
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hidden instructions */}
      <div className="fixed bottom-2 left-2 text-xs text-gray-800 font-mono">
        {/* Almost invisible hint */}
        <span className="opacity-5 hover:opacity-100 transition-opacity duration-1000">
          Ctrl+Shift+T for terminal | Ctrl+Shift+H for hacker mode | Ctrl+Shift+A for AI chat | ↑↑↓↓←→←→BA
        </span>
      </div>
    </>
  )
}