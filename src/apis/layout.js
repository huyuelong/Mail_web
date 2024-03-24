import httpInstance from "@/utils/http";

// 获取所有分类
export function getCategoriesAPI() {
    return httpInstance({
        url: 'api/categories'
    })
} 

// // 获取所有分类数据
// export function getAllCategoriesAPI() {
//     return httpInstance({
//         url: 'api/allcategories'
//     })
// }
