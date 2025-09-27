'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TerminalWindowProps {
  title?: string
  children: ReactNode
  className?: string
  maximized?: boolean
  showClose?: boolean
}

export default function TerminalWindow({ 
  title = 'terminal.exe', 
  children, 
  className = '',
  maximized = false,
  showClose = true
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`terminal-window ${maximized ? 'maximized' : ''} ${className}`}
    >
      {/* Title Bar */}
      <div className="terminal-header">
        <div className="terminal-header-buttons">
          <span className="terminal-button minimize">─</span>
          <span className="terminal-button maximize">□</span>
          {showClose && <span className="terminal-button close">×</span>}
        </div>
        <div className="terminal-title">{title}</div>
        <div className="terminal-header-right"></div>
      </div>
      
      {/* Terminal Content */}
      <div className="terminal-content">
        {children}
      </div>
    </motion.div>
  )
}