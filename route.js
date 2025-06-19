//导入路由类方法
import { createRouter, createWebHistory } from "vue-router";

import store from './store' // 直接导入store实例

import Layout from './components/Layout.vue'
//定义路由映射关系数据
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
    {
        path: "/login",
        name: "Login",
        component: () => import('./components/HomeView.vue')
    },
    {
        path: '/index',
        component: Layout,
        redirect: '/index/dashboard',
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('./components/Dashboard.vue'),
            meta: { title: '控制台', icon: 'el-icon-monitor' }
          },
          {
            path: 'user',
            name: 'User',
            component: () => import('./components/User.vue'),
            meta: { title: '用户管理', icon: 'el-icon-user' }
          },
          {
            path: 'role',
            name: 'Role',
            component: () => import('./components/Role.vue'),
            meta: { title: '角色管理', icon: 'el-icon-s-custom' }
          },
          {
            path: 'profile',
            name: 'Profile',
            component: () => import('./components/Profile.vue'),
            meta: { title: '个人中心', icon: 'el-icon-user-solid' }
          }
        ]
      }
]
//创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes,
})

// 全局路由 前置
router.beforeEach((to,from,next)=>{
    console.log("全局导航守卫-前置。。。");
  

   if(to.name !== "Login"){
        //如果不是登录页面，需要鉴权
        console.log("@@@",store.state.userName);
          // 1. 检查store是否初始化完成
        if (!store) {
          console.error('Store未初始化!')
          next('/')
        }

        if(store.state.loginFlag == 1){
            //如果用户未登录，重定向到登录页面
            next()
        }else{ 
            next('/')
        }
    }else{
        next()
    }
})
//暴露实例
export default router
