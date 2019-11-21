<template>
    <div>
        <el-container>
            <el-header>爱心餐厅后台管理</el-header>
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false"><i class="el-icon-s-unfold"></i></el-radio-button>
                <el-radio-button :label="true"><i class="el-icon-s-fold"></i></el-radio-button>
            </el-radio-group>
            <el-container>
                <el-aside width="auto" id="el-aside">
                    <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened  router>
                         <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-s-custom"></i>
                                    <span>管理员管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Index/Powerlist">权限管理</el-menu-item>
                                    <el-menu-item index="/login">角色管理</el-menu-item>
                                    <el-menu-item index="/Index/Adminlist">管理员列表</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-plus"></i>
                                    <span>添加数据</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Index/Insertstore">添加商铺</el-menu-item>
                                    <el-menu-item index="/Index/Insertproct">添加商品</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-plus"></i>
                                    <span>数据管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Index/Storelist">商家列表</el-menu-item>
                                    <el-menu-item index="/Index/Insertproct">添加商品</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="7">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>菜单管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Index/Menusort">菜系分类</el-menu-item>
                                    <el-menu-item index="/Index/Menulist">菜系列表</el-menu-item>
                                     <el-menu-item index="/Index/Menupic">菜系图片</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                             <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>服务管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/Index/Servesort">服务分类</el-menu-item>
                                    <el-menu-item index="/Index/Servelist">服务申请</el-menu-item>
                                    <el-menu-item index="/Index/Adminlist">管理员列表</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container class="center" style="width: 85%">
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                    <el-footer>2019@蜂鸟餐饮</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){
        return {
            selected:"1",
            isCollapse: false
        }
    },
    methods:{
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped>
    .el-header{
        background-color: #2A3542;
        color: #fff;
        text-align: center;
        width: 100%;
        height: 60px;
        line-height: 60px;
        position: absolute;
        top: 0;
        left:0;
    } 
    .el-radio-group{
        margin-top: 10px;
        margin-bottom: 0!important;
        padding-left: 30px;  
    } 
    .el-radio-group >>> .el-radio-button .el-radio-button__inner{
        border-radius: 0!important;
        background-color:transparent;
        border-color: transparent;
        font-size: 26px;
        color: #fff;
    }
    .el-radio-group >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        background-color:transparent;
        border-color: transparent;
        box-shadow: none;
        color: #409eff;
    }
    .el-radio-group >>> .el-radio-button__inner{
        /* color: #000!important; */
    }
    .el-aside {
        text-align: center;
        position: absolute;
        top:60px;
        left:0;
        bottom:0;
    }
    .el-menu-vertical-demo{
        background-color:rgb(50, 64, 87);;
        height: 100%;
        color:#bfcbd9;
        width: 220px;
    }
    .el-menu-vertical-demo li{
        text-align: left;
    }
    .el-menu--collapse{
        width: auto;
    }
    .el-menu-vertical-demo >>> .el-submenu__title{
        color: #bfcbd9;
    }
    .el-menu-item-group{
        background-color:#1f2d3d;  
    }
    .el-menu-vertical-demo  >>> .el-menu-item{
        color: #bfcbd9;
    }
    .el-menu-vertical-demo  >>> .el-submenu__title:hover,.el-menu-item:hover{
      background-color: #48576a;
    }
    .el-menu-vertical-demo  >>>.el-menu-item:focus{
        background-color: transparent;
        color: #409EFF;
    }
    .el-menu-vertical-demo  >>> .el-menu-item-group__title{
        padding: 0;
    }
    .center{
        position: absolute;
        top: 60px;
        left:220px;
        bottom: 0;
        width: 100%;
        padding: 20px;
    }
    .el-submenu .el-menu--inline{
        background-color: rgb(50, 64, 87)!important;
    }
    .el-footer{
        height: auto!important;
        font-size: 14px;
        text-align: center;
    }
</style>