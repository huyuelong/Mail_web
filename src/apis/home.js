import httpInstance from "@/utils/http";

// 获取轮播图
export function getBannersAPI(distribution_site) {
    return httpInstance({
        url: 'api/home/banners',
        params: {
            // 默认为1，首页轮播图，2为分类商品区轮播图，表示广告
            distribution_site
        }
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
