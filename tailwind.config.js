/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Windows XP Colors
        'xp-blue': '#0066cc',
        'xp-blue-light': '#3399ff',
        'xp-blue-dark': '#003d7a',
        'xp-silver': '#ece9d8',
        'xp-gray': '#d4d0c8',
        'xp-gray-dark': '#808080',
        'xp-title-blue': '#0854d0',
        'xp-title-gradient-start': '#0a246a',
        'xp-title-gradient-end': '#3a6ea5',
        // DOS Colors
        'dos-blue': '#0000aa',
        'dos-cyan': '#00aaaa',
        'dos-white': '#ffffff',
        'dos-gray': '#aaaaaa',
        'dos-yellow': '#ffff55',
        'dos-red': '#ff5555',
        // Keep some green for accents
        'accent-green': '#00ff00',
        'matrix-green': '#00ff41',
        'bright-green': '#39ff14',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'green-glow': '0 0 20px rgba(0, 255, 65, 0.5)',
        'green-glow-lg': '0 0 40px rgba(0, 255, 65, 0.6)',
        'green-glow-xl': '0 0 60px rgba(0, 255, 65, 0.7)',
        'blue-glow': '0 0 20px rgba(0, 102, 204, 0.5)',
        'blue-glow-lg': '0 0 40px rgba(51, 153, 255, 0.6)',
        'blue-glow-xl': '0 0 60px rgba(51, 153, 255, 0.7)',
      }
    },
  },
  plugins: [],
}