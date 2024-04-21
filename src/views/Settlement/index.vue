<script setup>
import { useCartStore } from '@/stores/cartStore'
import { getAddressAPI, addAddressAPI, delAddressAPI, updateAddressAPI } from '@/apis/settlement'
import { createOrderAPI, getLatestOrderAPI } from '@/apis/order'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { onMounted, ref, computed } from 'vue'

const router = useRouter()
const cartStore = useCartStore()
// 地址数据
const addressList = ref({})
const defAddressList = ref({})  // 默认地址对象
const defAddressId = ref()
// 获取收货地址
const getaddress = async () => {
    const res = await getAddressAPI()
    addressList.value = res.data.result
    // 筛选出当 isDefault=1 为默认地址，没有默认地址则一项为默认地址
    const defAddress = res.data.result.find(item => item.isDefault === 1)
    defAddressList.value = defAddress ? defAddress : res.data.result[0]
    console.log('defAddress:', defAddressList.value.id);
    defAddressId.value = defAddressList.value.id
}
onMounted(() => getaddress())

console.log('defAddressId:', defAddressId);
// 控制切换弹框
const showDialog = ref(false)

// 切换地址
const activeAddress = ref({})
const switchAddress = (item) => {
    activeAddress.value = item
}
const confirm = () => {
    defAddressList.value = activeAddress.value
    showDialog.value = false
    activeAddress.value = {}
}

// 控制添加弹框
const addDialog = ref(false)

const addAddressForm = ref(null)

// 添加收货地址相关数据
const newAddress = ref({
    receiver: '',
    contact: '',
    provinceCode: '',
    cityCode: '',
    countyCode: '',
    address: '',
    isDefault: 0, // 默认为非默认地址
    fullLocation: '',
    postalCode: '',
    addressTags: ''
})

// 表单校验
const rules = {
    receiver: [
        { required: true, message: '请输入收货人姓名', trigger: 'blur' },
        { pattern: /^[\u4E00-\u9FA5A-Za-z]{1,15}$/, message: '收货人姓名只能是1到15位中文或英文字母', trigger: 'blur' }
    ],
    contact: [
        { required: true, message: '请输入联系方式', trigger: 'blur' },
        { pattern: /^\d{11}$/, message: '请输入正确的电话号码', trigger: 'blur' }
    ],
    provinceCode: [
        { required: true, message: '请输入省份或省份编码', trigger: 'blur' },
        { pattern: /^[\u4E00-\u9FA50-9]+$/, message: '省份或省份编码只能是中文或数字', trigger: 'blur' }
    ],
    cityCode: [
        { required: true, message: '请输入城市或城市编码', trigger: 'blur' },
        { pattern: /^[\u4E00-\u9FA50-9]+$/, message: '城市或城市编码只能是中文或数字', trigger: 'blur' }
    ],
    countyCode: [
        { required: true, message: '请输入区县或区县编码', trigger: 'blur' },
        { pattern: /^[\u4E00-\u9FA50-9]+$/, message: '区县或区县编码只能是中文或数字', trigger: 'blur' }
    ],
    address: [
        { required: true, message: '请输入详细地址', trigger: 'blur' },
        { pattern: /^[\u4E00-\u9FA50-9]+$/, message: '详细地址只能是中文或数字', trigger: 'blur' }
    ],
    fullLocation: [
        { required: true, message: '请输入完整地址', trigger: 'blur' },
        { pattern: /./, message: '请输入正确的地址', trigger: 'blur' }
    ],
    postalCode: [
        { required: true, message: '请输入邮政编码', trigger: 'blur' },
        { pattern: /^\d+$/, message: '邮政编码只能是数字', trigger: 'blur' }
    ],
    addressTags: [
        { required: true, message: '请输入地址标签', trigger: 'blur' },
        { pattern: /^[\u4E00-\u9FA50-9]+$/, message: '地址标签只能是中文或数字', trigger: 'blur' }
    ]
}

// 添加地址
const addNewAddress = async () => {
    try {
        await addAddressAPI(newAddress.value)
        await getaddress()
        Object.keys(newAddress.value).forEach(key => newAddress.value[key] = '')
        addDialog.value = false
    } catch (error) {
        console.error('添加新地址错误:', error)
    }
}

// 点击确认上传地址
const submitNewAddress = async () => {
    addAddressForm.value.validate(async valid => {
        if (valid) {
            await addNewAddress()
            getaddress()
            ElMessage({ type: 'success', message: '添加成功' })
        } else {
            console.error('表单验证未通过')
            ElMessage({ type: 'error', message: '请检查表单格式' })
        }
    })
}

// 删除收货地址
const delAddress = async (addressId) => {
    await delAddressAPI(addressId)
    getaddress()

}

// 修改收货地址
const editDialog = ref(false)
const editAddressForm = ref(null)
const editAddressData = ref({})
editAddressData.value = newAddress.value
// 编辑地址
const editAddress = (address) => {
    // 将地址信息填充到编辑数据中
    editAddressData.value = {
        addressId: address.id,
        receiver: address.receiver,
        contact: address.contact,
        provinceCode: address.provinceCode,
        cityCode: address.cityCode,
        countyCode: address.countyCode,
        address: address.address,
        isDefault: address.isDefault,
        fullLocation: address.fullLocation,
        postalCode: address.postalCode,
        addressTags: address.addressTags
    }
    console.log(editAddressData)
    // 打开编辑地址的弹窗
    editDialog.value = true
}

const submitEditAddress = async () => {
    editAddressForm.value.validate(async valid => {
        if (valid) {
            await updateAddressAPI(editAddressData.value.addressId, editAddressData.value)
            getaddress()
            editAddressData.value = {} // 清空编辑数据
            editDialog.value = false // 关闭弹窗
            ElMessage({ type: 'success', message: '修改地址成功' })
        } else {
            console.error('修改地址错误')
            ElMessage({ type: 'error', message: '请检查表单格式' })
        }
    })
}

// 选择服务
const deliverOptionsList = ref('1')
const payMathodList = ref('1')
// 运费
const deliveryFee = computed(() => {
    return deliverOptionsList.value === '2' ? 9 : 0
})
// 应付总额
const totalAmount = computed(() => {
    return (cartStore.selPrice + deliveryFee.value).toFixed(2)
})

// 配送方式，1包邮，2顺丰速运
const deliveryType = computed(() => {
    return deliverOptionsList.value === '1' ? 1 : 2
})
// 支付方式
const payMethod = computed(() => {
    return payMathodList.value === '1' ? 1 : 2
})


const orderData = computed(() => {
    return {
        deliveryType: deliveryType.value,
        payMethod: payMethod.value,
        deliveryFee: deliveryFee.value,
        productPrice: cartStore.selPrice.toFixed(2),
        totalAmount: totalAmount.value,
        remark: '',
        cartIds: cartStore.cartList.map(item => item.id),
        addressId: defAddressId.value
    }
})

console.log('orderData数据为：', orderData.value)

const createOrder = async () => {
    orderData.value.addressId = defAddressId.value
    await createOrderAPI(orderData.value)
    // 获取用户最新订单，即刚刚递交的订单
    const res = await getLatestOrderAPI()
    console.log(res)
    const orderId = res.data.result.latestOrder.id
    router.push({
        path: '/pay',
        query: {
            id: orderId
        }
    })
    // 更新购物车
    cartStore.getNewlist()
}
</script>

<template>
    <div class="settlement-page">
        <div class="container">
            <div class="wrapper">
                <!-- 收货地址 -->
                <h3 class="box-title">收货地址</h3>
                <div class="box-body">
                    <div class="address">
                        <div class="text">
                            <div class="none" v-if="!addressList">请先添加收货地址才可提交订单。</div>
                            <ul v-else>
                                <li><span>收<i />货<i />人：</span>{{ defAddressList.receiver }}</li>
                                <li><span>联系方式：</span>{{ defAddressList.contact }}</li>
                                <li><span>收货地址：</span>{{ defAddressList.fullLocation }} {{ defAddressList.address }}
                                </li>
                            </ul>
                        </div>
                        <div class="action">
                            <el-button size="large" @click="showDialog = true">切换地址</el-button>
                            <el-button size="large" @click="addDialog = true">添加地址</el-button>
                        </div>
                    </div>
                </div>
                <!-- 商品信息 -->
                <h3 class="box-title">商品信息</h3>
                <div class="box-body">
                    <table class="goods">
                        <thead>
                            <tr>
                                <th width="520">商品信息</th>
                                <th width="170">单价</th>
                                <th width="170">数量</th>
                                <th width="170">小计</th>
                                <th width="170">实付</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in cartStore.cartList" :key="item.id">
                                <td>
                                    <a href="javascript:;" class="info">
                                        <RouterLink :to="`/detail/${item.productId}`"><img :src="item.picture" alt="" />
                                        </RouterLink>
                                        <div class="right">
                                            <p>{{ item.name }}</p>
                                            <p>{{ item.attrsText }}</p>
                                        </div>
                                    </a>
                                </td>
                                <td>&yen;{{ item.price }}</td>
                                <td>{{ item.count }}</td>
                                <td class="price">&yen;{{ (item.price * item.count).toFixed(2) }}</td>
                                <td class="price">&yen;{{ (item.price * item.count).toFixed(2) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- 配送时间 -->
                <h3 class="box-title">配送方式</h3>
                <div class="box-body">
                    <el-radio-group v-model="deliverOptionsList">
                        <el-radio value="1" size="large" border>包邮</el-radio>
                        <el-radio value="2" size="large" border>顺丰速运<span
                                style="color:#999; font-size: 12px;">(需支付额外快递费)</span></el-radio>
                    </el-radio-group>
                </div>
                <!-- 支付方式 -->
                <h3 class="box-title">支付方式</h3>
                <div class="box-body">
                    <el-radio-group v-model="payMathodList">
                        <el-radio value="1" size="large" border>在线支付</el-radio>
                        <el-radio value="2" size="large" border>货到付款</el-radio>
                    </el-radio-group>
                </div>
                <!-- 金额明细 -->
                <h3 class="box-title">金额明细</h3>
                <div class="box-body">
                    <div class="total">
                        <dl>
                            <dt>商品件数：</dt>
                            <dd>{{ cartStore.selCount }}件</dd>
                        </dl>
                        <dl>
                            <dt>商品总价：</dt>
                            <dd>¥{{ cartStore.selPrice.toFixed(2) }}</dd>
                        </dl>
                        <dl>
                            <dt>运<i></i>费：</dt>
                            <dd>¥{{ deliveryFee.toFixed(2) }}</dd>
                        </dl>
                        <dl>
                            <dt>应付总额：</dt>
                            <dd class="price">{{ totalAmount }}</dd>
                        </dl>
                    </div>
                </div>
                <!-- 提交订单 -->
                <div class="submit">
                    <el-button @click="createOrder" type="primary" size="large">提交订单</el-button>
                </div>
            </div>
        </div>
    </div>
    <!-- 切换收货地址 -->
    <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
        <div class="addressWrapper">
            <div class="text item" :class="{ active: activeAddress.id === item.id }" @click="switchAddress(item)"
                v-for="item in addressList" :key="item.id">
                <ul>
                    <li><span>收<i />货<i />人：</span>{{ item.receiver }} </li>
                    <li><span>联系方式：</span>{{ item.contact }}</li>
                    <li><span>收货地址：</span>{{ item.fullLocation }} {{ item.address }} ({{ item.addressTags }})</li>
                    <i class="iconfont icon-close-new" @click="delAddress(item.id)"></i>
                    <a href="#"><el-button type="primary" @click="editAddress(item)">修改地址</el-button></a>
                </ul>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="showDialog = false">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 添加收货地址 -->
    <el-dialog v-model="addDialog" title="添加收货地址" width="30%" center>
        <div class="addressForm">
            <el-form :model="newAddress" :rules="rules" label-width="130px" ref="addAddressForm">
                <el-form-item label="收货人姓名" prop="receiver">
                    <el-input v-model="newAddress.receiver"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="contact">
                    <el-input v-model="newAddress.contact"></el-input>
                </el-form-item>
                <el-form-item label="省份或省份编码" prop="provinceCode">
                    <el-input v-model="newAddress.provinceCode"></el-input>
                </el-form-item>
                <el-form-item label="城市或城市编码" prop="cityCode">
                    <el-input v-model="newAddress.cityCode"></el-input>
                </el-form-item>
                <el-form-item label="区县或区县编码" prop="countyCode">
                    <el-input v-model="newAddress.countyCode"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="newAddress.address"></el-input>
                </el-form-item>
                <el-form-item label="完整地址" prop="fullLocation">
                    <el-input v-model="newAddress.fullLocation"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="postalCode">
                    <el-input v-model="newAddress.postalCode"></el-input>
                </el-form-item>
                <el-form-item label="地址标签" prop="addressTags">
                    <el-input v-model="newAddress.addressTags"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addDialog = false">取消</el-button>
                <el-button type="primary" @click="submitNewAddress">确定</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 修改收货地址 -->
    <el-dialog v-model="editDialog" title="修改收货地址" width="30%" center>
        <div class="addressForm">
            <el-form :model="editAddressData" :rules="rules" label-width="130px" ref="editAddressForm">
                <el-form-item label="收货人姓名" prop="receiver">
                    <el-input v-model="editAddressData.receiver"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="contact">
                    <el-input v-model="editAddressData.contact"></el-input>
                </el-form-item>
                <el-form-item label="省份或省份编码" prop="provinceCode">
                    <el-input v-model="editAddressData.provinceCode"></el-input>
                </el-form-item>
                <el-form-item label="城市或城市编码" prop="cityCode">
                    <el-input v-model="editAddressData.cityCode"></el-input>
                </el-form-item>
                <el-form-item label="区县或区县编码" prop="countyCode">
                    <el-input v-model="editAddressData.countyCode"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="address">
                    <el-input v-model="editAddressData.address"></el-input>
                </el-form-item>
                <el-form-item label="完整地址" prop="fullLocation">
                    <el-input v-model="editAddressData.fullLocation"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码" prop="postalCode">
                    <el-input v-model="editAddressData.postalCode"></el-input>
                </el-form-item>
                <el-form-item label="地址标签" prop="addressTags">
                    <el-input v-model="editAddressData.addressTags"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="submitEditAddress">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.settlement-page {
    margin-top: 20px;

    .wrapper {
        background: #fff;
        padding: 0 20px;

        .box-title {
            font-size: 16px;
            font-weight: normal;
            padding-left: 10px;
            line-height: 70px;
            border-bottom: 1px solid #f5f5f5;
        }

        .box-body {
            padding: 20px 0;

        }
    }
}

.address {
    border: 1px solid #f5f5f5;
    display: flex;
    align-items: center;

    .text {
        flex: 1;
        min-height: 90px;
        display: flex;
        align-items: center;

        .none {
            line-height: 90px;
            color: #999;
            text-align: center;
            width: 100%;
        }

        >ul {
            flex: 1;
            padding: 20px;
            position: relative;

            li {
                line-height: 30px;

                span {
                    color: #999;
                    margin-right: 5px;

                    >i {
                        width: 0.5em;
                        display: inline-block;
                    }
                }
            }
        }

        >a {
            color: $MainColor;
            width: 160px;
            text-align: center;
            height: 90px;
            line-height: 90px;
            border-right: 1px solid #f5f5f5;
        }
    }

    .action {
        width: 420px;
        text-align: center;

        .btn {
            width: 140px;
            height: 46px;
            line-height: 44px;
            font-size: 14px;

            &:first-child {
                margin-right: 10px;
            }
        }
    }
}

.goods {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;

    .info {
        display: flex;
        text-align: left;

        img {
            width: 70px;
            height: 70px;
            margin-right: 20px;
        }

        .right {
            line-height: 24px;

            p {
                &:last-child {
                    color: #999;
                }
            }
        }
    }

    tr {
        th {
            background: #f5f5f5;
            font-weight: normal;
        }

        td,
        th {
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid #f5f5f5;

            &:first-child {
                border-left: 1px solid #f5f5f5;
            }

            &:last-child {
                border-right: 1px solid #f5f5f5;
            }
        }

        .price {
            color: $priceColor;
        }
    }
}

.total {
    dl {
        display: flex;
        justify-content: flex-end;
        line-height: 50px;

        dt {
            i {
                display: inline-block;
                width: 2em;
            }
        }

        dd {
            width: 240px;
            text-align: right;
            padding-right: 70px;

            &.price {
                font-size: 20px;
                color: $priceColor;
            }
        }
    }
}

.submit {
    text-align: right;
    padding: 60px;
    border-top: 1px solid #f5f5f5;
}

.addressWrapper {
    max-height: 500px;
    overflow-y: auto;
}

.text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    &.item {
        border: 1px solid #f5f5f5;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;

        &.active,
        &:hover {
            border-color: $MainColor;
            background-color: rgba(255, 126, 0, 0.3);

            i {
                opacity: 1;
                cursor: pointer;
            }

            a {
                opacity: 0.8;
                cursor: pointer;
            }
        }

        >ul {
            padding: 10px;
            font-size: 14px;
            line-height: 30px;
        }

        i {
            position: absolute;
            bottom: 50px;
            right: 10px;
            opacity: 0;
            color: #666;
            transition: all 0.5s;
        }

        a {
            opacity: 0;
            transition: all 0.5s;
        }

    }
}
</style>