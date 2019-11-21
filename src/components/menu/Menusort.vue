<template>
    <div>
        <div>
            <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
            <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
                <el-form :model="sortform" :rules="rules" ref="sortform" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="sortform.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addsort('sortform')">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <el-table :data="sortdata">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="分类名称"></el-table-column>
            <el-table-column prop="create_time" label="添加时间"></el-table-column>
            <el-table-column prop="update_time" label="修改时间"></el-table-column>
            <!-- <el-table-column prop="option" label="操作">
                <template slot-scope="scope">
                    <i class="el-icon-edit" @click="editpower(scope.row.id)"></i>
                    <i class="el-icon-delete"></i>
                </template>    
            </el-table-column> -->
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
            sortform: {
                name:"",
            },
            rules:{
                name: [
                    { required: true, message: '分类名称不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        getdata(curPage=1){
            axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Menuform/sortform",
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
        addsort:function(form){
            axios({
                method:"get",
                url:"http://localhost/tourproject/public/index.php/admin/Menuform/sortadd",
                params:this.sortform
            }).then((res)=>{
               let {data,msg}=res.data;
                if(res.status==200){
                    this.dialogFormVisible=false;
                    this.$message({
                        type: 'success',
                        message: msg,
                        duration: 1000
                    })
                  this.getdata(1);
                }
            })
        }
    },
}
</script>
<style>
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
        width: 30%;
        margin: 0;
        top:20%;
        left:50%;
        transform: translate(-50%,-50%);
    }
    .el-form-item__content{
        margin-left: 150px!important;
    }
    .el-input__inner {
        width: 80%;
    }
    .cell i:first-child{
        margin-right: 20px;
        cursor: pointer;
    }
</style>