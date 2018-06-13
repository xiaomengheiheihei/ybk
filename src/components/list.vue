<template>
  <div class="set-wrap">
    <el-row class="set-top">
      <el-col :span="12">
        <div class="nav-top">互动直播/云播控</div>
      </el-col>
      <el-col :span="12">
        <div class="help"><router-link to="/about">使用帮助</router-link></div>
      </el-col>
    </el-row>
    <el-row class="set-start">
      <el-col :span="24">
          <div><span @click="dialogVisible = true">创建云播控</span></div>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="时长控制台" name="first">
        <ListDetail/>
      </el-tab-pane>
      <el-tab-pane label="包月控制台" name="second">
        <ListDetail/>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div class="start-content">
        <div class="start-top-tabs">
          <div class="tabs-item">试用云播控</div>
          <div class="tabs-item tabs-item-m">时长云播控</div>
          <div class="tabs-item">包月云播控</div>
        </div>
        <div class="start-content-c">
          <div class="content-item01">
              <table>
                <tr>
                  <td class="tr-title">输入路数：</td>
                  <td>4路</td>
                </tr>
                <tr>
                  <td class="tr-title">输出分辨率：</td>
                  <td>720p</td>
                </tr>
                <tr>
                  <td class="tr-title">使用时长：</td>
                  <td>2小时</td>
                </tr>
                <tr>
                  <td class="tr-title">费用：</td>
                  <td>0.00元</td>
                </tr>
              </table>
          </div>
          <div class="content-item02"></div>
          <div class="content-item03"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">创建</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ListDetail from './listDetail.vue'

export default {
  name: 'List',
  data () {
    return {
      activeName2: 'first',
      dialogVisible: false,
    }
  },
  props: {
    msg: String
  },
  components: {
    ListDetail,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleClose () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .set-wrap {
      max-width: 1200px;
      margin: 0 auto;
      .set-top {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        .nav-top {
          text-align: left;
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
      .set-start {
        text-align: right;
        height: 50px;
        line-height: 50px;
        span {
          color: #fff;
          padding: 8px;
          background-color: rgb(173, 201, 233);
          border-radius: 3px;
          cursor: pointer;
        }
      }
      .el-dialog__wrapper {
        .el-dialog {
          .el-dialog__body {
            .start-content { 
              .start-top-tabs {
                border-bottom: 1px solid #ccc;
                padding-bottom: 20px;
                overflow: hidden;
                .tabs-item {
                  float: left;
                  height: 40px;
                  line-height: 40px;
                  text-align: center;
                  word-wrap: break-word;
                  width: 20%;
                  border: 1px solid #ccc;
                  border-radius: 3px;
                }
                .tabs-item-m {
                  margin: 0 18%;
                }
              }
            }
            .start-content-c {
              .content-item01 {
                table {
                  text-align: left;
                  margin-top: 20px;
                }
              }
            }
          }
        }
      }
    }
</style>
<style>
  .el-tabs__header {
    margin-bottom: 0 !important;
  }
  .el-dialog__header {
    background-color: rgb(48, 166, 221);
  }
  .el-dialog__headerbtn {
    top: 5px !important;
  }
  .el-dialog__body {
    padding: 20px !important;
  }
  .el-table .cell {
    text-align: left !important;
  }
  .cell>a {
    color: rgb(92, 172, 247);
    font-size: 12px;
    cursor: pointer;
  }
  .cell>a:first-child {
    margin-right: 10px;
  }
</style>

