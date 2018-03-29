export default function ({ store, route }) {
  const {path} = route
  console.log(route)

  let menuData = {
    link: path
  }
  store.dispatch('getMenuDescription', [menuData, route])
}
