<template>
    <div class="container">
       
        <div class="login-container">
            <!-- 默认插槽 -->
            <h2>
                <slot></slot>
            </h2>

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="primary" @click="registry">注册</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>

</template>

<script>
import { ElMessage } from 'element-plus';
import { verifyUser, storeLoginFlag } from '@/util/auth';

export default {

    props: ['registryAccount', 'registryPassword'],
    
    data() {
        return {
            ruleForm: {
                account: '',
                pass: '',
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'change' },
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                ]
            },

            // 用于在登录页面，点击注册时，向首页容器发送自定义事件
            // 参数内容为告诉容器，要进行渲染的动态组件
            info: {
                currentComponent: 'RegistryComponent',
                componentName: '注册'
            }
        }
    },
    methods: {

        // 点击注册，向父组件发送自定义事件
        // 携带参数为要跳转的动态组件的 名称
        registry() {
            this.$emit('tabComponent', this.info);
        },

        login() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    // 表单验证通过，执行注册逻辑
                    console.log("dddddddddddddddddddddd");
                    var flag = verifyUser(this.ruleForm.account, this.ruleForm.pass);
                    if(flag){
                        // 记住登录标记
                        let info = {
                            flag: 1,
                            userName: this.ruleForm.account
                        };

                        this.$store.commit('updateLoginInfo', info);

                        //storeLoginFlag(info);

                        ElMessage.success("登录成功")

                        //跳转到首页 主页面
                        this.$router.push('/index')
                    }else{
                        ElMessage.error("密码或账号不正确！")
                    }
                } else {
                    // 表单验证失败
                    ElMessage.error("密码或账号不正确！")
                    return false;
                }
            });
        },

        
    }

}
</script>

<style  scoped>
.container{
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 20px 20px  20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}

.login-btn {
  flex: 1;
  margin-right: 12px;
}

.el-input {
  margin-bottom: 8px;
}

.demo-ruleForm .el-input {
    width: 400px;
}
</style>