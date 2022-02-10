import request from '../request'

const api = {
  login(data) {
    return request({
      url: "check/login",
      method: "post",
      data
    })
  },
}

export default api;
