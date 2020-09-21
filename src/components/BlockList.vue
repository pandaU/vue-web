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
          <el-breadcrumb separator="-->">
            <el-breadcrumb-item :to="{ path: '/channelInfo' }" style="font-size:20px">通道管理</el-breadcrumb-item>
            <el-breadcrumb-item style="font-size:20px">交易详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-divider></el-divider>
        <br />
        <el-row>
          <div v-for="(item,index) in pageNum" :key="index">
            <el-col :span="2" ref='index' v-if="item % 5 ==1 && item !=1">
              <br />
              <br />
              <br />
              <br />
              <br />
              <el-button @click="changePrePage(item)"  type="primary"><i class="el-icon-caret-left"></i>上一页</el-button>              
            </el-col>
            <el-col :span="3">
              <el-card class="box-card" style="width:200px;height:220px;">
                <el-col :span="12" :push="5" slot="header" class="clearfix">
                  <span>交易序列号</span>
                </el-col>
                <br />
                <br />
                <el-col :span="12" :push="9">
                  <label style="font-size:30px">
                    <a
                      href="#"
                      style="text-decoration:none;"
                      @click="getInfo(channelName,item)"
                    >{{item}}</a>
                  </label>
                </el-col>
              </el-card>
              <br />
            </el-col>
            <el-col :span="1" ref='index'>
              <br />
              <br />
              <br />
              <br />
              <br />
              <el-button @click="changeNextPage(item)" v-if="item % 5==0 && item!=blockHeight" type="primary"><i class="el-icon-caret-right"></i>下一页</el-button>
              <div v-if="item % 5!=0 && item!=blockHeight">
              -------
              </div>
            </el-col>
          </div>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-card class="box-card" style="width:500px;height:220px;">
                <el-col :span="12" :push="8" slot="header" class="clearfix">
                  <span>交易日志(序列号：{{crrent}})</span>
                </el-col>
                <el-col :span="24">
                  操作的链码：{{chainCode}}
                </el-col>
                <br />
                <br />
                <el-col :span="24">
                  操作链码的方法：{{func}}
                </el-col> 
                <br />
                <br />
                <el-col :span="24">
                  访问参数：{{funcParams}}
                </el-col>              
              </el-card> 
          </el-col>     
        </el-row>
        <br />
        <el-row>
          <el-col :span="5">
            <label style="font-size:30px">
              交易明细(序列号：{{crrent}})：
            </label>
              <el-input
                style=" width:1820px;"
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 15}"
                placeholder="请输入内容"
                v-model="blockInfo"
              ></el-input>
          </el-col>
        </el-row>
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
var app0;
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
    getInfo(channelName, num) {
      this.crrent=num
      this.$api.post(
        "api/peer/getBlockInfo",
        { channelName: channelName, num: num - 1 },
        (s) => {
          this.blockInfo = s.data;
        }
      );
    },
    changeNextPage(endNum){
        const sub=this.blockHeight-5;
        const arr =new Array();
        if(sub>endNum){
          for (let index = endNum+1; index < endNum+6; index++) {
            arr.push(index);
          }
          this.pageNum=arr;
        }else{
         for (let index = endNum+1; index < this.blockHeight+1; index++) {
           arr.push(index);
          }
          this.pageNum=arr; 
        }
       
    },
    changePrePage(preNum){
        const add=6;
         const arr =new Array();   
         if(add<=preNum){
          for (let index = preNum-1; index > preNum-6; index--) {
            arr.unshift(index);
          }
          this.pageNum=arr;
        }else{
         for (let index = preNum-1; index > 0; index--) {
           arr.unshift(index);
          }
          this.pageNum=arr; 
        }      
    }
  },
  data() {
    return {
      tableData: [],
      loading: false,
      chainCode: 'fabcar',
      func: 'createCar',
      funcParams : '{"CAR20","BWM","BWM","red","pandaU"}',
      crrent:1,
      pageNum:0,
      blockHeight: 12,
      blockInfo: "this is first",
      channelName: this.$route.params.channelName,
    };
  },
  created() {
    if (this.$route.params.blockHeight > 5){
       this.pageNum=5;
    }else{
      this.pageNum=this.$route.params.blockHeight;
    }
    if (!this.blockHeight) {
      this.$router.push({ name: "channelInfo" });
    }else{
      this.$api.post(
        "api/peer/getBlockInfo",
        { channelName: this.channelName, num: 0 },
        (s) => {
          this.blockInfo = s.data;
        }
      );
    }
  },
  beforeCreate: function () {
    app0 = this;
  },
  filters: {
    coverIndex(index) {
      if (index == 6 || index == app0.blockHeight) {
        const hl ='<el-button type="primary" disabled><i class="el-icon-caret-right"></i>下一页</el-button>';
      } else {
        return "-------";
      }
    },
  },
};
</script>