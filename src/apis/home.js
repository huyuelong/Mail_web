import httpInstance from "@/utils/http";

// 获取轮播图
export function getBannersAPI() {
    return httpInstance({
        url: 'api/home/banners'
    })
} 
