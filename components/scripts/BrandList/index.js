import { mapState } from 'vuex'
import PageHeader from '@/components/scripts/PageHeader/index.vue'
import PageFooter from '@/components/scripts/PageFooter/index.vue'
import ScrollToTop from '@/components/scripts/ScrollToTop/index.vue'
import Breadcrumbs from '@/components/scripts/Breadcrumbs/index.vue'

import config from '@/config'
import { reverseRouteName } from '@/config/helper'

export default {
  name: 'BrandList',
  components: {
    PageHeader,
    PageFooter,
    ScrollToTop,
    Breadcrumbs
  },
  computed: {
    ...mapState({
      apiHost: (state) => state.apiHost,
      routerObj: (state) => state.pageMenuDescription
    })
  },
  data () {
    return {
      brands: [],
      requestOptions: {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        emulateJSON: true,
        credentials: true
      },
      path: this.$route.path
    }
  },
  created () {
    let self = this
    this.$http.get(this.apiHost + config.prefix + config.designers.allDesignersByLetter, this.requestOptions)
      .then(data => {
        self.brands = data.body
      }, (err) => console.log('err::', err))
  },
  methods: {
    reverseRouteName: function (str) {
      return reverseRouteName(str)
    }
  },
  watch: {
    'routerObj': {
      handler: function () {
        let self = this
        let category = null
        if (this.routerObj.catalogue && this.routerObj.catalogue.main_category && this.routerObj.catalogue.main_category.category_number) {
          category = this.routerObj.catalogue.main_category.category_number
        }

        if (this.routerObj.category && this.routerObj.category.category_number) {
          category = this.routerObj.category.category_number
        }
        if (category) {
          this.$http.get(this.apiHost + config.prefix + config.routes.findByCategory + '/' + category).then(response => response.json())
            .then(json => {
              if (json.url) {
                self.path = '/' + json.url
                self.$forceUpdate()
              }
            })
        }
      },
      deep: true
    }
  }
}
