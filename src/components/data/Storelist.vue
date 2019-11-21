<template>
    <div>
        <div>
            <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
                <el-form :model="storeform" :rules="rules" ref="menuform" label-width="100px" class="demo-ruleForm">
                    <input type="hidden" v-model="storeform.id"> 
                    <el-form-item label="店铺名称" prop="name">
                        <el-input v-model="storeform.name"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" prop="address">
                        <el-input v-model="storeform.address"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="described">
                        <el-input v-model="storeform.described"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺电话" prop="phone">
                        <el-input v-model="storeform.phone"></el-input>
                    </el-form-item>
                     <el-form-item label="店铺分类" prop="sort">
                        <el-select v-model="storeform.sort" placeholder="请选择菜单分类">
                        <el-option>111</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="send('menuform');">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <el-table :data="storedata">
            <el-table-column label="编号" prop="id"></el-table-column>
            <el-table-column label="店铺名称" prop="name"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="简介" prop="described"></el-table-column>
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editshow(scope.row.id)">修改</el-button>
                    <el-button size="mini" type="primary">添加商品</el-button>
                    <el-button size="mini" type="danger">删除</el-button>
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
        // this.getsortname();
    },
    data(){
        return{
            total:0,
            pageSize:6,
            dialogFormVisible:true,
            curPage:1,
            storedata:[],
            storeform:{
                id:"",
                name:"",
                address:"",
                described:"",

            },
            rules:{
                name: [
                    { required: true, message: '菜单名称不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '数量不能为空', trigger: 'blur' }
                ],
                described: [
                    { required: true, message: '价格不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '描述不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        getdata(curPage=1){
            axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Dataform/selectpage",
                params:{
                    pagenum:curPage,
                    pageSize:this.pageSize
                    },
                responseType:'json'
            }).then((res)=>{
                console.log(res)
                let{data}=res.data;
                this.storedata=data;
                this.total = res.data.totalNum;
            })
        },
        changePage(){
            this.getdata(this.curPage);
        },
        editshow(id){
            axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Storeform/storeshow",
                params:{
                   id:id
                    },
                responseType:'json'
            }).then((res)=>{   
                this.storeform.id=id;
                this.dialogFormVisible= true; 
                let {data}=res.data;
                this.storeform.name=data.name;
                this.storeform.address=data.num;
                this.storeform.phone=data.phone;
                this.storeform.described=data.described; 
                this.storeform.sortid=data.sort;
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