<script setup>
import { useCategoriesStore } from '@/stores/categoriesStore'

const categoriesStore = useCategoriesStore()

</script>

<template>
    <div class="home-categories">
        <ul class="menu">
            <li v-for="item in categoriesStore.categoriesList" :key="item.id">
                <RouterLink to="/">{{ item.name }}</RouterLink>
                <!-- 取二级分类的前两项 -->
                <RouterLink v-for="i in item.children.slice(0, 2)" :key="i.id" to="/">{{ i.name }}</RouterLink>
                <!-- 弹层layer位置 -->
                <div class="layer">
                    <h4>品牌推荐 <small>享受科技生活！</small></h4>
                    <ul>
                        <li v-for="i in item.children" :key="i.id">
                            <RouterLink :to="`/category/sub/${i.id}`">
                                <img :src="i.picture" alt="" />
                                <div class="info">
                                    <p class="name ellipsis-2">
                                        {{ i.name }}
                                    </p>
                                    <p class="desc ellipsis">{{ i.description }}</p>
                                </div>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>


<style scoped lang='scss'>
.home-categories {
    width: 250px;
    height: 500px;
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    z-index: 99;

    .menu {
        li {
            padding-left: 40px;
            height: 71.5px;
            line-height: 71.5px;

            &:hover {
                background: $MainColor;
            }

            a {
                margin-right: 10px;
                color: #fff;

                &:first-child {
                    font-size: 17px;
                }
            }

            .layer {
                width: 990px;
                height: 500px;
                background: rgba(255, 255, 255, 0.8);
                position: absolute;
                left: 250px;
                top: 0;
                display: none;
                padding: 0 15px;

                h4 {
                    font-size: 20px;
                    font-weight: normal;
                    line-height: 80px;

                    small {
                        font-size: 16px;
                        color: #666;
                    }
                }

                ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        width: 310px;
                        height: 120px;
                        margin-right: 15px;
                        margin-bottom: 15px;
                        border: 1px solid #eee;
                        border-radius: 4px;
                        background: #fff;

                        &:nth-child(3n) {
                            margin-right: 0;
                        }

                        a {
                            display: flex;
                            width: 100%;
                            height: 100%;
                            align-items: center;
                            padding: 10px;

                            &:hover {
                                background: #e3f9f4;
                            }

                            img {
                                width: 95px;
                                // height: 95px;
                                // max-width: 100%;
                                /* 图片的最大宽度为父元素的100% */
                                // height: auto;
                                max-height: 100%;
                                /* 高度自适应 */
                            }

                            .info {
                                padding-left: 10px;
                                line-height: 24px;
                                overflow: hidden;

                                .name {
                                    font-size: 16px;
                                    color: #666;
                                }

                                .desc {
                                    font-size: 12px;
                                    color: #999;
                                }

                                .price {
                                    font-size: 22px;
                                    color: $priceColor;

                                    i {
                                        font-size: 16px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // 关键样式  hover状态下的layer盒子变成block
            &:hover {
                .layer {
                    display: block;
                }
            }
        }
    }
}
</style>