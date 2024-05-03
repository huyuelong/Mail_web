<script setup>
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { getUserInfoAPI } from '@/apis/user'
import { ref, onMounted, computed } from 'vue'

const userStore = useUserStore()
const router = useRouter()

const userInfo = ref({})
const getuserinfo = async () => {
    const res = await getUserInfoAPI()
    console.log('res', res)
    userInfo.value = res.data.result[0]
    console.log(userInfo.value.username)
}

onMounted(() => getuserinfo())

// 有昵称显示昵称，没有显示用户名
const displayName = computed(() => userInfo.value.nickname ? userInfo.value.nickname : userInfo.value.username)

// 动态计算图片路径
const avatarPath = computed(() => {
    if (userInfo.value.id) {
        return `/assets/avatars/avatar_${userInfo.value.id}.png`
    } else {
        return "https://th.bing.com/th?id=OIP.Q0LVdFjjGfpqwc1FCi-WigAAAA&w=176&h=176&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"; // 如果用户信息未加载，则显示默认头像
    }
});

const confirm = () => {
    // 清除用户信息
    userStore.clearInfo()
    // 跳转登录页
    router.push('/login')
}

</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="userStore.userInfo.token">
                    <li><a href="javascript:;" @click="router.push('/usercenter')"><img v-if="userInfo.user_avatar" :src="avatarPath" class="avatar" />{{
                            displayName }}</a></li>
                    <li>
                        <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认"
                            cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;" @click="router.push('/usercenter/order')">我的订单</a></li>
                    <li><a href="javascript:;" @click="router.push('/usercenter')">个人中心</a></li>
                </template>
                <template v-else>
                    <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>


<style scoped lang="scss">
.app-topnav {
    background: #333;

    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;

        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 5px;
        }

        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $MainColor;
                }
            }

            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>