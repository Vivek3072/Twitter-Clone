/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: ["hover"],
      colors: {
        primary: "#3B82F6",
        primaryDark: "#2563EB",
      },
    },
  },
  plugins: [],
};
