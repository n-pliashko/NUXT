import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import config from '../config'

Vue.use(Vuex)

const state = {
  apiHost: config.apiHost,
  integrationHost: config.integrationHost,
  formData: {},
  formMeta: {},
  breadcrumbs: [],
  menus: [],
  mobileMenu: [],
  redirects: [],
  backRoute: {
    path: undefined,
    params: {}
  },
  loading: undefined,
  basketLoading: undefined,
  currencyLoading: undefined,
  user: {},
  address: {},
  regData: {},
  basket: {},
  currency: {
    allCurrency: {},
    selected: undefined,
    exchangeFunc: function (price) {
      if (!this.selected) {
        return price
      }

      const currency = {...this.allCurrency[this.selected]}
      const num = Math.pow(10, currency.precision_digit || 2)
      price *= currency.rate

      return parseFloat(currency.to_greater ? Math.ceil(price * num) / num : Math.round(price * num) / num)
    },
    exchangeBackFunc: function (price) {
      if (!this.selected) {
        return price
      }

      const currency = {...this.allCurrency[this.selected]}

      return parseFloat(price / currency.rate)
    },
    exchangeBackFuncByCurrency: function (price, currency) {
      return parseFloat(price / currency.rate)
    },
    exchange: price => price,
    exchangeBack: price => price
  },
  pageMenuDescription: {},
  allCategories: [],
  allDesigners: []
}

const store = () => {
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
}

export default store
