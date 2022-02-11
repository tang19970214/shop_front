import request from '../request'

const api = {
  login(data) {
    return request({
      url: "members/login",
      method: "post",
      data
    })
  },
}

export default api;
