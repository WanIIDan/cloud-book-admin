<template>
    <div class="add-user">
        <h2>添加管理员</h2> 
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="100px" label-position="left">
                <el-form-item label="用户名">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item label="再次确认密码">
                    <el-input v-model="formData.checkPassword"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="formData.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="用户头像">
                    <uploadImg v-model="formData.avatar"></uploadImg>
                </el-form-item>
                <el-form-item label="个性签名">
                    <el-input type="textarea" v-model="formData.desc"></el-input>
                </el-form-item>
                <el-button size="small" type="primary" @click="submitData">添加</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import uploadImg from '@/components/upload-com'
    import axios from 'axios'

    export default {
        components: {
            uploadImg
        },
        data() {
            return {
                formData: {
                    username: '',
                    password: '',
                    nickname: '',
                    email: '',
                    desc: '',
                    avatar: '',
                    checkPassword: ''
                },
                data: {
                    token: ''
                }
            }
        },
        methods: {
            submitData() {
                if(this.formData.password != this.formData.checkPassword){
                    this.$message.error('两次输入的密码不一致')
                }else{
                    this.$axios.post('/user',this.formData).then(res=>{
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            this.$router.push('/layout/users')
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .form-wrap {
        width: 520px;
        margin-top: 30px;
    }
</style>