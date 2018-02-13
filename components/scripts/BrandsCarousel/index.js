import Slick from 'vue-slick'

export default {
  name: 'BrandsCarousel',
  components: { Slick },
  data () {
    return {
      slickOptions: {
        autoplay: true,
        infinite: true,
        swipeToSlide: true,
        arrows: true,
        mobileFirst: true,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 300,
            settings: {
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToScroll: 2,
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToScroll: 2,
              slidesToShow: 8
            }
          }
        ]
      }
    }
  }
}
