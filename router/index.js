/* eslint-disable no-unused-vars */
/* eslint no-eval: 0 */
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/scripts/Hello/index.vue'

let components = {
  'Hello': '~components/scripts/Hello/index.vue',
  'Glasses': '@/components/scripts/Glasses/index.vue',
  'Sunglasses': '@/components/scripts/Sunglasses/index.vue',
  'ContactLenses': '@/components/scripts/ContactLenses/index.vue',
  'BrandList': '@/components/scripts/BrandList/index.vue',
  'AboutUsPage': '@/components/scripts/AboutUsPage/index.vue',
  'Reglaze': '@/components/scripts/Reglaze/index.vue',
  'SalePage': '@/components/scripts/SalePage/index.vue',
  'Goggles': '@/components/scripts/Goggles/index.vue',
  'EyeHealth': '@/components/scripts/HelpPages/EyeHealth/index.vue',
  'HowToGuides': '@/components/scripts/HelpPages/HowToGuides/index.vue',
  'GuideToLenses': '@/components/scripts/HelpPages/GuideToLenses/index.vue',
  'LensPrices': '@/components/scripts/HelpPages/LensPrices/index.vue',
  'InfoPage': '@/components/scripts/InfoPage/index.vue',
  'Products': '@/components/scripts/Products/index.vue',
  'CheapGlasses': '@/components/scripts/Products/CheapGlasses/index.vue',
  'Basket': '@/components/scripts/Basket/index.vue',
  'Account': '@/components/scripts/Account/index.vue',
  'Prescription': '@/components/scripts/Prescription/index.vue',
  'Amazon': '@/components/scripts/Checkout/Amazon/index.vue',
  'ChooseByFaceShapePage': '@/components/scripts/ChooseByFaceShapePage/index.vue',
  'ProductionDeliveryPage': '@/components/scripts/ProductionDeliveryPage/index.vue',
  'KidsGlasses': '@/components/scripts/KidsGlasses/index.vue',
  'BuyingGuides': '@/components/scripts/HelpPages/BuyingGuides/index.vue',
  'Store': '@/components/scripts/HelpPages/Store/index.vue',
  'Checkout': '@/components/scripts/Checkout/index.vue',
  'Thank': '@/components/scripts/Checkout/Thank/index.vue',
  'Fail': '@/components/scripts/Checkout/Fail/index.vue',
  'Register': '@/components/scripts/Register/index.vue',
  'PageItem': '@/components/scripts/PageItem/index.vue',
  'PageNotFound': '@/components/scripts/PageNotFound/index.vue',
  'Payments': '@/components/scripts/PaymentFrame/index.vue',
  'Main': '@/components/scripts/Main/index.vue',
  'Wishlist': '@/components/scripts/Wishlist/index.vue',
  'Review': '@/components/scripts/Review/index.vue',
  'ReviewsList': '@/components/scripts/ReviewsList/index.vue',
  'SavedPrescriptions': '@/components/scripts/SavedPrescriptions/index.vue',
  'Login': '@/components/scripts/Login/index.vue',
  'Logout': '@/components/scripts/Logout/index.vue',
  'Profile': '@/components/scripts/Profile/index.vue',
  'Settings': '@/components/scripts/Settings/index.vue',
  'Orders': '@/components/scripts/Orders/index.vue',
  'Order': '@/components/scripts/Order/index.vue'
}

const Glasses = Vue.component('Glasses', require('@/components/scripts/Glasses/index.vue'))
const Sunglasses = Vue.component('Sunglasses', require('@/components/scripts/Sunglasses/index.vue'))
const ContactLenses = Vue.component('ContactLenses', require('@/components/scripts/ContactLenses/index.vue'))
const BrandList = Vue.component('BrandList', require('@/components/scripts/BrandList/index.vue'))
const AboutUsPage = Vue.component('BrandList', require('@/components/scripts/AboutUsPage/index.vue'))
const Reglaze = Vue.component('Reglaze', require('@/components/scripts/Reglaze/index.vue'))
const SalePage = Vue.component('SalePage', require('@/components/scripts/SalePage/index.vue'))
const Goggles = Vue.component('Goggles', require('@/components/scripts/Goggles/index.vue'))
const EyeHealth = Vue.component('EyeHealth', require('@/components/scripts/HelpPages/EyeHealth/index.vue'))
const HowToGuides = Vue.component('HowToGuides', require('@/components/scripts/HelpPages/HowToGuides/index.vue'))
const GuideToLenses = Vue.component('GuideToLenses', require('@/components/scripts/HelpPages/GuideToLenses/index.vue'))
const LensPrices = Vue.component('EyeHealth', require('@/components/scripts/HelpPages/LensPrices/index.vue'))
const InfoPage = Vue.component('InfoPage', require('@/components/scripts/InfoPage/index.vue'))
const Products = Vue.component('Products', require('@/components/scripts/Products/index.vue'))
const CheapGlasses = Vue.component('CheapGlasses', require('@/components/scripts/Products/CheapGlasses/index.vue'))
const Basket = Vue.component('Basket', require('@/components/scripts/Basket/index.vue'))
const Account = Vue.component('Account', require('@/components/scripts/Account/index.vue'))
const Prescription = Vue.component('Prescription', require('@/components/scripts/Prescription/index.vue'))
const Amazon = Vue.component('Amazon', require('@/components/scripts/Checkout/Amazon/index.vue'))
const ChooseByFaceShapePage = Vue.component('ChooseByFaceShapePage', require('@/components/scripts/ChooseByFaceShapePage/index.vue'))
const ProductionDeliveryPage = Vue.component('ProductionDeliveryPage', require('@/components/scripts/ProductionDeliveryPage/index.vue'))
const KidsGlasses = Vue.component('KidsGlasses', require('@/components/scripts/KidsGlasses/index.vue'))
const BuyingGuides = Vue.component('BuyingGuides', require('@/components/scripts/HelpPages/BuyingGuides/index.vue'))
const Store = Vue.component('Store', require('@/components/scripts/HelpPages/Store/index.vue'))
const Checkout = Vue.component('Checkout', require('@/components/scripts/Checkout/index.vue'))
const Thank = Vue.component('Thank', require('@/components/scripts/Checkout/Thank/index.vue'))
const Fail = Vue.component('Fail', require('@/components/scripts/Checkout/Fail/index.vue'))
const Register = Vue.component('Register', require('@/components/scripts/Register/index.vue'))
const PageItem = Vue.component('PageItem', require('@/components/scripts/PageItem/index.vue'))
const Payments = Vue.component('Payments', require('@/components/scripts/PaymentFrame/index.vue'))
const Main = Vue.component('Main', require('@/components/scripts/Main/index.vue'))
const Wishlist = Vue.component('Wishlist', require('@/components/scripts/Wishlist/index.vue'))
const Review = Vue.component('Review', require('@/components/scripts/Review/index.vue'))
const ReviewsList = Vue.component('ReviewsList', require('@/components/scripts/ReviewsList/index.vue'))
const SavedPrescriptions = Vue.component('SavedPrescriptions', require('@/components/scripts/SavedPrescriptions/index.vue'))
const Login = Vue.component('Login', require('@/components/scripts/Login/index.vue'))
const Logout = Vue.component('Logout', require('@/components/scripts/Logout/index.vue'))
const Profile = Vue.component('Profile', require('@/components/scripts/Profile/index.vue'))
const Settings = Vue.component('Settings', require('@/components/scripts/Settings/index.vue'))
const Orders = Vue.component('Orders', require('@/components/scripts/Orders/index.vue'))
const Order = Vue.component('Order', require('@/components/scripts/Order/index.vue'))

import config from '@/config'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/modules',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: {
        breadcrumb: 'Register'
      }
    },
    {
      path: '/account/update',
      name: 'Account/update',
      component: Profile,
      props: {
        title: 'Profile'
      }
    },
    {
      path: '/account/password/',
      name: 'Account/password/',
      component: Settings,
      props: {
        title: 'Settings'
      }
    },
    {
      path: '/account/profile',
      name: 'Account',
      component: Account,
      props: {
        title: 'My Account'
      }
    },
    {
      path: '/account/orders',
      name: 'Account/orders',
      component: Orders,
      props: {
        title: 'Orders'
      }
    },
    {
      path: '/account/reviews',
      name: 'Account/reviews',
      component: ReviewsList,
      props: {
        title: 'Product Reviews'
      }
    },
    {
      path: '/reviews/write/:item_id',
      name: 'Reviews',
      component: Review,
      props: {
        title: 'Add or EditProduct Review'
      }
    },
    {
      path: '/account/prescriptions',
      name: 'Account/prescriptions',
      component: SavedPrescriptions,
      props: {
        title: 'Prescriptions'
      }
    },
    {
      path: '/account/view_order/:id(\\d+)/',
      name: 'Account/order/view',
      component: Order,
      props: true
    },
    {
      path: '/catalogue/index/term/:search',
      name: 'ProductListSearch',
      component: Products,
      props: true
    },
    {
      path: '/:menu(.+)?/prescription/select_use',
      name: 'SelectUse',
      component: Prescription,
      props: {stage: 'SelectUse'}
    },
    {
      path: '/:menu(.+)?/prescription/prescriptions',
      name: 'Prescriptions',
      component: Prescription,
      props: {stage: 'Prescriptions'}
    },
    {
      path: '/:menu(.+)?/prescription/lens_type',
      name: 'LensType',
      component: Prescription,
      props: {stage: 'LensType'}
    },
    {
      path: '/:menu(.+)?/prescription/lens_options',
      name: 'LensOptions',
      component: Prescription,
      props: {stage: 'LensOptions'}
    },
    {
      path: '/checkout/fail/:id',
      name: 'Fail',
      component: Fail
    },
    {
      path: '/checkout/amazon/:order_id',
      name: 'Amazon',
      component: Amazon
    },
    {
      path: '/checkout/thank/:order_id',
      name: 'Thank',
      component: Thank
    },
    {
      path: '/payment/:order_id',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/:category?/:designer?/:model?/(.+)?/ss:item(\\d+\\.?\\d+).html',
      name: 'ItemPage',
      component: PageItem
    },
    {
      path: '/payments/:order_id',
      name: 'Payments',
      component: Payments
    },
    {
      path: '/accessories',
      name: 'ProductListAccessories',
      component: Products,
      props: true
    }
  ]
})

Vue.http.get(config.apiHost + config.prefix + config.routes.getPagesRoutes, {}, {
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  emulateJSON: true
}).then(response => response.json())
  .then((data) => {
    let routes = []
    Object.values(data).map(page => {
      let filtered = routes.filter(obj => obj.name === page.name)
      routes.push({
        name: page.name
      })
      router.addRoutes([{
        path: '/' + page.path.replace(/^\//, ''),
        name: filtered.length > 0 ? page.name + filtered.length : page.name,
        component: components[page.component]
      }])
    })
  })

export function createRouter () {
  return router
}
