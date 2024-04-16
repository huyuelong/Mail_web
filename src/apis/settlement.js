import httpInstance from "@/utils/http"

// 获取购物车
export const getAddressAPI = () => {
    return httpInstance({
        url: 'api/getaddress'
    })
}

// 添加收货地址
export const addAddressAPI = (addressData) => {
    return httpInstance.post('api/addaddress', addressData)
}

// 删除收货地址
export const delAddressAPI = (addressId) => {
    return httpInstance.delete('api/deladdress', { data: { addressId } })
}

// 修改收货地址
export const updateAddressAPI = (addressId, addressData) => {
    return httpInstance.put(`api/updateaddress/${addressId}`, addressData)
}
