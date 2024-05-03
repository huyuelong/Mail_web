<script setup>
import { ref, onMounted, watch } from 'vue'
import { getSearchAPI } from '@/apis/search'
import { useRouter } from 'vue-router'
import ProductsItem from '../Home/components/ProductsItem.vue'

const searchData = ref({})
const router = useRouter()

const getSearch = async () => {
    const term = router.currentRoute.value.query.term // 获取当前页面路径中的搜索词
    console.log('term', term)
    const res = await getSearchAPI(term) // 将搜索词传递给 API 调用
    searchData.value = res.data.result
    console.log(res)
}

onMounted(() => getSearch())

// 监听路由变化
watch(() => router.currentRoute.value.query.term, () => {
    getSearch() // 获取新的搜索结果
})
</script>

<template>
    <div class="search-page">
        <div class="container">
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>搜索</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="products-container">
                <div class="body">
                    <productsItem v-for="products in searchData" :products="products" :key="products.id"></productsItem>
                </div>
            </div>

            <div v-if="searchData.length === 0">
                    <div class="search-none">
                        <el-empty description="搜索为空">
                            <RouterLink to="/">
                                <el-button type="primary" color="#ff7e00" plain>看看别的</el-button>
                            </RouterLink>
                        </el-empty>
                    </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.products-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }
}

.search-none {
    text-align: center;
    padding: 120px 0;
    background: #fff;

    p {
        color: #999;
        padding: 20px 0;
    }
}
</style>