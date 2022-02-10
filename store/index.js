import {
  setToken,
  getToken,
} from "../api/auth";

export const state = () => ({
  token: getToken(),
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
}

export const actions = {
  Login({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      const param = {
        account: data.account,
        password: data.password,
        appKey: ""
      }
      $api.check.login(param).then((res) => {
        console.log('store/index:17', res);
        const {
          code,
          message,
          token
        } = res.data;
        if (code === 200) {
          setToken(token)
          commit("setToken", token)
          resolve('success')
        } else {
          resolve(message)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },

}
