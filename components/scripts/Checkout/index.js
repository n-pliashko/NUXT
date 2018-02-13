import { mapState } from 'vuex'
import $ from 'jquery'
import Vue from 'vue'
import VueRes from 'vue-resource'
// import Slick from 'vue-slick'
// import CheckoutRates from '@/components/scripts/Checkout/CheckoutRates/index.vue'
import PageHeader from '@/components/scripts/PageHeader/index.vue'
import Step from '@/components/scripts/Step/index.vue'
import CheckoutLogin from '@/components/scripts/Checkout/CheckoutLogin/index.vue'
import CheckoutAddressZip from '@/components/scripts/Checkout/CheckoutAddressZip/index.vue'
import CheckoutDelivery from '@/components/scripts/Checkout/CheckoutDelivery/index.vue'
import CheckoutCart from '@/components/scripts/Checkout/CheckoutCart/index.vue'
import CheckoutCartMobile from '@/components/scripts/Checkout/CheckoutCartMobile/index.vue'
import PaymentFrame from '@/components/scripts/PaymentFrame/index.vue'
import TrustpilotWidget from '@/components/scripts/TrustpilotWidget/index.vue'
import PageFooter from '@/components/scripts/PageFooter/index.vue'
import ScrollToTop from '@/components/scripts/ScrollToTop/index.vue'
import config from '@/config'

Vue.use(VueRes)

export default {
  name: 'Checkout',
  components: {
    // Slick,
    PageHeader,
    Step,
    CheckoutLogin,
    CheckoutAddressZip,
    CheckoutDelivery,
    PaymentFrame,
    TrustpilotWidget,
    PageFooter,
    ScrollToTop,
    CheckoutCart,
    CheckoutCartMobile
  },
  data () {
    return {
      errors: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        reg_country: true,
        password: null
      },
      stepArrow: {
        stepArrowUp1: true,
        stepArrow2: false,
        stepArrow3: false,
        stepArrow4: false
      },
      disabledNextButton: false,
      msg: 'M169EA',
      order: {
        reg_country: 'GB',
        reg_country_id: 223
      },
      regdata: {},
      step: 0,
      show_delivery: true,
      postcode: [],
      activePostCodeId: 'nan',
      activeShippingId: null,
      activePaymentId: null,
      countryList: [],
      deliveryMethods: [],
      currencies: null,
      paymentSystems: [],
      showDeliveryForm: 1,
      showRegistration: false,
      showOrderUrl: '',
      disableFields: false,
      allowGetPaymentUrl: false,
      selectedCountryName: null,
      showLoader: false,
      loggedInFromSsv4: false,
      canLoadFromProfile: false,
      checkEmailStatus: false,
      userLoggedIn: false,
      requestOptions: {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        emulateJSON: true
      },
      /*
            slickOptions: {
              arrows: false,
              autoplay: true,
              autoplaySpeed: 10000,
              mobileFirst: true,
              infinite: true,
              swipeToSlide: true,
              slidesToShow: 1,
              dots: true
            },
      */
      inProgress: 'in-progress',
      finished: 'finished',
      showPassword: 'Show'
    }
  },
  computed: {
    ...mapState({
      basket: (state) => ({...state.basket}),
      apiHost: (state) => state.apiHost,
      loading: (state) => state.loading,
      currencyLoading: (state) => state.currencyLoading,
      integrationHost: (state) => state.integrationHost,
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
      exchange: (state) => state.currency.exchange,
      user: (state) => ({
        ...state.user
      }),
      meta: (state) => ({
        ...state.formMeta['popupLogin']
      }),
      data (state) {
        const {formData: {popupLogin: {...data} = {}}} = state
        this.email = data.email
        this.password = data.password

        return data
      }
    })
  },
  methods: {
    searchCountryById: function (id) {
      for (let k in this.countryList) {
        if (parseInt(this.countryList[k]['number']) === parseInt(id)) {
          return this.countryList[k]
        }
      }
      return null
    },
    onSubmitForm: function () {
      if (this.regdata.password !== '' && this.regdata.password !== undefined) {
        this.order.user = {}
        this.order.user.password = this.regdata
        this.order.user.email = this.order.profile.email
      }
      this.$store.dispatch('updateRegdata', this.order)

      // Vue.http.post('https://test.fix.if.ua/checkout/checkout/set-order' + (this.$route.query.sspay ? '-sspay' : ''), this.$store.state.regData, this.requestOptions).then((resp) => (this.next_tick(4)), (err) => (console.log(err)))
      Vue.http.post(this.apiHost + config.prefix + config.checkout.setOrder + (this.$route.query.sspay ? '-sspay' : ''), this.$store.state.regData, this.requestOptions).then((resp) => (this.submitFormResponseParce(resp.data)), (err) => (console.log(err)))
    },
    submitFormResponseParce: function (resp) {
      // this.showLoader = true
      if (resp.status) {
        this.next_tick(4)
        if (this.order.user.password) {
          this.$store.dispatch('changeFormData', {
            'data': {'email': this.order.user.email, 'password': this.order.user.password.password},
            'formName': 'popupLogin'
          })
          this.$store.dispatch('onSubmitPopupLogin', this.$router)
        }
      } else {
        alert(resp.error)
      }
      // this.showLoader = false
    },
    fetchOrder: function (orderId) {
      const orderData = Vue.resource((this.$route.query.sspay ? this.integrationHost : this.apiHost) + (this.$route.query.sspay ? config.integrationPrefix : config.prefix) + config.checkout.fetchOrderUrl + (this.$route.query.sspay ? '/' : ''))
      orderData.get({
        'order_id': orderId
      }).then((resp) => (this.parceOrder(resp.data)), (err) => (console.log(err)))
    },
    addressParser: function () {
      let profileDeliveryAddress = {}
      let profileBillingAddress = {}
      for (let addr in this.order.profile[this.$route.query.sspay ? 'address' : 'addresses']) {
        if (this.order.profile[this.$route.query.sspay ? 'address' : 'addresses'][addr]['address_type'] === 'billing') {
          profileBillingAddress = this.order.profile[this.$route.query.sspay ? 'address' : 'addresses'][addr]
        } else if (this.order.profile[this.$route.query.sspay ? 'address' : 'addresses'][addr]['address_type'] === 'delivery') {
          profileDeliveryAddress = this.order.profile[this.$route.query.sspay ? 'address' : 'addresses'][addr]
        }
      }
      if (!this.order.deliveryAddress || ((this.order.deliveryAddress.line1 === null || this.order.deliveryAddress.line1 === undefined) && (this.order.deliveryAddress.zip === null || this.order.deliveryAddress.zip === undefined))) {
        this.order.deliveryAddress = profileDeliveryAddress
      }
      if (!this.order.billingAddress || ((this.order.billingAddress.line1 === null || this.order.billingAddress.line1 === undefined) && (this.order.billingAddress.zip === null || this.order.billingAddress.zip === undefined))) {
        this.order.billingAddress = profileBillingAddress
      }
    },
    sspayParser: function () {
      this.order.order_amount = this.order.order_amount / this.order.rate
      // this.order.hash = this.order.code
      this.order.sspayUrl = {
        host: this.integrationHost,
        confirmation_url: this.integrationHost + '/thankyou/ssworldpay/ok/?orderKey=' + this.order.id,
        decline_url: this.integrationHost + '/thankyou/ssworldpay/fail/?orderKey=' + this.order.id
      }
      this.order.orderItems = this.order.items
      this.addressParser()
      this.$store.dispatch('setCurrency', this.order.currency_id)
      this.loggedInFromSsv4 = true
      this.order.integrationHost = this.integrationHost
      // this.$store.dispatch('userSsv4LogIn', this.order.profile)
      window.globalEvents.$emit('setUser', this.order.profile)
      // console.log('Profile', this.$store.dispatch('userSsv4LogIn', this.order.profile))
      if (!this.order.deliveryAddress.country_id) {
        this.order.reg_country = 'GB'
        this.order.reg_country_id = 223
        this.order.deliveryAddress = {
          'address_type': null,
          'country_id': 223,
          'line1': null,
          'line2': '',
          'number': null,
          'profile_id': null,
          'state': null,
          'town': null,
          'zip': null
        }
        this.selectedCountryName = this.searchCountryByCode2(this.order.reg_country)
        this.selectCountry()
      } else {
        this.order.reg_country_id = this.order.deliveryAddress.country_id
        this.order.reg_country = this.searchCountryById(this.order.deliveryAddress.country_id)['country_code_2']
        if (this.order.profile.phone === '') {
          this.order.profile.phone = '+0000000000'
        }
        this.selectCountry()
        setTimeout(() => {
          window.globalEvents.$emit('commitParams')
          $('#section-2-collapse').slideDown()
          $('#section-1-collapse').slideDown()
          // this.next_tick(2)
        }, 500)
        // window.globalEvents.$emit('commitParams')
        // this.next_tick(2)
      }

      // userSsv4LogIn
    },
    parceOrder: function (order) {
      this.showLoader = false
      this.order = order
      if (this.$route.query.sspay) {
        this.sspayParser()
      }
      this.showOrderUrl = '/account/view_order/' + order.order_number
      this.order.profile.subscribed = true
      this.order.some_billship_addr = this.show_delivery
      if (this.canLoadFromProfile && !this.order.profile.profile_number && this.user.profile.profile_number) {
        this.order.profile = this.user.profile
        this.order.profile_number = this.user.profile.profile_number
        this.addressParser()
      }
      if (this.order.deliveryAddress.country_id !== undefined && this.order.deliveryAddress.country_id != null && !this.loggedInFromSsv4) {
        this.order.reg_country = this.countryList[this.order.deliveryAddress.country_id]['country_code_2']
        this.order.reg_country_id = this.order.deliveryAddress.country_id
        this.selectCountry()
        if ((this.order.deliveryAddress.country_id === undefined || this.order.deliveryAddress.country_id === null) && this.order.reg_country === 'GB') {
          this.showDeliveryForm = 2
        }
      }
    },
    fetchCountry: function (orderId) {
      const countryData = Vue.resource((this.$route.query.sspay ? this.integrationHost : this.apiHost) + (this.$route.query.sspay ? config.integrationPrefix : config.prefix) + config.checkout.getCountryListUrl + (this.$route.query.sspay ? '/' : ''))
      countryData.get({})
        .then((resp) => (this.countryList = resp.data), (err) => (console.log(err)))
        .then(() => this.fetchOrder(this.$route.params.order_id))
    },
    searchCountryByCode2: function (code) {
      for (let k in this.countryList) {
        // console.log('cc', this.countryList[k]['country_name'])
        if (this.countryList[k]['country_code_2'] === code) {
          this.selectedCountryName = this.countryList[k]['country_name']
          return this.countryList[k]
        }
      }
    },
    validatePhoneOnKeyDown (e) {
      return true
      var phoneRegex = /[0-9+ ()]/
      if (!phoneRegex.test(e.key)) {
        e.preventDefault()
      }
      return false
    },
    getShipping: function () {
      const shipping = Vue.resource((this.$route.query.sspay ? this.integrationHost : this.apiHost) + (this.$route.query.sspay ? config.integrationPrefix : config.prefix) + config.checkout.getShippingMethodUrl + (this.$route.query.sspay ? '/' : ''))
      shipping.get({
        'country': this.order.reg_country,
        'order_id': this.order.order_number,
        'weight': this.order.weight
      }).then((resp) => (this.parseDelivery(resp.data)), (err) => (console.log(err)))
    },
    parseDelivery: function (resp) {
      this.deliveryMethods = resp
    },
    selectDefaultDelivery: function () {
      var price = null
      if (Object.keys(this.deliveryMethods).length === 0) {
        this.activeShippingId = null
        return
      }
      for (var method in this.deliveryMethods) {
        if (!this.deliveryMethods[method] || !this.deliveryMethods[method]['price']) {
          continue
        }
        if (price === null) {
          price = this.deliveryMethods[method]['price']
          this.activeShippingId = method
        } else if (price > this.deliveryMethods[method]['price']) {
          price = this.deliveryMethods[method]['price']
          this.activeShippingId = method
        }
      }
      this.order.shipping_cost = price
    },
    getPaymentSystems: function () {
      const paymSystems = Vue.resource(this.apiHost + config.prefix + config.checkout.getPaySystemForCountryUrl)
      paymSystems.get({
        'country_code': this.order.reg_country
      }).then((resp) => (this.paymentSystems = resp.data), (err) => (console.log(err)))
    },
    getCurrencies: function () {
      const currencies = Vue.resource((this.$route.query.sspay ? this.integrationHost : this.apiHost) + (this.$route.query.sspay ? config.integrationPrefix : config.prefix) + config.checkout.getCurrenciesUrl + (this.$route.query.sspay ? '/' : ''))
      currencies.get({}).then((resp) => (this.currencies = resp.data), (err) => (console.log(err)))
    },
    selectCountry: function (name) {
      this.order.reg_country = this.searchCountryById(this.order.reg_country_id)['country_code_2']
      this.getShipping()
      // this.getPaymentSystems()
      this.showDeliveryForm = 1
      if (this.order.reg_country !== null) {
        this.searchCountryByCode2(this.order.reg_country)
      }

      if ((this.order.deliveryAddress.town === undefined || this.order.deliveryAddress.town === null) && this.order.reg_country === 'GB') {
        this.showDeliveryForm = 2
      }
    },
    changePaymentMethod: function (index) {
      this.order.paymentMethodId = this.paymentSystems[index]['payment_system_number']
      this.activePaymentId = index
    },
    setShippingId: function (id) {
      this.activeShippingId = id
      this.order.delivery_method_id = id
    },
    changeVisibl: function (someBillshipAddr) {
      this.show_delivery = someBillshipAddr
    },
    changePasswordVisibility () {
      let pass = $('#checkoutPassword')
      if (this.showPassword === 'Hide') {
        pass.attr('type', 'password')
        this.showPassword = 'Show'
      } else {
        pass.attr('type', 'text')
        this.showPassword = 'Hide'
      }
    },
    toggleCurrentCollapse: function (section) {
      if ($(window).width() <= '640') {
        console.log('this will toggle the chevron in the header of / and the active tab')
        $('#section-' + section + '-collapse').slideToggle()
        $('#section-' + section + '-expand').find('i').toggleClass('fa-chevron-up fa-chevron-down')
      }
    },
    toggleNextCollapse: function (section) {
      if ($(window).width() <= '640') {
        for (var arrow in this.stepArrow) {
          this.stepArrow[arrow] = false
        }
        console.log('this will toggle the ' + section + ' and the next tab')
        this.stepArrow['stepArrowUp' + (section + 1)] = true
        $('#section-' + (section) + '-collapse').slideUp()
        $('#section-' + (section + 1) + '-collapse').slideDown()
        if (section === 4 && this.stepArrow['stepArrowUp4'] !== true) {
          $('#section-3-collapse').slideUp()
          $('#section-4-collapse').slideDown()
          this.stepArrow['stepArrowUp4'] = true
        }
      } else {
        console.log('#section-' + (section + 1) + '-collapse')
        $('#section-' + (section + 1) + '-collapse').slideDown()
        if (section === 4) {
          $('#section-4-collapse').slideDown()
        }

        for (var sect = section + 2; sect < 5; sect++) {
          $('#section-' + (sect) + '-collapse').slideUp()
        }
      }
    },
    next_tick: function (step, stepBack) {
      stepBack = stepBack || false
      if (stepBack && !confirm('All previous steps will be deleted')) { /* User confirmation for delete data in next steps. */
        return false
      }
      if (step === this.step) { /* Break if next step is current step. Twin update. */
        return false
      }
      if (!this.validate()) {
        return false
      }
      if (step === 1) {
        window.globalEvents.$emit('enableFields')
      }
      if (step === 0) {
        window.globalEvents.$emit('deleteFields')
        // if (this.order.billingAddress && this.order.billingAddress.line1 !== null && this.order.billingAddress.zip !== null) {
        //   this.show_delivery = false
        // } else {
        //   this.show_delivery = true
        // }
        this.show_delivery = true
      }
      if (step === 2) {
        window.globalEvents.$emit('enableShipping')
      }

      if (step === 1 && !this.user.user_number && !this.$route.query.sspay) {
        var self = this
        this.checkEmail().then((resp) => {
          if (resp.email_exist) {
            this.errors.email = 'Email already registered'
            return false
          } else {
            this.errors.email = ''
            self.disableFields = step
            self.step = step
            self.toggleNextCollapse(step)
          }
        })
      } else {
        this.disableFields = step
        this.step = step
        this.toggleNextCollapse(step)
      }

      if (step === 4) {
        this.allowGetPaymentUrl = true
      }
    },
    validRegex: function (object, field, validatorRegex, errorMessage) {
      if (!object[field] || object[field] === '' || !validatorRegex.test(object[field])) {
        this.errors[field] = errorMessage
      } else {
        this.errors[field] = null
      }
    },
    validEmpty: function (object, field, errorMessage) {
      if (!object[field] || object[field] === '') {
        this.errors[field] = errorMessage
      } else {
        this.errors[field] = null
      }
    },
    validatePassword: function () {
      if (this.showRegistration && (this.regdata.password === '' || this.regdata.password === undefined)) {
        this.errors.password = 'Password empty'
      } else if (this.showRegistration && this.regdata.password !== '' && this.regdata.password === undefined && this.regdata.password === this.regdata.password_rtp) {
        this.order.user = {}
        this.order.user.password = this.regdata
        this.order.user.email = this.order.profile.email
        this.errors.password = null
      } else {
        this.errors.password = null
      }
    },
    checkEmail: function () {
      var self = this
      const existEmail = Vue.resource(this.apiHost + config.prefix + '/checkout/checkout/check-email')
      return existEmail.get({
        'email': this.order.profile.email
      }).then((resp) => (self.checkEmailStatus = resp.data), (err) => (console.log(err)))
    },
    updateBasket: function () {
      var self = this
      const existEmail = Vue.resource(this.apiHost + config.prefix + '/checkout/checkout/update-cart')
      return existEmail.get({
        'order_id': this.order.order_number
      })
    },
    validate: function () {
      var mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      var phoneRegex = /^((?:\+?\d{1,4}\s?)?\(?\d{1,4}\)?\s?\d+\s?\d+)$/
      var credRegex = /^[a-zA-Zа-яА-Я0-9,.'-]{2,}.*$/i
      this.validRegex(this.order.profile, 'email', mailRegex, 'Please enter correct mail address')
      this.validRegex(this.order.profile, 'first_name', credRegex, 'Please enter correct First Name')
      this.validRegex(this.order.profile, 'last_name', credRegex, 'Please enter correct Last Name')

      // this.validEmpty(this.order.profile, 'first_name', 'Please enter First Name')
      // this.validEmpty(this.order.profile, 'last_name', 'Please enter Last Name')
      this.validRegex(this.order.profile, 'phone', phoneRegex, 'Please enter correct phone number')
      this.validEmpty(this.order, 'reg_country', 'Please choose your country')
      this.validatePassword()

      for (var key in this.errors) {
        if (this.errors[key] !== null && !(this.errors[key] instanceof Array)) {
          return false
        }
      }
      return true
    },
    validateButton: function () {
      for (var key in this.errors) {
        if (this.errors[key] !== null && !(this.errors[key] instanceof Array)) {
          console.log(this.errors[key])
          // return this.disabledNextButton = true
        }
      }
      this.disabledNextButton = false
    },
    changeVisiblDelivery: function (status) {
      this.show_delivery = status
      this.order.some_billship_addr = status
    },
    loginAction: function () {
      if (this.user.user_number && this.canLoadFromProfile && !this.$route.query.sspay) {
        // $('.modal-backdrop').css('display', 'none')
        this.showLoader = true
        // this.fetchOrder(this.$route.params.order_id)
        // console.log('Basket length', this.basket.order.items.length)
        // console.log('Basket items', this.basket.order.items)
        // console.log('Password', this.showRegistration)
        // console.log('Password', this.showRegistration === false)
        // console.log('Password', this.showRegistration === true)
        if (this.regdata.password !== '' && this.regdata.password !== undefined && this.showRegistration !== false) {
          this.updateBasket()
        }
        if (this.basket.order.items.length > 0) {
          this.fetchOrder(this.basket.order.hash)
        } else {
          this.fetchOrder(this.$route.params.order_id)
        }
        // if ((this.regdata.password === '' || this.regdata.password === undefined) && !this.showRegistration && this.basket.order.items.length > 0 && this.userLoggedIn && confirm('You already have items in your basket, do you want add new items to basket?')) {
        //   this.$router.push({name: 'Basket'})
        // }
        this.regdata.password = ''
        this.showLoader = false
        this.userLoggedIn = false
      }
    }
  },
  created: function () {
    this.showLoader = true
    this.fetchCountry()
    this.getCurrencies()
    // this.fetchOrder(this.$route.params.order_id)
  },
  watch: {
    deliveryMethods () {
      this.selectDefaultDelivery()
    },
    countryList () {
    },
    errors: {
      handler: function (changed) {
        this.validateButton()
      },
      deep: true
    },
    user: {
      handler: function (changed) {
        this.canLoadFromProfile = true
        this.loginAction()
      },
      deep: true
    },
    meta () {
      if (this.meta.formSuccess !== undefined) {
        // $('#checkoutLoginModal').modal('hide')
        $('.modal-backdrop').remove()
        $('body').removeClass('modal-open').css('paddingRight', '0')
        this.userLoggedIn = true
        this.loginAction()
      }
    }
  }
}
