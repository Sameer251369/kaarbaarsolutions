/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b35',
        secondary: '#667eea',
        dark: '#1a1a2e',
        darkLight: '#16213e',
      },
    },
  },
  plugins: [],
}
