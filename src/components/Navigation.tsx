'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'projects', 'achievements', 'skills', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section === 'home' ? 'hero' : section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#hero', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Awards', href: '#achievements', id: 'achievements' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-xp-silver border-b-2 border-xp-gray-dark shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl md:text-2xl font-bold text-xp-blue font-mono"
          >
            ~/yusuf
          </motion.div>

          {/* Desktop Nav items */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative font-medium transition-colors text-sm lg:text-base ${
                  activeSection === item.id ? 'text-xp-blue font-bold' : 'text-black hover:text-xp-blue'
                }`}
              >
                {item.name}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-xp-blue"
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* Desktop LinkedIn Link */}
          <motion.a
            href="https://www.linkedin.com/in/yusuffarhan"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-4 lg:px-6 py-2 bg-gradient-to-b from-xp-blue-light to-xp-blue text-white rounded font-semibold text-sm hover:from-xp-blue hover:to-xp-blue-dark transition-all shadow-md"
          >
            LinkedIn
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-xp-blue hover:bg-xp-gray-light rounded transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: mobileMenuOpen ? 'auto' : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-3">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                whileTap={{ scale: 0.95 }}
                className={`block py-2 px-4 rounded transition-colors ${
                  activeSection === item.id
                    ? 'bg-xp-blue text-white font-bold'
                    : 'text-black hover:bg-xp-gray-light'
                }`}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              href="https://www.linkedin.com/in/yusuffarhan"
              target="_blank"
              whileTap={{ scale: 0.95 }}
              className="block py-2 px-4 bg-gradient-to-b from-xp-blue-light to-xp-blue text-white rounded font-semibold text-center hover:from-xp-blue hover:to-xp-blue-dark transition-all"
            >
              LinkedIn
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}