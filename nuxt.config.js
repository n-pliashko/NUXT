module.exports = {
  css: [
    'assets/_Styles/rateit-settings.scss',
    'assets/_Styles/slick-settings.scss',
    'assets/_Styles/main.scss'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'Test Nuxt App',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Description'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'jquery', 'localStorage'],
    /*
    ** Run ESLint on save
    */
    extend (config, {isDev, isClient, isServer}) {
      if (isServer) {
        config.externals = [
          require('webpack-node-externals')({
            whitelist: [/^vue-slick/]
          })
        ]
      }

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '~modules/custom-generate.js'
  ],
  plugins: ['~/plugins/slick'],
  router: {
    scrollBehavior (to, from, savedPosition) {
      return {x: 0, y: 0}
    },
    middleware: ['redirect', 'routes_info']
  }
}
