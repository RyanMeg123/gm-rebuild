/** @format */

export function setLoginToken(token) {
    return localStorage.setItem('access_token', token)
}

export function getLoginToken(token) {
    return localStorage.getItem('access_token', token)
}

/**
 *  清除用户登录凭证
 */
export function clearLoginToken() {
    return localStorage.removeItem('access_token')
}

export function isVaildToken(token) {
    let strings = token.split('.')
    let userinfo = JSON.parse(
        decodeURIComponent(
            escape(
                window.atob(strings[1].replace(/-/g, '+').replace(/_/g, '/'))
            )
        )
    )
    console.log(userinfo, 'userinfo')
    let currentDate = Math.floor(+new Date() / 1000) + 60 * 10
    return currentDate < userinfo.exp
}
