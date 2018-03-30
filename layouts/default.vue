<template>
  <div id="app">
    <div id="mainWrapper">
      <nuxt/>
    </div>
  </div>
</template>

<script>
 // import store from '~/store/index.js'

  export default {
    // store,
    head: {
      title: 'SelectSpecs',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'}
      ],
      script: [
        {src: 'https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js'},
        {src: 'https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js'},
        {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'},
        {src: 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js'},
        {src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js'},
        {src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js'},
        {src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.rateit/1.1.1/jquery.rateit.min.js'},
        {src: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.7.1/slick.min.js'}
      ],
      link: [
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css'},
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto'},
        {
          rel: 'icon',
          href: 'https://d9qzjwuieyamt.cloudfront.net/res/css/uk/favicon.ico?20170810162830',
          type: 'image/x-icon'
        },
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-mobile/1.4.5/jquery.mobile.min.css'},
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.7.1/slick.min.css'},
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.7.1/slick-theme.min.css'},
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'},
        {rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.rateit/1.1.1/rateit.min.css'},
        {href: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.rateit/1.1.1/star.gif'},
        {
          rel: 'contents',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf',
          type: 'application/x-font-ttf'
        },
        {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/foundation-icons/3.0/foundation-icons.min.css'},
      ]
    },
    mounted () {
     /* this.$store.dispatch('loadRedirects')
      this.$store.dispatch('loadAllCurrencies')
      this.$store.dispatch('checkUser')
      this.$store.dispatch('getBasket')
      this.$store.dispatch('loadCategories', null)
      this.$store.dispatch('loadDesigners', null)
      this.$store.dispatch('loadMenus')
      this.$store.dispatch('loadMobileMenu')*/
    }
  }
</script>
