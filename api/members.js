import Qs from 'qs';
import api from './index'

const toQsFrom = (data) => Qs.stringify(data)

export const getUserProfile = (data) => api.get('check/getUserProfile', { params: data })
export const login = (data) => api.post('members/login', data)
export const getRegistVerifyCode = (data) => api.get('members/getregistverifycode', { params: data })
export const getMemberByToken = () => api.get('members/getmemberbytoken')
export const refresh = (data) => api.post('members/refresh', data)
export const getLineToken = (data) => api.post('https://api.line.me/oauth2/v2.1/token', toQsFrom(data))
export const getLineProfiles = (idToken) => api.get('https://api.line.me/v2/profile', { headers: { Authorization: `Bearer ${idToken}` } })
export const uploadFiles = (data) => api.post('files/upload', data)