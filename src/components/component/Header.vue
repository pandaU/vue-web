<template>
<div>

  <el-col :span="2" :push="19">
  <i class="el-icon-user-solid" style="margin-right: 15px"></i>
  <span>谢雄雄</span>
  </el-col>
  <el-col :span="2" :push="19">
  <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
  </el-dropdown>
  <span>运维管理员</span>
  </el-col>
  
</div>
</template>
<script>
export default {
    name:"MyHeader",
    data(){
       return {}
    }
}
</script>

<style>
.el-header {
    background-color: #FFFFFF;
    color: #333;
    line-height: 60px;
    border-bottom-style:inset;
  }
</style>