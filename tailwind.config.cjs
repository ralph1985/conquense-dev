/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avenir Next', 'Avenir', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'monospace'],
      },
      colors: {
        ink: 'hsl(var(--p-ink) / <alpha-value>)',
        paper: 'hsl(var(--p-paper) / <alpha-value>)',
        surface: 'hsl(var(--p-surface) / <alpha-value>)',
        muted: 'hsl(var(--p-muted) / <alpha-value>)',
        accent: 'hsl(var(--p-accent) / <alpha-value>)',
        warm: 'hsl(var(--p-warm) / <alpha-value>)',
      },
      boxShadow: {
        soft: '0 18px 50px hsl(var(--p-ink) / .07)',
        raised: '0 24px 70px hsl(var(--p-ink) / .11)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#176b72',
          secondary: '#c85d3f',
          accent: '#c85d3f',
          neutral: '#17201e',
          'base-100': '#fbfaf5',
          'base-200': '#f0eee8',
          'base-300': '#c9d0ca',
          info: '#176b72',
          success: '#176b72',
          warning: '#c85d3f',
          error: '#a83d2c',
        },
        dark: {
          primary: '#8bd0c7',
          secondary: '#f09a73',
          accent: '#f09a73',
          neutral: '#edf2ea',
          'base-100': '#172320',
          'base-200': '#101816',
          'base-300': '#34453f',
          info: '#8bd0c7',
          success: '#8bd0c7',
          warning: '#f09a73',
          error: '#f09a73',
        },
      },
    ],
  },
};
