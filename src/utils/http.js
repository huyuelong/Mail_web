// axios基础封装
import axios from 'axios'

// 创建axios实例
const httpInstance = axios.create({
    baseURL: 'http://127.0.0.1:3007',
    timeout: 5000
})


// 添加请求拦截器
httpInstance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
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
    return Promise.reject(e)
})

export default httpInstance