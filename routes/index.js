/* eslint-disable no-unused-vars */
/* eslint no-eval: 0 */
/*
 import Vue from 'vue'
 import Router from 'vue-router'
 import config from '@/config'
 import VueResource from 'vue-resource'

 Vue.use(Router)
 Vue.use(VueResource)

 function load (path) {
 return () => System.import('@/components/' + path)
 }

 const Hello = load('scripts/Hello/index.vue')
 const Login = load('scripts/Login/index.vue')
 const Logout = load('scripts/Logout/index.vue')
 const Profile = load('scripts/Profile/index.vue')
 const Settings = load('scripts/Settings/index.vue')
 const Account = load('scripts/Account/index.vue')
 const Orders = load('scripts/Orders/index.vue')
 const Order = load('scripts/Order/index.vue')
 const Products = load('scripts/Products/index.vue')
 const Prescription = load('scripts/Prescription/index.vue')
 const SavedPrescriptions = load('scripts/SavedPrescriptions/index.vue')
 const Basket = load('scripts/Basket/index.vue')
 const Checkout = load('scripts/Checkout/index.vue')
 const Thank = load('scripts/Checkout/Thank/index.vue')
 const Fail = load('scripts/Checkout/Fail/index.vue')
 const Register = load('scripts/Register/index.vue')
 const PageItem = load('scripts/PageItem/index.vue')
 const PageNotFound = load('scripts/PageNotFound/index.vue')
 const Payments = load('scripts/PaymentFrame/index.vue')
 const Main = load('scripts/Main/index.vue')
 const Wishlist = load('scripts/Wishlist/index.vue')
 const Review = load('scripts/Review/index.vue')
 const ReviewsList = load('scripts/ReviewsList/index.vue')
 const Goggles = load('scripts/Goggles/index.vue')
 const Glasses = load('scripts/Glasses/index.vue')
 const Sunglasses = load('scripts/Sunglasses/index.vue')
 const BrandList = load('scripts/BrandList/index.vue')
 const SalePage = load('scripts/SalePage/index.vue')
 const Reglaze = load('scripts/Reglaze/index.vue')
 const Amazon = load('scripts/Checkout/Amazon/index.vue')
 */
/*
 import Vue from 'vue'
 import Router from 'vue-router'
 import config from '@/config'
 import VueResource from 'vue-resource'

 Vue.use(Router)
 Vue.use(VueResource)

 function load (path) {
 return () => System.import('@/components/' + path)
 }

 const Hello = load('scripts/Hello/index.vue')
 const Login = load('scripts/Login/index.vue')
 const Logout = load('scripts/Logout/index.vue')
 const Profile = load('scripts/Profile/index.vue')
 const Settings = load('scripts/Settings/index.vue')
 const Account = load('scripts/Account/index.vue')
 const Orders = load('scripts/Orders/index.vue')
 const Order = load('scripts/Order/index.vue')
 const Products = load('scripts/Products/index.vue')
 const Prescription = load('scripts/Prescription/index.vue')
 const SavedPrescriptions = load('scripts/SavedPrescriptions/index.vue')
 const Basket = load('scripts/Basket/index.vue')
 const Checkout = load('scripts/Checkout/index.vue')
 const Thank = load('scripts/Checkout/Thank/index.vue')
 const Fail = load('scripts/Checkout/Fail/index.vue')
 const Register = load('scripts/Register/index.vue')
 const PageItem = load('scripts/PageItem/index.vue')
 const PageNotFound = load('scripts/PageNotFound/index.vue')
 const Payments = load('scripts/PaymentFrame/index.vue')
 const Main = load('scripts/Main/index.vue')
 const Wishlist = load('scripts/Wishlist/index.vue')
 const Review = load('scripts/Review/index.vue')
 const ReviewsList = load('scripts/ReviewsList/index.vue')
 const Goggles = load('scripts/Goggles/index.vue')
 const Glasses = load('scripts/Glasses/index.vue')
 const Sunglasses = load('scripts/Sunglasses/index.vue')
 const BrandList = load('scripts/BrandList/index.vue')
 const SalePage = load('scripts/SalePage/index.vue')
 const Reglaze = load('scripts/Reglaze/index.vue')
 const Amazon = load('scripts/Checkout/Amazon/index.vue')
 */

import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/scripts/Hello/index.vue'
// import Login from '@/components/scripts/Login/index.vue'
// import Logout from '@/components/scripts/Logout/index.vue'
// import Profile from '@/components/scripts/Profile/index.vue'
// import Settings from '@/components/scripts/Settings/index.vue'
// import Account from '@/components/scripts/Account/index.vue'
// import Orders from '@/components/scripts/Orders/index.vue'
// import Order from '@/components/scripts/Order/index.vue'
// import Products from '@/components/scripts/Products/index.vue'
// import Prescription from '@/components/scripts/Prescription/index.vue'
// import SavedPrescriptions from '@/components/scripts/SavedPrescriptions/index.vue'
// import Basket from '@/components/scripts/Basket/index.vue'
// import Checkout from '@/components/scripts/Checkout/index.vue'
// import Thank from '@/components/scripts/Checkout/Thank/index.vue'
// import Fail from '@/components/scripts/Checkout/Fail/index.vue'
// import Register from '@/components/scripts/Register/index.vue'
// import PageItem from '@/components/scripts/PageItem/index.vue'
// import PageNotFound from '@/components/scripts/PageNotFound/index.vue'
// import Payments from '@/components/scripts/PaymentFrame/index.vue'
// import Main from '@/components/scripts/Main/index.vue'
// import Wishlist from '@/components/scripts/Wishlist/index.vue'
// import Review from '@/components/scripts/Review/index.vue'
// import ReviewsList from '@/components/scripts/ReviewsList/index.vue'
// import Goggles from '@/components/scripts/Goggles/index.vue'
// import ContactLenses from '@/components/scripts/ContactLenses/index.vue'
// import Glasses from '@/components/scripts/Glasses/index.vue'
// import Sunglasses from '@/components/scripts/Sunglasses/index.vue'
// import BrandList from '@/components/scripts/BrandList/index.vue'
// import SalePage from '@/components/scripts/SalePage/index.vue'
// import AboutUsPage from '@/components/scripts/AboutUsPage/index.vue'
// import Reglaze from '@/components/scripts/Reglaze/index.vue'
// import Amazon from '@/components/scripts/Checkout/Amazon/index.vue'
// import InfoPage from '@/components/scripts/InfoPage/index.vue'
// import ChooseByFaceShapePage from '@/components/scripts/ChooseByFaceShapePage/index.vue'
// import ProductionDeliveryPage from '@/components/scripts/ProductionDeliveryPage/index.vue'
// import KidsGlasses from '@/components/scripts/KidsGlasses/index.vue'
// import BuyingGuides from '@/components/scripts/HelpPages/BuyingGuides/index.vue'
// import EyeHealth from '@/components/scripts/HelpPages/EyeHealth/index.vue'
// import HowToGuides from '@/components/scripts/HelpPages/HowToGuides/index.vue'
// import GuideToLenses from '@/components/scripts/HelpPages/GuideToLenses/index.vue'
// import LensPrices from '@/components/scripts/HelpPages/LensPrices/index.vue'
// import Store from '@/components/scripts/HelpPages/Store/index.vue'

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
const PageNotFound = Vue.component('PageNotFound', require('@/components/scripts/PageNotFound/index.vue'))
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
import store from '../store/index'

Vue.use(VueHead)

const  routes = [
    {
      path: '/modules',
      name: 'Hello',
      component: Hello
    },
  /*  {
      path: '/',
      name: 'Main',
      component: Main,
      props: {
        breadcrumb: 'HOME'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, */
    {
      path: '/logout.vue',
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
    /* {
     path: '/glasses/prescription',
     name: 'Glasses',
     component: Glasses,
     props: {
     breadcrumb: 'PRESCRIPTION GLASSES'
     }
     },
     {
     path: '/sunglasses/designer',
     name: 'Sunglasses',
     component: Sunglasses,
     props: {
     breadcrumb: 'DESIGNER SUNGLASSES'
     }
     }, */
    {
      path: '/catalogue/index/term/:search',
      name: 'ProductListSearch',
      component: Products,
      props: true
    },
    /* {
      path: '/cart/index',
      name: 'Basket',
      component: Basket,
      props: {
        breadcrumb: 'Basket'
      }
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: Wishlist,
      props: {
        breadcrumb: 'Wishlist'
      }
    },
     {
     path: '/goggles',
     name: 'Goggles',
     component: Goggles,
     props: {
     breadcrumb: 'Goggles'
     }
     },
     {
     path: '/contact-lenses',
     name: 'ContactLenses',
     component: ContactLenses,
     props: {
     breadcrumb: 'Contact Lenses'
     }
     },
     {
     path: '/lens-replacement',
     name: 'Reglaze',
     component: Reglaze,
     props: {
     breadcrumb: 'Lens Replacement & Reglaze Service '
     }
     },
     {
     path: '/sale',
     name: 'SalePage',
     component: SalePage,
     props: {
     breadcrumb: 'Sale'
     }
     },
    {
      path: '/about-us/reviews/',
      name: 'AboutUsPage',
      component: AboutUsPage,
      props: {
        breadcrumb: 'Our Reviews'
      }
    },
    {
      path: '/information',
      name: 'InfoPage',
      component: InfoPage,
      props: {
        breadcrumb: 'Help & Information'
      }
    },
    {
      path: '/info/face-shapes/',
      name: 'ChooseByFaceShapePage',
      component: ChooseByFaceShapePage,
      props: {
        breadcrumb: 'CHOOSING GLASSES TO SUIT YOUR FACE SHAPE'
      }
    },
    {
      path: '/info/shipping-delivery/',
      name: 'ProductionDeliveryPage',
      component: ProductionDeliveryPage,
      props: {
        breadcrumb: 'CHOOSING GLASSES TO SUIT YOUR FACE SHAPE'
      }
    }, */
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
    /* {
     path: '/cheap-glasses',
     name: 'CheapGlasses',
     component: Products,
     props: {
     page: 'CheapGlasses',
     breadcrumb: 'SUPER SAVER CHEAP PRESCRIPTION GLASSES'
     }
     },
    {
      path: '/guides/kids-sunglasses/',
      name: 'KidsGlasses',
      component: KidsGlasses,
      props: {
        breadcrumb: 'KIDS SUNGLASSES'
      }
    },
     {
     path: '/brands',
     name: 'BrandList',
     component: BrandList,
     props: {
     breadcrumb: 'BRAND DIRECTORY - A TO Z'
     }
     },
    {
      path: '/guides',
      name: 'BuyingGuides',
      component: BuyingGuides,
      props: {
        breadcrumb: 'BUYING GUIDES & ADVICE'
      }
    },
    {
     path: '/eye-health',
     name: 'EyeHealth',
     component: EyeHealth,
     props: {
     breadcrumb: 'EYE HEALTH & ADVICE'
     }
     },
     {
     path: '/guides/how-to',
     name: 'HowToGuides',
     component: HowToGuides,
     props: {
     breadcrumb: 'HOW TO GUIDES'
     }
     },
     {
     path: '/guides/lenses',
     name: 'GuideToLenses',
     component: GuideToLenses,
     props: {
     breadcrumb: 'LENSES'
     }
     },
     {
     path: '/price-list',
     name: 'LensPrices',
     component: LensPrices,
     props: {
     breadcrumb: 'PRICE LIST'
     }
     },
    {
      path: '/store',
      name: 'Store',
      component: Store,
      props: {
        breadcrumb: 'SELECTSPECS OPTICAL STORE'
      }
    },
     {
     path: '/:nav_menu/:sub_category/:category',
     name: 'ProductListCategory',
     component: Products,
     props: true
     }, */
    {
      path: '/accessories',
      name: 'ProductListAccessories',
      component: Products,
      props: true
    }
    /* {
     path: '/:nav_menu/:sub_category/:designer',
     name: 'ProductListDesigner',
     component: Products,
     props: true
     } */
  ]

Vue.http.get(config.apiHost + config.prefix + config.routes.getPagesRoutes, {}, {
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  emulateJSON: true
}).then(response => response.json())
  .then((data) => {
    let generatedRoutes = []
    Object.values(data).map(page => {
      let filtered = generatedRoutes.filter(obj => obj.name === page.name)
      generatedRoutes.push({
        name: page.name
      })
      routes.push({
        path: '/' + page.path.replace(/^\//, ''),
        name: filtered.length > 0 ? page.name + filtered.length : page.name,
        component: eval(page.component)
      })
    })
    routes.push({
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    })
  })


export default createRouter = () => {  return routes }
