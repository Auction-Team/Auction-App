/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/app/**/*.{js,jsx,ts,tsx}",
    "./client/app/**/**/*.{js,jsx,ts,tsx}",
    "./client/app/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
