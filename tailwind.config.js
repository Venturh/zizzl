const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: ["./**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "bg-primary": "var(--bg-primary)",
      "bg-secondary": "var(--bg-secondary)",
      accent: "var(--accent)",
      "text-primary": "var(--text-primary)",
      "text-secondary": "var(--text-secondary)",
      brand: "var(--brand)",
      "brand-darker": "var(--brand-darker)",
      "brand-lighter": "var(--brand-lighter)",
      "brand-contrast": "var(--brand-contrast)",
      error: "var(--error)",
      success: "var(--success)",
      black: colors.black,
      white: colors.white,
      tansparent: "transparent",
      ...colors,
    },
    extend: {
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
      },
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
