import { mapState, mapGetters } from 'vuex'

export default {
  name: 'CheckoutCartMobile',
  data () {
    return {
      email: ''
    }
  },
  props: [
    'shippingCost',
    'subTotal'
  ],
  computed: {
    ...mapState({
      user: (state) => ({
        ...state.user
      }),
      basket: (state) => ({...state.basket}),
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
    }),
    ...mapGetters(['exchange'])
  },
  methods: {
    decodeHtml: function (html) {
      var txt = global.document.createElement('textarea')
      txt.innerHTML = html
      return txt.value
    }
  }
}
