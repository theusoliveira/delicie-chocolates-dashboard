import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          50:  '#fdf8f3',
          100: '#f9edd9',
          200: '#f2d8a8',
          300: '#e8bc6e',
          400: '#dd9d3c',
          500: '#d4851e',
          600: '#b96715',
          700: '#924d13',
          800: '#6b3a11',
          900: '#3d2010',
        },
        cream: '#fdf8f3',
      },
      fontFamily: {
        ubuntu: ['var(--font-ubuntu)', 'sans-serif'],
        sans:   ['var(--font-ubuntu)', 'sans-serif'],
        display:['var(--font-ubuntu)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
