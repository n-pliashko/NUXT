import Slick from 'vue-slick'

export default {
  name: 'ExcellentCarousel',
  components: { Slick },
  data () {
    return {
      slickOptions: {
        autoplay: true,
        speed: 700,
        infinite: true,
        swipeToSlide: true,
        arrows: false,
        slidesToShow: 1,
        fade: true
      }
    }
  }
}
