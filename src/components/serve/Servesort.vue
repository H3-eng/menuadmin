<template>
    <div>      
        <div class="option">
            <div>
                <el-button type="primary" @click="addshow">添加分类</el-button>
                <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
                    <el-form :model="serveform" :rules="rules" ref="serveform" label-width="100px" class="demo-ruleForm">
                         <input type="hidden" v-model="serveform.id"> 
                        <el-form-item label="服务名称" prop="name">
                            <el-input v-model="serveform.name"></el-input>
                        </el-form-item>
                         <el-form-item label="服务描述" prop="described">
                            <el-input v-model="serveform.described"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="send('serveform')">确 定</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
            </div>
        </div> 
        <el-table :data="powerdata">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="服务名称"></el-table-column>
            <el-table-column prop="described" label="服务描述"></el-table-column>
            <el-table-column prop="create_time" label="添加时间"></el-table-column>
            <el-table-column prop="update_time" label="修改时间"></el-table-column>
            <el-table-column prop="option" label="操作">
                <template slot-scope="scope">
                    <i class="el-icon-edit" @click="editpower(scope.row.id)"></i>
                    <i class="el-icon-delete"></i>
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
    data() {
        return {
            powerdata:[],
            total: 0,
            pageSize:6,
            curPage:1,
            optionsno:"",
            dialogFormVisible: false,
            serveform: {
                id:"",
                name:"",
                described:"",
            },
            rules:{
                name: [
                    { required: true, message: '权限名称不能为空', trigger: 'blur' }
                ],
                described: [
                    { required: true, message: '权限描述不能为空', trigger: 'change' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
            }
        }
      },
    methods: {
       async getdata(curPage = 1){
          await axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Serveform/sortform",
                params:{
                    pagenum:curPage,
                    pageSize:this.pageSize
                    },
                responseType:'json'
            }).then((res)=>{         
                let{data}=res.data;
                this.powerdata=data;
                this.total = res.data.totalNum;
            })
        },
        changePage(){
            this.getdata(this.curPage)
        },
        send(form){
            if(this.optionsno){
                this.addpro(form);
            }else{
                this.editpro(form);
            }
        },
        addshow(){
            this.optionsno=1; 
            this.dialogFormVisible= true;   
        },
        addpower(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.dialogFormVisible=false;
                    axios({
                        method:'get',
                        url:"http://localhost/tourproject/public/index.php/admin/Serveform/sortadd",
                        params:this.serveform,
                        responseType:'json'
                    }).then((res)=>{ 
                        let {data,status,msg}=res.data;       
                        if(status==200){
                            this.$message({
                            type: 'success',
                            message: msg,
                            duration: 1000
                            })
                            this.getdata(1);
                        }     
                    })          
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editpower(id){
            axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Serveform/editshow",
                params:{
                   id:id
                    },
                responseType:'json'
            }).then((res)=>{  
                this.optionsno=0;    
                this.serveform.id=id;
                this.dialogFormVisible= true;     
                let {data}=res.data;
                this.serveform.name=data.name;
                this.serveform.described=data.described; 
            })
        },
         editpro(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        axios({
                        method:"get",
                        url:"http://localhost/tourproject/public/index.php/admin/Serveform/editpro",
                        params:this.serveform
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
            })
        },
    }
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