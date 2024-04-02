import httpInstance from "@/utils/http";

// 获取商品图片
export function getProductPicturesAPI(product_id) {
    return httpInstance({
        url: 'api/detail/pictrues',
        params: {
            product_id
        }
    })
} 

// 获取商品详情
export function getProductDetailAPI(id) {
    return httpInstance({
        url: 'api/detail',
        params: {
            id
        }
    })
} 

// 获取商品规格信息
export function getProductSpecsAPI(id) {
    return httpInstance({
        url: 'api/detail/spec',
        params: {
            id
        }
    })
} 

// 获取详情页图片
export function getDetailPicturesAPI(product_id) {
    return httpInstance({
        url: 'api/detail/detail_pictrues',
        params: {
            product_id
        }
    })
} 
