<template>
    <div class="register-wrap">
        <section class="register-item" v-for="(item, index) in inputList" :key="index">
            <span class="title" :class="item.id === 'repassword' ? '' : 'right-20'">{{item.title}}</span>
            <input 
                :class="item.showRequired ? 'border-1-red' : ''" 
                :type="item.type" :id="item.id" 
                :placeholder="item.placeholder" 
                v-model="item.value"
                @blur="blurFn(item,index)">
            <span v-show="item.showRequired" class="tips">(必填)</span>
        </section>
        <section class="register-btn">
            <span @click="cancel" class="cancel">关闭</span>
            <span class="reginster" @click="reginster">注册</span>
        </section>
    </div>
</template>
<script>
    export default {
        name: 'register',
        data () {
            return {
                inputList: [{
                    title: '姓名',
                    id: 'name',
                    type: 'text',
                    value: '',
                    placeholder: '请输入姓名',
                    showRequired: false,
                    focus: false
                },{
                    title: '密码',
                    id: 'password',
                    type: 'password',
                    value: '',
                    placeholder: '请输入密码',
                    showRequired: false,
                    focus: false
                },{
                    title: '确认密码',
                    id: 'repassword',
                    type: 'password',
                    value: '',
                    placeholder: '请再次输入密码',
                    showRequired: false,
                    focus: false
                },{
                    title: '部门',
                    id: 'dep',
                    type: 'text',
                    value: '',
                    placeholder: '请输入部门',
                    showRequired: false,
                    focus: false
                },{
                    title: '电话',
                    id: 'tel',
                    type: 'text',
                    value: '',
                    placeholder: '请输入电话',
                    showRequired: false,
                    focus: false
                },{
                    title: '工号',
                    id: 'num',
                    type: 'text',
                    value: '',
                    placeholder: '请输入工号',
                    showRequired: false,
                    focus: false
                }]
            }
        },
        methods: {
            cancel () {
                document.querySelector('#tab-user').click();
            },
            blurFn (item,index) {
                item.value === '' ? item.showRequired = true : item.showRequired = false;
            },
            reginster () {
                let params = new FormData();
                let password = '';
                for (let item of this.inputList) {
                    switch (item.id) {
                        case 'name':
                            params.append('username', item.value);
                            break;
                        case 'password':
                            params.append('password', item.value);
                            password = item.value;
                            break;
                        case 'repassword':
                            if (password !== item.value) {
                                this.$message.error('两次输入密码不一致，请重新输入！');
                            }
                        case 'dep':
                            params.append('deptname', item.value);
                            break;
                        case 'tel':
                            params.append('phone', item.value);
                            break;
                        case 'num':
                            params.append('employeeId', item.value);
                            break;
                        default:
                            break;
                    }
                }
                this.http.post('/biz/adduser', params)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {

                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .register-wrap {
        margin-top: 10px;
        .register-item {
            margin-bottom: 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .title {
                color: #fff;
                margin-right: .5em;
            }
            .right-20 {
                margin-right: 2.5em;
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
            .border-1-red {
                border: 1px solid #FF344D;
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


