import httpInstance from "@/utils/http"

// 创建订单
export const createOrderAPI = (orderData) => {
    return httpInstance.post('api/order', orderData)
}

// 获取当前最新订单
export const getLatestOrderAPI = () => {
    return httpInstance('api/getLatestOrder')
}

// 获取用户全部订单的全部数据或特定状态的订单数据
// export const getAllOrderAPI = (orderState) => {
//     return httpInstance('api/getAllOrder', { params: orderState })
// }

export const getAllOrderAPI = (orderState) => {
    return httpInstance.get('api/getAllOrder', {
      params: {
        orderState
      }
    });
  };

// export const getAllOrderAPI = (params) => {
//     return httpInstance({
//       url:'api/getAllOrder',
//       method:'GET',
//       params
//     })
//   }