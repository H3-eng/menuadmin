<template>
    <div>
        <el-table :data="admindata">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="管理员账号"></el-table-column>
            <el-table-column prop="password" label="管理员密码"></el-table-column>
        </el-table>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    created() {
        this.getdata();
    },
    data(){
        return {
            admindata:[],
        }
    },
    methods:{
        async getdata(){
          await axios({
                method:'get',
                url:"http://localhost/tourproject/public/index.php/admin/Adminform/adminform",
                responseType:'json'
            }).then((res)=>{          
                let{data}=res.data;
                this.admindata=data;
            })
        },
    }
}
</script>