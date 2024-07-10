/** @format */

import axios from 'axios'
import qs from 'qs'
const axiosInstance = axios.create({
    //创建axios实例，在这里可以设置请求的默认配置
    baseURL: 'http://127.0.0.1:3000',
    timeout: 3000,
})
axiosInstance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('access_token')

    if (accessToken) {
        config.headers.authorization = 'Bearer ' + accessToken
    }
    return config
})

// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
axiosInstance.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded'

let httpCode = {
    //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
    400: '请求参数错误',
    401: '权限不足, 请重新登录',
    403: '服务器拒绝本次访问',
    404: '请求资源未找到',
    500: '内部服务器错误',
    501: '服务器不支持该请求中使用的方法',
    502: '网关错误',
    504: '网关超时',
}

/** 添加请求拦截器 **/
axiosInstance.interceptors.request.use(
    (config) => {
        if (config.method === 'get') {
            // 添加时间戳参数，防止浏览器（IE）对get请求的缓存
            config.params = {
                ...config.params,
                t: new Date().getTime(),
            }
        }
        return config
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            method: 'get',
            url,
            params,
            headers: {
                accessToken: '',
            },
            ...config,
        })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    data = qs.stringify(data)
    return new Promise((resolve, reject) => {
        axiosInstance({
            method: 'post',
            url,
            data,
            ...config,
        })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
/* 统一封装put请求  */
export const put = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            method: 'put',
            url,
            data,
            ...config,
        })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export const Delete = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            method: 'delete',
            url,
            data,
            ...config,
        })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
/* 统一封装patch请求  */
export const patch = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        axiosInstance({
            method: 'patch',
            url,
            data,
            ...config,
        })
            .then((response) => {
                resolve(response)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
