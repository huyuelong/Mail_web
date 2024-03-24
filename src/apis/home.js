import httpInstance from "@/utils/http";

// 获取轮播图
export function getBannersAPI() {
    return httpInstance({
        url: 'api/home/banners'
    })
} 


// 获取新品数据
export function getNewsAPI() {
    return httpInstance({
        url: 'api/home/news'
    })
}

// 获取热门数据
export function getHotAPI() {
    return httpInstance({
        url: 'api/home/hot'
    })
}

// 获取分类及其下属产品
export function getProductsAPI() {
    return httpInstance({
        url: 'api/home/products'
    })
}
