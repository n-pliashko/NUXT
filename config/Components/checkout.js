module.exports = {
  prod: {
    setOrder: '/checkout/checkout/set-order',
    fetchOrderUrl: '/checkout/checkout/fetch-order',
    getCountryListUrl: '/checkout/checkout/get-country-list',
    getShippingMethodUrl: '/delivery/delivery/get-shipping-method',
    getPaySystemForCountryUrl: '/checkout/checkout/get-payment-system-for-country',
    getCurrenciesUrl: '/checkout/checkout/get-currencies',
    zipCodeGetUrl: 'https://pcls1.craftyclicks.co.uk/json/rapidaddress?response=data_formatted',
    zipCodeGetUrlProxy: 'https://alpha.omnismain.com:3000/api/v.2/zip/code/',
    recalcShippingUrl: '/checkout/checkout/recalculate-shipping',
    getShippingMethodCheckoutUrl: '/checkout/checkout/get-shipping-method',
    getPaymentUrl: '/checkout/checkout/get-payment-url'
  },
  dev: {
    setOrder: '/checkout/checkout/set-order',
    fetchOrderUrl: '/checkout/checkout/fetch-order',
    getCountryListUrl: '/checkout/checkout/get-country-list',
    getShippingMethodUrl: '/delivery/delivery/get-shipping-method',
    getPaySystemForCountryUrl: '/checkout/checkout/get-payment-system-for-country',
    getCurrenciesUrl: '/checkout/checkout/get-currencies',
    zipCodeGetUrl: 'https://pcls1.craftyclicks.co.uk/json/rapidaddress?response=data_formatted',
    zipCodeGetUrlProxy: 'https://alpha.omnismain.com:3000/api/v.2/zip/code/',
    recalcShippingUrl: '/checkout/checkout/recalculate-shipping',
    getShippingMethodCheckoutUrl: '/checkout/checkout/get-shipping-method',
    getPaymentUrl: '/checkout/checkout/get-payment-url'
  }
}
