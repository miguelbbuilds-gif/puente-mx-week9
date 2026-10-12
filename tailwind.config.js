/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#071422",
          900: "#0B1F3A",
          800: "#123056",
          700: "#1C4474",
        },
        electric: {
          50: "#EEF4FF",
          100: "#D9E6FF",
          400: "#5B8CFF",
          500: "#2F6BFF",
          600: "#1E5AF0",
          700: "#1849C7",
        },
        mist: "#F3F6FB",
        ink: "#122033",
        paper: "#FBF8F3",
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 18px 50px -28px rgba(11, 31, 58, 0.55)",
        soft: "0 8px 30px -18px rgba(11, 31, 58, 0.35)",
      },
    },
  },
  plugins: [],
};
