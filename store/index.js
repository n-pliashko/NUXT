import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import config from '../config'
import vat from './vat'

import currency from './currency'
import calculatePrice from './price'

 Vue.use(Vuex)

const state = {
  ...global.initialState,
  windowLocation: {},
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
  currency,
  countries: [],
  pageMenuDescription: {},
  allCategories: [],
  allDesigners: []
}

state.vat = vat.bind(state)
state.calculatePrice = calculatePrice.bind(state)

const createStore = () => {
 return new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
}

export default createStore
