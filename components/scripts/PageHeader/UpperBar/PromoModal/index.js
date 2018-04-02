import {mapState, mapGetters} from 'vuex'

export default {
  name: 'PromoModal',
  computed: {
    ...mapState({
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
    }),
    ...mapGetters(['exchange', 'exchangeBack'])
  }
}
