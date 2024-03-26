<script setup>
import HomePublic from './HomePublic.vue'
import { getProductsAPI } from '@/apis/home'
import { onMounted, ref } from 'vue'
import ProductsItem from './ProductsItem.vue'
// 获取所有商品数据列表
const productsList = ref([])
const getProducts = async () => {
    const res = await getProductsAPI()
    // console.log(res)
    productsList.value = res.data.result
}
onMounted(() => getProducts())
</script>

<template>
    <div class="home-product">
        <HomePublic :title="cate.name" v-for="cate in productsList" :key="cate.id">
            <div class="box">
                <RouterLink class="cover" to="/">
                    <img v-img-lazy="cate.picture" />
                    <strong class="label">
                        <span>{{ cate.name }}区</span>
                        <span>{{ cate.description }}</span>
                    </strong>
                </RouterLink>
                <ul class="goods-list">
                    <li v-for="item in cate.children.slice(0, 8)" :key="item.id">
                        <RouterLink :to="`/detail/${item.id}`">
                            <ProductsItem :products="item" />
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </HomePublic>
    </div>
</template>

<style scoped lang='scss'>
.home-product {
    background: #fff;
    margin-top: 20px;

    .sub {
        margin-bottom: 2px;

        a {
            padding: 2px 12px;
            font-size: 16px;
            border-radius: 4px;

            &:hover {
                background: $MainColor;
                color: #fff;
            }

            &:last-child {
                margin-right: 80px;
            }
        }
    }

    .box {
        display: flex;

        .cover {
            width: 240px;
            height: 610px;
            margin-right: 10px;
            position: relative;

            img {
                width: 100%;
                height: 100%;
            }

            .label {
                width: 188px;
                height: 66px;
                display: flex;
                font-size: 18px;
                color: #fff;
                line-height: 66px;
                font-weight: normal;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate3d(0, -50%, 0);

                span {
                    text-align: center;

                    &:first-child {
                        width: 76px;
                        background: rgba(0, 0, 0, 0.9);
                    }

                    &:last-child {
                        flex: 1;
                        background: rgba(0, 0, 0, 0.7);
                    }
                }
            }
        }

        .goods-list {
            width: 990px;
            display: flex;
            flex-wrap: wrap;

            li {
                width: 240px;
                height: 300px;
                margin-right: 10px;
                margin-bottom: 10px;

                &:nth-last-child(-n + 4) {
                    margin-bottom: 0;
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }


    }
}
</style>