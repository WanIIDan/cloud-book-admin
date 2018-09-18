<template>
    <div class="container">
        <h1 class="title">欢迎来到云书后台管理系统</h1>
        <div class="login-box">
            <h2 class="login-box-title">请登录</h2>
            <el-form class="form" ref="form" :rules="rule" :model="formData">
                <el-form-item label="用户名：" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input v-model="formData.password" type="password" 
                        placeholder="请输入密码" 
                        @keyup.enter.native="handleLogin"
                    ></el-input>
                </el-form-item>
            </el-form>
            <el-button class="login-btn" @click="handleLogin" type="primary" :loading="isLoading">登录</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if(!value){
                    callback(new Error('用户名不能为空'))
                }else{
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if(value && value.length>=5){
                    callback()
                }else{
                    callback(new Error('请输入合法的密码'))
                }
            }

            return {
               formData: {
                   username: '',
                   password: ''
               },
               rule: {
                   username: [{validator: validateUsername, trigger: 'blur'}],
                   password: [{validator: validatePassword, trigger: 'blur'}],
               },
               isLoading: false
            }
        },
        methods: {
            handleLogin() {
                this.isLoading = true
                this.$axios.post('/login',this.formData).then(res=>{
                    console.log(res)
                    if(res.code == 200) {
                        this.$message.success('登录成功')
                        setTimeout(()=>{
                            this.$router.push('/layout/index')
                        },1000)
                    }else{
                        this.$message.error(res.msg)
                    }
                    this.isLoading = false;
                }).catch(err=>{
                    console.log(err)
                })
            }
            // validateLogin() {
            //     this.$refs['from'].validate((valid) => {
            //         if (valid) {
            //             this.handleLogin()
            //         } else {
            //             return false;
            //         }
            //     })
            // }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        min-height: 100vh; /* == height:100%; */
        overflow: hidden;
        background: #545c64;

        .title {
            margin-top: 100px;
            text-align: center;
            color: #fff;
            font-weight: 400;
        }

        .login-box {
            width: 400px;
            height: 320px;
            border: 1px solid #f1f1f1;
            border-radius: 6px;
            padding: 40px;
            background: #e8e8e8;
            margin: 40px auto 0;

            .login-box-title {
                color: #333;
                font-weight: 400;
                text-align: center;
            }

            .form {
                margin-top: 20px;
            }

            .login-btn {
                margin-top: 30px;
                width: 100%;
                box-sizing: border-box;
            }
        }

    }
</style>
