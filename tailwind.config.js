module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in-up': {
          'from': {
            transform: 'translateY(50%)',
            opacity: 0,
          },
          'to': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
      },
      animation : {
        'slide-in-up' : 'slide-in-up 0.5s ease-in-out both',
      }
    },
    screens: {
      xxs: '424px',
      xs: '540px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
}