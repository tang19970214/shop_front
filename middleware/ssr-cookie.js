export default ({ $axios, req }) => {
    //   console.log('have auth', !!Auth, Auth);
    if (process.server) {
      let cookieArr = req.headers.cookie;
      const Auth = getCookie('Authorization', cookieArr);
      console.log('Auth', Auth);
        $axios.defaults.headers.common.Authorization = Auth
    // console.log('axios', $axios.defaults.headers);
  }
}

function getCookie(name, strCookie) {
  let arrCookie = strCookie.split(';')
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split('=')
    if (arr[0].trim() === name) {
      return arr[1]
    }
  }
  return {}
}
