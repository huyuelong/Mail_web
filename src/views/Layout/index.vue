<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixedNav from './components/LayoutFixedNav.vue'

// 触发获取导航列表的action
import { useCategoriesStore } from '@/stores/categoriesStore'
import { onMounted } from 'vue'

const categoriesStore = useCategoriesStore()

onMounted(() => categoriesStore.getCategories())
</script>

<template>
  <LayoutFixedNav />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>