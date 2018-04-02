export default () => {
  console.log(process.browser)
  if (process.browser) {
    window._nuxtReadyCbs = []
    window.onNuxtReady = function (cb) {
      window._nuxtReadyCbs.push(cb)
    }
  }
}
