<script setup>
import { useCartStore } from '@/stores/cartStore'
const cartStore = useCartStore()

</script>

<template>
    <div class="cart-page">
        <div class="container m-top-20">
            <div class="cart">
                <table>
                    <thead>
                        <tr>
                            <th width="120">
                                <!-- 全选框 -->
                                <el-checkbox :modelValue="cartStore.isAll" @change="(selected) => cartStore.allCheck(selected)"></el-checkbox>
                            </th>
                            <th width="400">商品信息</th>
                            <th width="220">单价</th>
                            <th width="180">数量</th>
                            <th width="180">小计</th>
                            <th width="140">操作</th>
                        </tr>
                    </thead>
                    <!-- 商品列表 -->
                    <tbody>
                        <tr v-for="item in cartStore.cartList" :key="item.id">
                            <!-- 单选框 -->
                            <td>
                                <el-checkbox :modelValue="item.selected" @change="(selected) => cartStore.checkChange(item.skuId, selected)"></el-checkbox>
                            </td>
                            <td>
                                <div class="goods">
                                    <RouterLink :to="`/detail/${item.productId}`"><img :src="item.picture" alt="" /></RouterLink>
                                    <div>
                                        <div class="name ellipsis">
                                            <p>{{ item.name }}</p>
                                            <p>{{ item.attrsText }}</p>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="tc">
                                <p>&yen;{{ item.price }}</p>
                            </td>
                            <td class="tc">
                                <el-input-number :min="1" v-model="item.count" />
                            </td>
                            <td class="tc">
                                <p class="f16 red">&yen;{{ (item.price * item.count).toFixed(2) }}</p>
                            </td>
                            <td class="tc">
                                <p>
                                    <el-popconfirm title="确认删除吗?" confirm-button-text="确认" cancel-button-text="取消"
                                        @confirm="cartStore.delCart(item.skuId)">
                                        <template #reference>
                                            <a href="javascript:;">删除</a>
                                        </template>
                                    </el-popconfirm>
                                </p>
                            </td>
                        </tr>
                        <tr v-if="cartStore.cartList.length === 0">
                            <td colspan="6">
                                <div class="cart-none">
                                    <el-empty description="购物车列表为空">
                                        <RouterLink to="/">
                                            <el-button type="primary" color="#ff7e00" plain>随便逛逛</el-button>
                                        </RouterLink>
                                    </el-empty>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <!-- 操作栏 -->
            <div class="action">
                <div class="batch">
                    共 {{ cartStore.totalCount }} 件商品，已选择 {{ cartStore.selCount }} 件，商品合计：
                    <span class="red">¥ {{ cartStore.selPrice }} </span>
                </div>
                <div class="total">
                    <el-button size="large" type="primary" class="order_set" @click="$router.push('/settlement')">下单结算</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cart-page {
    margin-top: 20px;

    .cart {
        background: #fff;
        color: #666;

        table {
            border-spacing: 0;
            border-collapse: collapse;
            line-height: 24px;

            th,
            td {
                padding: 10px;
                border-bottom: 1px solid #f5f5f5;

                &:first-child {
                    text-align: left;
                    padding-left: 30px;
                    color: #999;
                }
            }

            th {
                font-size: 16px;
                font-weight: normal;
                line-height: 50px;
            }
        }
    }

    .cart-none {
        text-align: center;
        padding: 120px 0;
        background: #fff;

        p {
            color: #999;
            padding: 20px 0;
        }
    }

    .tc {
        text-align: center;

        a {
            color: $MainColor;
        }

        .xtx-numbox {
            margin: 0 auto;
            width: 120px;
        }
    }

    .red {
        color: $priceColor;
    }

    // .green {
    //     color: $MainColor;
    // }

    .f16 {
        font-size: 16px;
    }

    .goods {
        display: flex;
        align-items: center;

        img {
            width: 100px;
            height: 100px;
        }

        >div {
            width: 280px;
            font-size: 16px;
            padding-left: 10px;

            .attr {
                font-size: 14px;
                color: #999;
            }
        }
    }

    .action {
        display: flex;
        background: #fff;
        margin-top: 20px;
        height: 80px;
        align-items: center;
        font-size: 16px;
        justify-content: space-between;
        padding: 0 30px;

        

        .batch {
            a {
                margin-left: 20px;
            }
        }

        .red {
            font-size: 18px;
            margin-right: 20px;
            font-weight: bold;
        }

        .order_set {
            background-color: $MainColor;
            border: $MainColor 1px solid;
            transition: transform 0.2s ease;

            &:hover {
                transform: scale3d(1.1, 1.1, 1.1);
            }
        }
    }

    .tit {
        color: #666;
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
    }

}
</style>