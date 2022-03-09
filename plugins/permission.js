import { getToken } from "~/plugins/auth.js"

export default ({ app, store }) => {
    const token = getToken()
    app.router.beforeEach((to, from, next) => {
        store.commit('setToken', token)

        next()
    })
}