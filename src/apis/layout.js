import httpInstance from "@/utils/http";

export function getCategoriesAPI() {
    return httpInstance({
        url: 'api/categories'
    })
} 