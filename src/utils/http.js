// axios基础封装
import axios from 'axios'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://127.0.0.1:3007',
    timeout: 5000
})


// 添加请求拦截器
httpInstance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    // 获取token数据
    const userStore = useUserStore()
    // 拼接token
    const token = userStore.userInfo.token
    if (token) {
        config.headers.Authorization = `${token}`
    }
    return config
}, e => {
    // 对请求错误做些什么
    return Promise.reject(e)
})

// 添加响应拦截器
httpInstance.interceptors.response.use(response => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
}, e => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage({
        type: 'warning',
        message: e.response.data.msg || e.response.data.message
    })

    // token失效处理
    const userStore = useUserStore()
    if (e.response.status === 401) {
        userStore.clearInfo()
        router.push('/login')
    }
    return Promise.reject(e)
})

export default httpInstance