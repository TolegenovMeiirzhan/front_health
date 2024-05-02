/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html","./src/**/*.{html,js,jsx}"],
  theme: {
    fontFamily: {
      'display': ['Manrope', 'sans-serif'],
    },
    extend: {
      colors: {
        'button-primary': '#F8614C',
        'button-primary-hover': '#d55543',
        'button-disabled': 'rgba(37,14,11,0.24)',
        'switch-checked': '#5AAF81',
        'switch-checked-hover': '#4d976f',
        'add-meal': '#5AAF81',
        'fats': '#5498FF',
        'cabrohydrates': '#8952FF',
        'proteins': '#CE29E9'
      }
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
}

