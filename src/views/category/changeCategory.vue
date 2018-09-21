<template>
  <div>
    <h3>修改分类</h3>
    <div class="form-wrap">
        <el-form :model="infoData" size="small" label-width="80px" label-position="left">
            <el-form-item label="分类标题">
                <el-input v-model="infoData.title"></el-input>
            </el-form-item>
            <el-form-item label="图片">
                <template>
                    <upload-img v-model="infoData.icon" class="avatar"></upload-img>
                </template>
            </el-form-item>
            <el-form-item label="index">
                <el-input-number v-model="infoData.index" :min="1"></el-input-number>
            </el-form-item>
            <!-- <el-form-item label="book_id">
                <el-input v-model="infoData._id"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="type">
                <el-input v-model="infoData.type"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="描述">
                <el-input type="textarea" v-model="infoData.desc" autosize></el-input>
            </el-form-item>  -->
        </el-form>
        <el-button size="small" type="primary" @click="handleSave">保存更改</el-button>
    </div>
  </div>
</template>

<script>
  import uploadImg from '@/components/upload-com'
  import axios from 'axios'

  export default {
    data(){
      return{
        infoData:{
          title: '',
          index: '',
          icon: ''
        }
      }
    },
    components:{uploadImg},
    methods:{
      getbook(){
        let id = this.$route.query.id
        this.$axios.get(`/category/${id}`).then(res=>{
          this.infoData = res.data
        })
      },
      handleSave(){
        let id = this.$route.query.id
        this.$axios.put(`/category/${id}`,this.infoData).then(res=>{
          if(res.code == 200){
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push('/layout/category')
          }
        })
      }
    },
    created(){
      this.getbook()
    }
  }
</script>

<style scoped lang="scss">
    .form-wrap{
        width: 500px;
        margin-top: 30px;

        .avatar {
            width: 100px;
            height: 130px;
        }
    }
</style>