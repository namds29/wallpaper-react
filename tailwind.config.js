const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    ...colors,
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "30rem": "30rem",
        97: "97%",
      },
      maxHeight: {
        "30rem": "30rem",
      },
      backgroundColor: {
        primary: "#1a1c24",
      },
    },
  },
  plugins: [],
  // corePlugins: { preflight: false, },
};
