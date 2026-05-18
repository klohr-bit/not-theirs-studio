import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-dim': 'rgb(var(--ink-dim) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      borderRadius: {
        input: '8px',
        card: '12px',
      },
      maxWidth: {
        screen: '720px',
        wide: '960px',
      },
    },
  },
  plugins: [],
};

export default config;
