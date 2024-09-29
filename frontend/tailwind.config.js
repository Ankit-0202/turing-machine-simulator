// frontend/tailwind.config.js

module.exports = {
  darkMode: 'class', // Enables dark mode via a CSS class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#000000', // Black in light mode
          dark: '#FFFFFF',  // White in dark mode
        },
      },
    },
  },
  plugins: [],
}
