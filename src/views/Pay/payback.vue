<script setup>
import { getLatestOrderAPI } from '@/apis/order'
import { querypayAPI } from '@/apis/pay'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'


// 获取订单数据
const payList = ref({})
const getPayInfo = async () => {
    const res = await getLatestOrderAPI()
    // console.log(res)
    payList.value = res.data.result
}
onMounted(() => getPayInfo())

const route = useRoute()
const querypayData = ref({})
const getQueryPay = async () => {
  const res = await querypayAPI({ out_trade_no: route.query.out_trade_no, trade_no: route.query.trade_no })
  querypayData.value = res.data
  console.log(querypayData.value.code)
  console.log(querypayData.value.message)
}
onMounted(() => getQueryPay())

const timestamp = route.query.timestamp

</script>

<template>
    <div class="xtx-pay-page">
      <div class="container">
        <!-- 支付结果 -->
        <div class="pay-result">
          <!--  -->
          <span class="iconfont icon-queren2 green" v-if="querypayData.code === 10002"></span>
          <span class="iconfont icon-shanchu red" v-else></span>
          <p class="tit">{{ querypayData.message }}</p>
          <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
          <p>支付方式：<span>支付宝</span></p>
          <p>支付金额：<span>¥{{ payList.latestOrder?.totalAmount.toFixed(2) }}</span></p>
          <p>交易时间：<span>{{ timestamp }}</span></p>
          <div class="btn">
            <el-button type="primary" style="margin-right:20px">查看订单</el-button>
            <el-button @click="$router.push('/')">进入首页</el-button>
          </div>
          <p class="alert">
            <span class="iconfont icon-tip"></span>
            温馨提示：荔枝官方不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作，对交易有疑问请联系客服。
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped lang="scss">
  .pay-result {
    padding: 100px 0;
    background: #fff;
    text-align: center;
    margin-top: 20px;
  
    >.iconfont {
      font-size: 100px;
    }
  
    .green {
      color: #1dc779;
    }
  
    .red {
      color: $priceColor;
    }
  
    .tit {
      font-size: 24px;
    }
  
    .tip {
      color: #999;
    }
  
    p {
      line-height: 40px;
      font-size: 16px;
    }
  
    .btn {
      margin-top: 50px;
    }
  
    .alert {
      font-size: 12px;
      color: #999;
      margin-top: 50px;
    }
  }
  </style>