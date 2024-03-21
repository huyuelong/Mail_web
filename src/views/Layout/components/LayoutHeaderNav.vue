<script setup>
import { useCategoriesStore } from '@/stores/categoriesStore'
const categoriesStore = useCategoriesStore()
</script>


<template>
    <ul class="app-header-nav">
        <li class="home">
            <RouterLink to="/">首页</RouterLink>
        </li>
        <li class="home" v-for="item in categoriesStore.categoriesList" :key="item.id">
            <RouterLink to="/">
                {{ item.name }}
            </RouterLink>
        </li>
    </ul>
</template>


<style lang="scss">
.app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
        margin-right: 30px;
        width: 50px;
        text-align: center;

        a {
            font-size: 16px;
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
</style>