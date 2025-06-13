/** @type {import('tailwindcss').Config} */
import theme from './src/styles/theme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          ...theme.colors.primary,
          DEFAULT: theme.colors.primary.DEFAULT,
          light: theme.colors.primary.light,
          dark: theme.colors.primary.dark,
          hover: theme.colors.primary.hover
        },
        secondary: {
          ...theme.colors.secondary,
          DEFAULT: theme.colors.secondary.DEFAULT,
          light: theme.colors.secondary.light,
          dark: theme.colors.secondary.dark,
          hover: theme.colors.secondary.hover
        },
        accent: {
          ...theme.colors.accent,
          DEFAULT: theme.colors.accent.DEFAULT,
          light: theme.colors.accent.light,
          dark: theme.colors.accent.dark,
          hover: theme.colors.accent.hover
        },
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        info: theme.colors.info,
        midnight: theme.colors.midnight,
        cetacean: theme.colors.cetacean,
      },
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        almarai: ['Almarai', 'sans-serif'],
        sans: ['Tajawal', 'sans-serif']
      },
      spacing: theme.spacing,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}