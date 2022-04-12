import Vue from 'vue'
import {
  login,
  getUserProfile,
  getRegistVerifyCode,
  getMemberByToken,
  refresh,
  uploadFiles,
  getLineToken,
  getLineProfiles
} from '~/api/members'

export default ({ redirect }, inject) => {
  const api = {
    check: {
      getUserProfile
    },
    members: {
      login,
      getRegistVerifyCode,
      getMemberByToken,
      refresh,
      uploadFiles,
      getLineToken,
      getLineProfiles,
    }
  }

  Vue.prototype.api = api
  Vue.prototype.redirect = redirect
  inject('api', api)
}
