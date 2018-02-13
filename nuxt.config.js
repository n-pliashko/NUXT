const axios = require('axios')

let components = {
  'Hello': 'components/scripts/Hello/index.vue',
  'Glasses': 'components/scripts/Glasses/index.vue',
  'Sunglasses': 'components/scripts/Sunglasses/index.vue',
  'ContactLenses': 'components/scripts/ContactLenses/index.vue',
  'BrandList': 'components/scripts/BrandList/index.vue',
  'AboutUsPage': 'components/scripts/AboutUsPage/index.vue',
  'Reglaze': 'components/scripts/Reglaze/index.vue',
  'SalePage': 'components/scripts/SalePage/index.vue',
  'Goggles': 'components/scripts/Goggles/index.vue',
  'EyeHealth': 'components/scripts/HelpPages/EyeHealth/index.vue',
  'HowToGuides': 'components/scripts/HelpPages/HowToGuides/index.vue',
  'GuideToLenses': 'components/scripts/HelpPages/GuideToLenses/index.vue',
  'LensPrices': 'components/scripts/HelpPages/LensPrices/index.vue',
  'InfoPage': 'components/scripts/InfoPage/index.vue',
  'Products': 'components/scripts/Products/index.vue',
  'CheapGlasses': 'components/scripts/Products/CheapGlasses/index.vue',
  'Basket': 'components/scripts/Basket/index.vue',
  'Account': 'components/scripts/Account/index.vue',
  'Prescription': 'components/scripts/Prescription/index.vue',
  'Amazon': 'components/scripts/Checkout/Amazon/index.vue',
  'ChooseByFaceShapePage': 'components/scripts/ChooseByFaceShapePage/index.vue',
  'ProductionDeliveryPage': 'components/scripts/ProductionDeliveryPage/index.vue',
  'KidsGlasses': 'components/scripts/KidsGlasses/index.vue',
  'BuyingGuides': 'components/scripts/HelpPages/BuyingGuides/index.vue',
  'Store': 'components/scripts/HelpPages/Store/index.vue',
  'Checkout': 'components/scripts/Checkout/index.vue',
  'Thank': 'components/scripts/Checkout/Thank/index.vue',
  'Fail': 'components/scripts/Checkout/Fail/index.vue',
  'Register': 'components/scripts/Register/index.vue',
  'PageItem': 'components/scripts/PageItem/index.vue',
  'PageNotFound': 'components/scripts/PageNotFound/index.vue',
  'Payments': 'components/scripts/PaymentFrame/index.vue',
  'Main': 'components/scripts/Main/index.vue',
  'Wishlist': 'components/scripts/Wishlist/index.vue',
  'Review': 'components/scripts/Review/index.vue',
  'ReviewsList': 'components/scripts/ReviewsList/index.vue',
  'SavedPrescriptions': 'components/scripts/SavedPrescriptions/index.vue',
  'Login': 'components/scripts/Login/index.vue',
  'Logout': 'components/scripts/Logout/index.vue',
  'Profile': 'components/scripts/Profile/index.vue',
  'Settings': 'components/scripts/Settings/index.vue',
  'Orders': 'components/scripts/Orders/index.vue',
  'Order': 'components/scripts/Order/index.vue'
}
/*
const Glasses = () => import('@/components/scripts/Glasses/index.vue').then(m => m.default || m)
const Sunglasses = () => import('@/components/scripts/Sunglasses/index.vue').then(m => m.default || m)
const ContactLenses = () => import('@/components/scripts/ContactLenses/index.vue').then(m => m.default || m)
const BrandList = () => import('@/components/scripts/BrandList/index.vue').then(m => m.default || m)
const AboutUsPage = () => import('@/components/scripts/AboutUsPage/index.vue').then(m => m.default || m)
const Reglaze = () => import('@/components/scripts/Reglaze/index.vue').then(m => m.default || m)
const SalePage = () => import('@/components/scripts/SalePage/index.vue').then(m => m.default || m)
const Goggles = () => import('@/components/scripts/Goggles/index.vue').then(m => m.default || m)
const EyeHealth = () => import('@/components/scripts/HelpPages/EyeHealth/index.vue').then(m => m.default || m)
const HowToGuides = () => import('@/components/scripts/HelpPages/HowToGuides/index.vue').then(m => m.default || m)
const GuideToLenses = () => import('@/components/scripts/HelpPages/GuideToLenses/index.vue').then(m => m.default || m)
const LensPrices = () => import('@/components/scripts/HelpPages/LensPrices/index.vue').then(m => m.default || m)
const InfoPage = () => import('@/components/scripts/InfoPage/index.vue').then(m => m.default || m)
const Products = () => import('@/components/scripts/Products/index.vue').then(m => m.default || m)
const CheapGlasses = () => import('@/components/scripts/Products/CheapGlasses/index.vue').then(m => m.default || m)
const Basket = () => import('@/components/scripts/Basket/index.vue').then(m => m.default || m)
const Account = () => import('@/components/scripts/Account/index.vue').then(m => m.default || m)
const Prescription = () => import('@/components/scripts/Prescription/index.vue').then(m => m.default || m)
const Amazon = () => import('@/components/scripts/Checkout/Amazon/index.vue').then(m => m.default || m)
const ChooseByFaceShapePage = () => import('@/components/scripts/ChooseByFaceShapePage/index.vue').then(m => m.default || m)
const ProductionDeliveryPage = () => import('@/components/scripts/ProductionDeliveryPage/index.vue').then(m => m.default || m)
const KidsGlasses = () => import('@/components/scripts/KidsGlasses/index.vue').then(m => m.default || m)
const BuyingGuides = () => import('@/components/scripts/HelpPages/BuyingGuides/index.vue').then(m => m.default || m)
const Store = () => import('@/components/scripts/HelpPages/Store/index.vue').then(m => m.default || m)
const Checkout = () => import('@/components/scripts/Checkout/index.vue').then(m => m.default || m)
const Thank = () => import('@/components/scripts/Checkout/Thank/index.vue').then(m => m.default || m)
const Fail = () => import('@/components/scripts/Checkout/Fail/index.vue').then(m => m.default || m)
const Register = () => import('@/components/scripts/Register/index.vue').then(m => m.default || m)
const PageItem = () => import('@/components/scripts/PageItem/index.vue').then(m => m.default || m)
const PageNotFound = () => import('@/components/scripts/PageNotFound/index.vue').then(m => m.default || m)
const Payments = () => import('@/components/scripts/PaymentFrame/index.vue').then(m => m.default || m)
const Main = () => import('@/components/scripts/Main/index.vue').then(m => m.default || m)
const Wishlist = () => import('@/components/scripts/Wishlist/index.vue').then(m => m.default || m)
const Review = () => import('@/components/scripts/Review/index.vue').then(m => m.default || m)
const ReviewsList = () => import('@/components/scripts/ReviewsList/index.vue').then(m => m.default || m)
const SavedPrescriptions = () => import('@/components/scripts/SavedPrescriptions/index.vue').then(m => m.default || m)
const Login = () => import('@/components/scripts/Login/index.vue').then(m => m.default || m)
const Logout = () => import('@/components/scripts/Logout/index.vue').then(m => m.default || m)
const Profile = () => import('@/components/scripts/Profile/index.vue').then(m => m.default || m)
const Settings = () => import('@/components/scripts/Settings/index.vue').then(m => m.default || m)
const Orders = () => import('@/components/scripts/Orders/index.vue').then(m => m.default || m)
const Order = () => import('@/components/scripts/Order/index.vue').then(m => m.default || m)
*/

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

  plugins: ['~/plugins/slick'],
  router: {
    scrollBehavior (to, from, savedPosition) {
      return {x: 0, y: 0}
    },
    middleware: ['redirect', 'routes_info'],
    extendRoutes (routes, resolve) {
      axios.get('https://yii.omnismain.com/rest/search/routes/get-pages-routes').then((data) => {
        let generated_routes = []
        Object.values(data.data).map(page => {
          let filtered = generated_routes.filter(obj => obj.name === page.name)
          generated_routes.push({
            name: page.name
          })
          routes.push({
            path: '/' + page.path.replace(/^\//, ''),
            name: filtered.length > 0 ? page.name + filtered.length : page.name,
            component: resolve(__dirname, components[page.component])
          })
        })
        routes.push({
          name: 'PageNotFound',
          path: '*',
          component: resolve(__dirname, 'pages/404.vue')
        })
      }).then(() => {
        routes.push(
          {
            path: '/account/update',
            name: 'Account/update',
            component: resolve(__dirname, components['Profile'])
          },
          {
            path: '/account/password/',
            name: 'Account/password/',
            component: resolve(__dirname, components['Settings'])
          },
          {
            path: '/account/profile',
            name: 'Account',
            component: resolve(__dirname, components['Account'])
          },
          {
            path: '/account/orders',
            name: 'Account/orders',
            component: resolve(__dirname, components['Orders'])
          },
          {
            path: '/account/reviews',
            name: 'Account/reviews',
            component: resolve(__dirname, components['ReviewsList'])
          },
          {
            path: '/reviews/write/:item_id',
            name: 'Reviews',
            component: resolve(__dirname, components['Review'])
          },
          {
            path: '/account/prescriptions',
            name: 'Account/prescriptions',
            component: resolve(__dirname, components['SavedPrescriptions'])
          },
          {
            path: '/account/view_order/:id(\\d+)/',
            name: 'Account/order/view',
            component: resolve(__dirname, components['Order']),
            props: true
          },
          {
            path: '/catalogue/index/term/:search',
            name: 'ProductListSearch',
            component: resolve(__dirname, components['Products'])
          },
          {
            path: '/:menu(.+)?/prescription/select_use',
            name: 'SelectUse',
            component: resolve(__dirname, components['Prescription']),
            props: {stage: 'SelectUse'}
          },
          {
            path: '/:menu(.+)?/prescription/prescriptions',
            name: 'Prescriptions',
            component: resolve(__dirname, components['Prescription']),
            props: {stage: 'Prescriptions'}
          },
          {
            path: '/:menu(.+)?/prescription/lens_type',
            name: 'LensType',
            component: resolve(__dirname, components['Prescription']),
            props: {stage: 'LensType'}
          },
          {
            path: '/:menu(.+)?/prescription/lens_options',
            name: 'LensOptions',
            component: resolve(__dirname, components['Prescription']),
            props: {stage: 'LensOptions'}
          },
          {
            path: '/checkout/fail/:id',
            name: 'Fail',
            component: resolve(__dirname, components['Fail'])
          },
          {
            path: '/checkout/amazon/:order_id',
            name: 'Amazon',
            component: resolve(__dirname, components['Amazon'])
          },
          {
            path: '/checkout/thank/:order_id',
            name: 'Thank',
            component: resolve(__dirname, components['Thank'])
          },
          {
            path: '/payment/:order_id',
            name: 'Checkout',
            component: resolve(__dirname, components['Checkout'])
          },
          {
            path: '/:category?/:designer?/:model?/(.+)?/ss:item(\\d+\\.?\\d+).html',
            name: 'ItemPage',
            component: resolve(__dirname, components['PageItem'])
          },
          {
            path: '/payments/:order_id',
            name: 'Payments',
            component: resolve(__dirname, components['Payments'])
          })

        console.log(routes)
      })
    }
  }
}
