import { mapState } from 'vuex'
import Vue from 'vue'
import VueRes from 'vue-resource'
import config from '@/config'

Vue.use(VueRes)

export default {
  name: 'PaymentFrame',
  data () {
    return {
      msg: 'Payments Frame',
      iframeUrl: '',
      frameLoaded: false
    }
  },
  props: [
    'order_hash',
    'sandbox',
    'payment_system_number',
    'allowGetPaymentUrl'
  ],
  computed: {
    ...mapState({
      apiHost: (state) => state.apiHost
    })
  },
  watch: {
    payment_system_number: function () {
      this.getLink()
    },
    sandbox: function () {
      this.getLink()
    },
    watch: {
      allowGetPaymentUrl () {
        setTimeout(this.getLink, 1000)
      }
    }
  },
  methods: {
    getLink: function () {
      var self = this
      // const recalcDelivery = Vue.resource('https://test.fix.if.ua//checkout/checkout/get-payment-url' + (this.$route.query.sspay ? '-sspay' : ''))
      const recalcDelivery = Vue.resource(this.apiHost + config.prefix + config.checkout.getPaymentUrl + (this.$route.query.sspay ? '-sspay' : ''))
      recalcDelivery.get({
        'order_hash': this.order_hash,
        'ps': this.payment_system_number,
        'sb': this.sandbox
      }).then(function (resp) {
        if (resp.data.result) {
          self.iframeUrl = resp.data.url
          self.iframeHidden = resp.data
          self.frameLoaded = true
        } else {
          console.log(resp.data.error)
          self.frameLoaded = true
        }
      }, (err) => (console.log(err)))
    }
  },
  created: function () {
    setTimeout(this.getLink, 1000)
  }
}

