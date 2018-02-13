import {mapState} from 'vuex'
import $ from 'jquery'

import Slick from 'vue-slick'
import BasketConfirmModal from '@/components/scripts/PageItem/BasketConfirmModal/index.vue'
import InfoAccordion from '@/components/scripts/PageItem/PageItemMobile/InfoAccordion/index.vue'
import ShareButtons from '@/components/scripts/ShareButtons/index.vue'
import TrustpilotWidget from '@/components/scripts/TrustpilotWidget/index.vue'

import config from '@/config'
import {reverseRouteName} from '@/config/helper'

export default {
  name: 'PageItem',
  components: {
    Slick,
    BasketConfirmModal,
    InfoAccordion,
    ShareButtons,
    TrustpilotWidget
  },
  computed: {
    ...mapState({
      apiHost: (state) => state.apiHost,
      breadcrumbs: (state) => state.breadcrumbs,
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
      exchange: (state) => state.currency.exchange,
      exchangeBack: (state) => state.currency.exchangeBack
    }),
    item: function () { return this.$parent.item },
    options: function () { return this.$parent.options },
    selected: function () { return this.$parent.selected },
    defFrameSizeIndex: function () { return this.$parent.defFrameSizeIndex }
  },
  data () {
    return {
      slickOptions: {
        autoplay: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        swipeToSlide: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        pauseOnDotsHover: true
      },
      slickOptionsColours: {
        autoplay: false,
        pauseOnDotsHover: true,
        infinite: false,
        speed: 500,
        cssEase: 'linear',
        swipeToSlide: true,
        slidesToShow: 3,
        slidesToScroll: 1
      },
      addedState: false,
      panelText: 'Removed from Wishlist',
      wishlist: {
        state: false
      }
    }
  },
  methods: {
    setWishlist (id) {
      this.$http.post(this.apiHost + config.prefix + config.wishlist.switchWishlist, {params: {id: id}}).then(function (response) {
        self.wishlist.state = response.body
        // console.log(response)
      }, function (error) {
        console.log(error.statusText)
      })
    },
    reverseRouteName: function (str) {
      return reverseRouteName(str)
    },
    toggleBasket: function () {
      this.panelText = this.panelText === 'Removed from Wishlist' ? 'Added to Wishlist' : 'Removed from Wishlist'
      this.addedState = !this.addedState
      this.togglePopup()
    },
    togglePopup: function () {
      let popup = $('#confirmPanel')
      popup.fadeIn()
      setTimeout(function () {
        popup.fadeOut()
      }, 3000)
    }
  },
  watch: {
    'options': {
      handler: function () {
        //this.$forceUpdate()
      },
      deep: true
    }
  }
}
