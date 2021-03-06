const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-amber-400",
    "bg-orange-600",
    "bg-emerald-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-gray-600",
    "bg-cyan-600",
  ],
  mode: "jit",
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    flex: {
      1: "1 1 0%",
      auto: "1 1 auto",
      initial: "0 1 auto",
      inherit: "inherit",
      none: "none",
      2: "2 2 0%",
      3: "3 3 0%",
      4: "4 4 0%",
      5: "5 5 0%",
    },
    zIndex: {
      "-1": -1,
    },
    extend: {},
  },
  plugins: [],
};
