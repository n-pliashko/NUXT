import { mapState } from 'vuex'
import {reverseRouteName, getSearchString} from '@/config/helper'

export default {
  name: 'Items',
  computed: {
    ...mapState({
      routerObj: (state) => state.pageMenuDescription
    })
  },
  methods: {
    reverseRouteName: function (str) {
      return reverseRouteName(str)
    },
    setSwitchWishlist (itemId) {
      let self = this
      let itemData = {
        id: itemId,
        type: 'catalogue',
        params: ''
      }
      self.$store.dispatch('switchWishlist', itemData)
    },
    rememberRoute (to) {
      let path = this.$route.path
      if (Object.keys(this.$route.query).length > 0) {
        path += getSearchString(this.$route.query)
      }
      this.$store.dispatch('setRouterBack', {path: path, params: {category_name: this.$parent.category_name}})
      this.$router.push(to)
    }
  }
}
