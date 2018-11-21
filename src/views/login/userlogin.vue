<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <span class="login-icon"><i slot="prefix" class="ybk-icon icon-xingmingyonghumingnicheng"></i></span>
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入用户名">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <span class="login-icon"><i slot="prefix" class="ybk-icon icon-password"></i></span>
      <el-input size="small" @keyup.enter.native="handleLogin" :type="passwordType" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: "userlogin",
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.code.value != value) {
        this.loginForm.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: "",
        code: "",
        randomStr: ""
      },
      code: {
        src: "/admin/code",
        value: "",
        len: 4,
        type: "image"
      },
      loginRules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, message: "密码长度最少为6位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" }
        ]
      },
      passwordType: "password"
    };
  },
  created() {
    // this.refreshCode();
  },
  mounted() {},
  computed: {
  },
  props: [],
  methods: {
    refreshCode() {
      this.loginForm.code = "";
      this.loginForm.randomStr = randomLenNum(this.code.len, true);
      this.code.type == "text"
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `${this.codeUrl}/${this.loginForm.randomStr}`);
    },
    showPassword() {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      // if (this.loginForm.username === 'tester' && this.loginForm.password === 'qiniu') {
      //   let time = new Date().getTime();
      //   window.localStorage.setItem('startTime', time);
      //   this.$router.push({path: '/setting'})
      // }
      let req = new FormData();
      req.append('username', this.loginForm.username);
      req.append('password', this.loginForm.password);
      this.http.post('/biz/auth', req)
      .then((res)=> {
          if (res.code === 200) {
            if (!!Cookies.get('Authorization')) {
              if (this.$router.history.current.query.redirect) {
                this.$router.push({path: this.$router.history.current.query.redirect})
              } else {
                this.$router.push({path: '/setting'})
              }
            }
          } else {
            this.$message.error(res.message);
          }
      })
      .catch((err) => {
          this.$message.error('登陆失败，请重试！');
      })
    }
  }
};
</script>

<style>

</style>
