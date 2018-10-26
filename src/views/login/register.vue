<template>
    <div class="register-wrap">
        <section class="register-item">
            <span class="title right-20">姓名：</span>
            <input type="text" id="name">
            <span class="tips">(必填)</span>
        </section>
        <section class="register-item">
            <span class="title right-20">密码：</span>
            <input type="text" id="password">
            <span class="tips">(必填)</span>
        </section>
        <section class="register-item">
            <span class="title">确认密码：</span>
            <input type="text" id="repassword">
            <span class="tips">(必填)</span>
        </section>
        <section class="register-item">
            <span class="title right-20">部门：</span>
            <input type="text" id="dep">
            <span class="tips">(必填)</span>
        </section>
        <section class="register-item">
            <span class="title right-20">电话：</span>
            <input type="text" id="tel">
            <span class="tips">(必填)</span>
        </section>
        <section class="register-item">
            <span class="title right-20">工号：</span>
            <input type="text" id="num">
            <span class="tips">(必填)</span>
        </section>
        <section class="register-btn">
            <span class="cancel">关闭</span>
            <span class="reginster">注册</span>
        </section>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style lang="scss" scoped>
    .register-wrap {
        margin-top: 30px;
        .register-item {
            margin-bottom: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title {
                color: #fff;
            }
            .right-20 {
                margin-right: 2em;
            }
            .tips {
                font-family: 'PingFangSC-Medium';
                font-size: 12px;
                color: #FF344D;
                letter-spacing: 0.17px;
            }
            input {
                appearance: none;
                border: 1px solid #ABAAAA;
                height: 35px;
                outline: none;
                width: 180px;
                border-radius: 0;
                background-color: transparent;
                display: inline-block;
                margin-right: 10px;
                font-family: 'PingFangSC-Regular';
                font-size: 12px;
                color: #9A9A9A;
                letter-spacing: 0.16px;
                text-indent: 1em;
            }
            input:-webkit-autofill {
                -webkit-animation: autofill-fix 1s infinite;
                -webkit-text-fill-color: #ccc;
            }
        }
        .register-btn {
            margin-top: 40px;
            text-align: right;
            padding-right: 25px;
            .cancel {
                display: inline-block;
                width: 65px;
                height: 26px;
                line-height: 26px;
                color: #fff;
                font-size: 16px;
                border: 2px solid #69A9F3;
                border-radius: 50px;
                margin-right: 30px;
                text-align: center;
            }
            .reginster {
                display: inline-block;
                width: 65px;
                height: 30px;
                line-height: 30px;
                color: #fff;
                font-size: 16px;
                background-image: linear-gradient(-224deg, #7AD0EA 2%, #5C94EB 100%);
                border-radius: 50px;
                text-align: center;
            }
        }
    }
    @-webkit-keyframes autofill-fix {
        from {
          background-color: transparent
        }
        to {
          background-color: transparent
        }
    }
</style>


