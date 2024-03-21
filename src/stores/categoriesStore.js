import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoriesAPI } from '@/apis/layout'
export const useCategoriesStore = defineStore('categories', () => {
    const categoriesList = ref([])
    const getCategories = async () => {
        const res = await getCategoriesAPI()
        console.log(res)
        categoriesList.value = res.data.result
    }

    return {
        categoriesList,
        getCategories
    }
})
