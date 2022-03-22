import Vue from 'vue'
import Qs from 'qs';

Vue.prototype.Qs = Qs;

const toQsFrom = (data) => Qs.stringify(data)

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
      },
      logout(data) {
        return $request({
          url: "/member/logout",
          method: "post",
          data
        })
      },
      getRegistVerifyCode(params) {
        return $request({
          url: "members/getregistverifycode",
          method: "get",
          params
        })
      },
      add(data) {
        return $request({
          url: "members/add",
          method: "post",
          data
        })
      },
      get() {
        return $request({
          url: "members/get",
          method: "get"
        })
      },
      async getMemberByToken() {
        return await $request({
          url: "members/getmemberbytoken",
          method: "get"
        })
      },
      async refresh(data) {
        return await $request({
          url: "members/refresh",
          method: "post",
          data
        })
      },
      async uploadFiles(data) {
        return await $request({
          url: "files/upload",
          method: "post",
          data
        })
      },
      async getLineToken(data) {
        return await $request({
          url: "https://api.line.me/oauth2/v2.1/token",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          method: "post",
          data: toQsFrom(data)
        })
      },
      getLineProfiles(idToken) {
        let url = "https://api.line.me/v2/profile";
        return $request({
          headers: { Authorization: `Bearer ${idToken}` },
          url,
          method: "get"
        })
      }
    }
  }

  Vue.prototype.api = api
  inject('api', api)
}
