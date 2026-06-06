import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        border: '#1a1a1a',
        green: {
          DEFAULT: '#00ff88',
          dim: '#00cc6a',
          glow: 'rgba(0,255,136,0.15)',
        },
        cyan: {
          DEFAULT: '#00d4ff',
          dim: '#00aacc',
          glow: 'rgba(0,212,255,0.15)',
        },
        red: {
          DEFAULT: '#ff3333',
          dim: '#cc2222',
        },
        text: '#e0e0e0',
        muted: '#666666',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        green: '0 0 20px rgba(0,255,136,0.3), 0 0 40px rgba(0,255,136,0.1)',
        cyan: '0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(0,212,255,0.1)',
        'green-sm': '0 0 10px rgba(0,255,136,0.2)',
        'cyan-sm': '0 0 10px rgba(0,212,255,0.2)',
      },
      animation: {
        'glitch': 'glitch 3s infinite',
        'scanline': 'scanline 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease-out',
        'matrix': 'matrix 20s linear infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
      },
      keyframes: {
        glitch: {
          '0%, 90%, 100%': { transform: 'translate(0)' },
          '92%': { transform: 'translate(-2px, 1px)', textShadow: '-2px 0 #ff3333, 2px 2px #00ff88' },
          '94%': { transform: 'translate(2px, -1px)', textShadow: '2px 0 #00d4ff, -2px -2px #ff3333' },
          '96%': { transform: 'translate(-1px, 2px)', textShadow: '1px 0 #00ff88, -1px -1px #00d4ff' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0,255,136,0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(0,255,136,0.5), 0 0 40px rgba(0,255,136,0.2)' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
};

export default config;
