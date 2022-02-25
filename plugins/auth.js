import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const refreshToken = 'refreshToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // const date = new Date()
  // date.setTime(date.getTime() + (86400 * 1000)); //! 設定有效期限為一天
  return Cookies.set(TokenKey, token, { expires: 3 }) //! 設定有效期限為三天
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(refreshToken)
}

export function setRefreshToken(token) {
  return Cookies.set(refreshToken, token)
}

export function removeRefreshToken() {
  return Cookies.remove(refreshToken)
}
