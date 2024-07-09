/** @format */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { observer } from 'mobx-react'
import authStore from './stores/AuthStore'

const PrivateRoute = observer(({ children }) => {
    console.log(authStore.isAuthenticated, '过期')
    return authStore.isAuthenticated ? children : <Navigate to="/login" />
})

export default PrivateRoute
