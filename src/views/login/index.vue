<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="40"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="300"
        :moveSpeed="4"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
      >
    </vue-particles>
    <div class="login-border  animated fadeInRight">
      <div class="login-main">
        <h3 class="login-title"><img src="../../assets/white_logo.png" alt="">智能播控登录系统</h3>
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录" name="user">
            <userLogin></userLogin>
          </el-tab-pane>
          <el-tab-pane label="注册" name="resg">
            <register></register>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>
<script>
import userLogin from "./userlogin.vue";
import register from "./register.vue";
export default {
  name: "login",
  components: {
    userLogin,
    register,
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
  background-image: url("../../assets/body_bg.png");
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
  position: absolute;
  right: 200px;
  padding: 35px 30px;
  width: 348px;
  min-height: 488px;
  background-color:rgba(255, 255, 255, .1);
  border-radius: 14px;
  box-sizing: border-box;
}
.login-main {
  box-sizing: border-box;
}
.login-main > h3 {
  padding-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0;
  text-align: center;
  color: #fff;
  letter-spacing: 0.22px;
  font-family: 'PingFangSC-Medium';
  font-size: 18px;
  border-bottom: 1px solid #fff;
  img {
    width: 32px;
    height: 21px;
    vertical-align: inherit;
    margin-bottom: -3px;
    margin-right: 5px;
  }
}
.login-main .el-tabs__content {
  margin-top: 20px;
}
.login-main .el-tabs {
  margin: 20px 0;
}
.login-main .el-tabs__active-bar {
  background-color: #fff;
}
.login-main .el-tabs__nav-wrap::after {
  height: 0;
}
.login-main .el-tabs__item {
  opacity: 0.6;
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0.19px;
}
.login-main .el-tabs__item.is-active {
  opacity: 1;
  font-family: 'PingFangSC-Regular';
  font-size: 14px;
  color: #FFFFFF;
  letter-spacing: 0.19px;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
  background: #3080fe;
  border-radius: 28px;
}
.login-form {
  margin: 10px 0;
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dedede;
      border-radius: 0px;
      background: transparent;
      height: 37px;
      line-height: 37px;
      font-family: 'PingFangSC-Regular';
      font-size: 12px;
      color: #9A9A9A;
      letter-spacing: 0.16px;
    }
  }
  .login-icon {
    display: inline-block;
    margin-right: 10px;
    .ybk-icon {
      color: #fff;
      font-size: 24px;
    }
  }
}
.login-form .el-form-item__content {
  display: flex;
  justify-content: flex-end;
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
.login-form .el-button--primary {
  background-image: linear-gradient(56deg, #7AD0EA 0%, #5C94EB 100%);
  border-radius: 50px;
  height: 42px;
  line-height: 42px;
  border: 0;
  padding: 0;
  width: 256px;
  background-color: transparent;
  margin-top: 45px;
}
.login-form .el-button--primary:focus, .login-form .el-button--primary:hover {
  background-color: transparent;
  background-image: linear-gradient(56deg, #7AD0EA 0%, #5C94EB 100%);
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
<style>
  #particles-js {
    width: 100%;
    height: 100%;
  }
</style>


