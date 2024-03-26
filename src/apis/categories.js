import httpInstance from "@/utils/http";

// 通过一级分类id获取分类数据
export function getCategoryAPI(id) {
    return httpInstance({
        url: 'api/subCategories',
        params: {
            id
        }
    })
} 

// 通过二级分类id获取商品
export function getSubCategoryAPI(id) {
    return httpInstance({
        url: 'api/subCategories/sub',
        params: {
            id
        }
    })
} 