<template>
    <div>
        <h2>修改个人信息</h2>
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="80px" label-position="left">
                <el-form-item label="用户名">
                    <el-input v-model="formData.username" :disabled="true"></el-input>
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
            </el-form>
            <el-button size="small" type="primary" @click="handleClick">保存更改</el-button>
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
                    nickname: '',
                    email: '',
                    desc: '',
                    avatar: '' 
                },
                data: {
                    token: ''
                }
            }
        },
        methods: {
            initData() {
                this.formData = {
                    ...this.$store.state.userinfo
                }
            },
            // put修改数据，post添加数据，get拿数据，delete删除数据
            handleClick() {
                this.$axios.put('/user/userInfo', this.formData).then(res=>{
                    console.log(res)
                    if(res.code == 200){
                        let userInfo = res.data
                        this.$store.commit('CHANGE_USERINFO',userInfo)
                        this.initData()
                        this.$message.success(res.msg)
                    }
                })
            }
        },
        created() {
            this.initData()
        }
    }
</script>

<style scoped lang="scss">
    .form-wrap {
        width: 520px;
        margin-top: 30px;
    }
</style>