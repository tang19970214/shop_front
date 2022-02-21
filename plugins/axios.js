import Swal from 'sweetalert2';

import { getToken, getRefreshToken, removeToken } from './auth';

export default ({ $axios, redirect }, inject) => {
  const token = getToken();

  const service = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
        Authorization: `Bearer ${token}`
      }
    }
  });
  service.setBaseURL(process.env.VUE_APP_BASE_API);

  service.onResponse((response) => {
      if (response.data.code !== 200) {
        Swal.fire({
          icon: 'error',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
      return response;
    });

    service.onError((error) => {
        const { response } = error;

        if (response) {
            errorHandle(response.status, response);
            return Promise.reject(error);
        } else {
            return Promise.reject(error)
        }
    })

  const errorHandle = (status, response) => {
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
    // TODO: cookie -> refreshToken重新登入，若成功 執行res.config.baseUrl+res.config.url+res.config.params; 反之，導至登入頁

    // const query = {
    //   accessToken: getToken(),
    //   refreshToken: getRefreshToken()
    // }
    redirect('/login')
  }


  inject('request', service)
}
