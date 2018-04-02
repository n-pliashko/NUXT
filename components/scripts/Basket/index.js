import PageHeader from '@/components/scripts/PageHeader/index.vue'
import PaymentsTypes from '@/components/scripts/PageFooter/FooterNavigation/PaymentsTypes/index.vue'
import TrustpilotWidget from '@/components/scripts/TrustpilotWidget/index.vue'
import PageFooter from '@/components/scripts/PageFooter/index.vue'
import ConfirmDeleteModal from './ConfirmDeleteModal/index.vue'
import ConfirmDeleteSavedModal from './ConfirmDeleteSavedModal/index.vue'
import DeliveryInfoModal from './DeliveryInfoModal/index.vue'
import ReturnsInfoModal from './ReturnsInfoModal/index.vue'
import TermsInfoModal from './TermsInfoModal/index.vue'

import { mapState, mapGetters } from 'vuex'
import {reverseRouteName} from '@/config/helper'
import $ from 'jquery'

export default {
  name: 'Basket',
  components: {
    PageHeader,
    PaymentsTypes,
    TrustpilotWidget,
    PageFooter,
    ConfirmDeleteModal,
    ConfirmDeleteSavedModal,
    DeliveryInfoModal,
    ReturnsInfoModal,
    TermsInfoModal
  },
  data () {
    return {
      delOrderedItemID: null,
      hasDiscount: false,
      promoCode: undefined,
      hasExpress: false,
      movedItem: '',
      movedTo: '',
      showInfo: false
    }
  },
  computed: {
    ...mapState({
      basket: (state) => ({...state.basket}),
      meta: (state) => ({
        ...state.formMeta['basket']
      }),
      basketLoading: (state) => {
        return state.basketLoading
      },
      loading: (state) => {
        return state.loading
      },
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
      auth: (state) => state.authorization,
      wishlist: (state) => state.wishlist
    }),
    ...mapGetters(['exchange', 'vat']),
    items () {
      const {...data} = this.basket
      if (!data || !data.order || !data.order.orderItems) {
        return []
      }
      return data.order.orderItems.filter(item => !item.buy_later) || []
    },
    laterItems () {
      const {...data} = this.basket
      if (!data || !data.order || !data.order.orderItems) {
        return []
      }
      return data.order.orderItems.filter(item => item.buy_later) || []
    },
    hasProducts: function () {
      return this.basket.order && this.basket.order.totalItems > 0
    },
    hasBasketItems: function () {
      return this.basket.order.orderItems.length
    },
    savedAmount: function () {
      return this.basket.order.orderItems
    },
    somethingSaved: function () {
      return this.savedAmount > 0
    }
  },
  methods: {
    assignItems (field, newItems) {
      newItems.map(item => {
        const index = this[field].findIndex(jtem => jtem.ordered_item_number == item.ordered_item_number)
        if (index >= 0) {
          Object.keys(item).map(key => {
            this[field][index][key] = item[key]
          })
          return
        }

        this[field].push(item)
      })

      this[field].map((item, index) => {
        const jndex = newItems.findIndex(jtem => jtem.ordered_item_number == item.ordered_item_number)
        if (jndex < 0) {
          this[field].splice(index, 1)
        }
      })
    },
    checkout: function () {
      this.$router.push('/payment/' + this.basket.order.hash)
    },
    changeQtyItem (itemOrderedID, e) {
      let data = {
        'quantity': e.target.value,
        'ordered_item_number': itemOrderedID
      }
      this.$store.dispatch('setQtyItem', data)
    },
    removeItem (itemID) {
      this.$store.dispatch('removeItemFromBasket', itemID)
    },
    reverseRouteName: function (str, defaultName = 'route-name') {
      if (str && str.length > 0) {
        return reverseRouteName(str)
      }
      return defaultName
    },
    addToSave: function (item) {
      var itemData = {
        id: item.item_number,
        type: 'basket',
        params: item
      }
      this.$store.dispatch('removeItemFromBasket', item.ordered_item_number)
      this.$store.dispatch('switchWishlist', itemData)
      // this.showMovedBlock(item.ordered_item_number, 'later')
    },
    delFromSave: function (item) {
      var itemData = {
        id: item.item_number,
        type: 'basket',
        params: item
      }
      let {...iadd} = item
      delete iadd['order_number']
      delete iadd['ordered_item_number']
      delete iadd['order_option_number']
      this.$store.dispatch('addItemToBasket', iadd)
      this.$store.dispatch('switchWishlist', itemData)
      // this.showMovedBlock(item.ordered_item_number, 'basket')
    },
    removeFromSaved: function (item) {
      var itemData = {
        id: item.item_number,
        type: 'basket',
        params: item
      }
      this.$store.dispatch('switchWishlist', itemData)
      // this.showMovedBlock(item.ordered_item_number, 'later')
    },
    submitDiscount (e) {
      e.preventDefault()
      this.$store.dispatch('onSubmitPromoCode', this.promoCode)
    },
    toggleDiscountBox (e) {
      e.preventDefault()
      this.hasDiscount = !this.hasDiscount
    },
    showMovedBlock (id, to) {
      let self = this
      if (!!id.designerName && !!id.modelName) {
        this.movedItem = id.designerName + ' ' + id.modelName
      } else {
        this.movedItem = 'The item '
      }
      if (to === 'basket') {
        self.movedTo = 'the Shopping Basket'
        $('#savedToBasketBlock').fadeIn()
        $(window).on('beforeunload', function () {
          $('#savedToBasketBlock').fadeOut()
        })
      } else if (to === 'later') {
        self.movedTo = 'Saved for Later'
        $('#savedForLaterBlock', '#saveForLaterEmptyBasket').fadeIn()
        $(window).on('beforeunload', function () {
          $('#savedForLaterBlock', '#saveForLaterEmptyBasket').fadeOut()
        })
      }
      this.showInfo = true
    },
    getItemPrice (item) {
      return this.exchange(this.vat(item.option.price).price * parseInt(item.quantity))
    }
  },
  mounted () {
    if (this.$route.params.addPrice) {
      // this.$store.dispatch('putAdditionalPrice', this.$route.params.addPrice)
    }
  },
  created () {
    $('#emptyBasketWithSavedBlock').show()
  }
}
