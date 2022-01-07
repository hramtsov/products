export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  // mode: 'universal',
  ssr: true,
  target: 'static',

  head: {
    title: 'products',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/static/main.css"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '@/plugins/vue-highcharts.js', ssr: true },
    { src: "~/plugins/vue-highcharts.js", mode: "client" },
    '~/plugins/inject.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // publicPath: '/static/nuxt/',
  },

  generate: {
    // fallback: true,
    nojekyll: false,
    subFolders: false // HTML files are generated according to the route path
  },

  // loading: false,

}
