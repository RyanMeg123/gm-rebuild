/** @format */

import { Outlet, useLocation } from 'react-router-dom'
import { Menu as AntdMenu, MenuProps } from 'antd'
import './menu.css'
import { observer } from 'mobx-react'
import { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { router } from '../../routes'
import { ConsoleSqlOutlined, SpotifyOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import toolStore from '../../stores/ToolStore'

const items: MenuProps['items'] = [
    {
        key: 'sub1',
        label: '服务器管理',
        icon: <SpotifyOutlined />,
        children: [
            {
                key: 'server_list',
                label: '服务器列表',
            },
        ],
    },
    {
        key: '1',
        label: '会议室管理',
    },
    {
        key: '2',
        label: '预定管理',
    },
    {
        key: '3',
        label: '用户管理',
    },
    {
        key: '4',
        label: '统计',
    },
]

export const Menu = observer(() => {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false)
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const prevLocationRef = useRef<string>()
    const handleMenuItemClick: MenuClickEventHandler = (info) => {
        console.log(info, 'infoinfoinfo')
        localStorage.setItem('selected_key', info.key)
        localStorage.setItem('open_key', info.keyPath[info.keyPath.length - 1])
        let path = ''
        switch (info.key) {
            case '1':
                path = '/meeting_room_manage'
                break
            case '2':
                path = '/booking_manage'
                break
            case '3':
                path = '/user_manage'
                break
            case '4':
                path = '/statistics'
                break
            case 'server_list':
                path = '/server_manager/list'
                break
        }
        router.navigate(path)
    }

    useEffect(() => {
        const pathSnippets = location.pathname.split('/').filter((i) => i)
        const openPath = pathSnippets.length ? [`/${pathSnippets[0]}`] : []
        setOpenKeys(openPath)
    }, [location])
    useEffect(() => {
        console.log(toolStore.getCurrentSelectedKey(), 'dddddd')
        console.log(
            toolStore.currentSelectedKey,
            'toolStore.currentSelectedKey'
        )
    }, [])

    return (
        <div id="menu-container">
            <div className="menu-area">
                <AntdMenu
                    defaultSelectedKeys={toolStore.getCurrentSelectedKey()}
                    defaultOpenKeys={toolStore.getCurrentOpenKey()}
                    items={items}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    onClick={handleMenuItemClick}
                />
            </div>
            <div className="content-area">
                <Outlet></Outlet>
            </div>
        </div>
    )
})
