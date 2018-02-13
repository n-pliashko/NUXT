import { mapState } from 'vuex'
import Vue from 'vue'
import VueRes from 'vue-resource'
import Slick from 'vue-slick'
import PageHeader from '@/components/scripts/PageHeader/index.vue'
import Step from '@/components/scripts/Step/index.vue'
import TrustpilotWidget from '@/components/scripts/TrustpilotWidget/index.vue'
import PageFooter from '@/components/scripts/PageFooter/index.vue'
import ScrollToTop from '@/components/scripts/ScrollToTop/index.vue'
import config from '@/config'

Vue.use(VueRes)

export default {
  name: 'thank',
  data () {
    return {
      msg: 'This is modules catalog',
      order: {}
    }
  },
  computed: {
    ...mapState({
      apiHost: (state) => state.apiHost,
      regData: (state) => state.regData,
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
      exchange: (state) => state.currency.exchange
    })
  },
  components: {
    Slick,
    PageHeader,
    Step,
    TrustpilotWidget,
    PageFooter,
    ScrollToTop
  },
  methods: {
    fetchOrder: function (orderId) {
      console.log('OrderId: ',orderId)
      const orderData = Vue.resource(this.apiHost + config.prefix + config.checkout.fetchOrderUrl)
      orderData.get({
        'order_id': orderId
      }).then((resp) => (this.order = resp.data), (err) => (console.log(err)))
    },
    fetchCountry: function (orderId) {
      const countryData = Vue.resource((this.$route.query.sspay ? this.integrationHost : this.apiHost) + config.prefix + config.checkout.getCountryListUrl + (this.$route.query.sspay ? '/' : ''))
      countryData.get({}).then((resp) => (this.countryList = resp.data), (err) => (console.log(err)))
    }
  },
  mounted: function () {
    this.$store.dispatch('clearBasket')
  },
  created: function () {
    this.fetchCountry()
    this.fetchOrder(this.$route.params.order_id)
  }
}
