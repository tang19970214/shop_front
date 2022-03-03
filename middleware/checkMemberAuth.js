import Cookies from 'js-cookie'
export default ({ req, redirect, route }) => {
  let token = null
  // 判斷 server端
  if (process.server) {
    token = req.headers.cookie.replace(/(?:(?:^|.*;\s*)Authorization\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (token === '' || token === null) {
      if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') { return }
      redirect(`/login`);
    } else if (token !== '') {
      if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') {
        redirect(`/`);
      }
    }
  }
  // 判斷 client端
  if (process.client) {
    token = Cookies.get('Authorization')
    if (token === undefined) {
      if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') { return }
      redirect(`/login`);
    } else if (token !== undefined) {
      if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') {
        redirect(`/`);
      }
    }
  }
}
