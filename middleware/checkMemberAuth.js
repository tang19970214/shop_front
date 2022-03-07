import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
export default ({ req, redirect, route }) => {
  /* 白名單 */
  const whiteList = ['/login', '/register'];
  let token = ''

  // 判斷 server端
  if (process.server) {
    // 假如 cookie 一個 key值都沒有的話會是 undefined，所以要先判斷
    const getToken = req.headers.cookie
    if (getToken !== undefined) {
      token = req.headers.cookie.replace(/(?:(?:^|.*;\s*)Authorization\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (!token) {
        if (whiteList.includes(route.name) || whiteList.includes(route.matched[0]?.path)) return;
        redirect('/login');
      } else {
        if (whiteList.includes(route.name) || whiteList.includes(route.matched[0]?.path)) {
          redirect('/')
        }
      }
      // if (token === '' || token === null || token === undefined) {
      //   if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') { return }
      //   redirect(`/login`);
      // } else if (token !== '') {
      //   if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') {
      //     redirect(`/`);
      //   }
      // }
    } else {
      if (whiteList.includes(route.name) || whiteList.includes(route.matched[0]?.path)) return;
      redirect('/login');
      // if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') { return }
      // redirect(`/login`)
    }
  }
  // 判斷 client端
  if (process.client) {
    token = Cookies.get('Authorization')
    console.log('route', route);
    if (!token) {
      if (whiteList.includes(route.name) || whiteList.includes(route.matched[0]?.path)) return;
      redirect('/login')
    } else {
      if (whiteList.includes(route.name) || whiteList.includes(route.matched[0]?.path)) {
        redirect('/')
        Swal.fire({
          icon: "warning",
          title: "請先登入！",
          timer: 1500,
          showConfirmButton: false
        })
      }
    }

    if (token === '' || token === null || token === undefined) {
      if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') { return }
      redirect(`/login`);
    } else if (token !== undefined) {
      if (route.name === 'login' || route.name === 'register' || route.name === 'register-mail' || route.name === 'register-finish') {
        redirect(`/`);
      }
    }
  }
}
