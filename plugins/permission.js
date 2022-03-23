import { getToken, getRefreshToken } from "~/plugins/auth.js"

export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    // 取得 Token
    const token = getToken()
    const refreshToken = getRefreshToken()
    store.commit('setToken', token)
    store.commit('setRefreshToken', refreshToken)

    next()
  })
}