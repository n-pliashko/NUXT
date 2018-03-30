export default function ({ store, route }) {
  const {path} = route

  let menuData = {
    link: path
  }
  store.dispatch('getMenuDescription', [menuData, route])
}
