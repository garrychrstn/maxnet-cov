/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        dark : '#1b1e28',
        ablue: '#4a007b',
        ared: '#f33656',
        bg: '#f4f4f9',
        prim: '#42006f',
        seco: '#951b2a',
        acce: '#f70f37',
        txt: '#0e0d1c'
      }},
  },
  plugins: [],
}