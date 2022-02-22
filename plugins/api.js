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
        },
        getLineToken(data) {
          return $request({
            url: "https://api.line.me/oauth2/v2.1/token",
            method: "post",
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            },  
            data
          })
        },
        getLineProfiles(tokenRes) {
          const {
            id_token,
            token_type
          } = tokenRes;
          let url = "https://api.line.me/v2/profile?Authorization";
          url += `${token_type}`;
          url += `${id_token}`;
          return $request({
            url: url,
            method: "get"
          })
        }
    }
  }

  Vue.prototype.api = api
  inject('api', api)
}
