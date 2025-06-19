import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css';
import App from './App.vue'

import router from './route.js'

import store from './store'

import axios from 'axios';


const app = createApp(App)

app.use(ElementPlus)

app.use(router)

//  挂载store模块
app.use(store)

// 全局挂载 axios
app.config.globalProperties.$axios = axios;

//响应拦截器
axios.interceptors.response.use(function(response){
    console.log("响应拦截器",response)
    return response.data;
},function(error){
    return Promise.reject(error)
})

app.mount('#app')
