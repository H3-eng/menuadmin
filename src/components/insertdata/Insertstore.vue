<template>
  <div>
      <el-row :gutter="20">
        <el-col :span="24">
            <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
                 <el-col :span="6">
                    <el-form-item label="店铺名称" prop="name">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                 <el-col :span="6">
                    <el-form-item label="联系电话" prop="phone">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="店铺标语" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="店铺分类" prop="sort">
                        <el-select v-model="form.sort">
                        <el-option label="异国料理" value="异国料理"></el-option>
                        <el-option label="快餐便当" value="快餐便当"></el-option>
                         <el-option label="小吃宵夜" value="小吃宵夜"></el-option>
                        <el-option label="果蔬生鲜" value="果蔬生鲜"></el-option>
                         <el-option label="特色菜系" value="特色菜系"></el-option>
                        <el-option label="商店超市" value="商店超市"></el-option>
                         <el-option label="鲜花蛋糕" value="鲜花蛋糕"></el-option>
                        <el-option label="甜品饮品" value="甜品饮品"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="包装费" prop="deliveryfee">
                        <el-input v-model="form.deliveryfee"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="配送费" prop="sendfee">
                        <el-input v-model="form.sendfee"></el-input>
                    </el-form-item>
                 </el-col>
                <el-col :span="12">
                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="营业时间">
                        <el-col :span="11">
                            <el-select v-model="form.starttime"  prop="starttime">
                                <el-option label="05:30" value="05:30" v-for="(item,index) in time" :key="index">{{item}}</el-option>
                            </el-select>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                       <el-col :span="11">
                            <el-select v-model="form.endtime"  prop="endtime">
                                <el-option label="05:30" value="05:30" v-for="(item,index) in time" :key="index">{{item}}</el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="店铺简介" prop="described">
                        <el-input type="textarea" v-model="form.described"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="店铺性质" prop="type">
                        <el-checkbox-group v-model="form.type">
                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <!-- <el-col>
                     <div class="avatar">
                        <div @mouseover="showBg=true" @mouseleave="showBg=false">
                            <div class="bg" v-if="showBg">点击上传</div>
                            <input type="file" class="input-file" name="avatar" ref="avatarInput" @change="changeImage($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
                            <img :src="this.avatar?this.avatar:require('../../assets/logo.png')" alt="" name="avatar">
                        </div>
                        <div class="text" @click="upload" v-if="file">确定上传</div>
                    </div>
                </el-col> -->
                <el-col :span="6">
                    <el-form-item>
                       <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                    </el-form-item>
                 </el-col>
            </el-form>
        </el-col>
    </el-row>
    
  </div>
</template>
<script>
import axios from 'axios'
export default {
    data(){
        return{
            picurl:"http://jsonplaceholder.typicode.com/posts/",
             avatar: '',
            showBg: true,
            file:"",
            time:['05:30','05:45',"06:00",'06:15','06:30','06:45','07:00','07:15','07:30','07:45'
            ,'08:00','08:15','08:30','08:45','09:00','09:15','09:30','09:45','10:00','10:15','10:30',
            '10:45','11:00','11:15','11:30','11:45','12:00','12:15','12:30','12:45','13:00','13:15','13:30','13:45','14:00'
            ,'14:15','14:30','14:45','15:00','15:15','15:30','15:45','16:00','16:15','16:30','16:45','17:00',
            '17:15','17:30','17:45','18:00','18:15','18:30','18:45','19:00','19:15','19:30','19:45','20:00',
            '20:00','20:15','20:30','20:45','21:00','21:15','21:30','21:45','22:00','22:15','22:30','22:45','23:00','23:15','23:30','23:45'
            ],
            form:{
                name:"",
                address:"",
                phone:"",
                title:"",
                sort:"",
                charlist:"",
                described:"",
                type: [],
                starttime:"",
                endtime:"",
                deliveryfee:"",
                sendfee:""
            },
            rules: {
                name: [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' },
                    { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
                phone: [
                    {  required: true, message: '请输入电话号码', trigger: 'change' },
                ],
                title: [
                    { required: true, message: '请输入店铺标语', trigger: 'change' }
                ],
                sort: [
                    {  required: true, message: '请选择分类', trigger: 'change' }
                ],
                charlist: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ],
                described: [
                    { required: true, message: '请填写店铺简介', trigger: 'blur' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个店铺性质', trigger: 'change' }
                ],
                starttime: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
                endtime: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ],
                charlist: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ],
                deliveryfee: [
                    { required: true, message: '请输入包装费', trigger: 'blur' }
                ],
                sendfee: [
                    { required: true, message: '请输入配送费', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.storeadd();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      storeadd(){
          axios({
            method:"get",
            url:"http://localhost/tourproject/public/index.php/admin/Storeform/storeadd",
            params:this.form,
            responseType:"json"
        }).then((res)=>{
            console.log(res)
        })
      },
      changeImage(e){
            let file = e.target.files[0];
            if(file) {
                this.file = file
                let reader = new FileReader()
                let that = this
                reader.readAsDataURL(file);   
                reader.onload = function(e){
                    that.avatar = this.result
                }
            }

      },
      upload(){
           let files = this.$refs.avatarInput.files;
           let fileData = {}
          if(files instanceof Array) {
            fileData = files[0]
          } else {
            fileData = this.file
          }
          console.log(fileData)
        let data = new FormData()
        data.append('multfile', fileData)
        console.log(data.get("multfile"))
        axios({
            method:"get",
            url:"http://localhost/tourproject/public/index.php/admin/Menuform/picupload",
            params:{
                    data:data.get("multfile").name
                    },
            responseType:"json"
        }).then((res)=>{
            console.log(res)
        })
      }
    },   
}
</script>
<style scoped>
     .avatar img{
         width: 20px;
         height: 20px;
     }
</style>