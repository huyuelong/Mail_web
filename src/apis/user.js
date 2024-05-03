import httpInstance from "@/utils/http"

// 登录
export const loginAPI = ({ username, password }) => {
    return httpInstance.post('api/login', { username, password })
}

// 注册
export const regUserAPI = ({ username, password }) => {
    return httpInstance.post('api/regUser', { username, password })
}

// 获取用户全部信息
export const getUserInfoAPI = () => {
    return httpInstance('api/getUserInfo')
}

// 信息修改
export const updateUserInfoAPI = (userInfoData) => {
    return httpInstance.put('api/updateuserinfo', userInfoData)
}

// 更新头像
export const updateAvatarAPI = (user_avatar) => {
    return httpInstance.put('api/updateavatar', user_avatar)
}
