/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      primary: {
        100: '#0050b4',
        50: '#1a81ff'
      },
      background: {
        100: '#ffffff',
        50: '#e6f1ff'
      },
      gray: {
        100: 'gray',
        50: '#d9d9d9'
      },
      text: {
        100: '#000000',
        50: '#0050b4',
        20: '#ffffff'
      },
      success: 'green',
      error: '#780006',
      transparent: {
        100:'rgba(255, 255, 255, 0.6)',
        50: 'rgba(255, 255, 255, 0.3)'
      },
    },
    extend: {
      backgroundImage: "url('logo.png')",
    },
  },
  plugins: [],
}

