import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 10px 10px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -1px rgba(0, 0, 0, 0.2)'
      },
      colors: {
        bg: '#ffffff',
        bgSoft: '#182237',
        text: '#2c2c2c',
        textSoft: '#b7bac1',
        brandText: '#efb90a',
        brand: {
          secondary1: 'rgb(var(--color-brand-secondary1))',
          secondary1d: 'rgb(var(--color-brand-secondary1d))',
          secondary2: 'rgb(var(--color-brand-secondary2))',
          secondary2l: 'rgb(var(--color-brand-secondary2l))',
          accent1: 'rgb(var(--color-brand-accent1))',
          accent2: 'rgb(var(--color-brand-accent2))',
          accent3: 'rgb(var(--color-brand-accent3))'
        },
      },
      fontFamily: {
        roboto: ['roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('flowbite/plugin')
  ],
}

export default config
