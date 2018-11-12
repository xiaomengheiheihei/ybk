<template>
  <div class="set-wrap">
    <el-row class="set-top">
      <el-col :span="24">
        <div class="nav-top">
          <img src="../assets/logo1.png" alt="">智能播控平台
        </div>
      </el-col>
    </el-row>
    <div class="slider-wrap">
        <slider v-if="sliderData !== null && sliderData != undefined" :sliderData = sliderData></slider>
    </div>
    <div class="list-wrap">
      <h3>系统信息</h3>
      <template>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="username"
            label="使用者">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="expireTime"
            label="预计关闭时间">
          </el-table-column>
          <el-table-column
            prop="resolution"
            label="输出分辨率">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="start(scope.$index, scope.row)"
                type="success">进入系统</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="stop(scope.$index, scope.row)">结束任务</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="btn-wrap">
      <el-button plain @click="outSys">退出</el-button>
      <el-button type="primary" @click="dialogVisible = true">创建播控任务</el-button>
    </div>
    <el-dialog
      class="setting-wrap-dialog"
      title="创建播控任务"
      width="300px"
      :visible.sync="dialogVisible"
      append-to-body>
      <div class="wrap">
        <section>
          输出格式：<el-select v-model="sloution" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
        </section>
        <section class="time-wrap">
          使用时长：<el-input v-model="timelength" placeholder="请输入内容"></el-input>
        </section>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
        <el-button size="mini" type="primary" @click="createdYbk">创建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import slider from './slider.vue'
import { Base64 } from 'js-base64';
import Cookies from 'js-cookie'
export default {
  name: 'List',
  data () {
    return {
      tableData: [],
      sliderData: null,
      dialogVisible: false,
      sloution: '1080P',
      timelength: '02:00:00',
      options: [
        {
          value: '1080P',
          label: '1080P'
        },
        {
          value: '720P',
          label: '720P'
        },
      ]
    }
  },
  props: {
    msg: String
  },
  created () {
    this.getTableList();
   let uid = JSON.parse(Base64.decode(Cookies.get('Authorization').split('.')[1])).sub;
   this.http.get('./biz/manager/user/single', {userId: uid})
   .then(res => {
     this.sliderData = res.data;
   })
   .catch(error => {

   })
  },
  components: {
    slider,
  },
  methods: {
    stop (i, v) {
      this.http.post('/biz/ybkBase/stop/' + v.id, {})
      .then(res => {
        if (res.code === 0) {
          this.$message.success('任务已结束！');
          this.getTableList();
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    start (i, v) {
      this.$router.push({path: '/editVideo', query:{id: v.id}})
    },
    outSys () {
      Cookies.remove('Authorization');
      window.location.reload();
    },
    createdYbk () {
      let params = {
        resolution: this.sloution,
        useTime: this.timelength
      }
      this.http.post('/biz/ybkBase', params)
      .then(res => {
        if (res.code === 0) {
          this.$message.success('创建成功！');
          this.getTableList();
          this.dialogVisible = false;
        }
      })
      .catch(error => {

      })
    },
    getTableList() {
      this.http.get('./biz/manager/ybk/ownerlist', {})
      .then(res => {
        this.tableData = res.data;
      })
      .catch(error => {
        this.$message.error('请求数据失败');
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .set-wrap {
      width: 100%;
      margin: 0 auto;
      background: #fff;
      overflow: hidden;
      box-sizing: border-box;
      height: 100%;
      .set-top {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
        background: #F7F7F7;
        .nav-top {
          text-align: left;
          font-family: 'PingFangSC-Regular';
          font-size: 14px;
          color: #343434;
          letter-spacing: 0.13px;
          img {
            width: 41px;
            height: 27px;
            vertical-align: middle;
            margin-top: -6px;
            margin-right: 5px;
          }
        }
        .help {
          text-align: right;
          a {
            text-decoration: none;
            color: #333;
            padding: 3px 6px;
            border: 1px solid #ccc;
            border-radius: 3px;
          }
        }
      }
      .slider-wrap {
        position: fixed;
        left: 0;
        top: 50px;
        height: 100%;
        width: 260px;
        background: #fff;
        border-right: 1px solid #F7F7F7;
      }
      .list-wrap {
        margin-left: 261px;
        text-align: left;
        h3 {
          height: 35px;
          line-height: 35px;
          font-family: 'PingFangSC-Regular';
          font-size: 14px;
          color: #343434;
          letter-spacing: 0.13px;
          margin: 0;
          padding-left: 22px;
        }
      }
      .btn-wrap {
        text-align: right;
        margin: 30px;
      }
    }
</style>
<style>
 .list-wrap .el-table__header {
   text-indent: 10px;
 }
.list-wrap .el-table__body {
  text-indent: 20px;
}
 .list-wrap .el-table__header tr th {
    background: #F7F7F7;
    font-family: 'PingFangSC-Regular';
    font-size: 12px;
    color: #000000;
    letter-spacing: 0.15px;
 }
.setting-wrap-dialog .el-dialog__header,  .setting-wrap-dialog .el-dialog__body, .setting-wrap-dialog .el-dialog__footer {
   background: #fff;
   padding: 20px;
 }
  .setting-wrap-dialog .el-dialog__header .el-dialog__title {
    font-size: 14px;
    font-weight: normal;
  }
.setting-wrap-dialog .el-dialog__body .wrap {
  padding: 10px 20px;
}
.setting-wrap-dialog .el-dialog__body .el-select, .setting-wrap-dialog .el-dialog__body .el-input {
    width: 110px;
}
.setting-wrap-dialog .el-dialog__body .el-select .el-input__inner, .setting-wrap-dialog .el-dialog__body .el-input .el-input__inner {
     height: 30px;
    line-height: 30px;
}
.setting-wrap-dialog .el-dialog__body .el-select .el-input__icon {
  line-height: 30px;
}
.setting-wrap-dialog .el-dialog__body  .time-wrap {
  margin-top: 20px;
}
</style>

