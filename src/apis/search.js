import httpInstance from "@/utils/http"

// export const getSearchAPI = async (term) => {
//     try {
//         const response = await httpInstance.get('api/search', {
//             params: {
//                 term: term // 将搜索词作为查询参数传递
//             }
//         })
//         return response.data
//     } catch (error) {
//         console.error('查询失败', error)
//         throw error
//     }
// }

// 获取搜索结果
export const getSearchAPI = (term) =>{
    return httpInstance({
        url: 'api/search',
        params: {
            term
        }
    })
} 


