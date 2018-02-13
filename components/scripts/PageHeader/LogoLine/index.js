import SearchModal from '~/components/scripts/PageHeader/LogoLine/SearchModal/index.vue'
import BasketModal from '~/components/scripts/PageHeader/LogoLine/BasketModal/index.vue'
import SideBar from '~/components/scripts/PageHeader/LogoLine/SideBar/index.vue'
import MainMenu from '~/components/scripts/PageHeader/LogoLine/MainMenu/index.vue'

import { mapState } from 'vuex'

export default {
  name: 'logoLine',
  components: {
    MainMenu,
    SearchModal,
    BasketModal,
    SideBar
  },
  data () {
    return {
      order: {},
      ssv4Redirect: false,
      ssv4UserData: {
        id: null
      }
    }
  },
  computed: {
    ...mapState({
      basket: (state) => state.basket,
      integrationHost: (state) => state.integrationHost,
      ssv4User: (state) => state.ssv4User,
      user: (state) =>
        ({
          ...state.user
        })
    })
  },
  methods: {
    openSidebar () {
      this.$store.dispatch('openSidebar')
    }
  },
  mounted: function () {
    if (this.$route.query.sspay) {
      this.ssv4Redirect = true
    }
  },
  created: function () {
    // window.globalEvents.$on('setUser', (userData) => (this.ssv4UserData = userData))
  }
}
