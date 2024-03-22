<script setup>
import HomePublic from './HomePublic.vue'
import { getNewsAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'

// 获取数据
const newsList = ref([])
const getNewsList = async () => {
    const res = await getNewsAPI()
    newsList.value = res.data.result
}

onMounted(() => getNewsList())

</script>

<template>
    <HomePublic title="新品" sub-title="新品上市 时代潮流">
        <ul class="goods-list">
            <li v-for="item in newsList" :key="item.id">
                <RouterLink :to="`/detail/${item.id}`">
                    <img :src="item.picture" alt="" />
                    <p class="name">{{ item.name }}</p>
                    <p class="desc">{{ item.description }}</p>
                    <p class="price">&yen;{{ item.price }}</p>
                </RouterLink>
            </li>
        </ul>
    </HomePublic>
</template>


<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;

    li {
        width: 306px;
        height: 406px;

        background: #f0f9f4;
        transition: all .5s;

        &:hover {
            transform: translate3d(0, -3px, 0);
            box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 306px;
            height: 306px;
        }

        p {
            font-size: 22px;
            padding-top: 12px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .desc {
            font-size: 16px;
            color: #949494;
        }

        .price {
            color: $priceColor;
        }
    }
}
</style>