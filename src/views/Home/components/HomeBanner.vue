<script setup>
import { getBannersAPI } from '@/apis/home'
import { onMounted,ref } from 'vue'

const bannerList = ref([])
// 获取轮播图数据
const getBanner = async () => {
    const res = await getBannersAPI()
    // console.log(res)
    bannerList.value = res.data.result
}

onMounted(() => getBanner())

</script>



<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <a :href="item.hrefUrl">
            <img :src="item.imgUrl" alt="">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: auto;
    height: 500px;
    margin-left: 250px;
  }
}
</style>