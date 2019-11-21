<template>
    <div>
        <div>
            <el-button type="primary" @click="addshow">添加分类</el-button>
            <el-dialog title="添加菜单" :visible.sync="dialogFormVisible">
                <el-form :model="menuform" :rules="rules" ref="menuform" label-width="100px" class="demo-ruleForm">
                    <input type="hidden" v-model="menuform.id"> 
                    <el-form-item label="菜单名称" prop="name">
                        <el-input v-model="menuform.name"></el-input>
                    </el-form-item>
                    <el-form-item label="数量" prop="num">
                        <el-input v-model="menuform.num"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model="menuform.price"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="described">
                        <el-input v-model="menuform.described"></el-input>
                    </el-form-item>
                     <el-form-item label="所属分类" prop="sortid">
                        <el-select v-model="menuform.sortid" placeholder="请选择菜单分类">
                        <el-option  :label="item.name" :value="item.id" v-for="(item,key) in sortname" :key="key"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="send('menuform');">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <el-table :data="sortdata">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="菜名"></el-table-column>
            <el-table-column prop="num" label="数量"></el-table-column>
            <el-table-column prop="price" label="价格"></el-table-column>
            <el-table-column prop="described" label="描述"></el-table-column>
            <el-table-column prop="sortname" label="所属分类"></el-table-column>
            <el-table-column prop="salenum" label="售出数量"></el-table-column>
            <el-table-column prop="create_time" label="添加时间"></el-table-column>
            <el-table-column prop="update_time" label="修改时间"></el-table-column>
             <el-table-column prop="option" label="操作">
                <template slot-scope="scope">
                    <i class="el-icon-edit" @click="editshow(scope.row.id)"></i>
                    <i class="el-icon-delete" @click="delpro(scope.row.id)"></i>
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
        this.getsortname();
    },
    data(){
        return{
            sortdata:[],
            total:0,
            pageSize:6,
            curPage:1,
            dialogFormVisible: false,
            optionsno:"",
            menuform: {
                id:"",
                name:"",
                num:"",
                price:"",
                described:"",
                sortid:""
            },
            sortname:[],
            rules:{
                name: [
                    { required: true, message: '菜单名称不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '数量不能为空', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '价格不能为空', trigger: 'blur' }
                ],
                described: [
                    { required: true, message: '描述不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        getsortname(){
            axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Menuform/mselect",
                responseType:'json'
            }).then((res)=>{     
                let{data}=res.data;
                this.sortname=data;
            })
        },
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
        addpro:function(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios({
                        method:"get",
                        url:"http://localhost/tourproject/public/index.php/admin/Menuform/menuadd",
                        params:this.menuform
                    }).then((res)=>{
                    let {data,msg}=res.data;
                        if(res.status==200){
                            this.dialogFormVisible=false;
                            this.$message({
                                type: 'success',
                                message: msg,
                                duration: 1000
                            })
                        this.getdata(this.curPage);
                        }
                    })
                }
             })  
        },
        editshow(id){
            axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Menuform/menueditshow",
                params:{
                   id:id
                    },
                responseType:'json'
            }).then((res)=>{  
                this.optionsno=0;    
                this.menuform.id=id;
                this.dialogFormVisible= true; 
                let {data}=res.data;
                this.menuform.name=data.name;
                this.menuform.num=data.num;
                this.menuform.price=data.price;
                this.menuform.described=data.described; 
                this.menuform.sortid=data.sortid;
            })
        },
        editpro(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        axios({
                        method:"get",
                        url:"http://localhost/tourproject/public/index.php/admin/Menuform/menuedit",
                        params:this.menuform
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
        delpro(id){
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    axios({
                        method:"get",
                        url:"http://localhost/tourproject/public/index.php/admin/Menuform/menudel",
                        params:{id:id}
                    }).then((res)=>{
                        let{data,msg}=res.data;
                        if(data){
                            this.$message({
                                type: 'success',
                                message: msg,
                                duration: 1000
                            })
                            this.getdata(this.curPage);
                        }else{
                            this.$message({
                                type: 'error',
                                message: msg,
                                duration: 1000
                            })
                        }
                    })
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });       
            });   
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