const axios = require('axios')
//const path = require('path');
// import config from '@/config'

let components = {
  'Hello': '../components/scripts/Hello/index.vue',
  'Glasses': '../components/scripts/Glasses/index.vue',
  'Sunglasses': '../components/scripts/Sunglasses/index.vue',
  'ContactLenses': '../components/scripts/ContactLenses/index.vue',
  'BrandList': '../components/scripts/BrandList/index.vue',
  'AboutUsPage': '../components/scripts/AboutUsPage/index.vue',
  'Reglaze': '../components/scripts/Reglaze/index.vue',
  'SalePage': '../components/scripts/SalePage/index.vue',
  'Goggles': '../components/scripts/Goggles/index.vue',
  'EyeHealth': '../components/scripts/HelpPages/EyeHealth/index.vue',
  'HowToGuides': '../components/scripts/HelpPages/HowToGuides/index.vue',
  'GuideToLenses': '../components/scripts/HelpPages/GuideToLenses/index.vue',
  'LensPrices': '../components/scripts/HelpPages/LensPrices/index.vue',
  'InfoPage': '../components/scripts/InfoPage/index.vue',
  'Products': '../components/scripts/Products/index.vue',
  'CheapGlasses': '../components/scripts/Products/CheapGlasses/index.vue',
  'Basket': '../components/scripts/Basket/index.vue',
  'Account': '../components/scripts/Account/index.vue',
  'Prescription': '../components/scripts/Prescription/index.vue',
  'Amazon': '../components/scripts/Checkout/Amazon/index.vue',
  'ChooseByFaceShapePage': '../components/scripts/ChooseByFaceShapePage/index.vue',
  'ProductionDeliveryPage': '../components/scripts/ProductionDeliveryPage/index.vue',
  'KidsGlasses': '../components/scripts/KidsGlasses/index.vue',
  'BuyingGuides': '../components/scripts/HelpPages/BuyingGuides/index.vue',
  'Store': '../components/scripts/HelpPages/Store/index.vue',
  'Checkout': '../components/scripts/Checkout/index.vue',
  'Thank': '../components/scripts/Checkout/Thank/index.vue',
  'Fail': '../components/scripts/Checkout/Fail/index.vue',
  'Register': '../components/scripts/Register/index.vue',
  'PageItem': '../components/scripts/PageItem/index.vue',
  'PageNotFound': '../components/scripts/PageNotFound/index.vue',
  'Payments': '../components/scripts/PaymentFrame/index.vue',
  'Main': '../components/scripts/Main/index.vue',
  'Wishlist': '../components/scripts/Wishlist/index.vue',
  'Review': '../components/scripts/Review/index.vue',
  'ReviewsList': '../components/scripts/ReviewsList/index.vue',
  'SavedPrescriptions': '../components/scripts/SavedPrescriptions/index.vue',
  'Login': '../components/scripts/Login/index.vue',
  'Logout': '../components/scripts/Logout/index.vue',
  'Profile': '../components/scripts/Profile/index.vue',
  'Settings': '../components/scripts/Settings/index.vue',
  'Orders': '../components/scripts/Orders/index.vue',
  'Order': '../components/scripts/Order/index.vue'
}

module.exports = function () {
  this.nuxt.hook('build:extendRoutes', async (routes, resolve) => {
    /* var http = axios.create({
       baseURL: config.apiHost + config.prefix
     })*/
    console.log('generate:extendRoutes')
    await axios.get('https://yii.omnismain.com/rest/search/routes/get-pages-routes', {}, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      emulateJSON: true
    }).then((data) => {
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
          component: resolve(__dirname, components['PageNotFound'])
        },
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
    })

    /*
       routes.push(
         {
           path: '/account/update',
           name: 'Account/update',
           component: components['Profile']
         },
         /*{
           path: '/account/password/',
           name: 'Account/password/',
           component: path.resolve(__dirname, components['Settings'])
         },
         {
           path: '/account/profile',
           name: 'Account',
           component: path.resolve(__dirname, components['Account'])
         },
         {
           path: '/account/orders',
           name: 'Account/orders',
           component: path.resolve(__dirname, components['Orders'])
         },
         {
           path: '/account/reviews',
           name: 'Account/reviews',
           component: path.resolve(__dirname, components['ReviewsList'])
         },
         {
           path: '/reviews/write/:item_id',
           name: 'Reviews',
           component: path.resolve(__dirname, components['Review'])
         },
         {
           path: '/account/prescriptions',
           name: 'Account/prescriptions',
           component: path.resolve(__dirname, components['SavedPrescriptions'])
         },
         {
           path: '/account/view_order/:id(\\d+)/',
           name: 'Account/order/view',
           component: path.resolve(__dirname, components['Order']),
           props: true
         },
         {
           path: '/catalogue/index/term/:search',
           name: 'ProductListSearch',
           component: path.resolve(__dirname, components['Products'])
         },
         {
           path: '/:menu(.+)?/prescription/select_use',
           name: 'SelectUse',
           component: path.resolve(__dirname, components['Prescription']),
           props: {stage: 'SelectUse'}
         },
         {
           path: '/:menu(.+)?/prescription/prescriptions',
           name: 'Prescriptions',
           component: path.resolve(__dirname, components['Prescription']),
           props: {stage: 'Prescriptions'}
         },
         {
           path: '/:menu(.+)?/prescription/lens_type',
           name: 'LensType',
           component: path.resolve(__dirname, components['Prescription']),
           props: {stage: 'LensType'}
         },
         {
           path: '/:menu(.+)?/prescription/lens_options',
           name: 'LensOptions',
           component: path.resolve(__dirname, components['Prescription']),
           props: {stage: 'LensOptions'}
         },
         {
           path: '/checkout/fail/:id',
           name: 'Fail',
           component: path.resolve(__dirname, components['Fail'])
         },
         {
           path: '/checkout/amazon/:order_id',
           name: 'Amazon',
           component: path.resolve(__dirname, components['Amazon'])
         },
         {
           path: '/checkout/thank/:order_id',
           name: 'Thank',
           component: path.resolve(__dirname, components['Thank'])
         },
         {
           path: '/payment/:order_id',
           name: 'Checkout',
           component: path.resolve(__dirname, components['Checkout'])
         },
         {
           path: '/:category?/:designer?/:model?/(.+)?/ss:item(\\d+\\.?\\d+).html',
           name: 'ItemPage',
           component: path.resolve(__dirname, components['PageItem'])
         },
         {
           path: '/payments/:order_id',
           name: 'Payments',
           component: path.resolve(__dirname, components['Payments'])
         }
       )*/
    console.log(routes)

    /* var http = axios.create({
       baseURL: config.apiHost + config.prefix
     })
     http.get(config.routes.getPagesRoutes, {}, {
       headers: {
         'X-Requested-With': 'XMLHttpRequest'
       },
       emulateJSON: true
     }).then((data) => {
       let generated_routes = []
       Object.values(data.data).map(page => {
         let filtered = generated_routes.filter(obj => obj.name === page.name)
         generated_routes.push({
           name: page.name
         })
         routes.push({
           path: '/' + page.path.replace(/^\//, ''),
           name: filtered.length > 0 ? page.name + filtered.length : page.name,
           component: path.resolve(__dirname, components[page.component])
         })
       })
       routes.push({
         name: 'PageNotFound',
         path: '*',
         component: path.resolve(__dirname, 'pages/404.vue')
       })
       console.log(routes)
     })*/
  })
}
