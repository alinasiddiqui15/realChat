/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#1F1F1F', // Deep warm off-black for main bg
          800: '#2A2A2A', // Card/containers
          700: '#353535', // Hover states
          600: '#404040', // Borders
        },
        light: {
          900: '#F6F5F2', // Soft warm beige/off-white main bg
          800: '#FFFFFF', // Card/containers
          700: '#F0EFEA', // Hover states
          600: '#E3E1D9', // Borders
        },
        primary: {
          500: 'var(--nexus-primary-500)',
          600: 'var(--nexus-primary-600)',
          700: 'var(--nexus-primary-700)',
        },
        accent: {
          500: 'var(--nexus-accent-500)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'nexus-gradient': 'var(--nexus-gradient)',
      }
    },
  },
  plugins: [],
}
