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
        bg: '#110919',
        prim: '#42006f',
        seco: '#951b2a',
        acce: '#f70f37',
        txt: '#ecddf9'
      }},
  },
  plugins: [],
}