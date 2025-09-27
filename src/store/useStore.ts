import { create } from 'zustand'

interface CosmosState {
  // Interaction states
  mousePosition: { x: number; y: number }
  scrollProgress: number
  activeSection: string
  isLoading: boolean
  
  // Visual states  
  particleIntensity: number
  cosmicEvent: 'none' | 'supernova' | 'blackhole' | 'quantum-tunnel'
  neuralActivity: number
  consciousnessLevel: number
  
  // Features
  audioReactive: boolean
  reducedMotion: boolean
  performanceMode: 'high' | 'balanced' | 'low'
  
  // Easter eggs
  konamiActivated: boolean
  hackerMode: boolean
  aiAwakening: boolean
  
  // Actions
  setMousePosition: (pos: { x: number; y: number }) => void
  setScrollProgress: (progress: number) => void
  setActiveSection: (section: string) => void
  triggerCosmicEvent: (event: CosmosState['cosmicEvent']) => void
  setNeuralActivity: (level: number) => void
  updateConsciousness: (delta: number) => void
  activateKonami: () => void
  toggleHackerMode: () => void
  initiateAIAwakening: () => void
  setPerformanceMode: (mode: CosmosState['performanceMode']) => void
}

export const useCosmosStore = create<CosmosState>((set) => ({
  // Initial states
  mousePosition: { x: 0, y: 0 },
  scrollProgress: 0,
  activeSection: 'hero',
  isLoading: true,
  
  particleIntensity: 1,
  cosmicEvent: 'none',
  neuralActivity: 0.5,
  consciousnessLevel: 0,
  
  audioReactive: false,
  reducedMotion: false,
  performanceMode: 'high',
  
  konamiActivated: false,
  hackerMode: false,
  aiAwakening: false,
  
  // Actions
  setMousePosition: (pos) => set({ mousePosition: pos }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
  setActiveSection: (section) => set({ activeSection: section }),
  
  triggerCosmicEvent: (event) => {
    set({ cosmicEvent: event })
    // Auto-reset after animation
    setTimeout(() => set({ cosmicEvent: 'none' }), 5000)
  },
  
  setNeuralActivity: (level) => set({ neuralActivity: level }),
  
  updateConsciousness: (delta) => 
    set((state) => ({ 
      consciousnessLevel: Math.min(1, Math.max(0, state.consciousnessLevel + delta))
    })),
  
  activateKonami: () => set({ konamiActivated: true, particleIntensity: 3 }),
  
  toggleHackerMode: () => 
    set((state) => ({ hackerMode: !state.hackerMode })),
  
  initiateAIAwakening: () => {
    set({ aiAwakening: true, consciousnessLevel: 1, neuralActivity: 1 })
  },
  
  setPerformanceMode: (mode) => {
    const intensity = mode === 'high' ? 1 : mode === 'balanced' ? 0.6 : 0.3
    set({ performanceMode: mode, particleIntensity: intensity })
  }
}))