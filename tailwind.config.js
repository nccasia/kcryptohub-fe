module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17313b",
        secondary: "#FF3D2D",
      },
      boxShadow: {
        "3xl":
          "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%)",
      },
      keyframes: {
        "slide-in-up": {
          from: {
            transform: "translateY(50%)",
            opacity: 0,
          },
          to: {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        "slide-in-left": {
          from: {
            transform: "translateX(50%)",
            opacity: 0,
          },
          to: {
            transform: "translateX(0)",
            opacity: 1,
          },
        },
      },
      animation: {
        "slide-in-up": "slide-in-up 0.5s ease-in-out both",
        "slide-in-left": "slide-in-left 0.5s ease-in-out both",
      },
    },
    screens: {
      xxs: "424px",
      xs: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
