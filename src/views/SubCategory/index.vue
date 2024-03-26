<script setup>
import { getSubCategoryAPI } from '@/apis/categories'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductsItem from '../Home/components/ProductsItem.vue'

// 获取数据
const subCategoryData = ref({})
const route = useRoute()
const activeTab = ref('New')  // 默认选中"新上市"
const getSubCategory = async () => {
    const res = await getSubCategoryAPI(route.params.id)
    console.log(res)
    subCategoryData.value = res.data.result
}
onMounted(() => getSubCategory())

// 根据当前选中的标签页过滤商品列表
const filteredProducts = computed(() => {
    // 检查subCategoryData是否有数据
    if (!subCategoryData.value || !subCategoryData.value.products) {
        return []
    }

    if (activeTab.value === 'New') {
        // 如果选中的是"新上市"，返回新上市的商品列表
        return subCategoryData.value.products.filter(product => product.NeworHot === '1')
    } else if (activeTab.value === 'Hot') {
        // 如果选中的是"高人气"，返回高人气的商品列表
        return subCategoryData.value.products.filter(product => product.NeworHot === '2')
    }
    // 默认返回空数组
    return []
})
</script>

<template>
    <div class="container ">
        <!-- 面包屑导航 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{
                    path: `/category/${subCategoryData.parentId
                        }`
                }">{{ subCategoryData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ subCategoryData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="新上市" name="New"></el-tab-pane>
                <el-tab-pane label="高人气" name="Hot"></el-tab-pane>
            </el-tabs>
            <div class="body">
                <!-- 商品列表-->
                <ProductsItem v-for="products in filteredProducts" :products="products" :key="products.id">
                </ProductsItem>
            </div>
        </div>
    </div>

</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>