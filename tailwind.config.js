// tailwind.config.js
module.exports = {
  content: [
    './index.html', // Vite's default entry file
    './src/**/*.{js,jsx,ts,tsx}', // Scan all JS, JSX, TS, and TSX files inside the src directory
  ],
  theme: {
    extend: {
      colors: {
        tusblack: '#231815', // Example custom color
      },
    },
  },
  plugins: [],
};
