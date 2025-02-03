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
      },
      fontFamily: {
        "bree-serif" : ["bree-serif", "serif"],
        "poppins": ['Poppins', 'sans-serif']
      },
      keyframes:{
        "zoom-in": {
          "0%": {
            opacity: 1,
            transform: "scale3d(1, 1, 1)",
          },
          "50%": {
            opacity: 1,
            transform: "scale3d(1.4, 1.4, 1.4)",
          },
          "100%": {
            opacity: 1,
            transform: "scale3d(1, 1, 1)",
          },
        }, "zoom-out": {
          "0%": {
            opacity: 1,
          },
          "15%": {
            opacity: 0.8,
            transform: "scale3d(1.1, 1.1, 1.1)",
          },
          "100%": {
            opacity: 0,
            transform: "scale3d(0.3, 0.3, 0.3)",
          },
        }
      }
    },
  },
  plugins: [],
}

