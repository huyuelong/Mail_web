<script setup>
import HomePublic from './HomePublic.vue'
import { getHotAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

// 获取数据
const hotList = ref([])
const getHotList = async () => {
    const res = await getHotAPI()
    hotList.value = res.data.result
}

onMounted(() => getHotList())

</script>

<template>
    <HomePublic title="火爆推荐" sub-title="人气爆款 不容错过">
        <ul class="products-list">
            <li v-for="item in hotList" :key="item.id">
                <RouterLink to="/">
                    <img v-img-lazy="item.picture" alt="" />
                    <p class="title">{{ item.title }}</p>
                    <p class="desc">{{ item.alt }}</p>
                </RouterLink>
            </li>
        </ul>
    </HomePublic>
</template>


<style scoped lang='scss'>
.products-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 1000px;
        height: 406px;

        background-color: white;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: auto;
            height: 250px;
        }

        p {
            font-size: 22px;
            padding-top: 20px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .desc {
            font-size: 16px;
            color: #949494;
        }

    }
}
</style>