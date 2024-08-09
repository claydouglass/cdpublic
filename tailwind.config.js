module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'brand-green': '#4c8c4a',
        'brand-teal': '#30a7a0',
        'brand-cream': '#f0e6d2',
        'brand-gray': '#d3d3d3',
        'brand-orange': '#f9b248',
        'brand-blue': '#7ec8e3',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}