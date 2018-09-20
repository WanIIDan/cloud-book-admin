<template>
    <div class="user-manage">
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>轮播图管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="tableData" border>
            <el-table-column
                prop="img"
                label="轮播图头图"
                width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="img">
                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="轮播图标题"
                width="300">
            </el-table-column>
            <el-table-column
                prop="book.img"
                label="图书头图"
                width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.book.img" class="img">
                </template>
            </el-table-column>
            <el-table-column
                prop="book.title"
                label="图书"
                width="300">
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="edit(scope.row._id)">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="deleteSwiper(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background
            layout="prev, pager, next"
            @current-change="pageChange"
            :page-size="10"
            :total="count">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                count: 0,
                page: 1
            }
        },
        methods: {
            getData() {
                this.$axios.get('/swiper',{pn: this.page}).then(res=>{
                    if(res.code == 200){
                        this.count = res.count
                        this.tableData = res.data
                    }
                })
            },
            edit(id) {
                this.$router.push({name: 'editSwiper', query: {id}})
            },
            deleteSwiper(id) {
                this.$confirm('此操作将删除该轮播图, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/swiper/delete', {ids: [id]}).then(res=>{
                        console.log(res)
                        if(res.code == 200){
                            this.$message.success(res.msg)
                            this.getData()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            pageChange(page) {
                this.page = page
                this.getData()
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style scoped lang="scss">
    .user-manage {
        .breadcrumb {
            margin: 15px 0;
        }

        .img {
            width: 80px;
            height: 100px;
        }
    }
</style>