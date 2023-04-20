/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      primary: {
        100: '#0050b4',
        50: '#1a81ff'
      },
      background: {
        100: '#ffffff',
        50: '#e6f1ff',
        30: '#cccccc',
        20: '#262626'
      },
      gray: {
        100: 'gray',
        50: '#d9d9d9',
        20: 'rgba(255, 255, 255, 0.1)'
      },
      text: {
        100: '#000000',
        50: '#338fff',
        20: '#ffffff'
      },
      success: 'green',
      error: '#780006',
      errror: 'rgb(255, 0, 0)',
      transparent: {
        100: 'rgba(255, 255, 255, 0.6)',
        50: 'rgba(255, 255, 255, 0.3)',
        20: 'transparent'
      },
    },
    extend: {
      backgroundImage: "url('logo.png')",
    },
  },
  plugins: [],
}

