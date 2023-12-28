import type { Config } from 'tailwindcss';

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
          secondary1: 'rgb(38, 70, 83)',
          secondary1d: 'rgb(3, 12, 64)', //disney
          // secondary1d: 'rgb(2, 48, 71)',

          // secondary1d: 'rgb(0, 58, 81)',

          secondary2: 'rgb(0, 58, 81)',
          secondary2l: 'rgb(216, 235, 233)',
          accent1: 'rgb(233, 196, 106)',
          accent2: 'rgb(244, 162, 97)',
          accent3: 'rgb(231, 111, 81)',
          // accent3d: 'rgb(229, 45, 0)'
          accent3d: 'rgb(255, 69, 0)'

        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
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
