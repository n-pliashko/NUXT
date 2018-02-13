import { mapState } from 'vuex'
import Vue from 'vue'
import VueRes from 'vue-resource'
import config from '@/config'
import $ from 'jquery'
// import MatchHeight from 'jquery-match-height'

Vue.use(VueRes)
// Vue.use(MatchHeight)

export default {
  name: 'delivery',
  data () {
    return {
      msg: 'This is modules catalog',
      // activeShippingId: null,
      // currencies: null,
      deliveryMethodNumber: null,
      disableFields: false
    }
  },
  props: [
    'deliveryMethods',
    'order',
    'currencies',
    'next_tick',
    'setShippingId',
    'onSubmitForm',
    'activeShippingId'
  ],
  computed: {
    ...mapState({
      apiHost: (state) => state.apiHost,
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
      exchange: (state) => state.currency.exchange
    })
  },
  methods: {
    recalculateDelivery: function () {
      const recalcDelivery = Vue.resource(this.apiHost + config.prefix + config.checkout.recalcShippingUrl)
      recalcDelivery.get({
        'order_id': this.order.order_number,
        'shipping_id': this.regdata.deliveryMethodNumber
      }).then((resp) => (this.postcode = resp.data.delivery_points), (err) => (console.log(err)))
    },
    changeShippingMethod: function (index) {
      // this.activeShippingId = index
      if (!this.disableFields) {
        // this.next_tick(3)
        this.order.shipping_cost = this.deliveryMethods[index]['price']
        this.deliveryMethodNumber = this.deliveryMethods[index]['delivery_method_number']
        this.setShippingId(this.deliveryMethodNumber)
      }
    },
    getShipping: function () {
      const shipping = Vue.resource(this.apiHost + config.prefix + config.checkout.getShippingMethodCheckoutUrl)
      shipping.get({
        'country': this.regdata.reg_country,
        'order_id': this.order.order_number,
        'weight': this.order.weight
      }).then((resp) => (this.deliveryMethods = resp.data), (err) => (console.log(err)))
    },
    onSubmit: function () {

    },
    commitMethod: function () {
      this.$store.dispatch('updateShipping', this.deliveryMethodNumber)
      this.disableFields = true
      if (this.deliveryMethodNumber) {
        this.next_tick(4)
        this.setShippingId(this.deliveryMethodNumber)
        this.onSubmitForm()
      }
    },
    enablePrevStep: function () {
      this.disableFields = false
    }
  },
  mounted: function () {
    // $('.form-check').matchHeight()
  },
  created: function () {
    window.globalEvents.$on('enableFields', () => (this.enablePrevStep()))
    window.globalEvents.$on('deleteFields', () => (this.enablePrevStep()))
    window.globalEvents.$on('enableShipping', () => (this.enablePrevStep()))
  },
  watch: {
    activeShippingId () {
      this.deliveryMethodNumber = this.activeShippingId
    }
  }
  // watch: {
  //   deliveryMethods () {
  //     this.activeShippingId = 1
  //   }
  // }
}
