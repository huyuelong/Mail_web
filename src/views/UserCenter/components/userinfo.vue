<script setup>
import { onMounted, ref, computed } from 'vue'
import { getUserInfoAPI, updateUserInfoAPI, updateAvatarAPI } from '@/apis/user'
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'

// 获取用户信息数据
const userInfo = ref({})
const getuserinfo = async () => {
    const res = await getUserInfoAPI()
    console.log('res', res)
    userInfo.value = res.data.result[0]
}

onMounted(() => getuserinfo())

// 动态计算图片路径
const avatarPath = computed(() => {
    if (userInfo.value.id) {
        return `/assets/avatars/avatar_${userInfo.value.id}.png`
    } else {
        return "https://th.bing.com/th?id=OIP.Q0LVdFjjGfpqwc1FCi-WigAAAA&w=176&h=176&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"; // 如果用户信息未加载，则显示默认头像
    }
});
console.log('avatarPath:', avatarPath)

// 有昵称显示昵称，没有显示用户名
const displayName = computed(() => userInfo.value.nickname ? userInfo.value.nickname : userInfo.value.username)

// 问候语
const now = new Date()
const hour = now.getHours()
let greeting = '晚上好~'
if (hour >= 8 && hour < 12) {
    greeting = '早上好~'
} else if (hour >= 12 && hour < 18) {
    greeting = '下午好~'
}

// 根据安全级别设置颜色
const getSecurityClass = (level) => {
    switch (level) {
        case 0:
            return 'danger'
        case 1:
            return 'normal'
        case 2:
            return 'good'
        case 3:
            return 'safe'
        default:
            return ''
    }
}
// 根据安全级别文字显示
const getSecurityText = (level) => {
    switch (level) {
        case 0:
            return '危险'
        case 1:
            return '一般'
        case 2:
            return '较高'
        case 3:
            return '安全'
        default:
            return ''
    }
}

// 隐藏部分手机号中间数字
const maskedPhone = computed(() => {
    const phone = userInfo.value.phone
    return phone ? phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2') : ''
})

// 隐藏部分邮箱中间字符
const maskedEmail = computed(() => {
    const email = userInfo.value.email
    if (email) {
        const [prefix, domain] = email.split('@')
        const maskedPrefix = prefix.substring(0, 2) + '****' + prefix.substring(prefix.length - 2)
        return maskedPrefix + '@' + domain
    } else {
        return ''
    }
})

// 更新头像
const avatarDialog = ref(false)
const uploadRef = ref()
const imgUrl = ref('')

const uploadAvatar = () => {
    // imgUrl.value = userInfo.value.user_avatar
    imgUrl.value = avatarPath.value
    avatarDialog.value = true
}

const onSelectFile = (uploadFile) => {
    // 基于 FileReader 读取图片做预览
    const reader = new FileReader()
    reader.readAsDataURL(uploadFile.raw)
    reader.onload = () => {
        imgUrl.value = reader.result // 设置 imgUrl 为读取的图片数据 URL
    }
}


// 上传更新
const onUpdateAvatar = async () => {
    try {
        // 发送请求更新头像
        console.log('imgUrl.value', imgUrl.value)
        await updateAvatarAPI({ user_avatar: imgUrl.value }) // 确保 imgUrl.value 是有效的图片数据 URL
        // 更新用户信息
        await getuserinfo()
        avatarDialog.value = false; // 关闭弹窗
        // 提示用户
        ElMessage.success('头像更新成功')
    } catch (error) {
        console.error('更新头像错误:', error)
        ElMessage.error('更新头像失败')
    }
};


// 修改用户信息
const editDialog = ref(false)
const editInfoForm = ref(null)
const editInfoData = ref({
    nickname: '',
    gender: '',
    phone: '',
    email: '',
    birthday: '',
    profession: '',
})

// 表单校验
const rules = {
    nickname: [
        { required: false, message: '快来想个昵称吧', trigger: 'blur' },
        { pattern: /^[\u4E00-\u9FA5A-Za-z]{1,10}$/, message: '昵称只能是1到10位中文或英文字母', trigger: 'blur' }
    ],
    phone: [
        { required: false, message: '添加联系方式', trigger: 'blur' },
        { pattern: /^\d{11}$/, message: '请输入正确的电话号码', trigger: 'blur' }
    ],
    email: [
        { required: false, message: '添加邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' } // 使用 type: 'email' 进行邮箱格式校验
    ],
    profession: [
        { required: true, message: '添加职业', trigger: 'blur' },
        { pattern: /^[\u4E00-\u9FA5]+$/, message: '请输入正确的职业(中文输入)', trigger: 'blur' }
    ]
}


// 日期选择器
const disabledDate = (time) => {
    return time.getTime() > Date.now();
}

const edditInfo = () => {
    editInfoData.value = {
        nickname: userInfo.value.nickname,
        gender: userInfo.value.gender,
        phone: userInfo.value.phone,
        email: userInfo.value.email,
        birthday: userInfo.value.birthday,
        profession: userInfo.value.profession,
    }
    // 打开编辑信息的弹窗
    editDialog.value = true
}

// 上传修改
const submitEditInfo = async () => {
    editInfoForm.value.validate(async valid => {
        if (valid) {
            try {
                // 调用修改用户信息的 API 接口
                await updateUserInfoAPI(editInfoData.value)
                // 更新用户信息
                await getuserinfo()
                editInfoData.value = {} // 清空编辑数据
                editDialog.value = false // 关闭弹窗
                ElMessage({ type: 'success', message: '修改用户信息成功' })
            } catch (error) {
                console.error('修改用户信息错误:', error)
            }
        } else {
            console.error('表单验证未通过')
            ElMessage({ type: 'error', message: '请检查表单格式' })
        }
    })
}



</script>

<template>
    <div class="info-page">
        <!-- 用户信息 -->
        <div class="user-meta">
            <!-- 头像 -->
            <div class="avatar">
                <img v-if="userInfo.user_avatar" :src="avatarPath" @click="uploadAvatar" />
                <img v-else
                    src="https://th.bing.com/th?id=OIP.Q0LVdFjjGfpqwc1FCi-WigAAAA&w=176&h=176&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2"
                    @click="uploadAvatar" alt="">
            </div>
            <div class="info-text">
                <h4>{{ displayName }}</h4>
                <p>{{ greeting }}</p>
                <a href="#" @click="edditInfo">修改个人信息<i class="iconfont icon-angle-right"></i></a>
            </div>
            <div class="right-text">
                <p>账号安全：<span :class="getSecurityClass(userInfo.security)">{{ getSecurityText(userInfo.security)
                        }}</span></p>
                <p>绑定手机：{{ maskedPhone }}</p>
                <p>绑定邮箱：{{ maskedEmail }}</p>
            </div>
        </div>
        <!-- 修改头像 -->
        <el-dialog v-model="avatarDialog" title="修改头像" width="30%" center>
            <el-upload ref="uploadRef" :auto-upload="false" class="avatar-uploader" :show-file-list="false"
                :on-change="onSelectFile">
                <img v-if="imgUrl" :src="imgUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <br />
            <el-button @click="uploadRef.$el.querySelector('input').click()" type="primary" :icon="Plus"
                size="large">选择图片</el-button>
            <el-button @click="onUpdateAvatar" type="success" :icon="Upload" size="large">上传头像</el-button>
        </el-dialog>
        <!-- 修改用户信息 -->
        <el-dialog v-model="editDialog" title="修改个人信息" width="30%" center>
            <div class="userForm">
                <el-form :model="editInfoData" :rules="rules" label-width="130px" ref="editInfoForm">
                    <el-form-item label="昵称" prop="nickname">
                        <el-input v-model="editInfoData.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="editInfoData.gender">
                            <el-radio value="1" size="large">男</el-radio>
                            <el-radio value="2" size="large">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="电话" prop="phone">
                        <el-input v-model="editInfoData.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="editInfoData.email"></el-input>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <!-- <el-input v-model="editInfoData.birthday"></el-input> -->
                        <div class="data">
                            <el-date-picker v-model="editInfoData.birthday" type="date" placeholder="添加生日"
                                :disabled-date="disabledDate" />
                        </div>
                    </el-form-item>
                    <el-form-item label="职业" prop="profession">
                        <el-input v-model="editInfoData.profession"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialog = false">取消</el-button>
                    <el-button type="primary" @click="submitEditInfo">确定修改</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped lang="scss">
.info-page {
    height: 200px;
    display: flex;
    justify-content: center;
    /* 让子元素水平居中对齐 */
}

.user-meta {
    flex: 1;
    display: flex;
    align-items: center;

    .avatar {
        width: 170px;
        height: 170px;
        border-radius: 50%;
        overflow: hidden;
        margin-left: 60px;

        img {
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }

    .info-text {
        flex: 1;
        padding-left: 30px;
        text-align: left;

        h4 {
            font-size: 45px;
            font-weight: normal;
            color: black;
            margin: 0;
        }

        p {
            margin: 20px 0;
            font-size: 12px;
            color: gray;
        }

        a {
            color: #ff7e00;
            margin-top: 20px;
            text-decoration: none;
        }
    }

    .right-text {
        flex: 1;
        padding-right: 100px;
        text-align: left;

        p {
            margin: 30px 0;
            font-size: 16px;
            color: black;
            vertical-align: top;
        }
    }

    .danger {
        color: $warnColor;
    }

    .normal {
        color: $MainColor;
    }

    .good {
        color: #83c44e;
    }

    .safe {
        color: green;
    }

    .data {
        .block {
            padding: 30px 0;
            text-align: center;
            border-right: solid 1px var(--el-border-color);
        }
    }
}

.avatar-uploader {
    :deep() {
        .avatar {
            width: 278px;
            height: 278px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary)
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 278px;
            height: 278px;
            text-align: center;
        }
    }
}
</style>