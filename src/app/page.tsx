'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Achievements from '@/components/Achievements'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import MatrixRain from '@/components/MatrixRain'
import Cursor from '@/components/Cursor'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dos-blue flex items-center justify-center">
        <div className="text-center font-mono">
          <pre className="text-dos-yellow text-xs mb-4">
{`
 ╔══════════════════╗
 ║ LOADING DOS...   ║
 ╚══════════════════╝
`}
          </pre>
          <div className="text-white animate-pulse">▓▓▓▓▓▓▓▓▓▓</div>
        </div>
      </div>
    )
  }

  return (
    <main className="relative bg-dos-blue text-white overflow-x-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Custom cursor */}
      <Cursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main sections */}
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Skills />
      <Contact />
    </main>
  )
}