import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import Cart from '@/views/Cart/index.vue'
import Settlement from '@/views/Settlement/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayCallBack from '@/views/Pay/payback.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '',
                    component: Home
                },
                {
                    path: 'category/:id',
                    component: Category
                },
                {
                    path: 'category/sub/:id',
                    component: SubCategory
                },
                {
                    path: 'detail/:id',
                    component: Detail
                },
                {
                    path: 'cart',
                    component: Cart
                },
                {
                    path: 'settlement',
                    component: Settlement
                },
                {
                    path: 'pay',
                    component: Pay
                },
                {
                    path: 'paycallback',
                    component: PayCallBack
                }
            ]
        },
        {
            path: '/login',
            component: Login
        }
    ],
    // 路由滚动行为
    scrollBehavior() {
        return {
            top: 0
        }
    }
})

export default router