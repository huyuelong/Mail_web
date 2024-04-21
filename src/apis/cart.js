import httpInstance from "@/utils/http"

//加入购物车
export const addCartAPI = ({ skuId, count, istraded }) => {
    return httpInstance.post('api/cart', { skuId, count, istraded })
}

// 获取购物车
export const getCartAPI = () => {
    return httpInstance({
        url: 'api/cart'
    })
}

// 删除购物车
export const delCartAPI = (skuIds) => {
    return httpInstance.delete('api/delCart', { data: { skuIds } })
}
