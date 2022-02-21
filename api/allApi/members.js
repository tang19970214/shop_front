import request from '../request'

const api = {
  login(data) {
    return request({
      url: "members/Login",
      method: "post",
      data
    })
  },
  add(data) {
    return request({
      url: "members/Add",
      method: "post",
      data
    })
  },
  getRegistVerifyCode(params) {
    return request({
      url: "members/GetRegistVerifyCode",
      method: "get",
      params
    })
  },
  checkRegistVerifyCode(params) {
    return request({
      url: "members/CheckRegistVerifyCode",
      method: "get",
      params
    })
  },
}

export default api;
