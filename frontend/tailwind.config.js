/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#eee",
        second: "#f9ad52",
        third: "#3e3f20"
      }
    },
  },
  plugins: [],
}

