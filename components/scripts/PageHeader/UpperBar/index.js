import PromoModal from '~/components/scripts/PageHeader/UpperBar/PromoModal/index.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'UpperBar',
  components: {PromoModal},
  computed: {
    ...mapGetters([
      'apiHost',
      'selectedCurrency',
      'currencies'
    ])
  },
  methods: {
    setCurrency (e) {
      this.$store.dispatch('setCurrency', e.target.value)
    }
  }
}
