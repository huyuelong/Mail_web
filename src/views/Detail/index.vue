<script setup>
import { getProductPicturesAPI, getProductDetailAPI, getProductSpecsAPI, getDetailPicturesAPI } from '@/apis/detail'
// import imageItem from '@/components/imageItem.vue'
// import SKU from '@/components/SKU/index.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 获取商品图片集合
const imageList = ref([])
const route = useRoute()
const getPictrues = async () => {
    const res = await getProductPicturesAPI(route.params.id)
    // 提取其中的图片元素
    res.data.result.forEach(item => {
        imageList.value.push(item.url)
    })
}
onMounted(() => getPictrues())

// 获取商品详情
const detailData = ref([])
const getDetail = async () => {
    const res = await getProductDetailAPI(route.params.id)
    console.log(res)
    detailData.value = res.data.result[0]
}
onMounted(() => getDetail())

// 获取商品规格信息
const specList = ref([])
const getspec = async () => {
    const res = await getProductSpecsAPI(route.params.id)
    console.log(res)
    specList.value = res.data.result
}
onMounted(() => getspec())

// 获取商品详情图片
const detailpictureList = ref([])
const getDetailPictures = async () => {
    const res = await getDetailPicturesAPI(route.params.id)
    // 提取其中的图片元素
    res.data.result.forEach(item => {
        detailpictureList.value.push(item.picture_url)
    })
}
onMounted(() => getDetailPictures())
</script>

<template>
    <div class="detail-page">
        <div class="container">
            <div class="bread-container">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ detailData.name }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 商品信息 -->
            <div class="info-container">
                <div>
                    <div class="products-info">
                        <div class="media">
                            <!-- 图片预览区 -->
                            <imageItem :image-list="imageList"></imageItem>
                            <!-- 统计数量 -->
                            <ul class="products-sales">
                                <li>
                                    <p>销量</p>
                                    <p> {{ detailData.salesCount }}+ </p>
                                    <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                                </li>
                                <li>
                                    <p>评价</p>
                                    <p>{{ detailData.commentCount }}+</p>
                                    <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                                </li>
                                <li>
                                    <p>收藏</p>
                                    <p>{{ detailData.collectCount }}+</p>
                                    <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                                </li>
                                <li>
                                    <p>品牌</p>
                                    <p>{{ detailData.brandname }}</p>
                                    <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                                </li>
                            </ul>
                        </div>
                        <div class="spec">
                            <!-- 商品信息区 -->
                            <p class="g-name"> {{ detailData.name }} </p>
                            <p class="g-desc">{{ detailData.desc }} </p>
                            <p class="g-price">
                                <span>{{ detailData.price }}</span>
                                <span v-if="detailData.oldPrice !== null" class="old-price">{{ detailData.oldPrice
                                    }}</span>
                            </p>
                            <div class="g-service">
                                <dl>
                                    <dt>活动</dt>
                                    <dd>购买即赠送小米背包一个</dd>
                                </dl>
                                <dl>
                                    <dt>服务</dt>
                                    <dd>
                                        <span>七天退款</span>
                                        <span>十五天包换</span>
                                        <span>包邮送达</span>
                                        <a href="javascript:;">了解详情</a>
                                    </dd>
                                </dl>
                            </div>
                            <!-- sku组件 -->
                            <SKU :products="specList"></SKU>
                            <!-- 数据组件 -->

                            <!-- 按钮组件 -->
                            <div>
                                <el-button size="large" class="btn" @click="addCart">
                                    加入购物车
                                </el-button>
                            </div>

                        </div>
                    </div>
                    <div class="products-footer">
                        <div class="products-article">
                            <!-- 商品详情 -->
                            <div class="products-tabs">
                                <nav>
                                    <a>商品详情</a>
                                </nav>
                                <div class="products-detail">
                                    <!-- 图片 -->
                                    <img v-for="img in detailpictureList" :src="img" :key="img" alt="">
                                </div>
                            </div>
                        </div>
                        <!-- 24热榜+专题推荐 -->
                        <div class="products-aside">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.detail-page {
    .products-info {
        min-height: 600px;
        background: #fff;
        display: flex;

        .media {
            width: 580px;
            height: 600px;
            padding: 30px 50px;
        }

        .spec {
            flex: 1;
            padding: 30px 30px 30px 0;
        }
    }

    .products-footer {
        display: flex;
        margin-top: 20px;

        .goods-article {
            width: 940px;
            margin-right: 20px;
        }

        .products-aside {
            width: 280px;
            min-height: 1000px;
        }
    }

    .products-tabs {
        min-height: 600px;
        background: #fff;
    }

    .products-warn {
        min-height: 600px;
        background: #fff;
        margin-top: 20px;
    }

    .number-box {
        display: flex;
        align-items: center;

        .label {
            width: 60px;
            color: #999;
            padding-left: 10px;
        }
    }

    .g-name {
        font-size: 22px;
    }

    .g-desc {
        color: #999;
        margin-top: 10px;
    }

    .g-price {
        margin-top: 10px;

        span {
            &:first-child {
                color: $priceColor;
                margin-right: 10px;
                font-size: 22px;

                &::before {
                    content: "¥";
                    font-size: 14px;
                }
            }

            &.old-price {
                color: #999;
                text-decoration: line-through;
                font-size: 16px;

                &::before {
                    content: none;
                    /* 移除 content */
                }
            }
        }
    }

    .g-service {
        background: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;

        dl {
            padding-bottom: 20px;
            display: flex;
            align-items: center;

            dt {
                width: 50px;
                color: #999;
            }

            dd {
                color: #666;

                &:last-child {
                    span {
                        margin-right: 10px;

                        &::before {
                            content: "•";
                            color: $MainColor;
                            margin-right: 2px;
                        }
                    }

                    a {
                        color: $MainColor;
                    }
                }
            }
        }
    }

    .products-sales {
        display: flex;
        width: 400px;
        align-items: center;
        text-align: center;
        height: 140px;

        li {
            flex: 1;
            position: relative;

            ~li::after {
                position: absolute;
                top: 10px;
                left: 0;
                height: 60px;
                border-left: 1px solid #e4e4e4;
                content: "";
            }

            p {
                &:first-child {
                    color: #999;
                }

                &:nth-child(2) {
                    color: $priceColor;
                    margin-top: 10px;
                }

                &:last-child {
                    color: #666;
                    margin-top: 10px;

                    i {
                        color: $MainColor;
                        font-size: 14px;
                        margin-right: 2px;
                    }

                    &:hover {
                        color: $MainColor;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.products-tabs {
    min-height: 600px;
    background: #fff;

    nav {
        height: 70px;
        line-height: 70px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;

        a {
            padding: 0 40px;
            font-size: 18px;
            position: relative;

            >span {
                color: $priceColor;
                font-size: 16px;
                margin-left: 10px;
            }
        }
    }
}

.products-detail {
    padding: 40px;

    >img {
        width: 100%;
    }
}

.btn {
    margin-top: 20px;

}

.bread-container {
    padding: 25px 0;
}
</style>