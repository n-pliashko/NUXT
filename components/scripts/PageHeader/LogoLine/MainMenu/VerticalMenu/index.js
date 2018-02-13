import VerticalMenuItem from '~/components/scripts/PageHeader/LogoLine/MainMenu/VerticalMenuItem/index.vue'
import $ from 'jquery'
import { mapState } from 'vuex'
import config from '~/config'

let Handlebars = require('handlebars/dist/handlebars.min.js')

export default {
  name: 'VerticalMenu',
  components: {VerticalMenuItem},
  computed: {
    ...mapState({
      apiHost: (state) => state.apiHost,
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
      exchange: (state) => state.currency.exchange
    }),
    treeData: function () {
      let menus = []
      console.log('vertical')
      this.$http.get(config.menu.getMenus, {params: {desktop: false}}, this.requestOptions)
        .then(response => response.data)
        .then((data) => {
          menus = [
            {content: '', children: data.items},
            {
              id: 'accountSidebarBlock',
              content: 'Your account',
              children: [
                // {id: 'join', content: '<i class="fa fa-envelope-open-o mr-2" aria-hidden="true"></i>Join', link: '', html_id: 'join'},
                {id: 'loginSideLink', content: '<i class="fa fa-check-square-o mr-2" aria-hidden="true"></i>Account & Orders', link: '/login'},
                // Tickets должно отображаться, только когда пользователь залогинен
                {id: 'ticketsSideLink', content: '<i class="fa fa-envelope-open-o mr-2" aria-hidden="true"></i>Tickets', link: '/customer-services'},
                {id: 'wishlistSideLink', content: '<i class="fa fa-heart-o mr-2" aria-hidden="true"></i>Wishlist', link: '/wishlist'}
              ]
            },
            {
              id: 'salesSidebarBlock',
              content: 'Sales & Support',
              children: [
                // {id: 'help', content: 'Help', link: '', html_id: 'help'},
                {id: 'aboutSideLink', content: '<i class="fa fa-users mr-2" aria-hidden="true"></i>About Us', link: 'about-us/'},
                {id: 'infoSideLink', content: '<i class="fa fa-question-circle mr-2" aria-hidden="true"></i>Help & Information', link: 'information'},
                {id: 'serviceSideLink', content: '<i class="fa fa-envelope-open-o mr-2" aria-hidden="true"></i>Email us', link: 'customer-services'},
                // ссылка на звонок tel:03303801190 в результате компилится в /tel:03303801190, что не даёт совершить звонок
                {id: 'callSideLink', content: '<i class="fa fa-phone mr-2" aria-hidden="true"></i>03303 801 190', link: 'tel:03303801190'}
              ]
            }]
        })
      return menus
    }
  },
  data () {
    return {
      requestOptions: {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        emulateJSON: true
      }
    }
  },
  mounted () {
    $(document).on('click', '.open-submenu', function () {
      $(this).next('.sidebar-submenu').animate({left: '0'})
    })

    $(document).on('click', '.back', function () {
      $(this).parent('.sidebar-submenu').animate({left: '250px'})
    })
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
