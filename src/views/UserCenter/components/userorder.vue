<script setup>
import { getAllOrderAPI } from '@/apis/order'
import { onMounted, ref, watchEffect } from 'vue'

// tab列表
const tabTypes = [
    { name: "all", label: "全部订单" },
    { name: "unpay", label: "待付款" },
    { name: "deliver", label: "待发货" },
    { name: "receive", label: "待收货" },
    { name: "complete", label: "已完成" },
]

// 获取订单列表
const orderList = ref([])
const total = ref(0)
const params = ref({
    orderState: 0,
    page: 1,
    pageSize: 2
})

// 获取订单数据
const getOrderList = async () => {
    console.log(params.value.orderState)
    const res = await getAllOrderAPI(params.value.orderState)
    console.log(res)
    orderList.value = res.data.result
    total.value = res.data.result.length  //总记录数
}

onMounted(() => getOrderList())

// tab切换
const tabChange = (type) => {
    params.value.orderState = type
    params.value.page = 1 // 切换重置为1
    getOrderList()
}

// 页数切换
const pageChange = (page) => {
    console.log(page)
    params.value.page = page
    getOrderList()
}

// 创建格式化函数
const formatPayState = (orderState, deliveryType, ispay) => {
    if (ispay === 0) {
        return '待付款'
    } else {
        if (orderState === 1) {
            return '待发货'
        } else if (orderState === 2) {
            return deliveryType === '2' ? '顺丰速运' : '包邮'
        } else if (orderState === 3) {
            return '待收货'
        } else if (orderState === 4) {
            return '已完成'
        } else {
            return ''
        }
    }
}

const paginatedOrderList = ref([])

// 监听页码和每页显示数量的变化，更新分页后的订单列表
watchEffect(() => {
    const startIndex = (params.value.page - 1) * params.value.pageSize
    const endIndex = startIndex + params.value.pageSize
    paginatedOrderList.value = orderList.value.slice(startIndex, endIndex)
})

// 将时间转换为北京时间
const formatBeijingTime = (utcTime) => {
    const utcTimeObj = new Date(utcTime)
    const beijingTimeObj = new Date(utcTimeObj.toLocaleString("en-US", { timeZone: "Asia/Shanghai" }))
    return beijingTimeObj.toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" })
}
</script>

<template>
    <div class="order-container">
        <el-tabs @tab-change="tabChange">
            <!-- tab切换 -->
            <el-tab-pane v-for="item in tabTypes" :key="item.name" :label="item.label" />

            <div class="main-container">
                <div class="holder-container" v-if="orderList.length === 0">
                    <el-empty description="暂无订单数据" />
                </div>
                <div v-else>
                    <!-- 订单列表 -->
                    <div class="order-item" v-for="orderItem in paginatedOrderList" :key="orderItem.order.id">
                        <div class="head">
                            <span>下单时间：{{ formatBeijingTime(orderItem.order.createTime) }}</span>
                            <span>订单编号：{{ orderItem.order.id }}</span>
                            <!-- 未付款，倒计时时间还有 -->
                            <span class="down-time" v-if="orderItem.order.ispay === 0">
                                <i class="iconfont icon-down-time"></i>
                                <b>付款截止: {{ orderItem.order.countdown }}</b>
                            </span>
                        </div>
                        <div class="body">
                            <div class="column goods">
                                <ul>
                                    <li v-for="product in orderItem.products" :key="product.skuId">
                                        <a class="image" href="javascript:;" @click="$router.push(`/detail/${product.skuId.slice(0, 5)}`)">
                                            <img :src="product.picture" alt="" />
                                        </a>
                                        <div class="info">
                                            <p class="name ellipsis-2">
                                                {{ product.name }}
                                            </p>
                                            <p class="attr ellipsis">
                                                <span>{{ product.attrsText }}</span>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="column state">
                                <p>{{ formatPayState(orderItem.order.orderState, orderItem.order.deliveryType, orderItem.order.ispay) }}</p>
                                <p v-if="orderItem.order.orderState === 2 || 3">
                                    <a href="javascript:;" class="green">查看物流</a>
                                </p>
                                <p v-if="orderItem.order.orderState === 4">
                                    <a href="javascript:;" class="green">评价商品</a>
                                </p>
                                <p v-if="orderItem.order.orderState === 5">
                                    <a href="javascript:;" class="green">查看评价</a>
                                </p>
                            </div>
                            <div class="column amount">
                                <p>（含运费：¥{{ orderItem.order.deliveryFee?.toFixed(2) }}）</p>
                                <p v-if="orderItem.order.payMethod === '1'">在线支付</p>
                                <p v-else-if="orderItem.order.payMethod === '2'">货到付款</p>
                            </div>
                            <div class="column action">
                                <el-button v-if="orderItem.order.ispay === 0" type="primary" size="small">
                                    立即付款
                                </el-button>
                                <el-button v-if="orderItem.order.orderState === 3" type="primary" size="small">
                                    确认收货
                                </el-button>
                                <p><a href="javascript:;">查看详情</a></p>
                                <p v-if="orderItem.order.orderState >= 2">
                                    <a href="javascript:;" @click="$router.push(`/detail/${orderItem.products[0].skuId.slice(0, 5)}`)``">再次购买</a>
                                </p>
                                <p v-if="orderItem.order.orderState >= 4">
                                    <a href="javascript:;">申请售后</a>
                                </p>
                                <p v-if="orderItem.order.orderState === 1"><a href="javascript:;">取消订单</a></p>
                            </div>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <div class="pagination-container">
                        <el-pagination :total="total" @current-change="pageChange" :current-page="params.page" :page-size="params.pageSize"
                            background layout="prev, pager, next" />
                    </div>
                </div>
            </div>
        </el-tabs>
    </div>
</template>


<style scoped lang="scss">
.order-container {
    padding: 10px 20px;

    .pagination-container {
        display: flex;
        justify-content: center;
    }

    .main-container {
        min-height: 500px;

        .holder-container {
            min-height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

.order-item {
    margin-bottom: 20px;
    border: 1px solid #f5f5f5;

    .head {
        height: 50px;
        line-height: 50px;
        background: #f5f5f5;
        padding: 0 20px;
        overflow: hidden;

        span {
            margin-right: 20px;

            &.down-time {
                margin-right: 0;
                float: right;

                i {
                    vertical-align: middle;
                    margin-right: 3px;
                }

                b {
                    vertical-align: middle;
                    font-weight: normal;
                }
            }
        }

        .del {
            margin-right: 0;
            float: right;
            color: #999;
        }
    }

    .body {
        display: flex;
        align-items: stretch;

        .column {
            border-left: 1px solid #f5f5f5;
            text-align: center;
            padding: 20px;

            >p {
                padding-top: 10px;
            }

            &:first-child {
                border-left: none;
            }

            &.goods {
                flex: 1;
                padding: 0;
                align-self: center;

                ul {
                    li {
                        border-bottom: 1px solid #f5f5f5;
                        padding: 10px;
                        display: flex;

                        &:last-child {
                            border-bottom: none;
                        }

                        .image {
                            width: 70px;
                            height: 70px;
                            border: 1px solid #f5f5f5;
                        }

                        .info {
                            width: 220px;
                            text-align: left;
                            padding: 0 10px;

                            p {
                                margin-bottom: 5px;

                                &.name {
                                    height: 38px;
                                }

                                &.attr {
                                    color: #999;
                                    font-size: 12px;

                                    span {
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }

                        .price {
                            width: 100px;
                        }

                        .count {
                            width: 80px;
                        }
                    }
                }
            }

            &.state {
                width: 120px;

                .green {
                    color: $MainColor;
                }
            }

            &.amount {
                width: 200px;

                .red {
                    color: $priceColor;
                }
            }

            &.action {
                width: 140px;

                a {
                    display: block;

                    &:hover {
                        color: $MainColor;
                    }
                }
            }
        }
    }
}
</style>