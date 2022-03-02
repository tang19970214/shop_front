import Cookies from 'js-cookie'
export default ({ req, redirect }) => {
  let token = null
  // 判斷 server端
  if (process.server) {
    token = req.headers.cookie.replace(/(?:(?:^|.*;\s*)Authorization\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (token === '') {
      redirect(`${process.env.VUE_APP_REDIRECTURI}/login`);
    }
  }
  // 判斷 client端
  if (!process.server) {
    token = Cookies.get('Authorization')
    if (token === undefined) {
      redirect(`${process.env.VUE_APP_REDIRECTURI}/login`);
    }
  }
}
