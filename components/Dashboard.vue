<template>
    <div class="dashboard">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>欢迎使用管理系统</span>
          </div>
        </template>
        <div class="welcome-content">
          <p>当前登录用户: {{ user.name }}</p>
          <p>登录时间: {{ loginTime }}</p>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const user = ref({
    name: '管理员'
  })
  
  const loginTime = ref(new Date().toLocaleString())
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  
  .card-header {
    font-size: 18px;
    font-weight: bold;
  }
  
  .welcome-content {
    line-height: 2;
  }
  </style>