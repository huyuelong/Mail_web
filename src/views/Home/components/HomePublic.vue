<script setup>
// 定义props
defineProps({
    // 主标题
    title: {
        type: String
    },
    // 副标题
    subTitle: {
        type: String
    },
    id: {
        type: String
    }
})
</script>


<template>
    <div class="home-panel">
        <div class="container">
            <div class="head">
                <!-- 主标题和副标题 -->
                <h3>
                    {{ title }}<small>{{ subTitle }}</small>
                </h3>
                <!-- <a v-if="id" :href="`http://localhost:5173/category/${id}`">查看更多<a class="iconfont icon-angle-right"></a></a> -->
                <RouterLink v-if="id" :to="`/category/${id}`">
                    查看更多
                    <i class="iconfont icon-angle-right"></i>
                </RouterLink>
            </div>
            <!-- 主体内容区域 -->
            <slot />
        </div>
    </div>
</template>

<style scoped lang='scss'>
.home-panel {
    background-color: #fff;

    .head {
        padding: 40px 0;
        display: flex;
        align-items: flex-end;

        h3 {
            flex: 1;
            font-size: 32px;
            font-weight: normal;
            margin-left: 6px;
            height: 35px;
            line-height: 35px;

            small {
                font-size: 16px;
                color: #999;
                margin-left: 20px;
            }
        }

        a {
            transition: transform 0.3s ease;
            &:hover{
                color: $MainColor;
                transform: scale(1.2);
                text-decoration: underline;
            }
        }
    }
}
</style>