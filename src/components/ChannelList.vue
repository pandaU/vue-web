<template>
  <el-container direction="vertical">
    <el-header style="text-align: right; font-size: 16px;">
      <my-header />
    </el-header>

    <el-container>
      <el-aside width="252px">
        <my-aside />
      </el-aside>
      <el-main>
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }" style="font-size:20px">通道管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-divider></el-divider>
        <br />
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column width="100" label="序号" type="index"></el-table-column>
          <el-table-column prop="name" align="center" label="通道名称"></el-table-column>
          <el-table-column prop="status" align="center" label="是否启用">
            <template slot-scope="scope">
              <span>{{ scope.row.status | validateStatus}}</span>
            </template>
          </el-table-column>
           <el-table-column prop="blockHeight" align="center" label="区块高度">
            <template slot-scope="scope">
              <a href="#" @click="queryBlockInfo(scope.row.name,scope.row.blockHeight)">{{scope.row.blockHeight}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="status" align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">{{scope.row.status | isOpen}}</el-button>
              <el-button size="mini" type="success" @click="manage(scope.row.name)">通道管理</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

<script>
import MyAside from "./component/Aside";
import MyHeader from "./component/Header";
export default {
  components: { MyAside, MyHeader },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleEdit(id) {
      this.$message({
        showClose: true,
        message: "功能暂未上线",
        type: "warning",
      });
    },
    handleDelete() {
      this.$message({
        showClose: true,
        message: "功能暂未上线",
        type: "warning",
      });
    },
    queryBlockInfo(channelName,blockHeight){
       this.$router.push({name:'blockInfo',params:{"channelName":channelName,"blockHeight":parseInt(blockHeight)}});
    }
  },
  data() {
    return {
      tableData: [],
      loading: true,
      blockHeight:0
    };
  },
  created() {
    this.$api.post(
      "api/peer/getChannels",
      {},
      (s) => {
        this.tableData = s.data;
        this.loading=false;
      },
      (f) => {}
    );
  },
  filters: {
    validateStatus(val) {
      if (val == "ye") {
        return "已启用";
      } else {
        return "未启用";
      }
    },
    isOpen(val) {
      if (val == "ye") {
        return "停用";
      } else {
        return "启用";
      }
    },
    getIndex(val) {
      return val + 1;
    },
  },
};
</script>