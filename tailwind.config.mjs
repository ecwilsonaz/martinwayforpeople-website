/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1a1a',
        paper: { DEFAULT: '#f5f2ed', warm: '#ede8e0' },
        danger: { DEFAULT: '#b91c1c', light: '#fef2f2', dark: '#7f1d1d' },
        data: { DEFAULT: '#1e40af', light: '#eff6ff' },
        muted: { DEFAULT: '#475569', light: '#94a3b8' },
        border: '#d6d0c4',
        green: { deep: '#166534', bg: '#f0fdf4', border: '#bbf7d0' },
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
      },
    }
  }
}
