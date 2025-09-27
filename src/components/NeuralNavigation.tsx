'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCosmosStore } from '@/store/useStore'

interface NavItem {
  id: string
  label: string
  section: string
  connections: string[]
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Neural Core', section: 'hero', connections: ['about', 'achievements'] },
  { id: 'about', label: 'Consciousness', section: 'about', connections: ['home', 'projects', 'achievements'] },
  { id: 'projects', label: 'Synapses', section: 'projects', connections: ['about', 'achievements', 'research'] },
  { id: 'achievements', label: 'Memory Banks', section: 'achievements', connections: ['home', 'about', 'projects'] },
  { id: 'research', label: 'Intelligence Lab', section: 'research', connections: ['projects', 'contact'] },
  { id: 'contact', label: 'Interface', section: 'contact', connections: ['research', 'about'] }
]

export function NeuralNavigation() {
  const [activeNode, setActiveNode] = useState('home')
  const [firingNodes, setFiringNodes] = useState<string[]>([])
  const [dataPackets, setDataPackets] = useState<Array<{ id: number; from: string; to: string; progress: number }>>([])
  const { setActiveSection, setNeuralActivity } = useCosmosStore()
  
  // Simulate synaptic firing
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNode = navItems[Math.floor(Math.random() * navItems.length)]
      setFiringNodes(prev => [...prev, randomNode.id])
      
      // Remove after animation
      setTimeout(() => {
        setFiringNodes(prev => prev.filter(id => id !== randomNode.id))
      }, 1000)
      
      // Create data packet
      if (Math.random() > 0.7) {
        const from = randomNode
        const to = navItems.find(item => 
          from.connections.includes(item.id)
        )
        
        if (to) {
          const packetId = Date.now()
          setDataPackets(prev => [...prev, {
            id: packetId,
            from: from.id,
            to: to.id,
            progress: 0
          }])
          
          // Animate packet
          const packetInterval = setInterval(() => {
            setDataPackets(prev => prev.map(packet => 
              packet.id === packetId 
                ? { ...packet, progress: packet.progress + 0.05 }
                : packet
            ))
          }, 50)
          
          // Remove packet when complete
          setTimeout(() => {
            clearInterval(packetInterval)
            setDataPackets(prev => prev.filter(p => p.id !== packetId))
          }, 2000)
        }
      }
    }, 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  const handleNodeClick = (item: NavItem) => {
    setActiveNode(item.id)
    setActiveSection(item.section)
    setNeuralActivity(1)
    
    // Trigger firing animation
    setFiringNodes(prev => [...prev, item.id])
    setTimeout(() => {
      setFiringNodes(prev => prev.filter(id => id !== item.id))
    }, 1500)
    
    // Smooth scroll to section
    const element = document.getElementById(item.section)
    element?.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Calculate node positions in a circular layout
  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2
    const radius = 150
    const x = Math.cos(angle) * radius + 200
    const y = Math.sin(angle) * radius + 200
    return { x, y }
  }
  
  // Calculate connection path
  const getConnectionPath = (from: NavItem, to: NavItem) => {
    const fromIndex = navItems.findIndex(n => n.id === from.id)
    const toIndex = navItems.findIndex(n => n.id === to.id)
    const fromPos = getNodePosition(fromIndex, navItems.length)
    const toPos = getNodePosition(toIndex, navItems.length)
    
    // Create curved path
    const midX = (fromPos.x + toPos.x) / 2
    const midY = (fromPos.y + toPos.y) / 2
    const curve = 30
    
    return `M ${fromPos.x} ${fromPos.y} Q ${midX} ${midY - curve} ${toPos.x} ${toPos.y}`
  }
  
  return (
    <div className="fixed top-20 right-10 z-50">
      <svg
        width="400"
        height="400"
        className="pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))' }}
      >
        {/* Neural connections */}
        {navItems.map(from => 
          from.connections.map(toId => {
            const to = navItems.find(n => n.id === toId)
            if (!to) return null
            
            const isActive = activeNode === from.id || activeNode === to.id
            
            return (
              <g key={`${from.id}-${to.id}`}>
                <path
                  d={getConnectionPath(from, to)}
                  stroke={isActive ? '#00ffff' : '#004444'}
                  strokeWidth={isActive ? 2 : 1}
                  fill="none"
                  opacity={isActive ? 1 : 0.3}
                  className="transition-all duration-300"
                />
                
                {/* Animated synaptic pulses */}
                {firingNodes.includes(from.id) && (
                  <circle r="3" fill="#00ffff">
                    <animateMotion
                      path={getConnectionPath(from, to)}
                      dur="1s"
                      repeatCount="1"
                    />
                    <animate
                      attributeName="r"
                      values="3;6;3"
                      dur="1s"
                      repeatCount="1"
                    />
                    <animate
                      attributeName="opacity"
                      values="1;0.5;0"
                      dur="1s"
                      repeatCount="1"
                    />
                  </circle>
                )}
              </g>
            )
          })
        )}
        
        {/* Data packets */}
        {dataPackets.map(packet => {
          const from = navItems.find(n => n.id === packet.from)
          const to = navItems.find(n => n.id === packet.to)
          if (!from || !to) return null
          
          const fromPos = getNodePosition(navItems.indexOf(from), navItems.length)
          const toPos = getNodePosition(navItems.indexOf(to), navItems.length)
          const x = fromPos.x + (toPos.x - fromPos.x) * packet.progress
          const y = fromPos.y + (toPos.y - fromPos.y) * packet.progress
          
          return (
            <g key={packet.id}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#00ff00"
                opacity={0.8}
              >
                <animate
                  attributeName="r"
                  values="5;8;5"
                  dur="0.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle
                cx={x}
                cy={y}
                r="10"
                fill="#00ff00"
                opacity={0.3}
              />
            </g>
          )
        })}
        
        {/* Neural nodes */}
        {navItems.map((item, index) => {
          const pos = getNodePosition(index, navItems.length)
          const isActive = activeNode === item.id
          const isFiring = firingNodes.includes(item.id)
          
          return (
            <g
              key={item.id}
              className="cursor-pointer pointer-events-auto"
              onClick={() => handleNodeClick(item)}
            >
              {/* Outer glow */}
              {(isActive || isFiring) && (
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isFiring ? 25 : 20}
                  fill={isFiring ? '#ffff00' : '#00ffff'}
                  opacity={0.2}
                  className="transition-all duration-300"
                >
                  {isFiring && (
                    <animate
                      attributeName="r"
                      values="25;35;25"
                      dur="0.5s"
                      repeatCount="1"
                    />
                  )}
                </circle>
              )}
              
              {/* Node circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 15 : 10}
                fill={isActive ? '#00ffff' : '#006666'}
                stroke={isFiring ? '#ffff00' : '#00ffff'}
                strokeWidth={isActive ? 3 : 1}
                className="transition-all duration-300 hover:fill-[#00ffff]"
              />
              
              {/* Inner core */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="3"
                fill={isFiring ? '#ffffff' : '#00ffff'}
                className="transition-all duration-300"
              />
            </g>
          )
        })}
      </svg>
      
      {/* Labels */}
      <div className="absolute inset-0 pointer-events-none">
        {navItems.map((item, index) => {
          const pos = getNodePosition(index, navItems.length)
          const isActive = activeNode === item.id
          
          return (
            <motion.div
              key={item.id}
              className="absolute pointer-events-auto"
              style={{
                left: pos.x - 50,
                top: pos.y + 20,
                width: 100
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0.7 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
            >
              <button
                onClick={() => handleNodeClick(item)}
                className={`
                  px-3 py-1 rounded-full text-xs font-mono
                  backdrop-blur-md border transition-all duration-300
                  ${isActive 
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' 
                    : 'bg-black/20 border-cyan-800/50 text-cyan-500 hover:bg-cyan-900/30'
                  }
                `}
              >
                {item.label}
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}