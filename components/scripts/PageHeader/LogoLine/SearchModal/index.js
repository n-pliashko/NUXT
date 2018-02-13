export default {
  name: 'SearchModal',
  data () {
    return {
      inputSearchText: ''
    }
  },
  methods: {
    handleSubmit: function (e) {
      e.preventDefault()
      if (this.inputSearchText) {
        this.$router.push({name: 'catalogue-index-term-search', params: {search: this.inputSearchText}})
      } else {
        e.stopPropagation();
      }
    }
  }
}
