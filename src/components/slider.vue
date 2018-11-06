<template>
    <div class="slider">
       <h3>用户信息</h3>
       <div class="user-detial" v-if="sliderData !== ''">
           <p>姓名：{{sliderData.username}}</p>
           <p>部门：{{sliderData.deptname}}</p>
           <p>累计使用时长：{{sliderData.sumUseTime}}</p>
       </div>
    </div>
</template>
<script>
    export default {
        name: 'slider',
        props: {
            sliderData: ''
        },
        mounted() {

        }
    }
</script>
<style lang="scss" scoped>
    .slider {
        width: 100%;
        text-align: left;
        h3 {
            height: 35px;
            line-height: 35px;
            margin: 0;
            padding: 0;
            text-indent: 1em;
            font-weight: normal;
            font-family: 'PingFangSC-Regular';
            font-size: 14px;
            color: #343434;
            letter-spacing: 0.13px;
            border-bottom: 1px solid #F7F7F7;
        }
        .user-detial {
            padding-left: 20px;
            line-height: 24px;
            p {
                ont-family: 'PingFangSC-Regular';
                font-size: 12px;
                color: #0E0E0E;
                letter-spacing: 0.15px;
            }
        }
    }
</style>


