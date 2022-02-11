import request from '../request'

const api = {
  login(data) {
    return request({
      url: "check/login",
      method: "post",
      data
    })
  },
  getUserProfile(params) {
    return request({
      url: "check/GetUserProfile",
      method: "get",
      params
    })
  },
}

export default api;
