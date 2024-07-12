/** @format */

import { get, put, post, patch, Delete } from '../utils/request.js'

export const updateUserInfoCaptcha = (params) =>
    get('/user/update/captcha', params)

// export const refreshToken = (params) => get('/user/admin/refresh', params)

export const freeze = (params) => {
    return post('/user/freeze', params)
}

export const getServerList = (params) => {
    return get('/servers/list', params)
}
