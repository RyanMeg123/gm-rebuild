/** @format */

import { makeAutoObservable } from 'mobx'
import { getLoginToken, isVaildToken } from '../utils/tool'
import { refreshToken } from '../interfaces/interfaces'

class AuthStore {
    isAuthenticated = false

    constructor() {
        makeAutoObservable(this)
    }

    isLoggedIn() {
        const token = getLoginToken()
        console.log(token, 'sdsdfseeee')
        if (token == 'undefined') {
            this.isAuthenticated = false
        } else {
            const isExpri = !token ? false : isVaildToken(token)
            console.log(isExpri, 'idsds')
            this.isAuthenticated = isExpri
            if (!isExpri) {
                this.loginRefreshToken()
            }
        }
    }

    async loginRefreshToken() {
        if (!this.isAuthenticated) {
            const res = await refreshToken()
            console.log(res, 'resresresres')
        }
    }

    login() {
        this.isAuthenticated = true
    }

    logout() {
        this.isAuthenticated = false
    }
}

const authStore = new AuthStore()
export default authStore
