<template>
    <el-container class="layout-container">
      <!-- 侧边栏 -->
      <el-aside width="200px" class="sidebar">
        <div class="logo">管理系统</div>
        <el-menu
          :default-active="activeMenu"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index/dashboard">
            <el-icon><icon-menu /></el-icon>
            <span>控制台</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/index/user">用户管理</el-menu-item>
            <el-menu-item index="/index/role">角色管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/index/profile">
            <el-icon><User /></el-icon>
            <span>个人中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
  
      <!-- 主内容区 -->
      <el-container>
        <!-- 顶部导航 -->
        <el-header class="header">
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                <el-avatar :size="30" :src="user.avatar" />
                <span>{{ user.name }}</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="goProfile">个人中心</el-dropdown-item>
                  <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
  
        <!-- 内容区域 -->
        <el-main class="main-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  import store from '../store' // 直接导入store实例

  import {
    Menu as IconMenu,
    Setting,
    User
  } from '@element-plus/icons-vue'
  
  const router = useRouter()
  const route = useRoute()
  
  // 模拟用户数据
  const user = ref({
    name: store.state.userName,
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  })
  
  // 当前激活菜单
  const activeMenu = computed(() => route.path)
  
  // 跳转个人中心
  const goProfile = () => {
    router.push('/index/profile')
  }
  
  // 退出登录
  const logout = () => {
   
    // 更新store
    // 记住登录标记
    let info = {
      flag: 0,
      userName: ''
    };

    store.commit('updateLoginInfo', info);

    //
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .layout-container {
    height: 100vh;
  }
  
  .sidebar {
    background-color: #545c64;
    color: white;
  }
  
  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    background-color: #434a50;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-bottom: 1px solid #eee;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .user-info span {
    margin-left: 10px;
  }
  
  .main-content {
    background-color: #f5f7fa;
    padding: 20px;
  }
  </style>