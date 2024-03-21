<script setup>
import HomeCategories from './components/HomeCategories.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import homeProducts from './components/HomeProducts.vue'
</script>

<template>
    <div class="container">
        <HomeCategories />
        <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <homeProducts />
</template>