import httpInstance from "@/utils/http";

// 获取所有分类以及每个分类下的商品信息
export function getCategoriesAPI() {
    return httpInstance({
        url: 'api/categories'
    })
} 
