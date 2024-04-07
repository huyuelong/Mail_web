import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user.js'

export const useUserStore = defineStore('userInfo', () => {
    // 用户信息数据
    const userInfo = ref({})
    const getUserInfo = async ({ username, password }) => {
        const res = await loginAPI({ username, password })
        // console.log(res)
        userInfo.value = res.data.result
        console.log(userInfo)
    }

    // 退出登录时清除用户信息
    const clearInfo = () => {
        userInfo.value = {}
    }
    return {
        userInfo,
        getUserInfo,
        clearInfo
    }
}, {
    persist: true,
})