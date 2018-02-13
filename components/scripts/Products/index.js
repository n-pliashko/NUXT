import PageHeader from '@/components/scripts/PageHeader/index.vue'
import CatalogueTitle from '@/components/scripts/Products/CatalogueTitle/index.vue'
import Sort from '@/components/scripts/Products/Sort/index.vue'
import Filters from '@/components/scripts/Products/Filters/index.vue'
import Items from '@/components/scripts/Products/Items/index.vue'
import FilterList from '@/components/scripts/Products/FilterList/index.vue'
import FilterBlock from '@/components/scripts/Products/FilterBlock/index.vue'
import FilterBlockMobile from '@/components/scripts/Products/FilterBlockMobile/index.vue'
import Pagination from '@/components/scripts/Pagination/index.vue'
import PageFooter from '@/components/scripts/PageFooter/index.vue'
import ScrollToTop from '@/components/scripts/ScrollToTop/index.vue'
import Breadcrumbs from '@/components/scripts/Breadcrumbs/index.vue'

import { mapState } from 'vuex'
import config from '@/config'
import { parseQueryString, reverseRouteName, array_intersect, getSearchString, arrayToObject } from '@/config/helper'

let Handlebars = require('handlebars/dist/handlebars.min.js')
let elasticsearch = require('elasticsearch')

export default {
  name: 'products',
  components: {
    PageHeader,
    CatalogueTitle,
    Sort,
    Filters,
    Items,
    FilterList,
    FilterBlock,
    FilterBlockMobile,
    Pagination,
    PageFooter,
    ScrollToTop,
    Breadcrumbs
  },
  computed: {
    ...mapState({
      apiHost: (state) => state.apiHost,
      description: (state) => {
        let description = ''
        let routerObj = state.pageMenuDescription
        if (routerObj.page && routerObj.page.translations['en']) {
          description = routerObj.page.translations['en'].description
        }
        if (routerObj.catalogue && routerObj.catalogue.translations['en']) {
          description = routerObj.catalogue.translations['en'].description
        }
        return description
      },
      breadcrumbs: (state) => state.breadcrumbs,
      routerObj: (state) => state.pageMenuDescription,
      currency: (state) => ({...state.currency.allCurrency[state.currency.selected]}),
      exchange: (state) => state.currency.exchange,
      exchangeBack: (state) => state.currency.exchangeBack,
      backRoute: (state) => state.backRoute,
      allCategories: (state) => state.allCategories,
      allDesigners: (state) => state.allDesigners,
      vat: (state) => state.vat
    }),
    isHistoryAvailable: function () {
      return !!(window.history && window.history.pushState)
    },
    calculatedItems: function () {
      return {
        ...this.items,
        priceFrom: parseInt(this.exchange(this.vat(this.items.priceFrom).price)),
        priceTo: Math.ceil(this.exchange(this.vat(this.items.priceTo).price)),
        data: this.items.data.map(item => {
          return {
            ...item,
            price: this.exchange(this.vat(item.price).price)
          }
        })
      }
    },
    showLoader: function () {
      return this.loading || Object.values(this.calculatedItems.data).length === 0 && this.itemLoading
    },
    categoryObj: function () {
      let category = this.category ? this.category : this.$route.path.split('/').pop()
      let routeCategory = Object.values(this.allCategories).filter(obj => category === reverseRouteName(obj.category_slug))
      return routeCategory.length > 0 ? routeCategory[0] : null
    },
    designerObj: function () {
      let designer = this.designers ? this.designers : this.$route.path.split('/').pop()
      let routeDesigner = Object.values(this.allDesigners).filter(obj => designer === reverseRouteName(obj.name))
      return routeDesigner.length > 0 ? routeDesigner[0] : null
    },
    designer_name: function () {
      return this.designerObj ? this.designerObj.name : ''
    },
    isBrandPage: function () {
      let hasBrand = false
      if (this.routerObj.catalogue && this.routerObj.catalogue.filters) {
        hasBrand = Object.values(this.routerObj.catalogue.filters).filter(obj => obj.designer && obj.designer > 0).length > 0
      }
      return this.designerObj !== null || hasBrand
    },
    category_name: function () {
      return this.categoryObj ? this.categoryObj.name : ''
    }
  },
  props: ['page', 'category_id', 'designer_id', 'main_category', 'search', 'category', 'designers'],
  head: {
    title: function () {
      let title = 'SelectSpecs'
      if (this.routerObj.page && this.routerObj.page.translations['en']) {
        title = this.routerObj.page.translations['en'].meta_title
      }
      if (this.routerObj.catalogue && this.routerObj.catalogue.translations['en']) {
        title = this.routerObj.catalogue.translations['en'].meta_title
      }
      title = this.convertMenuContext(title)
      const textarea = document.createElement('div')
      textarea.innerHTML = title
      title = textarea.innerText
      return {
        inner: title
      }
    },
    link: function () {
      let link = this.navigation.protocol + '//' + this.navigation.host + this.navigation.pathname
      let links = [
        {
          rel: 'canonical',
          href: link
        },
        {
          rel: 'next',
          href: link + '?page=' + (parseInt(this.pagination.currentPage) + 1),
          id: 'next'
        }
      ]
      if (parseInt(this.pagination.currentPage) > 1) {
        links.push({
          rel: 'prev',
          href: link + '?page=' + (parseInt(this.pagination.currentPage) - 1),
          id: 'prev'
        })
      }
      return links
    }
  },
  data () {
    return {
      client: null,
      generatedBreadcrumbs: null,
      menuOr: false,
      previousRequest: {
        items: null,
        filters: null
      },
      layout: false,
      loading: false,
      itemLoading: false,
      requestOptions: {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        emulateJSON: true
      },
      items: {
        data: [],
        total: 0,
        priceFrom: '',
        priceTo: '',
        armFrom: '',
        armTo: '',
        bridgeFrom: '',
        bridgeTo: '',
        lensFrom: '',
        lensTo: '',
        inWishlist: false
      },
      pagination: {
        currentPage: 1,
        skip: 0,
        limit: 60
      },
      filters: {
        price_from: '',
        price_to: '',
        arm_from: '',
        arm_to: '',
        bridge_from: '',
        bridge_to: '',
        lens_from: '',
        lens_to: '',
        sort: ''
      },
      navigation: {
        location: window.location.href,
        protocol: window.location.protocol,
        host: window.location.host,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      },
      searchTitle: '',
      filtersList: {},
      filterCountItems: {},
      scrollLoad: false,
      designerDescription: '',
      main_category_name: '',
      main_category_link: ''
    }
  },
  created () {
    if (this.page) {
      this.layout = this.page
    } else {
      this.layout = false
    }

    this.loading = true
    if (this.$route.query.page) {
      this.pagination.currentPage = this.$route.query.page
      this.pagination.skip += (this.pagination.currentPage - 1) * this.pagination.limit
    }

    let self = this
    let _search = this.navigation.search.replace(/^\?/, '')
    if (!self.isHistoryAvailable) {
      _search = self.navigation.hash.replace(/^#/, '')
    }

    if (_search.length > 0) {
      let params = self.parseQueryString(_search)
      if (Object.keys(params).indexOf('page') !== -1) {
        delete params.page
      }
      Object.keys(params).map(key => {
        if (Object.keys(self.filters).indexOf(key) === -1) {
          this.$set(self.filters, key, params[key])
        } else {
          self.filters[key] = params[key]
        }
      })
    }

    if (!this.layout) {
      this.generateBreadcrumbs()
      this.loadComponents(1).then(() => { self.calculateFilterCountItems()})
      this.loadComponents(0, 1)
    }
    document.body.addEventListener('scroll', this.handleScroll)

    this.client = new elasticsearch.Client({
      host: {
        host: config.elastic.host,
        protocol: config.elastic.protocol,
        port: config.elastic.port,
        path: 'elastic'
      }
    })

    /* this.client.ping({
     requestTimeout: 30000
     }, function(error, response, status) {
     console.log(response);
     if (error) {
     console.trace('Error:', error);
     } else {
     console.log('Connected!');
     }
     // on finish
     this.client.close();
     }); */
  },
  destroyed: function () {
    document.body.removeEventListener('scroll', this.handleScroll)
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
    },
    getDescriptionForBrandPage: function () {
      if (this.isBrandPage) {
        let filters = []
        if (this.routerObj.catalogue && Object.keys(this.routerObj.catalogue.filters).length > 0) {
          filters = Object.values(this.routerObj.catalogue.filters)
        }
        let self = this
        let data = {
          filters: filters,
          designer_lang: 'en'
        }
        if (this.designerObj) {
          data.designer_number = this.designerObj.id
        }
        return this.$http.post(this.apiHost + config.prefix + config.products.getDesignerDescription, data, this.requestOptions).then(response => response.json())
          .then(json => {
            self.designerDescription = json.description
          })
      }
    },
    getSearchString (filter, withSign = true) {
      return getSearchString(filter, withSign)
    },
    loadComponents: function (onlyFilters = 0, onlyItems = 0, append = false) {
      if (onlyItems && (!this.currency || !this.currency.rate)) {
        return
      }
      if (!append) {
        this.loading = true
      }

      if (!append && onlyItems) {
        this.itemLoading = true
      }
      let self = this
      self.searchTitle = ''
      let data = {
        ...this.filters,
        skip: self.pagination.skip,
        limit: self.pagination.limit,
        onlyFilters: onlyFilters,
        onlyItems: onlyItems,
        price_from: this.filters.price_from ? this.exchangeBack(this.vat(this.filters.price_from, true).price) : '',
        price_to: this.filters.price_to ? this.exchangeBack(this.vat(this.filters.price_to, true).price) : ''
      }
      if (this.search) {
        self.searchTitle = 'Search results for "' + decodeURIComponent(this.search) + '"'
        Object.assign(data, {q: this.search})
      }

      if (this.designerObj) {
        Object.assign(data, {designer_id: this.designerObj.id})
      }

      if (this.routerObj.catalogue) {
        if (Object.keys(this.routerObj.catalogue.filters).length > 0) {
          Object.assign(data, {filters: Object.values(this.routerObj.catalogue.filters)})
        }
        Object.assign(data, {filter_groups: this.routerObj.catalogue.filter_groups})
      }

      let requestOpt = {
        before (request) {
          if (onlyItems) {
            if (self.previousRequest.items) {
              self.previousRequest.items.abort()
            }
            self.previousRequest.items = request
          }
          if (onlyFilters) {
            if (self.previousRequest.filters) {
              self.previousRequest.filters.abort()
            }
            self.previousRequest.filters = request
          }
        }
      }
      return this.$http.post(this.apiHost + config.prefix + config.products.searchProducts, data, Object.assign({}, requestOpt, this.requestOptions)).then(response => response.json())
        .then(json => {
          if (json.filters) {
            json.filters.map(key => {
              if (Object.keys(self.filters).indexOf(key) === -1) {
                self.$set(self.filters, key, [])
              }
            })
          }
          if (json.categories) {
            self.filtersList = json.categories
          }

          if (json.items) {
            if (append) {
              self.items.data = self.items.data.concat(json.items.items)
            } else {
              self.items.data = json.items.items
            }
            self.items.total = json.items.total
            if (self.pagination.skip > self.items.total) {
              self.pagination.skip = 0
              self.pagination.currentPage = 1
            }
          }
          if (json.aggregate) {
            self.items.priceFrom = json.aggregate.min_price >= 0 ? json.aggregate.min_price : ''
            self.items.priceTo = json.aggregate.max_price >= 0 ? json.aggregate.max_price : ''

            self.items.armFrom = json.aggregate.min_arm >= 0 ? parseInt(json.aggregate.min_arm) : ''
            self.items.armTo = json.aggregate.max_arm >= 0 ? Math.ceil(json.aggregate.max_arm) : ''

            self.items.bridgeFrom = json.aggregate.min_bridge >= 0 ? parseInt(json.aggregate.min_bridge) : ''
            self.items.bridgeTo = json.aggregate.max_bridge >= 0 ? Math.ceil(json.aggregate.max_bridge) : ''

            self.items.lensFrom = json.aggregate.min_lens >= 0 ? parseInt(json.aggregate.min_lens) : ''
            self.items.lensTo = json.aggregate.max_lens >= 0 ? Math.ceil(json.aggregate.max_lens) : ''
          }
        })
        .then(() => {
          if (onlyItems) {
            self.itemLoading = false
          }
          self.loading = false
        })
        .catch(res => {
          return res
        })
    },
    generateBreadcrumbs: function () {
      let breadcrumbs = []
      let self = this
      if (this.routerObj.catalogue && this.routerObj.catalogue.main_category && this.routerObj.catalogue.main_category.category_number) {
        this.$http.get(this.apiHost + config.prefix + config.routes.findByCategory + '/' + this.routerObj.catalogue.main_category.category_number, this.requestOptions).then(response => response.json())
          .then(json => {
            if (json.url) {
              self.main_category_link = json.url
              let breadcrumbs = [
                {title: 'HOME', path: '/'}
              ]
              if (self.designerObj) {
                breadcrumbs = breadcrumbs.concat([
                  {title: 'BRANDS', path: {name: 'BrandList'}},
                  {title: this.designerObj.name, path: self.$route.path}
                ])
                if (this.main_category_name) {
                  breadcrumbs.push({
                    title: self.routerObj.catalogue && self.routerObj.catalogue.main_category.translations['en'].category_name,
                    path: '#'
                  })
                }
              }
              if (json.category && json.category.category_name) {
                breadcrumbs.push({title: json.category.category_name, path: '/' + json.url})
              }
              if (self.categoryObj) {
                breadcrumbs.push({title: self.categoryObj.name, path: '#'})
              }
              self.generatedBreadcrumbs = breadcrumbs
              self.$store.dispatch('setBreadcrumbs', breadcrumbs)
            }
          })
      }
      if (this.designerObj) {
        breadcrumbs = [
          {title: 'HOME', path: '/'},
          {title: 'BRANDS', path: '/brands'},
          {title: this.designerObj.name, path: this.$route.path}
        ]
        if (this.main_category_name) {
          breadcrumbs.push({
            title: this.routerObj.catalogue && this.routerObj.catalogue.main_category.translations['en'].category_name,
            path: '#'
          })
        }
      } else {
        breadcrumbs = [
          {title: 'HOME', path: '/'}
        ]
        if (this.routerObj.catalogue && this.routerObj.catalogue.main_category) {
          breadcrumbs.push({
            title: this.routerObj.catalogue && this.routerObj.catalogue.main_category.translations['en'].category_name,
            path: '#'
          })
        }
      }
      this.generatedBreadcrumbs = breadcrumbs
      this.$store.dispatch('setBreadcrumbs', breadcrumbs)
    },
    changeNavigation: function () {
      let self = this
      let params = {}
      Object.keys(self.filters).map((key) => {
        if (self.filters[key].length > 0) {
          Object.assign(params, {[decodeURIComponent(key)]: self.filters[key]})
        }
      })
      Object.assign(this.$route.query, params)

      let _hash = self.navigation.hash
      let _search = this.getSearchString(params)
      let sign = _search.length > 0 ? '&' : '?'
      let query = this.getSearchString(this.$root.search.params, false)
      _search += query.length > 0 ? sign + query : ''

      if (this.$route.query.page) {
        sign = _search.length > 0 ? '&' : '?'
        _search += sign + 'page=' + this.$route.query.page
      }

      let location = self.navigation.protocol + '//' + self.navigation.host + self.navigation.pathname

      if (self.isHistoryAvailable) {
        location += _search + _hash
        window.history.pushState({}, null, location)
      } else {
        _hash = '#' + _search.replace(/^\?/, '')
        _search = self.navigation.search
        location += _search
        window.location.hash = _hash
      }

      self.navigation.location = location
      self.navigation.search = _search
      self.navigation.hash = _hash
    },
    parseQueryString: function (queryString) {
      return parseQueryString(queryString)
    },
    handleScroll (event) {
      let self = this
      let el = document.querySelector('.shop-item:last-child')
      if (el && !this.scrollLoad && document.body.scrollTop >= el.offsetTop - el.offsetHeight) {
        if (this.pagination.skip + this.pagination.limit < this.items.total) {
          this.pagination.skip += this.pagination.limit
          self.scrollLoad = true
          this.loadComponents(0, 1, true).then(() => { self.scrollLoad = false })
        }
      }
    },
    reverseRouteName (name) {
      return reverseRouteName(name)
    },
    calculateFilterCountItems () {
      let queryMust = []
      let queryDesignerMust = []
      let ranges = {}
      let self = this
      let designerPage = false

      if (this.search) {
        queryMust.push({
          match: {
            _all: this.search
          }
        })
      }
      if (this.routerObj.catalogue && Object.keys(this.routerObj.catalogue.filters).length > 0) {
        let queryShould = []
        let queryDesignerShould = []
        Object.values(this.routerObj.catalogue.filters).map(obj => {
          let must = []
          Object.values(obj.categories).map(cat => {
            must.push({
              terms: {
                category_ids: [cat]
              }
            })
          })

          queryDesignerShould.push({
            bool: {
              must: must.slice(0)
            }
          })

          if (obj.designer && obj.designer > 0) {
            must.push({
              terms: {
                designer_ids: [obj.designer]
              }
            })
          }
          queryShould.push({
            bool: {
              must: must
            }
          })
        })

        queryDesignerMust.push({
          bool: {
            should: queryDesignerShould
          }
        })

        queryMust.push({
          bool: {
            should: queryShould
          }
        })
      }

      if (this.designerObj) {
        designerPage = true
        queryMust.push({
          terms: {
            designer_ids: !Array.isArray(this.designerObj.id) ? [this.designerObj.id] : this.designerObj.id
          }
        })
      }

      if (this.filters) {
        let filters = this.filters
        Object.keys(this.filters).map(key => {
          if (filters[key].length > 0 && key !== 'sort') {
            if (key.search(/_from$/i) !== -1) {
              let bodyKey = key.replace('_from', '')
              if (ranges[bodyKey]) {
                ranges[bodyKey] = Object.assign({}, ranges[bodyKey], {gte: parseInt(filters[key])})
              } else {
                ranges[bodyKey] = {gte: parseInt(filters[key])}
              }
            } else if (key.search(/_to$/i) !== -1) {
              let bodyKey = key.replace('_to', '')
              if (ranges[bodyKey]) {
                ranges[bodyKey] = Object.assign({}, ranges[bodyKey], {lte: Math.ceil(filters[key])})
              } else {
                ranges[bodyKey] = {lte: Math.ceil(filters[key])}
              }
            } else if (key.search(/\[\d+\]$/i) !== -1) {
              queryMust.push({
                terms: {
                  [key.replace(/\[\d+\]$/i, '')]: !Array.isArray(filters[key]) ? [filters[key]] : filters[key]
                }
              })
            } else {
              queryMust.push({
                terms: {
                  [key]: !Array.isArray(filters[key]) ? [filters[key]] : filters[key]
                }
              })
            }
          }
        })

        if (Object.keys(ranges).length > 0) {
          Object.keys(ranges).map(key => {
            queryMust.push({
              range: {
                [key]: ranges[key]
              }
            })
          })
        }
      }
      if (queryMust.length > 0 && Object.keys(this.filtersList).length > 0) {
        let aggs = {}
        Object.keys(this.filtersList).map(name => {
          let key = name
          let ownName = name.replace('[', '').replace(']', '')
          if (key.search(/\[\d+\]$/i) !== -1) {
            key = key.replace(/\[\d+\]$/i, '')
          }
          let own = array_intersect(Object.values(self.filtersList[name].value), self.filters[name])
          if (own.length !== 0) {
            let queryMustCopy = queryMust.slice(0)
            let findIndex = queryMustCopy.findIndex((obj) => obj.terms && obj.terms[key] && obj.terms[key].filter(val => own.indexOf(val) !== -1).length === own.length)
            queryMustCopy.splice(findIndex, 1)
            aggs = Object.assign({}, aggs, {
              ['own_' + ownName]: {
                filters: {
                  filters: {
                    query: {
                      bool: {
                        must: queryMustCopy
                      }
                    }
                  }
                },
                aggs: {
                  ['grouped_own_' + ownName]: {
                    terms: {
                      field: key,
                      size: 10000000
                    }
                  }
                }
              }
            })
          }
          let queryMustCopy = queryMust.slice(0)
          if (designerPage && key.indexOf('designer') !== -1) {
            queryMustCopy = queryDesignerMust
          }
          if (!aggs[key]) {
            aggs = Object.assign({}, aggs, {
              [key]: {
                filters: {
                  filters: {
                    query: {
                      bool: {
                        must: queryMustCopy
                      }
                    }
                  }
                },
                aggs: {
                  ['grouped_' + key]: {
                    terms: {
                      field: key,
                      size: 10000000
                    }
                  }
                }
              }
            })
          }
        })
        let body = {
          size: 0,
          aggs: aggs
        }

        this.client.search({
          index: config.elastic.index,
          type: config.elastic.type,
          body: body
        })
          .then(function (body) {
            let grouped = body.aggregations
            self.filterCountItems = {}
            if (grouped) {
              Object.keys(grouped).map(key => {
                let queryKey = 'grouped_' + key
                grouped[key].buckets.query[queryKey].buckets.map((obj) => {
                  self.filterCountItems[key] = Object.assign({}, self.filterCountItems[key], {[obj.key]: obj.doc_count})
                })
              })
            }

            Object.keys(self.filtersList).map(key => {
              let index = Object.keys(self.filterCountItems).filter(category => key.search(category) !== -1)
              if (index && self.filterCountItems[index]) {
                let ownName = key.replace('[', '').replace(']', '')
                if (array_intersect(Object.values(self.filtersList[key].value), self.filters[key]).length !== 0 && self.filterCountItems['own_' + ownName]) {
                  Object.keys(self.filtersList[key].value).map((idx) => {
                    let countItems = 0
                    let obj = self.filtersList[key].value[idx]
                    if (self.filterCountItems['own_' + ownName][obj.id]) {
                      countItems = self.filterCountItems['own_' + ownName][obj.id]
                    }
                    self.filtersList[key].value[idx] = Object.assign({}, obj, {count_items: countItems})
                  })
                } else {
                  if (Array.isArray(self.filtersList[key])) {
                    let filter = self.filtersList[key]
                    Object.keys(filter).map(idx => {
                      if (Array.isArray(filter[idx].value)) {
                        filter[idx].value = arrayToObject(filter[idx].value)
                      }
                      Object.keys(filter[idx].value).map((indx) => {
                        let countItems = 0
                        let obj = self.filtersList[key][idx].value[indx]
                        if (self.filterCountItems[index][obj.id]) {
                          countItems = self.filterCountItems[index][obj.id]
                        }
                        self.filtersList[key][idx]['value'][indx] = Object.assign({}, obj, {count_items: countItems})
                      })
                    })
                  } else {
                    if (Array.isArray(self.filtersList[key].value)) {
                      self.filtersList[key].value = arrayToObject(self.filtersList[key].value)
                    }
                    Object.keys(self.filtersList[key].value).map((idx) => {
                      let countItems = 0
                      let obj = self.filtersList[key].value[idx]
                      if (self.filterCountItems[index][obj.id]) {
                        countItems = self.filterCountItems[index][obj.id]
                      }
                      self.filtersList[key].value[idx] = Object.assign({}, obj, {count_items: countItems})
                    })
                  }
                }
              }
            })
          }, function (error) {
            console.trace(error.message)
          })
      }
    }
  },
  watch: {
    'breadcrumbs': {
      handler: function () {
        if (this.breadcrumbs && this.generatedBreadcrumbs && this.breadcrumbs.length === 1 && this.generatedBreadcrumbs.length > 0) {
          this.$store.dispatch('setBreadcrumbs', this.generatedBreadcrumbs)
        }
      },
      deep: true
    },
    '$root.search': {
      handler: function () {
        this.changeNavigation()
        this.calculateFilterCountItems()
        this.loadComponents(0, 1)
      },
      deep: true
    },
    'pagination.currentPage': {
      handler: function () {
        this.loadComponents(0, 1)
        this.$emit('updateHead')
      },
      deep: true
    },
    'filters': {
      handler: function () {
        if (!this.layout) {
          this.changeNavigation()
          this.calculateFilterCountItems()
          this.loadComponents(0, 1)
        }
      },
      deep: true
    },
    'routerObj': {
      handler: function () {
        if (!this.page) {
          let self = this
          this.generateBreadcrumbs()
          this.loadComponents(1).then(() => { self.calculateFilterCountItems() })
          this.loadComponents(0, 1)
          this.getDescriptionForBrandPage()
        }
      },
      deep: true
    },
    'designerObj': {
      handler: function () {
        if (!this.page) {
          let self = this
          this.generateBreadcrumbs()
          this.loadComponents(1).then(() => { self.calculateFilterCountItems() })
          this.loadComponents(0, 1)
          this.getDescriptionForBrandPage()
        }
      },
      deep: true
    },
    'categoryObj': {
      handler: function () {
        if (!this.page) {
          let self = this
          this.generateBreadcrumbs()
          this.loadComponents(1).then(() => { self.calculateFilterCountItems() })
          this.loadComponents(0, 1)
        }
      },
      deep: true
    },
    '$route' (to, from) {
      this.navigation = {
        location: window.location.href,
        protocol: window.location.protocol,
        host: window.location.host,
        pathname: window.location.pathname,
        search: window.location.search,
        hash: window.location.hash
      }
      if (this.page) {
        this.layout = this.page
      } else {
        this.layout = false
      }
      if (!this.$route.query.page) {
        let filters = {
          price_from: '',
          price_to: '',
          arm_from: '',
          arm_to: '',
          bridge_from: '',
          bridge_to: '',
          lens_from: '',
          lens_to: '',
          sort: ''
        }
        Object.keys(this.filtersList).map(key => {
          Object.assign(filters, {[key]: []})
        })
        this.filters = filters
        this.designerDescription = ''
        this.pagination = {
          currentPage: 1,
          skip: 0,
          limit: 60
        }
      }
    }
  }
}