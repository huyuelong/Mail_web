import httpInstance from "@/utils/http"

// 去支付
export const alipayAPI = ({ orderId, totalAmount }) => {
    return httpInstance.post('api/alipay', { orderId, totalAmount })
}


export const querypayAPI = ({ out_trade_no, trade_no }) => {
    return httpInstance.post('api/querypay', { out_trade_no, trade_no })
}

