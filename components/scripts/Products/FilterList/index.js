import FilterBlock from '@/components/scripts/Products/FilterBlock/index.vue'
import FilterBlockMobile from '@/components/scripts/Products/FilterBlockMobile/index.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'filter_list',
  components: {FilterBlock, FilterBlockMobile},
  data () {
    return {
      priceTo: '',
      priceFrom: '',
      armFrom: '',
      armTo: '',
      bridgeFrom: '',
      bridgeTo: '',
      lensFrom: '',
      lensTo: ''
    }
  },
  computed: {
    ...mapState({
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
    }),

    ...mapGetters(['exchange', 'exchangeBack', 'vat', 'exchangeBackFuncByCurrency']),
    loading: function () {
      return !(this.$parent.filtersList && Object.keys(this.$parent.filtersList).length > 0)
    },
    isSelectedFilters: function () {
      return Object.values(this.$parent.filters).findIndex(obj => obj && obj.length > 0) !== -1
    },
    _priceFrom: function () {
      let result = ''
      if (this.$parent.filters.price_from.length > 0) {
        result = this.$parent.filters.price_from
      } else if (this.$parent.calculatedItems.priceFrom >= 0) {
        result = this.$parent.calculatedItems.priceFrom
      }
      return !isNaN(parseInt(result)) ? parseInt(result) : result
    },
    _priceTo: function () {
      let result = ''
      if (this.$parent.filters.price_to.length > 0) {
        result = this.$parent.filters.price_to
      } else if (this.$parent.calculatedItems.priceTo >= 0) {
        result = this.$parent.calculatedItems.priceTo
      }
      return !isNaN(parseInt(result)) ? Math.ceil(result) : result
    },
    _armFrom: function () {
      return this.getFilter('arm_from', 'armFrom', true, false)
    },
    _armTo: function () {
      return this.getFilter('arm_to', 'armTo', false, true)
    },
    _bridgeFrom: function () {
      return this.getFilter('bridge_from', 'bridgeFrom', true, false)
    },
    _bridgeTo: function () {
      return this.getFilter('bridge_to', 'bridgeTo', false, true)
    },
    _lensFrom: function () {
      return this.getFilter('lens_from', 'lensFrom', true, false)
    },
    _lensTo: function () {
      return this.getFilter('lens_to', 'lensTo', false, true)
    }
  },
  methods: {
    getFilter (filterName, itemName, int = false, ceil = true) {
      let result = this.$parent.filters[filterName] > 0 ? this.$parent.filters[filterName] : (this.$parent.calculatedItems[itemName] >= 0 ? this.$parent.calculatedItems[itemName] : '')
      if (int) {
        return !isNaN(parseInt(result)) ? parseInt(result) : result
      }
      if (ceil) {
        return !isNaN(parseInt(result)) ? Math.ceil(result) : result
      }
      return result
    },
    clearAllFilters: function () {
      Object.keys(this.$parent.filters).map(key => {
        if (Array.isArray(this.$parent.filters[key])) {
          this.$parent.filters[key] = []
        } else {
          this.$parent.filters[key] = ''
        }
      })
    },
    changePrice: function () {
      let _price = {
        price_from: this.priceFrom,
        price_to: this.priceTo
      }
      Object.assign(this.$parent.filters, _price)
    },
    changeArm: function () {
      let _arm = {
        arm_from: this.armFrom.length > 0 ? this.armFrom : this._armFrom,
        arm_to: this.armTo.length > 0 ? this.armTo : this._priceTo
      }
      Object.assign(this.$parent.filters, _arm)
    },
    changeBridge: function () {
      let _bridge = {
        bridge_from: this.bridgeFrom.length > 0 ? this.bridgeFrom : this._bridgeFrom,
        bridge_to: this.bridgeTo.length > 0 ? this.bridgeTo : this._bridgeTo
      }
      Object.assign(this.$parent.filters, _bridge)
    },
    changeLens: function () {
      let _lens = {
        lens_from: this.lensFrom.length > 0 ? this.lensFrom : this._lensFrom,
        lens_to: this.lensTo.length > 0 ? this.lensTo : this._lensTo
      }
      Object.assign(this.$parent.filters, _lens)
    },
    handleInput: function (name, value, event) {
      let min = event.target.attributes && event.target.attributes.min ? event.target.attributes.min.nodeValue : 0
      let max = event.target.attributes && event.target.attributes.max ? event.target.attributes.max.nodeValue : 0
      if (parseInt(value) < parseInt(min)) {
        value = min
      }
      if (max && parseInt(value) > parseInt(max)) {
        value = max
      }
      this[name] = value
    },
    checkInput: function (event) {
      if (!(event.charCode >= 48 && event.charCode <= 57) && event.charCode !== 13) {
        event.preventDefault()
      }
      if (event.charCode === 13) {
        event.target.blur()
        this.$forceUpdate()
      }
    }
  },
  watch: {
    currency (val, old) {
      if (old.rate) {
        let _price = {}
        if (this.$parent.filters.price_to) {
          let price = this.exchangeBackFuncByCurrency(this.vat(this.$parent.filters.price_to, true).price, old)
          _price.price_to = Math.ceil(this.exchange(this.vat(price).price)).toString()
        }

        if (this.$parent.filters.price_from) {
          let price = this.exchangeBackFuncByCurrency(this.vat(this.$parent.filters.price_from, true).price, old)
          _price.price_from = parseInt(this.exchange(this.vat(price).price)).toString()
        }

        if (_price) {
          Object.assign(this.$parent.filters, _price)
        }
      }
    },
    '$parent.filters.price_from': {
      handler: function () {
        this.priceFrom = this.$parent.filters.price_from
      },
      deep: true
    },
    '$parent.filters.price_to': {
      handler: function () {
        this.priceTo = this.$parent.filters.price_to
      },
      deep: true
    }
  }
}
