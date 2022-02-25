import Swal from 'sweetalert2'
import { getToken, getRefreshToken, setToken, setRefreshToken } from './auth'
import Vue from 'vue'

export default ({ $axios, redirect }, inject) => {
  const token = getToken()

  const service = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
        Authorization: `Bearer ${token}`
      }
    }
  })
  service.setBaseURL(process.env.VUE_APP_BASE_API)

  service.interceptors.response.use((response) => {
    return response
  }, (errorRes) => {
    switch(errorRes.response.status) {
      //! 判斷是否需要 refresh token，假如需要，打一隻 refresh api，正確取得後更新 token cookie 否則導回登入頁
      //! 正確取得 refresh token 並且更新 cookie 後，取得原本取得失敗的 api url，並且重新打一次，假如正確取得就回傳取得後資料，否則導回登入頁
      case 401:
        console.log('401 error')
        const tokens = {
          accessToken: getToken(),
          refreshToken: getRefreshToken()
        }
        const { baseURL, url, method, data } = errorRes.config
        return new Promise((resolve, reject) => {
          Vue.prototype.api.members.refresh(tokens)
          .then((res) => {
            const { accessToken, refreshToken } = res.data
            let reGetAPI = {}
            reGetAPI.headers = {}
            reGetAPI.headers.Authorization = `Bearer ${accessToken}`
            reGetAPI.url = baseURL + url
            reGetAPI.method = method
            $axios(reGetAPI)
            .then((reGetRes) => {
              setToken(accessToken)
              setRefreshToken(refreshToken)
              resolve(reGetRes)
            })
            .catch((err) => {
              reject(err)
              redirect('/login')
            })
          })
          .catch((err) => {
            reject(err)
            redirect('/login')
          })
        })
        break
      default:
        console.log('testttt')
        if(errorRes.response.code) {
          switch(errorRes.response.code) {
            default:
              Swal.fire({
                icon: 'error',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
              })
          }
        }
        break
    }
  })

  inject('request', service)
}
