<template>
    <div>
        <div>
            <el-dialog title="操作图片" :visible.sync="dialogFormVisible">
                <el-form :model="picform" ref="picform" label-width="100px" class="demo-ruleForm">
                    <input type="hidden" v-model="picform.id"> 
                    <el-form-item label="菜单图片" prop="picname">
                       <el-upload class="avatar-uploader fl" action="http://localhost/tourproject/public/index.php/admin/Menuform/picupload"
                        :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess"
                        >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" name="pic">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="uploadpic">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <el-table :data="sortdata">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="菜名"></el-table-column>
            <el-table-column prop="sortname" label="所属分类"></el-table-column>
             <el-table-column prop="picname" label="菜系图片"></el-table-column>
             <el-table-column prop="option" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="editshow(scope.row.id)">操作图片</el-button>
                </template>    
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page.sync="curPage" @current-change="changePage"></el-pagination>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    created() {
        this.getdata();
    },
    data(){
        return{
            sortdata:[],
            total:0,
            pageSize:6,
            curPage:1,
            dialogFormVisible: false,
            optionsno:"",
            imageUrl: '',
            picform:{
                id:"",
                name:"",
                num:"",
                price:"",
                described:"",
                sortid:""
            },
        }
    },
    methods: {
        getdata(curPage=1){
            axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Menuform/menuform",
                params:{
                    pagenum:curPage,
                    pageSize:this.pageSize
                    },
                responseType:'json'
            }).then((res)=>{
                let{data}=res.data;
                this.sortdata=data;
                this.total = res.data.totalNum;
            })
        },
        changePage(){
            this.getdata(this.curPage);
        },
        editshow(){
            this.dialogFormVisible=true;
        },
        handleAvatarSuccess(res, file) {
            console.log(res)
          this.imageUrl = file.name;

        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        uploadpic(){
            const picname= this.imageUrl;
            console.log(picname)
            axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Menuform/picupload",
                params:{
                    picname:picname
                    },
                responseType:'blob'
            }).then((res)=>{
                console.log(res)
            })

        }
    }
}
</script>
<style>
/*上传*/
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .showpic{
      width: 100px;
      height: 100px;
      border:1px solid #000;
  }
/*表格*/
    .el-table th{
        text-align: center;
    }
    .el-table__body td{
        text-align: center;
    }
     .el-pagination{
        text-align: center;
        margin-top: 20px;
    }
    .el-dialog{
        width: 40%;
        margin: 0;
        top:20%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .el-form-item__content{
        margin-left: 150px!important;
    }
    .el-form-item__label{
        margin-left: 20px;
    }
    .el-dialog .el-input__inner {
        width: 75%;
    }
    .el-select{
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 100%;
    }
    .el-input__suffix{
        left:35%;
        right: 0;
    }
    .cell i:first-child{
        margin-right: 20px;
        cursor: pointer;
    }
</style>