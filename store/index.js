import Vue from 'vue'
import { setToken, getToken, setRefreshToken, getRefreshToken, getUserId } from "~/plugins/auth";
export const state = () => ({
  token: getToken(),
  refreshToken: getRefreshToken(),
  userId: '',
  userName: ''
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setRefreshToken(state, token) {
    state.refreshToken = token;
  },
  setUserId(state, id) {
    state.userId = id
  },
  setUserName(state, name) {
    state.userName = name
  }
}

export const actions = {
  Login({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      Vue.prototype.api.members.login(data).then((res) => {
        const { accessToken, refreshToken, code, message } = res.data;
        if (code === 200) {
          commit("setToken", accessToken);
          commit("setRefreshToken", refreshToken);
          setToken(accessToken)
          setRefreshToken(refreshToken)

          resolve('success');
        } else {
          resolve(message);
        }
      }).catch((err) => {
        reject(err);
      })
    })
  }
}
