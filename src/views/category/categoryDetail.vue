<template>
    <div class="category-manage">
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>分类详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- <h3>分类详情</h3> -->
        <el-table :data="tableData" border>
            <el-table-column
                prop="img"
                label="头像"
                width="180">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" class="avatar">
                </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="类名"
                width="240">
            </el-table-column>
            <el-table-column
                prop="_id"
                label="typeId"
                width="300">
            </el-table-column>
            <el-table-column
                prop="index"
                label="index"
                width="150">
            </el-table-column>
            <el-table-column
                label="书的数量"
                width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.books.length}}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.row._id)">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        @click="handleDetails(scope.row._id)">详情
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
            getListData() {
                this.$axios.get('/category',{pn: this.page}).then(res=>{
                    if(res.code == 200){
                        this.count = res.count
                        this.tableData = res.data
                    }
                })
            },
            handleEdit(id) {
                this.$router.push(`/layout/changeCategory?id=${id}`)
            },
            handleDetails(id) {
                this.$router.push(`/layout/categoryDetail?id=${id}`)
            },
            handleDelete(id) {                                
                this.$confirm('此操作将永久删除该文件, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete('/category/delete', {ids: [id]}).then(res=>{
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
                this.getListData()
            }
        },
        created() {
            this.getListData()
        }
    }
</script>

<style scoped lang="scss">
    .category-manage {
        .breadcrumb {
            margin: 15px 0;
        }

        h3 {
            margin: 5px 0 15px;
            color: #444;
        }
        .avatar {
            width: 80px;
            height: 100px;
        }
    }
</style>