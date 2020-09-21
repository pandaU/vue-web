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
            <el-breadcrumb-item :to="{ path: '/' }" style="font-size:20px">节点详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-divider></el-divider>
        <br />
        <el-table  :data="tableData" style="width: 100%" :row-class-name="tableRowClassName" v-loading="loading">
          <el-table-column  width="100" label="序号" type="index">
          </el-table-column>
          <el-table-column align="center" prop="peerName" label="节点名称" ></el-table-column>
          <el-table-column align="center" prop="url" label="节点地址" ></el-table-column>
          <el-table-column align="center" prop="status" label="是否在线">
            <template slot-scope="scope">
              <span>{{ scope.row.status | validateStatus}}</span>
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
  },
  data() {
    return {
      tableData: [],
      loading: true,
    };
  },
  created() {
    this.$api.post(
      "api/peer/getPeerInfos",
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
        return "在线";
      } else {
        return "离线";
      }
    },
    getIndex(val) {     
      return val+1;
    }
  },
};
</script>