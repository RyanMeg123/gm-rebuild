/** @format */

import { makeAutoObservable } from 'mobx'
import { getLoginToken, isVaildToken } from '../utils/tool'

class AuthStore {
    isAuthenticated = false

    constructor() {
        makeAutoObservable(this)
    }

    isLoggedIn() {
        const token = getLoginToken()
        console.log(token, 'sdsdfs')
        const isExpri = isVaildToken(token)
        console.log(isExpri, 'idsds')
        this.isAuthenticated = isExpri
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
