import calculatePrice from './price'

export default {
  apiHost: (state) => state.apiHost,
  currency: (state) => state.currency,
  currencies: (state) => state.currency.allCurrency,
  selectedCurrency: (state) => state.currency.selected,
  basket: (state) => state.basket,
  routerObj: (state) => state.pageMenuDescription,
  exchange: (state, getters) => (price, print = true) => {
    if (!state.currency.selected) {
      return price
    }

    const currency = {...state.currency.allCurrency[state.currency.selected]}
    const precis = (currency.precision_digit || currency.precision_digit === 0) ? currency.precision_digit : 0
    const num = Math.pow(10, precis)
    price *= currency.rate
    const result = parseFloat(currency.to_greater ? Math.ceil(price * num) / num : Math.round(price * num) / num)

    return (precis >= 0 && print) ? result.toFixed(precis) : result
  },
  exchangeBack: (state, getters) => (price) => {
    if (!state.currency.selected) {
      return price
    }

    const currency = {...state.currency.allCurrency[state.currency.selected]}

    return parseFloat(price / currency.rate)
  },
  vat: (state, getters) => (price, back = false) => {
    const {vat} = state.basket
    let country = {}
    let index
    price = parseFloat(price)
    if (!state.countries.length || !vat) {
      return {
        price,
        vat: 0
      }
    }

    if (!state.user.profile && (!state.basket.order || !state.basket.order.deliveryAddress)) {
      index = state.countries.findIndex(item => {
        if (!item) {
          return false
        }
        const {country_code_2: code2, country_code_3: code3} = item
        const {countryCode} = state.geoInfo

        return (code2 && countryCode && code2.toLowerCase() === countryCode.toLowerCase()) ||
          (code3 && countryCode && code3.toLowerCase() === countryCode.toLowerCase())
      })
      country = ((index >= 0) && this.countries[index]) || false
    } else if (state.basket.order && state.basket.order.deliveryAddress) {
      country = state.countries[state.basket.order.deliveryAddress.country_id]
    } else {
      index = state.user.profile.addresses.findIndex(address => address.address_type === 'delivery')
      country = index >= 0 && state.countries[state.user.profile.addresses[index].country_id] || null
    }

    if (!country) {
      return {
        price,
        vat: 0.0
      }
    }

    return (country && country.is_eu) ? {
      price,
      vat: (price * (vat - 1) / vat)
    } : {
      price: back ? (price * vat) : (price / vat),
      vat: 0.0
    }
  },
  calculatePrice: (state, getters) => (price, back = false, print = false) => {
    const {selected = 1, allCurrency} = state.currency
    const current = {...allCurrency[selected]}
    let result

    if (back) {
      try {
        result = getters.vat(getters.exchangeBack(price), true).price
      } catch (e) {
        result = getters.exchangeBack(price)
      }
    } else {
      try {
        result = getters.exchange(getters.vat(price).price)
      } catch (e) {
        result = getters.exchange(price)
      }
    }

    if (print) {
      let el = global.document.createElement('textarea')
      el.innerHTML = current.symbol + ' ' + result
      result = el.innerText
    }

    return result
  },

  exchangeBackFuncByCurrency: (state) => (price, currency) => {
    return currency.rate ? parseFloat(price / currency.rate) : price
  }
}
