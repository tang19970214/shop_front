import webpack from "webpack";

export default {
  server: {
    port: 1803
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
  ],

  plugins: [
    { src: '~/static/application', ssr: false },

    { src: '~/plugins/sweet-alert', ssr: false },
    { src: '~/plugins/vee-validate', ssr: false },
    { src: '~/plugins/font-awesome', ssr: false },
    { src: '~/plugins/g-signin', ssr: false },
  ],

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss',
    ["@nuxtjs/dotenv", {filename: ".env." + process.env.NODE_ENV}]
  ],

  modules: [
    '@nuxtjs/axios',
    // 'nuxt-fontawesome'
  ],
  // fontawesome: {
  //     component: 'fa', 
  //     imports: [
  //       {
  //         set: '@fortawesome/free-solid-svg-icons',
  //         icons: ['fas']
  //       },
  //       {
  //         set: '@fortawesome/free-regular-svg-icons',
  //         icons: ['far']
  //       },
  //     ]
  // },

  axios: {
    baseURL: '/',
  },

  build: {
    transpile: ["vee-validate/dist/rules"],
    plugins: [
      new webpack.ProvidePlugin({
        $api: ['~/api/index.js', 'default']
      })
    ]
  }
}
