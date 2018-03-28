import * as types from './types'
import $ from 'jquery'
import Vue from 'vue'
import axios from 'axios'
import VueResource from 'vue-resource'
import config from '~/config'
import store from './index'

Vue.use(VueResource)

Vue.http.options.xhr = {withCredentials: true}

var http = axios.create({
  baseURL: config.apiHost + config.prefix
})

var localStorage = require('localStorage')

export default {
  onChangeForm: ({commit}, el) => {
    const formName = el.target.form.name || 'default'
    let value = !el.target.checked ? el.target.type === 'checkbox' ? false : el.target.value : parseInt(el.target.value)

    commit(types.CHANGE_FORM_DATA, {
      key: el.target.name,
      value,
      formName
    })
  },

  onSubmitPopupLogin: ({commit, state, dispatch}, router) => {
    const {formData: {popupLogin = {}}} = state
    const {email, password} = popupLogin

    commit(types.REQUEST_START)
    http.post(config.users.login, {
      LoginForm: {
        username: email,
        password,
        rememberMe: true
      },
      csrf: state.csrf
    }, {
      withCredentials: true
    })
      .then(result => {
        dispatch('getBasket')
        commit(types.FORM_SUCCESS, {msg: 'Logged successfully', formName: 'popupLogin'})
        commit(types.USER_SIGNED_POPUP, {data: result.data, router})
      })
      .catch(res => commit(types.FORM_ERROR, {msg: res.response.data.error, formName: 'popupLogin'}))
      .then(() => commit(types.REQUEST_END), () => commit(types.REQUEST_END))
  },

  onSubmitLogin: ({commit, state, dispatch}, router) => {
    const {formData: {login = {}}} = state
    const {email, password, account} = login

    if (!account) {
      commit(types.FORM_ERROR, {msg: null, formName: 'login'})
      router.push('register')
      return
    }

    commit(types.REQUEST_START)
    http.post(config.users.login, {
      LoginForm: {
        username: email,
        password,
        rememberMe: true
      },
      csrf: state.csrf
    }, {
      withCredentials: true
    })
      .then(result => {
        dispatch('getBasket')
        commit(types.FORM_SUCCESS, {msg: 'Logged successfully', formName: 'login'})
        commit(types.USER_SIGNED, {data: result.data, router})
      })
      .catch(res => commit(types.FORM_ERROR, {msg: res.response.data.error, formName: 'login'}))
      .then(() => commit(types.REQUEST_END), () => commit(types.REQUEST_END))
  },

  checkLogin: ({commit, state}, email) => {
    commit(types.REQUEST_START)
    return http.get(config.users.get, {
      params: {
        email
      }
    })
      .then(res => {
        const {items: data} = res.data
        const {formData: {login: {account}}} = state
        commit(types.CHANGE_FORM_DATA, {key: 'familiarEmail', value: !!data.length, formName: 'login'})
        commit(types.CHANGE_FORM_DATA, {key: 'account', value: account || (data.length ? 1 : 0), formName: 'login'})
        commit(types.REQUEST_END)
        return data
      })
      .catch(res => {
        commit(types.CHANGE_FORM_DATA, {key: 'familiarEmail', value: false, formName: 'login'})
        commit(types.REQUEST_END)
        return res
      })
  },

  onSubmitProfile: ({commit, state}, data) => {
    const {user, apiHost} = state
    commit(types.REQUEST_START)

    Vue.http.headers.common['Authorization'] = 'Basic ' + btoa(user.hashedPassword + ':')

    Vue.http.put(apiHost + config.prefix + config.users.get + '/' + user.user_number, data)
      .then((data) => {
        commit(types.USER_SIGNED, {data: data.body})
        if (data.newPassword) {
          commit(types.FORM_SUCCESS, {
            msg: 'Profile saved. We send confirmation link to your registered email',
            formName: 'profile'
          })
        } else {
          commit(types.FORM_SUCCESS, {msg: 'Profile saved.', formName: 'profile'})
        }
      }, res => commit(types.FORM_ERROR, {msg: res.body, formName: 'profile'}))
      .then(() => commit(types.REQUEST_END))
  },

  onSubmitAddress: ({commit, state}, {e, address = {}}) => {
    e.preventDefault()
    const {user: {hashedPassword, profile}, apiHost} = state
    const {address_type: formName} = address
    let promise

    commit(types.REQUEST_START)

    Vue.http.headers.common['Authorization'] = 'Basic ' + btoa(hashedPassword + ':')
    if (address.id) {
      promise = Vue.http.put(apiHost + config.prefix + config.profiles.addresses + '/' + address.id, address)
    } else {
      address.profile_id = profile.profile_number
      promise = Vue.http.post(apiHost + config.prefix + config.profiles.addresses, address)
    }

    return promise.then(
      (data) => {
        const {body: address} = data
        let addresses = [
          ...profile.addresses
        ]
        const index = addresses.findIndex((item) => item.address_type === address.address_type)
        if (index >= 0) {
          addresses[index] = address
        } else {
          addresses.push(address)
        }

        const user = {
          ...state.user,
          profile: {
            ...profile,
            addresses
          }
        }

        commit(types.USER_SIGNED, {data: user})
        commit(types.FORM_SUCCESS, {msg: 'address saved', formName})
        commit(types.REQUEST_END)

        let {...errors} = state.formMeta.login && state.formMeta.login.formError || []
        const filter = Array.prototype.filter.bind(errors)
        errors = filter(item => (item.field !== (address.address_type + 'Address')))
        commit(types.FORM_ERROR, {msg: errors, formName: 'login'})
        return address
      },
      (result) => {
        const data = {}
        result.body.map(item => (data[item.field] = item.message))
        const error = [
          ...(state.formMeta.login && state.formMeta.login.formError || []),
          {
            field: address.address_type + 'Address',
            message: data
          }
        ]
        commit(types.REQUEST_END)
        commit(types.FORM_ERROR, {msg: error, formName: 'login'})
      })
  },

  updateAddress: ({commit, state}, address) => {
    commit(types.INPUT_ADDRESS, address)
  },

  userSsv4LogIn: ({commit, state}, userData) => {
    commit(types.SSV4_USER_DATA, userData)
  },

  updateRegdata: ({commit, state}, address) => {
    commit(types.NEW_USER_DATA, address)
  },
  updateShipping: ({commit, state}, shipId) => {
    commit(types.SHIPPING_ID, shipId)
  },

// BASKET
  removeItemFromBasket: ({commit, dispatch}, itemID) => {
    commit(types.REQUEST_START)

    return dispatch('checkSession').then(() =>
      http.post(config.basket.itemDelete, {'ordered_item_number': itemID}, {
        withCredentials: true
      })
        .then(result => {
          commit(types.BASKET_LOADED, result.data)
        })
        .then(() => commit(types.REQUEST_END), () => commit(types.REQUEST_END)))
  },
  clearBasket: ({commit, dispatch}) => {
    commit(types.REQUEST_START)

    return dispatch('checkSession').then(() =>
      http.post(config.basket.clear, {}, {
        withCredentials: true
      })
        .then(() => {
          commit(types.CLEAR_BASKET)
        })
        .then(() => commit(types.REQUEST_END), () => commit(types.REQUEST_END)))
  },
  addToSave: ({commit, state}, itemID) => {
    commit(types.REQUEST_START)

    Vue.http.post(state.apiHost + config.prefix + config.basket.addToSave, {'ordered_item_number': itemID})
      .then(data => {
        commit(types.SET_SAVE_FOR_LATER, data.body)
      })
      .then(() => commit(types.REQUEST_END), () => commit(types.REQUEST_END))
  },
  delFromSave: ({commit, state}, itemID) => {
    commit(types.REQUEST_START)

    Vue.http.post(state.apiHost + config.prefix + config.basket.delFromSave, {'ordered_item_number': itemID})
      .then(data => {
        commit(types.DEL_SAVE_FOR_LATER, data.body)
      })
      .then(() => commit(types.REQUEST_END), () => commit(types.REQUEST_END))
  },
  setQtyItem: ({commit, dispatch}, item) => {
    commit(types.REQUEST_START)

    return dispatch('checkSession').then(() =>
      http.post(config.basket.changeQuantity, item, {
        withCredentials: true
      })
        .then(result => {
          commit(types.BASKET_LOADED, result.data)
          commit(types.REQUEST_END)
        })
        .catch(() => commit(types.REQUEST_END)))
  },
  putAdditionalPrice: ({commit, state}, addPrice) => {
    commit(types.ADD_ADDITIONAL_PRICE, addPrice)
  },
  // end BASKET

  // CURRENCIES
  loadAllCurrencies: ({commit, state}) => {
    const {integrationHost, apiHost, currency} = state

    commit(types.REQUEST_START)
    commit(types.REQUEST_CURRENCY_START)
    var url = new URL(window.location.href)
    var sspay = url.searchParams.get('sspay')
    Vue.http.get((sspay === 'true' ? integrationHost : apiHost) + (sspay === 'true' ? config.integrationPrefix : config.prefix) + config.currencies.allCurrencies + (sspay === 'true' ? '/' : ''))
      .then(data => commit(types.LOAD_CURRENCIES, {
        currencies: data.body,
        selected: currency.selected
      }), (err) => console.log('err::', err))
      .then(() => {
        commit(types.REQUEST_END)
        commit(types.REQUEST_CURRENCY_FINISHED)
      }, () => {
        commit(types.REQUEST_END)
        commit(types.REQUEST_CURRENCY_FINISHED)
      })
  },
  setCurrency: ({state, commit, dispatch}, id) => {
    commit(types.REQUEST_START)
    commit(types.REQUEST_CURRENCY_START)
    return dispatch('checkSession').then(() =>
      http.post(config.basket.setCurrency, {id}, {
        withCredentials: true
      })
        .then(res => {
          commit(types.BASKET_LOADED, res.data)
          commit(types.CHANGE_CURRENCY, id)
          commit(types.REQUEST_END)
          commit(types.REQUEST_CURRENCY_FINISHED)
        })
        .catch(() => {
          commit(types.REQUEST_END)
          commit(types.REQUEST_CURRENCY_FINISHED)
        }))
  },
// end CURRRENCIES

  checkUser: ({commit}) => {
    commit(types.REQUEST_START)

    return http.get(config.users.login, {
      'params': {
        'checkStatus': true
      },
      withCredentials: true
    })
      .then(result => {
        commit(types.USER_SIGNED, {data: result.data})
        commit(types.REQUEST_END)
      })
      .catch((res) => {
        commit(types.REQUEST_END)
        return res
      })
  },

  checkSession: ({dispatch, commit, state}) => {
    function getUserPromise () {
      return http.get(config.users.login, {
        'params': {
          'checkStatus': true
        },
        withCredentials: true
      })
    }

    function getBasketPromise () {
      const {currency} = state
      let currencyId = localStorage.getItem('currency') ? localStorage.getItem('currency') : currency.selected

      return http.get(config.orders.myBasket, {
        params: {
          currency_id: currencyId
        },
        withCredentials: true
      })
        .then(result => {
          const {basket = {}} = state
          if (basket.number !== result.data.number) {
            commit(types.BASKET_LOADED, result.data)
            commit(types.CHANGE_CURRENCY, result.data.order.currency_id)
          }
        })
    }

    return getUserPromise()
      .catch(() => {
        const {user = {}} = state
        if (user.user_number) {
          return dispatch('onLogout')
        }
      })
      .then(() => getBasketPromise(), () => getBasketPromise())
  },

  getBasket: ({commit, state}, silence = false) => {
    commit(types.REQUEST_BASKET_START)
    commit(types.REQUEST_START)

    const {currency} = state
    let currencyId = localStorage.getItem('currency') ? localStorage.getItem('currency') : currency.selected

    return http.get(config.orders.myBasket, {
      params: {
        currency_id: currencyId
      },
      withCredentials: true
    })
      .then(result => {
        commit(types.BASKET_LOADED, result.data)
        commit(types.CHANGE_CURRENCY, result.data.order.currency_id)
        commit(types.REQUEST_BASKET_FINISHED)
        commit(types.REQUEST_END)
      })
      .catch(() => {
        commit(types.REQUEST_BASKET_FINISHED)
        commit(types.REQUEST_END)
      })
  },

  addItemToBasket: ({commit, dispatch}, item) => {
    commit(types.REQUEST_START)

    return dispatch('checkSession').then(() =>
      http.post(config.basket.add, item, {
        withCredentials: true
      })
        .then(result => {
          commit(types.BASKET_LOADED, result.data)
          commit(types.REQUEST_END)
        })
        .catch(() => commit(types.REQUEST_END)))
  },

  createNewUser: ({commit, dispatch}, {data, router}) => {
    commit(types.REQUEST_START)

    return http.post(config.users.get, data, {
      withCredentials: true
    })
      .then(result => {
        commit(types.CHANGE_FORM_DATA_MULTI, {
          data: {
            email: result.data.email,
            account: 1,
            password: result.data.password
          },
          formName: 'login'
        })

        commit(types.REQUEST_END)
        return dispatch('onSubmitLogin', router)
      })
      .catch(err => {
        commit(types.FORM_ERROR, {msg: err.response.data, formName: 'login'})
        commit(types.REQUEST_END)
      })
  },

  onSubmitPromoCode: ({commit, dispatch, state}, promoCode) => {
    const formName = 'basket'
    commit(types.REQUEST_START)

    return dispatch('checkSession').then(() =>
      http.post(config.orders.promoCode, {
        promoCode
      }, {
        withCredentials: true
      })
        .then(result => {
          commit(types.BASKET_LOADED, result.data)
          commit(types.FORM_SUCCESS, {msg: 'Promo Code Applied', formName})
        }, (err) => commit(types.FORM_ERROR, {msg: err.data.message, formName}))
        .then(() => commit(types.REQUEST_END), () => commit(types.REQUEST_END)))
  },

  onLogout: ({commit, state, dispatch}, $router) => {
    commit(types.REQUEST_START)

    return http.post(config.users.logout, {
      '_csrf': state.csrf
    }, {
      withCredentials: true
    })
      .then(() => {
        commit(types.USER_SIGNOUT, $router)
        commit(types.REQUEST_END)
        return dispatch('getBasket')
      })
      .catch(() => {
        commit(types.USER_SIGNOUT, $router)
        commit(types.REQUEST_END)
        return dispatch('getBasket')
      })
  },

  loadMenus: ({commit}) => {
    http.get(config.menu.getMenus, {}, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      emulateJSON: true
    })
      .then(response => response.data)
      .then((data) => {
        commit(types.LOAD_MENUS, data.items)
      })
  },
  loadMobileMenu: ({commit}) => {
    http.get(config.menu.getMenus, {params: {desktop: 0}}, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      emulateJSON: true
    })
      .then(response => response.data)
      .then((data) => {
        commit(types.LOAD_MOBILE_MENU, data.items)
      })
  },
  setRedirects: ({commit}, redirects) => {
    commit(types.SET_REDIRECTS, redirects)
  },
  getMenuDescription: ({commit}, [menuData, router]) => {
    http.post(config.routes.search, menuData, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      emulateJSON: true
    }).then(response => response.data)
      .then(json => {
        let breadcrumbs = [{title: 'HOME', path: '/'}]

        if (json.page && json.page.translations && json.page.translations['en'] && json.page.translations['en'].breadcrumb && json.page.translations['en'].breadcrumb.length > 0) {
          breadcrumbs = breadcrumbs.concat([{
            title: json.page.translations['en'].breadcrumb,
            path: '#'
          }])
        } else {
          if (json.category && json.category.category_name) {
            breadcrumbs = breadcrumbs.concat({
              title: json.category.category_name,
              path: '#'
            })
          }
          breadcrumbs.concat([{
            title: (router.props && router.props.default && router.props.default.breadcrumb ? router.props.default.breadcrumb : router.name),
            path: router.path
          }])
        }

        if (router.props && router.props.default && router.props.default.breadcrumb) {
          if (breadcrumbs.length > 1) {
            breadcrumbs = breadcrumbs.slice(0, breadcrumbs.length - 1)
          }
          breadcrumbs.push({title: router.props.default.breadcrumb, path: router.path})
        }
        commit(types.SET_BREADCRUMBS, breadcrumbs)
        commit(types.SET_PAGE_DESCRIPTION, json)
      })
  },

  addBreadcrumb: ({commit}, breadcrumb) => {
    commit(types.ADD_BREADCRUMB, breadcrumb)
  },

  setBreadcrumbs: ({commit}, breadcrumb) => {
    commit(types.SET_BREADCRUMBS, breadcrumb)
  },

  changeFormData: ({commit}, {data, formName}) => {
    commit(types.CHANGE_FORM_DATA_MULTI, {data, formName})
  },

  changeFormError: ({commit}, {data, formName}) => {
    commit(types.CHANGE_FORM_ERROR, {data, formName})
  },
  setRouterBack: ({commit}, {path, params}) => {
    commit(types.SET_ROUTER_BACK, {path, params})
  },

  loadDesigners: ({commit}, lang) => {
    http.get(config.designers.allDesigners, {params: {lang: lang}}, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      emulateJSON: true
    }).then(response => response.data)
      .then(json => {
        commit(types.LOAD_DESIGNERS, json)
      })
  },

  loadCategories: ({commit}, lang) => {
    http.get(config.categories.allCategories, {params: {lang: lang}}, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      emulateJSON: true
    }).then(response => response.data)
      .then(json => {
        commit(types.LOAD_CATEGORIES, json)
      })
  },

  loadRedirects: ({commit}) => {
    http.get(config.routes.getRedirects, {}, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      emulateJSON: true
    }).then(response => response.data)
      .then((data) => {
        let redirects = []
        Object.values(data).map(obj => {
          let redirect = '/' + obj.path.replace(/(\/){2,}/, '/').replace(/(^\/)|(\/$)/, '')
          let path = '/' + obj.redirect.replace(/(\/){2,}/, '/').replace(/(^\/)|(\/$)/, '')
          if (redirect && path !== redirect) {
            let route = [{
              path: path,
              redirect: redirect
            }]
            redirects = redirects.concat(route)
          }
        })
        commit(types.SET_REDIRECTS, redirects)
      })
  },

  // Sidebar
  openSidebar: () => {
    $('#pageWrapper').addClass('sidebar-open')
  },
  closeSidebar: () => {
    $('#pageWrapper').removeClass('sidebar-open')
  }
}
