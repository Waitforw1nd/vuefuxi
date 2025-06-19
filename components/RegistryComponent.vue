<template>
    <div class="container">
        <div class="login-container">

            <!-- 默认插槽 -->
            <h2>
                <slot></slot>
            </h2>

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                class="demo-ruleForm">
                <el-form-item label="用户名" prop="account" style="margin-bottom: 15px;">
                    <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>

</template>

<script>

import { ElMessage } from 'element-plus';
import { saveUser } from '@/util/auth';
export default {

    data() {

        // 密码验证规则
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value.length < 6) {
                callback(new Error('密码长度不能少于6位'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };

        // 确认密码验证规则
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };


        return {
            ruleForm: {
                account: '',
                pass: '',
                checkPass: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: 'change' },
                    {
                        pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,
                        message: '用户名必须以字母开头，包含数字、字母、下划线，长度为 4 - 16 位',
                        trigger: 'change'
                    }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    {
                        pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/,
                        message: '密码必须以字母开头，包含数字、字母、下划线，长度为 4 - 16 位',
                        trigger: 'change'
                    }
                ],
                checkPass: [
                    { required: true, validator: validatePass2, trigger: 'change' }
                ]
            },

            // 注册校验通过后，跳转登录页面，触发自定义事件，同时传递
            info: {
                account:'',
                password:'',
                currentComponent: 'LoginComponent',
                componentName: '登录'
            }
        }
    },
    methods: {

        // 注册表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 表单验证通过，执行注册逻辑
                    this.register();
                } else {
                    // 表单验证失败
                    console.log('表单验证失败');
                    return false;
                }
            });
        },

        // 重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        // 提交注册
        register(){
            this.info.account = this.ruleForm.account;
            this.info.password = this.ruleForm.pass;
            
            ElMessage.success("注册成功！")

            saveUser(this.info.account, this.info.password);

            // 发送自定义事件
            this.$emit('tabComponent', this.info);
        }

    }

}
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    height: 100vh;
    justify-content: center;
}

.login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 40px 20px 20px 20px;
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

.el-form-item__error {
    max-width: 300px;
    white-space: normal;
    word-wrap: break-word;
}
</style>