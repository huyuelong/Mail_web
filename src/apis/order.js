import httpInstance from "@/utils/http"

// 创建订单
export const createOrderAPI = (orderData) => {
    return httpInstance.post('api/order', orderData)
}

// 获取当前最新订单
export const getLatestOrderAPI = () => {
    return httpInstance('api/getLatestOrder')
}