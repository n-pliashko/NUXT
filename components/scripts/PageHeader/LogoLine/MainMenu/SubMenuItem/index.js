import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

import { mapState, mapGetters } from 'vuex'

let Handlebars = require('handlebars/dist/handlebars.min.js')

export default {
  name: 'SubMenuItem',
  props: ['menu', 'onClick', 'onHover', 'target_id'],
  computed: {
    ...mapState({
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
    }),
    ...mapGetters(['exchange'])
  },
  methods: {
    convertMenuContext (context) {
      let self = this
      Handlebars.registerHelper('exchange_price', function (value, rate = false) {
        let price = 0

        if (value) {
          price = self.exchange(value)
        }
        if (rate) {
          price = parseFloat(price).toFixed(parseInt(rate))
        }
        return price
      })
      let templateFn = Handlebars.compile(context)
      let output = templateFn(this)
      return output
    }
  },
  watch: {
    currency: {
      handler: function () {
        this.$forceUpdate()
      },
      deep: true
    }
  }
}
