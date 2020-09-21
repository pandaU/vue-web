<template>
<div>
 <el-col :span="6">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      background-color="#000000"
      text-color="#fff"
      active-text-color="#ffd04b" style="height:969px;width:250px">
      <el-menu-item index="/home">
          <i class="el-icon-user"></i>
          <span>首页</span>
     </el-menu-item>
     <el-menu-item index="/login">
          <i class="el-icon-user"></i>
          <span>用户管理</span>
     </el-menu-item>
      <el-menu-item>
        <i class="el-icon-s-tools"></i>
        <span slot="title">运维管理</span>
      </el-menu-item>
       <el-submenu index>
           <template slot="title">
          <i class="el-icon-info"></i>
          <span>数据操作</span>
        </template>   
             <el-menu-item index="/login">
                <i class="el-icon-edit"></i> 
                <span slot="title">数据查询与上链</span>
             </el-menu-item>
       </el-submenu>
    </el-menu>
  </el-col>
  </div>
</template>
<script>
export default {
    name: "MyAside",
    data(){
       return {}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style>

</style>