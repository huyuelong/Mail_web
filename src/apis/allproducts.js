import httpInstance from "@/utils/http";

// 获取所有分类及商品数据
export function getAllCategoriesProductsAPI() {
    return httpInstance({
        url: 'api/allCategoriesProducts'
    })
} 
