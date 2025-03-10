/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Inclui todos os arquivos na pasta `pages`
    './components/**/*.{js,ts,jsx,tsx}', // Inclui todos os arquivos na pasta `components`
    './app/**/*.{js,ts,jsx,tsx}', // Se você estiver usando a pasta `app` (Next.js 13+)
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js', // Inclui o arquivo do datepicker
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

