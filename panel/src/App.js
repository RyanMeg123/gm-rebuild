/** @format */
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import { observer } from 'mobx-react'
import { Index } from './pages/Index/Index.tsx'
import { Login } from './pages/Login/Login.tsx'
import { router } from './routes'
import authStore from './stores/AuthStore'
const App = observer(() => {
    authStore.isLoggedIn()

    return <RouterProvider router={router} />
})
export default App
