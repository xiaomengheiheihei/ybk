<template>
    <div class="slider">
       <h3>用户信息</h3>
       <div class="user-detial">
           <p>姓名：李晓明飞</p>
           <p>部门：播出组</p>
           <p>累计使用时长：10小时10分10秒</p>
       </div>
    </div>
</template>
<script>
    export default {
        name: 'slider'
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


