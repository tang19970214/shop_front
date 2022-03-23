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
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp')
  ]
}
