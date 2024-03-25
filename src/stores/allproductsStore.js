import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAllCategoriesProductsAPI } from '@/apis/allproducts'

export const useAllProductsStore = defineStore('allProducts', () => {
    const allProductsList = ref([])
    const getAllProducts = async () => {
        const res = await getAllCategoriesProductsAPI()
        console.log(res)
        allProductsList.value = res.result
    }

    return {
        allProductsList,
        getAllProducts
    }
})
