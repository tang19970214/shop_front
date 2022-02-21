import Vue from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken, getRefreshToken, removeToken } from './auth';

const token = getToken();
console.log('request:7/token', token);
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 50000
})

service.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      Vue.prototype.$swal.fire({
        icon: 'error',
        title: response.data.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
    return response
  },
  (error) => {
    const { response } = error;

    if (response) {
      errorHandle(response.status, response);
      return Promise.reject(error);
    } else {
      return Promise.reject(error)
    }
  }
)

const errorHandle = (status, response) => {
  console.log('request:41/status', status);
  switch (status) {
    case 401:
      tokenExpire(response);
      break;

    case 404:
      window.$nuxt.$router.replace('/404')
      break;

    default:
      console.log(response);
      break;
  }
}

const tokenExpire = (res) => {
  // console.log('request:58/401 function:', res.config);
// TODO: 以cookie -> refreshToken重新登入，若成功 執行res.config.baseUrl+res.config.url+res.config.params; 反之，導至登入頁
  const query = {
    accessToken: getToken(),
    refreshToken: getRefreshToken()
  }
  console.log('request:64/query', query);

// console.log('401');
  // 白名單就過，不是就跳登入頁
  // let whiteList = ['/login', '/404'];
  // if (whiteList.includes(window.$nuxt.$route.path) == -1 || whiteList.includes(window.$nuxt.$route.matched[0]?.path) == -1) {
  //   if (window.$nuxt.$route.path !== "/login") {
      // Swal.fire({
      //   icon: "warning",
      //   title: '登入逾時...請重新登入',
      //   showConfirmButton: false,
      //   timer: 1500,
      //   timerProgressBar: true,
      // }).then((result) => {
      //   if (result.dismiss === Swal.DismissReason.timer) {
      //     removeToken()
      //     window.$nuxt.$router.replace("/login")
      //   }
      // })
  //   }
  // }
}

export default service
