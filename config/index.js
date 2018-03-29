const config = {
  apiHost: 'https://yii.omnismain.com',
  integrationHost: 'https://ss-brahmin.omnismain.com',
  prefix: '/rest',
  integrationPrefix: '/api',
  basket: require('./Components/basket').dev,
  products: require('./Components/products').dev,
  currencies: require('./Components/currencies').dev,
  checkout: require('./Components/checkout').dev,
  prescriptions: require('./Components/prescriptions').dev,
  wishlist: require('./Components/wishlist').dev,
  orders: require('./Components/orders').dev,
  profiles: require('./Components/profiles').dev,
  users: require('./Components/users').dev,
  menu: require('./Components/menu').dev,
  routes: require('./Components/routes').dev,
  elastic: {
    host: 'yii.omnismain.com',
    protocol: 'https',
    port: 443,
    index: 'ssyii',
    type: 'items'
  },
  designers: require('./Components/designers').dev,
  reviews: require('./Components/reviews').dev,
  categories: require('./Components/categories').dev,
  vat: 1.2
}
export const apiHost = config.apiHost
export const prefix = config.prefix

export default config;
