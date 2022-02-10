import Vue from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getToken, removeToken } from './auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 50000
})

service.interceptors.request.use(
  (config) => {
    const token = getToken();
    token && (config.headers['Authorization'] = 'Bearer ' + token)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

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
    const {
      response
    } = error;

    if (response) {
      errorHandle(response.status, response);
      return Promise.reject(error);
    } else {
      return Promise.reject(error)
    }
  }
)

const errorHandle = (status, response) => {
  switch (status) {
    case 401:
      tokenExpire();
      break;

    case 404:
      window.$nuxt.$router.replace('/404')
      break;

    default:
      console.log(response);
      break;
  }
}

const tokenExpire = () => {
  // 白名單就過，不是就跳登入頁
  let whiteList = ['/login', '/404'];
  if (whiteList.includes(window.$nuxt.$route.path) == -1 || whiteList.includes(window.$nuxt.$route.matched[0]?.path) == -1) {
    if (window.$nuxt.$route.path !== "/login") {
      Swal.fire({
        icon: "warning",
        title: '登入逾時...請重新登入',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          removeToken()
          window.$nuxt.$router.replace("/login")
        }
      })
    }
  }
}

export default service
