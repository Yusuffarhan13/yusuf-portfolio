'use client'

import { useState, useEffect } from 'react'

interface TypingEffectProps {
  text: string
  speed?: number
  className?: string
  showCursor?: boolean
  onComplete?: () => void
}

export default function TypingEffect({ 
  text, 
  speed = 50, 
  className = '',
  showCursor = true,
  onComplete
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayText}
      {showCursor && <span className="cursor" />}
    </span>
  )
}