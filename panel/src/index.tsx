/** @format */

import ReactDOM from 'react-dom/client'
import './index.css'
import {
    RouterProvider,
    createBrowserRouter,
    Link,
    Outlet,
} from 'react-router-dom'

import App from './App.js'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>
)
