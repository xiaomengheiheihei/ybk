<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-border  animated fadeInRight">
      <div class="login-main">
        <h3 class="login-title"> 七牛云智能播控</h3>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户登陆" name="user">
            <userLogin></userLogin>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>
<script>
import userLogin from "./userlogin.vue";
// import codeLogin from "./codelogin.vue";
export default {
  name: "login",
  components: {
    userLogin,
    // codeLogin,
  },
  data() {
    return {
      activeName: "user"
    };
  },
  created() {},
  mounted() {},
  props: [],
  methods: {}
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/body_bg.jpg");
  background-size: cover;
  overflow: hidden;
}
.login-info {
  padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  right: 200px;
  padding: 40px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #eee;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: #409eff;
  letter-spacing: 3px;
}
.login-main .el-tabs__content {
  margin-top: 20px;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
  background: #3080fe;
  border-radius: 28px;
}
.login-form {
  margin: 10px 0;
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  width: 100px;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
.fadeInRight {
    -webkit-animation-name: fadeInRight;
    animation-name: fadeInRight;
    animation-duration: 1s;
}

@-webkit-keyframes fadeInRight {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(100%,0,0);
        transform: translate3d(100%,0,0)
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none
    }
}
</style>
