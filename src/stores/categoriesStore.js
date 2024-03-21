import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoriesAPI } from '@/apis/layout'
export const useCategoriesStore = defineStore('categories', () => {
    const categoriesList = ref([])
    const getCategories = async () => {
        const res = await getCategoriesAPI()
        categoriesList.value = res.data
    }

    return {
        categoriesList,
        getCategories
    }
})
