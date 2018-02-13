import PageHeader from '@/components/scripts/PageHeader/index.vue'
import Breadcrumbs from '@/components/scripts/Breadcrumbs/index.vue'
import ShareButtons from '@/components/scripts/ShareButtons/index.vue'
import PageFooter from '@/components/scripts/PageFooter/index.vue'
import ScrollToTop from '@/components/scripts/ScrollToTop/index.vue'

import { mapState } from 'vuex'

export default {
  name: 'LensPrices',
  components: {
    PageHeader,
    Breadcrumbs,
    ShareButtons,
    PageFooter,
    ScrollToTop
  },
  computed: {
    ...mapState({
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
      exchange: (state) => state.currency.exchange,
      vat: (state) => state.vat
    })
  },
  methods: {
    convertPrice: function (price) {
      return parseFloat(this.exchange(price)).toFixed(2)
    }
  }
}
