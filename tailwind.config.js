/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: '#050505',
        zenkai: {
          dark: '#050505',
          black: '#000000',
          white: '#FFFFFF',
          purple: '#551276',
          violet: '#9227B5',
          pink: '#F03391',
          orange: '#FF7348',
          gold: '#FFC15C',
          orangeGlow: '#FF5722'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Inter', 'Syne', '-apple-system', 'sans-serif'],
        brand: ['"Bricolage Grotesque"', 'Outfit', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'gradient-slow': 'gradient-shift 14s ease infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%',
            'background-size': '200% 200%'
          },
          '50%': {
            'background-position': '100% 50%',
            'background-size': '200% 200%'
          },
        }
      }
    },
  },
  plugins: [],
}
