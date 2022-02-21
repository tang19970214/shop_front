import webpack from "webpack";

export default {
  server: {
    port: 1803
  },
  router: {
    // middleware: ['ssr-cookie'],
    scrollBehavior() {
      return { x: 0, y:0 }
    }
  },
  head: {
    title: 'shop',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      { src: "//apis.google.com/js/api:client.js" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },

  css: [
    '~/static/style/animation.css'
  ],

  plugins: [
    '~/plugins/auth',
    '~/plugins/axios',
    '~/plugins/api',

    { src: '~/plugins/sweet-alert', ssr: false },
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/font-awesome', ssr: false },
    { src: '~/plugins/g-signin', ssr: false },
    
    { src: '~/static/application', ssr: false },
  ],

  components: true,

  transition:{
    name:'fade',
    mode:'out-in'
  },

  buildModules: [
    '@nuxtjs/tailwindcss',
    ["@nuxtjs/dotenv", {filename: ".env." + process.env.NODE_ENV}]
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: '/',
  },

  build: {
    transpile: ["vee-validate/dist/rules"],
    vendor: ['axios'],
    // plugins: [
    //   new webpack.ProvidePlugin({
    //      $api: ['~/api/index.js', 'default']
    //   })
    // ]
  }
}
