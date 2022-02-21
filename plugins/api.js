import Vue from 'vue'

export default ({ $request }, inject) => {
  const api = {
    check: {
      login(data) {
        return $request({
          url: "check/login",
          method: "post",
          data
        })
      },
      getUserProfile(params) {
        return $request({
          url: "check/getUserProfile",
          method: "get",
          params
        })
      },
    },
    members: {
        login(data) {
            return $request({
                url: "members/login",
                method: "post",
                data
            })
        }
    }
  }

  Vue.prototype.api = api
  inject('api', api)
}
