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
            <el-breadcrumb-item :to="{ path: '/' }" style="font-size:20px">首页</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-divider></el-divider>
        <br />
        <div>
          <el-row>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>节点</span>
                </div>
                <div>
                  <p>链上活跃节点</p>
                </div>
                <div>
                  <label>
                    {{peerNum}}
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      @click="queryPeers"
                    >查看详情</el-button>
                  </label>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>通道</span>
                </div>
                <div>
                  <p>链上所有区块包含的通道</p>
                </div>
                <div>
                  <label>
                    {{channelNum}}
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      @click="queryChannels"
                    >查看详情</el-button>
                  </label>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>区块高度</span>
                </div>
                <div>
                  <p>链上账本区块个数</p>
                </div>
                <div>
                  <label>
                    {{blockHeight}}
                  </label>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <br />
        <br />
        <br />
        <div>
          <el-row>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>智能合约</span>
                </div>
                <div>
                  <p>链上已部署的智能合约</p>
                </div>
                <div>
                  <label>
                    {{chainCodeNum}}
                  </label>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>成员</span>
                </div>
                <div>
                  <p>加入链的成员</p>
                </div>
                <div>
                  <label>
                    {{userNum}}
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      @click="queryAllUser"
                    >查看详情</el-button>
                  </label>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>业务表</span>
                </div>
                <div>
                  <p>链上使用的表</p>
                </div>
                <div>
                  <label>
                    {{}}
                    <el-button
                      style="float: right; padding: 3px 0"
                      type="text"
                      @click="queryLedgers"
                    >查看详情</el-button>
                  </label>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import MyAside from "./component/Aside";
import MyHeader from "./component/Header";
export default {
  name: "home",
  components: { MyAside, MyHeader },
  data() {
    return {
      channelNum:0,
      peerNum: 0,
      blockHeight:0,
      chainCodeNum: 0,
      userNum:0
    };
  },
  created: function(){
      this.$api.post("api/peer/index", {}, s => {
          this.channelNum=s.data.channelNum;
          this.peerNum=s.data.peerNum;
          this.blockHeight=s.data.blockHeight;
          this.chainCodeNum=s.data.chainCodeNum;
          this.userNum=s.data.userNum;
        }, f => {
        })
  },
  methods: {
    queryPeers() {
      this.$router.push('peerInfo');
    },
    queryChannels() {
      this.$router.push({name:'channelInfo'});
    },
  },
};
</script>
<style >
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 380px;
  height: 200px;
}
</style>