<template>
  <div class="login">
    <div class="error">{{error}}</div>
    <el-form ref="loginform" :rules="rules" :model="loginform" label-width="80px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginform.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginform.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginform')">立即登录</el-button>
        <el-button @click="resetForm('loginform')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      error:"",
      loginform:{
        name:"",
        password:""
      },
      rules:{
        name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
        password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            { min: 1, max: 5, message: '长度在 1到 5 个字符', trigger: 'blur' }
          ],
      }
    }
  },
  methods: {
      login(){
        axios({
          method:'get',
          url:"http://localhost/tourproject/public/index.php/admin/Adminform/login",
          params:this.loginform,
          responseType:'json'
        }).then((res)=>{
          if(res.status==200){
            let{data,msg}=res.data;
            if(data==1){
              localStorage.setItem("username",this.loginform.username);
              this.$router.push("/Index");
            }else{
              this.error=msg;
            }
          }           
        })
      },
     submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
}
</script>
<style scoped>
.login{
  width: 300px;
  height: 200px;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.error{
  text-align: center;
  color: #ff0000;
  margin-bottom: 20px;  
}
</style>
