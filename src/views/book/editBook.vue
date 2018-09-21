<template>
    <div>
        <h2>编辑图书</h2>
        <div class="form-wrap">
            <el-form :model="formData" size="small" label-width="80px" label-position="left">
                <!-- <el-form-item label="用户名">
                    <el-input v-model="formData.username" :disabled="true"></el-input>
                </el-form-item> -->
                <el-form-item label="标题">
                    <el-input v-model="formData.title"></el-input>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input v-model="formData.author"></el-input>
                </el-form-item>
                <el-form-item label="书籍头图">
                    <template>
                        <uploadImg v-model="formData.img" class="avatar"></uploadImg>
                        <!-- <img :src="scope.row.img" class="avatar"> -->
                    </template>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="formData.type">
                        <el-option v-for="(item,index) in categoryData"
                            :key="index"
                            :label="item.title"
                            :value="item._id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="formData.desc" autosize></el-input>
                </el-form-item>
                <el-form-item label="index">
                    <el-input-number v-model="formData.index" :min="1"></el-input-number>
                </el-form-item>
            </el-form>
            <el-button size="small" type="primary" @click="handleSaveEdit">保存更改</el-button>
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
                    author: '',
                    index: '',
                    img: '',
                    desc: '',
                    type: '',
                },
                categoryData: [],
                bookData: [],
                bookCount: 0
            }
        },
        methods: {
            async getCategoryData() {
                const res = await this.$axios.get('/category')
                this.categoryData = res.data
            },
            async getBookData() {
                const res = await this.$axios.get(`/category/${this.formData.category}/books`)
                this.bookData = res.data.books
                this.bookCount = res.count
            },
            getInitData() { 
                let id = this.$route.query.bookId
                this.$axios.get(`/book/${id}`).then(res=>{
                    this.formData = res.data
                    this.getBookData()
                })
            },
            handleSaveEdit() { 
                let params = {
                    ...this.formData,
                    book_id:this.$route.query.bookId
                }
                this.$axios.put('/book',params).then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        this.$router.push('/layout/books')
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }
        },
        created() {
            this.getCategoryData()
            this.getInitData()
        }
    }
</script>

<style scoped lang="scss">
    .form-wrap {
        width: 520px;
        margin-top: 30px;

        .avatar {
            width: 100px;
            height: 130px;
        }
    }
</style>