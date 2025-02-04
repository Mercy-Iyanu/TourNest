/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      // Roboto: ["Roboto", "sans-serif"],
      // Poppins: ["Poppins", "sans-serif"],
      // Montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      screens: {
        topbar: { max: "700px" },
        walletbox: { max: "1100px" },
        salesbox: { max: "750px" },
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
      colors: {
        lilac: "#C8A2C8", // or any lilac color code you prefer
        borderblue: "#6A0DAD",
        deepgrey: "#333",
      },
    },
  },
  plugins: [],
};