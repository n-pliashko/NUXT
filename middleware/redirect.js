export default function ({store, route, redirect}) {
  let path = route.path
  let redirect_path = store.state.redirects.filter(obj => {
    return path.match(obj.path)
  })
  if (redirect_path && redirect_path.length === 1) {
    redirect('301', redirect_path[0].redirect)
  }
}
