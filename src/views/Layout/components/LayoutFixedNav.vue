<script setup>
import { useScroll } from '@vueuse/core'
import LayoutHeaderNav from './LayoutHeaderNav.vue'
const { y } = useScroll(window)
</script>

<template>
    <div class="app-header-fixed" :class="{ show: y > 80 }">
        <div class="container">
            <RouterLink class="logo" to="/" />
            <!-- 导航 -->
            <LayoutHeaderNav />

            <div class="right">
                <RouterLink to="/">热销</RouterLink>
                <RouterLink to="/">品牌</RouterLink>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.app-header-fixed {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;

    // 状态一：往上平移自身高度 + 完全透明
    transform: translateY(-100%);
    opacity: 0;

    // 状态二：移除平移 + 完全不透明
    &.show {
        transition: all 0.3s linear;
        transform: none;
        opacity: 1;
    }

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;
        height: 80px;
        background: url("@/assets/images/logo.png") no-repeat right 2px;
        background-size: 160px auto;
    }

    .right {
        width: 220px;
        display: flex;
        text-align: center;
        padding-left: 40px;
        border-left: 2px solid $MainColor;

        a {
            width: 38px;
            margin-right: 40px;
            font-size: 16px;
            line-height: 1;

            &:hover {
                color: $MainColor;
            }
        }
    }
}

</style>