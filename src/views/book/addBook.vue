<template>
    <div>
        <el-form :model="formData" class="form-wrap">
            <el-form-item label="网址">
                <el-input v-model="formData.url"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="formData.author"></el-input>
            </el-form-item>
            <el-form-item label="书籍头图">
                <el-switch 
                    v-model="isUpload"
                    active-text="手动上传"
                    inactive-text="头图网址">
                </el-switch>
                <uploadImg v-model="formData.img" v-if="isUpload"></uploadImg>
                <el-input v-model="formData.img" v-else></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="formData.typeId">
                    <el-option v-for="(item,index) in categoryData"
                        :key="index"
                        :label="item.title"
                        :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import uploadImg from '@/components/upload-com'

    export default {
        components: {
            uploadImg
        },
        data() {
            return {
                formData: {
                    url: '',
                    author: '',
                    img: '',
                    typeId: ''
                },
                isUpload: false,
                categoryData: []
            }
        },
        methods: {
            async getCategoryData() {
                const res = await this.$axios.get('/category')
                this.categoryData = res.data
            },
            handleSubmit() {
                this.$axios.post('/book',this.formData).then(res=>{
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.$router.push('/layout/books')
                    }
                })
            }
        },
        created() {
            this.getCategoryData()
        }
    }
</script>

<style scoped>
    .form-wrap {
        width: 520px;
        margin-top: 30px;
    }
</style>