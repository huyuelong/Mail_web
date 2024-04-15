import httpInstance from "@/utils/http"

// 登录
export const loginAPI = ({ username, password }) => {
    return httpInstance.post('api/login', { username, password })
}

// 注册
export const regUserAPI = ({ username, password }) => {
    return httpInstance.post('api/regUser', { username, password })
}


