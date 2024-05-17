import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoriesAPI } from '@/apis/layout'

export const useCategoriesStore = defineStore('categories', () => {
    const categoriesList = ref([])
    // 获取分类信息
    const getCategories = async () => {
        const res = await getCategoriesAPI()
        categoriesList.value = res.data.result
    }

    return {
        categoriesList,
        getCategories
    }
})
