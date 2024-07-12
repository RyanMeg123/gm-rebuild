/** @format */
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    message,
    Pagination,
    Row,
    Select,
    Space,
    Table,
    TableProps,
    theme,
    Tooltip,
} from 'antd'
import { useEffect, useState } from 'react'
import './index.css'
import { getServerList } from '../../interfaces/api'
import Icon from '@ant-design/icons'
import moment from 'moment'

const { Option } = Select
interface DataType {
    id: number
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}

const flexEnd = {
    display: 'flex',
    flexDirecton: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
}

const flexSpacebetween = {
    display: 'flex',
    flexDirecton: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const flexCenter = {
    display: 'flex',
    flexDirecton: 'row',
    justifyContent: 'center',
    alignItems: 'center',
}
export const ServerList: React.FC = () => {
    const { token } = theme.useToken()
    const [form] = Form.useForm()
    const [expand, setExpand] = useState(false)
    const [tableData, setTableData] = useState<any[]>([])
    const [searchParams, setSearchParams] = useState({})

    const getSever = async () => {
        try {
            const res = await getServerList({})
            console.log(res, 'ress')
            const { servers, total } = res.data.data
            setTableData(servers)
        } catch (error) {
            message.error('网络错误请稍后再试')
        }
    }

    const getTime = (t: any, record: any) => {
        let offsetFormat
        switch (record.zoneId) {
            case '1':
                offsetFormat = moment(t * 1000)
                    .utcOffset(0)
                    .format('YYYY-MM-DD HH:mm:ss')
                break
            case '2':
                offsetFormat = moment(t * 1000)
                    .utcOffset(-5)
                    .format('YYYY-MM-DD HH:mm:ss')
                break
            case '3':
                offsetFormat = moment(t * 1000)
                    .utcOffset(+8)
                    .format('YYYY-MM-DD HH:mm:ss')
                break
            default:
                offsetFormat = moment(t * 1000)
                    .utcOffset(+8)
                    .format('YYYY-MM-DD HH:mm:ss')
        }
        return t ? `${offsetFormat}` : '----'
    }
    useEffect(() => {
        getSever()
    }, [])

    const formStyle: React.CSSProperties = {
        width: '100%',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    }
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }

    const weightTitle = () => {
        return (
            <span style={{ cursor: 'pointer' }}>
                <span>推荐(权重值)</span>
                <Tooltip
                    title={'服务器状态为开服时权重值大于等于1时为推荐。'}
                    forceRender={true}
                    style={{ paddingTop: 5, paddingLeft: 2 }}
                >
                    <Icon type="question-circle" />
                </Tooltip>
            </span>
        )
    }
    const columns: TableProps<any>['columns'] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 100,
            align: 'center',
        },
        {
            title: '服ID',
            dataIndex: 'server_id',
            key: 'server_id',
            width: 100,
            align: 'center',
        },
        {
            title: '服务器类型',
            dataIndex: 'server_type',
            key: 'server_type',
            align: 'center',
            width: 120,
        },
        {
            title: '服务器名称',
            dataIndex: 'name',
            key: 'name',
            width: 120,
            align: 'center',
        },
        {
            title: '服务器短名字',
            dataIndex: 'short_name',
            key: 'short_name',
            width: 120,
            align: 'center',
        },
        {
            title: '服务器时区',
            dataIndex: 'zoneId',
            key: 'zoneId',
            width: 120,
            align: 'center',
        },
        {
            title: '地址',
            dataIndex: 'host',
            key: 'host',
            width: 100,
            align: 'center',
        },
        {
            title: '端口',
            dataIndex: 'port',
            key: 'port',
            width: 100,
            align: 'center',
        },
        {
            title: '在线人数',
            dataIndex: 'online_count',
            key: 'online_count',
            width: 100,
            align: 'center',
        },
        {
            title: '服务器状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 120,
            render: (text: any, record: any) => {
                console.log(record, 'record')
                return (
                    <div>
                        {text == 0 ? '维护' : text == 1 ? '关闭' : '开启'}
                    </div>
                )
            },
        },
        {
            title: weightTitle(),
            dataIndex: 'weight',
            key: 'weight',
            align: 'center',
            width: 130,
        },
        {
            title: '开服日期',
            dataIndex: 'open_time',
            key: 'open_time',
            align: 'center',
            width: 160,
            render: (text, record) => getTime(text, record),
        },
        // {
        //     title: '最后开服时间',
        //     dataIndex: 'maintain_end_time',
        //     key: 'maintain_end_time2',
        //     align: "center",
        //     width: 160,
        //     render: (text, record) => record.status !== 0 ? this.getMaintainTime(text, record) : '--'
        // },
        {
            title: '维护开始时间',
            dataIndex: 'maintain_start_time',
            key: 'maintain_start_time',
            align: 'center',
            width: 130,
            render: (text, record) =>
                record.status !== 1 ? getTime(text, record) : '--',
        },
        {
            title: '维护结束时间',
            dataIndex: 'maintain_end_time',
            key: 'maintain_end_time',
            align: 'center',
            width: 130,
            render: (text, record) =>
                record.status !== 1 ? getTime(text, record) : '--',
        },
        {
            title: '操作',
            width: 200,
            fixed: 'right',
            render: (text: any, record: any) => (
                <span>
                    {(record.server_id < 10000 || record.server_id > 19999) && (
                        <>
                            <a
                            // onClick={
                            //     () => this.editChange(record)
                            // }
                            >
                                编辑
                            </a>
                            <Divider type="vertical" />
                            <a
                            // onClick={() =>
                            //     this.handleOpenChange(record, 'recommend')
                            // }
                            >
                                推荐
                            </a>
                            <Divider type="vertical" />
                            <a
                            // onClick={() =>
                            //     // this.handleOpenChange(record, 'maintain')
                            // }
                            >
                                维护
                            </a>
                        </>
                    )}
                </span>
            ),
        },
    ]
    const serverStatusChange = (value: any) => {
        console.log(value, 'any')
        setSearchParams({
            serverStatus: value,
        })
    }
    const searchChange = async () => {
        console.log(searchParams, 'searchParams')
        try {
            const res = await getServerList(searchParams)
            console.log(res, 'ress')
            const { servers, total } = res.data.data
            setTableData(servers)
        } catch (error) {
            message.error('网络错误请稍后再试')
        }
    }
    return (
        <>
            <div className="searchContent">
                <Form
                    form={form}
                    name="advanced_search"
                    style={formStyle}
                    onFinish={onFinish}
                >
                    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="服务器状态"
                                className="componentWidth"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Select
                                    className="componentWidth"
                                    placeholder={'请选择服务器状态'}
                                    allowClear
                                    onChange={serverStatusChange}
                                    // value={serverStatus}
                                >
                                    <Option value={0}>维护</Option>
                                    <Option value={2}>关闭</Option>
                                    <Option value={1}>开启</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="服务器时区"
                                className="componentWidth"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Select
                                    className="componentWidth"
                                    placeholder={'请选择服务器时区'}
                                    allowClear
                                    // onChange={this.zoneidChange}
                                    // value={zoneId}
                                >
                                    <Option value="3">东南亚大区</Option>
                                    <Option value="2">北美大区</Option>
                                    <Option value="1">欧洲大区</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="服务器名称"
                                className="componentWidth"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input
                                    placeholder="请输入服务器名称"
                                    className="componentWidth"
                                    allowClear
                                    // value={serverName}
                                    // onChange={this.serverNameChange}
                                    maxLength={40}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                label="服务器ID"
                                className="componentWidth"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Input
                                    placeholder="请输入服务器ID"
                                    className="componentWidth"
                                    allowClear
                                    // value={serverId}
                                    // onChange={this.serverIdChange}
                                    maxLength={10}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="服务器类型"
                                className="componentWidth"
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 18 }}
                            >
                                <Select
                                    className="componentWidth"
                                    placeholder={'请选择服务器类型'}
                                    allowClear
                                    // onChange={this.serverTypeChange}
                                    // value={serverType}
                                >
                                    {/* <Option value="0">关闭</Option> */}
                                    <Option value="1">正式</Option>
                                    <Option value="2">测试</Option>
                                    {/* <Option value="3">审核</Option> */}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row
                        justify="center"
                        gutter={[16, 16]}
                        style={{ width: '100%' }}
                    >
                        <Button
                            type="primary"
                            style={{ marginTop: 10 }}
                            onClick={searchChange}
                        >
                            查询
                        </Button>
                        <Button
                            type="default"
                            style={{ marginLeft: 20, marginTop: 10 }}
                            // onClick={this.resetChange}
                        >
                            重置
                        </Button>
                    </Row>
                </Form>
            </div>

            <div className="tableContent">
                <div style={flexSpacebetween}>
                    <div style={flexCenter}>
                        <Button
                            type="primary"
                            style={{ width: 130, marginBottom: 10 }}
                            // onClick={this.handleAdd}
                        >
                            新增服务器
                        </Button>
                        <Button
                            type="primary"
                            style={{
                                width: 150,
                                marginBottom: 10,
                                marginLeft: 10,
                            }}
                            ghost
                            // onClick={() =>
                            //     this.handleGetServerListChange(
                            //         {},
                            //         { isRefresh: true }
                            //     )
                            // }
                            // loading={this.state.refreshLoading}
                        >
                            刷新服务器状态
                        </Button>
                        <Button
                            type="primary"
                            style={{
                                width: 150,
                                marginBottom: 10,
                                marginLeft: 10,
                            }}
                            // onClick={() => this.batchChange('onekey')}
                        >
                            一键维护
                        </Button>
                    </div>
                    <div style={flexCenter}>
                        <Button
                            style={{ marginBottom: 10 }}
                            // disabled={openBatchDisable}
                            // onClick={() => this.batchChange('open')}
                        >
                            批量开服
                        </Button>
                        <Button
                            style={{ marginBottom: 10, marginLeft: 10 }}
                            // disabled={maintainBatchDisable}
                            // onClick={() => this.batchChange('maintain')}
                        >
                            批量维护
                        </Button>
                        <Button
                            style={{ marginBottom: 10, marginLeft: 10 }}
                            // disabled={recommendBatchDisable}
                            // onClick={() => this.batchChange('recommend')}
                        >
                            批量推荐
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    tableLayout={'fixed'}
                    rowKey={(record) => record.id}
                    pagination={false}
                    scroll={{ x: 1500 }}
                    dataSource={tableData}
                    // rowSelection={rowSelection}
                />
                <div style={flexEnd}>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        // onChange={this.pageNumberChange}
                        // onShowSizeChange={this.onShowSizeChange}
                        // current={pageNumber}
                        // total={pageTotal}
                    />
                </div>
            </div>
        </>
    )
}
