<template>
    <div>
        <component :is="currentComponent" @tabComponent="tabComponent" :registryAccount ="account" :registrypassword = "password">
            {{ componentName }}
        </component>
    </div>
</template>

<script>
import LoginComponent from './LoginComponent.vue'
import RegistryComponent from './RegistryComponent.vue';
export default {

    components: {
        LoginComponent,
        RegistryComponent
    },

    data() {
        return {
            currentComponent: 'LoginComponent',
            componentName: '登录',

            // 中转 账号密码
            account:'',
            password:''
        }
    },

    methods:{
        tabComponent(info){
            this.currentComponent = info.currentComponent;
            this.componentName = info.componentName;

            this.account = info.account;
            this.password = info.password;
        }
    }

}
</script>

<style  scoped></style>