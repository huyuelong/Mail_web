<script setup>
import { getCategoriesAPI } from '@/apis/layout'
import { onMounted, ref } from 'vue'
import LayoutHeaderNav from './LayoutHeaderNav.vue'

const categoriesList = ref([])
const getCategories = async () => {
    const res = await getCategoriesAPI()
    categoriesList.value = res.data
}

onMounted(() => getCategories())
</script>

<template>
    <header class='app-header'>
        <div class="container">
            <h1 class="logo">
                <RouterLink to="/">荔枝科技</RouterLink>
            </h1>
            <!-- <ul class="app-header-nav">
                <li class="home" v-for="item in categoriesList" :key="item.id">
                    <RouterLink to="/">{{ item.name }}</RouterLink>
                </li>
            </ul> -->
            <LayoutHeaderNav />
            <div class="search">
                <i class="iconfont icon-search"></i>
                <input type="text" placeholder="搜一搜">
            </div>
            <!-- 头部购物车 -->

        </div>
    </header>
</template>


<style scoped lang='scss'>
.app-header {
    background: #fff;

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;

        a {
            display: block;
            height: 132px;
            width: 100%;
            margin-top: 30px;
            text-indent: -9999px;
            background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
        }
    }

    .app-header-nav {
        width: 820px;
        display: flex;
        padding-left: 40px;
        position: relative;
        z-index: 998;

        li {
            margin-right: 30px;
            width: 55px;
            text-align: center;

            a {
                font-size: 18px;
                line-height: 32px;
                height: 32px;
                display: inline-block;

                &:hover {
                    color: $MainColor;
                    border-bottom: 1px solid $MainColor;
                }
            }

            .active {
                color: $MainColor;
                border-bottom: 1px solid $MainColor;
            }
        }
    }

    .search {
        width: 170px;
        height: 32px;
        position: relative;
        border-bottom: 1px solid #d7e7e7;
        line-height: 32px;

        .icon-search {
            font-size: 20px;
            margin-left: 5px;
        }

        input {
            width: 140px;
            padding-left: 5px;
            color: #1d1d1d;
        }
    }

    .cart {
        width: 50px;

        .curr {
            height: 32px;
            line-height: 32px;
            text-align: center;
            position: relative;
            display: block;

            .icon-cart {
                font-size: 22px;
            }

            em {
                font-style: normal;
                position: absolute;
                right: 0;
                top: 0;
                padding: 1px 6px;
                line-height: 1;
                background: $helpColor;
                color: #fff;
                font-size: 12px;
                border-radius: 10px;
                font-family: Arial;
            }
        }
    }
}
</style>