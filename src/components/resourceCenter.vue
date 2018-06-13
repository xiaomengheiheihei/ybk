<template>
    <div class="resource-wrap">
        <div class="edit-video-left-tile">图文控制台<span></span></div>
        <div class="resource-cationer">

        </div>
    </div>
</template>
<script>
    export default {
        name: 'ResourceCenter',
        data () {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    .resource-wrap {
        border-radius: 15px;
        margin-top: 3px;
        overflow: hidden;
        .edit-video-left-tile {
            position: relative;
            height: 32px;
            line-height: 32px;
            background-color: #B9B9B9;
            color: #fff;
            font-size: 18px;
            span {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translate3d(0, -50%, 0);
                width: 22px;
                height: 22px;
                background: url('../assets/setting02.png') no-repeat center 100%;
            }
        }
        .resource-cationer {
            height: 190px;
            background: #D8D8D8;
        }
    }
</style>


