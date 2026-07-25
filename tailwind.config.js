/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0E6B47',
          hover: '#0B5A3B',
          active: '#094A31',
          soft: '#E7F3EC',
          'soft-hover': '#D9EDE2',
        },
        ink: {
          DEFAULT: '#14181B',
          secondary: '#5B6572',
          tertiary: '#98A2AC',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          bg: '#FAFAF9',
        },
        border: {
          DEFAULT: '#E7EAEB',
          strong: '#D7DBDD',
        },
        destructive: {
          DEFAULT: '#C4402F',
          hover: '#A8362A',
          soft: '#FBEAE7',
        },
        warning: {
          DEFAULT: '#A66A15',
          soft: '#FBF1E1',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(20,24,20,0.04)',
        sm: '0 1px 2px rgba(20,24,20,0.05), 0 1px 6px rgba(20,24,20,0.04)',
        md: '0 8px 24px rgba(20,24,20,0.08)',
        lg: '0 20px 56px rgba(20,24,20,0.18)',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(.4,0,.2,1)',
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '120% 0' }, '100%': { backgroundPosition: '-20% 0' } },
        fadeIn: { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        stepIn: { from: { opacity: 0, transform: 'translateX(14px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        shake: { '10%,90%': { transform: 'translateX(-1px)' }, '20%,80%': { transform: 'translateX(2px)' }, '30%,50%,70%': { transform: 'translateX(-4px)' }, '40%,60%': { transform: 'translateX(4px)' } },
        circleDraw: { to: { strokeDashoffset: 0 } },
        checkDraw: { to: { strokeDashoffset: 0 } },
      },
      animation: {
        shimmer: 'shimmer 1.3s ease-in-out infinite',
        fadeIn: 'fadeIn .28s cubic-bezier(.4,0,.2,1)',
        stepIn: 'stepIn .32s cubic-bezier(.4,0,.2,1)',
        shake: 'shake .32s cubic-bezier(.4,0,.2,1)',
      },
    },
  },
  plugins: [],
}
