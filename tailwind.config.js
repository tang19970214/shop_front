module.exports = {
  mode: 'jit',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '40%': {
            transform: 'scale(1.4)',
            opacity: '1'
          },
          '70%': {
            transform: 'scale(0.8)',
            opacity: '1'
          },
          '80%': {
            transform: 'scale(1.1)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        }
      },
      animation: {
        pulse: 'pulse 0.5s'
      }
    }
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp')
  ]
}
