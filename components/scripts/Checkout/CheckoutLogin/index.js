import { mapState, mapActions } from 'vuex'

export default {
  name: 'CheckoutLogin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      this.$store.dispatch('onSubmitPopupLogin', this.$router)
    },
    ...mapActions({
      onChange: 'onChangeForm'
    })
  },
  computed: {
    ...mapState({
      data (state) {
        const {formData: {popupLogin: {...data} = {}}} = state
        this.email = data.email
        this.password = data.password

        return data
      },
      meta: (state) => ({
        ...state.formMeta['popupLogin']
      }),
      user: (state) => ({
        ...state.user
      })
    })
  },
  watch: {
    meta () {
      if (this.user.user_number) {
      }
    }
  }
}
