<template>
    <div class="user-manage">
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>图书管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="tableData" border>
            <el-table-column
                prop="title"
                label="书名"
                width="240">
            </el-table-column>
            <el-table-column
                prop="author"
                label="作者"
                width="150">
            </el-table-column>
            <el-table-column
                prop="type.title"
                label="分类"
                width="150">
            </el-table-column>
            <el-table-column
                prop="desc"
                label="简介"
                width="400">
                <template slot-scope="scope">
                    <span v-text="scope.row.desc" class="desc"></span>
                </template>
            </el-table-column>
            <el-table-column
                prop="img"
                label="书籍头图"
                width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.img" class="avatar">
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleDetails(scope.row._id)">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row._id)">删除
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
                this.$axios.get('/book',{pn: this.page}).then(res=>{
                    if(res.code == 200){
                        this.count = res.count
                        this.tableData = res.data
                    }
                })
            },
            handleDetails(id) {
                this.$router.push(`/layout/editBook?bookId=${id}`)
            },
            handleDelete(id) {
                this.$confirm('此操作将删除一本书, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/book/delete', {ids: [id]}).then(res=>{
                        this.$message.success(res.msg)
                        this.getData()
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

        .avatar {
            width: 80px;
            height: 100px;
        }

        .desc {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; 
            overflow: hidden;
        }
    }
</style>