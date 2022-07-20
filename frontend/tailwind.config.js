module.exports = {
  mode: 'jit',
  content: "src/index.js",
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],	// Purge CSS from unused selectors  
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
