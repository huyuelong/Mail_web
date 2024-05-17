import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus';
import { useUserStore } from './userStore'
import { addCartAPI, getCartAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    const cartList = ref([])

    // 获取最新购物车数据
    const getNewlist = async () => {
        const res = await getCartAPI()
        console.log(res)
        // 将 selected 字段转换为布尔类型
        cartList.value = res.data.result.map(item => ({
            ...item,
            count: Number(item.count), // 将字符串转换为数字
            selected: !!item.selected // 将字符串转换为布尔值
        }))
        console.log(cartList.value)
    }
    getNewlist()
    // 添加购物车
    // const addCart = async (products) => {
    //     const {skuId, count} = products
    //     console.log(skuId, count)
    //     // 登录时加入购物车
    //     if (isLogin.value) {
    //         const res = await addCartAPI({ skuId, count })
    //         console.log(res)
    //         getNewlist()
    //     } else {
    //         // 添加过的商品  count++
    //         // 没有添加过 push
    //         const item = cartList.value.find((item) => products.skuId === item.skuId)
    //         if (item) {
    //             // 有添加过的商品
    //             item.count += products.count
    //         } else {
    //             // 商品未添加过
    //             cartList.value.push(products)
    //         }
    //     }
    // }

    // 添加到购物车
    const addCart = async (products) => {
        const { skuId, count, istraded } = products
        console.log(skuId, count)
        if (isLogin.value) {
            const res = await addCartAPI({ skuId, count, istraded })
            console.log(res)
            getNewlist()
        } else {
            ElMessage.warning('请先登录！')
        }
    }

    // 删除购物车
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            getNewlist()
        } else {
            // 找出要删除项的下标值
            // const index = cartList.value.findIndex((item) => skuId === item.skuId)
            // cartList.value.splice(index, 1)
            const updatedCartList = cartList.value.filter((item) => skuId !== item.skuId)
            cartList.value = updatedCartList
        }
    }

    // 清除购物车
    const clearCart = () => {
        cartList.value = []
    }

    // 总数量
    const totalCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
    // 总价格
    const totalPrice = computed(() => cartList.value.reduce((total, item) => total + item.count * item.price, 0))

    // 已选择数量
    const selCount = computed(() => cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count, 0))
    // 已选择价格
    const selPrice = computed(() => cartList.value.filter(item => item.selected).reduce((total, item) => total + item.count * item.price, 0))

    // 单选功能
    const checkChange = (skuId, selected) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = selected
    }

    // 全选功能
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    const allCheck = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }



    return {
        cartList,
        addCart,
        delCart,
        clearCart,
        totalCount,
        totalPrice,
        selCount,
        selPrice,
        checkChange,
        isAll,
        allCheck,
        getNewlist
    }
}, {
    persist: true
})