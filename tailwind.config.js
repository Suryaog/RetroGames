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
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        dark: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#1a1a1a',
          950: '#0a0a0a',
        },
        neon: {
          purple: '#9333ea',
          pink: '#ec4899',
          blue: '#3b82f6',
          green: '#10b981',
        }
      },
      fontFamily: {
        'game': ['Orbitron', 'monospace'],
        'display': ['Exo 2', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #9333ea, 0 0 10px #9333ea, 0 0 15px #9333ea' },
          '100%': { boxShadow: '0 0 10px #9333ea, 0 0 20px #9333ea, 0 0 30px #9333ea' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(147, 51, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 51, 234, 0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'cyber-grid': '20px 20px',
      }
    },
  },
  plugins: [],
}