<template>
    <div>
        <h2>用户信息</h2>
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
                this.$axios.get(`/user/${this.$route.query.id}`).then(res=>{
                    this.formData = {
                        ...this.formData,
                        ...res.data
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