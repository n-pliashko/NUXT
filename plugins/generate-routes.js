import axios from 'axios'
import config from '@/config'
import Vue from 'vue'
const Glasses  = () => import('@/components/scripts/Glasses/index.vue').then(m => m.default || m)
const Sunglasses  = () => import('@/components/scripts/Sunglasses/index.vue').then(m => m.default || m)
const ContactLenses  = () => import('@/components/scripts/ContactLenses/index.vue').then(m => m.default || m)
const BrandList = () => import('@/components/scripts/BrandList/index.vue').then(m => m.default || m)
const AboutUsPage = () => import('@/components/scripts/AboutUsPage/index.vue').then(m => m.default || m)
const Reglaze = () => import('@/components/scripts/Reglaze/index.vue').then(m => m.default || m)
const SalePage  = () => import('@/components/scripts/SalePage/index.vue').then(m => m.default || m)
const Goggles = () => import('@/components/scripts/Goggles/index.vue').then(m => m.default || m)
const EyeHealth = () => import('@/components/scripts/HelpPages/EyeHealth/index.vue').then(m => m.default || m)
const HowToGuides = () => import('@/components/scripts/HelpPages/HowToGuides/index.vue').then(m => m.default || m)
const GuideToLenses = () => import('@/components/scripts/HelpPages/GuideToLenses/index.vue').then(m => m.default || m)
const LensPrices = () => import('@/components/scripts/HelpPages/LensPrices/index.vue').then(m => m.default || m)
const InfoPage = () => import('@/components/scripts/InfoPage/index.vue').then(m => m.default || m)
const Products = () => import('@/components/scripts/Products/index.vue').then(m => m.default || m)
const CheapGlasses = () => import('@/components/scripts/Products/CheapGlasses/index.vue').then(m => m.default || m)
const Basket  = () => import('@/components/scripts/Basket/index.vue').then(m => m.default || m)
const Account  = () => import('@/components/scripts/Account/index.vue').then(m => m.default || m)
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

export default ({app: {router}}) => {
  var http = axios.create({
    baseURL: config.apiHost + config.prefix
  })
  http.get(config.routes.getPagesRoutes, {}, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    emulateJSON: true
  }).then((data) => {
      let routes = []
      Object.values(data.data).map(page => {
        let filtered = routes.filter(obj => obj.name === page.name)
        routes.push({
          name: page.name
        })
        router.addRoutes([{
          path: '/' + page.path.replace(/^\//, ''),
          name: filtered.length > 0 ? page.name + filtered.length : page.name,
          component: eval(page.component)
        }])
      })
      //console.log(router.options.routes)
    })
}
