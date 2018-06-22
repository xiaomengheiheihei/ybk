<template>
    <div class="clasp-wrap">
        <div class="edit-video-left-tile">扣像特效<span></span></div>
        <div class="clasp-container">此功能需要权限</div>
    </div>
</template>
<script>
    export default {
        name: 'Clasp',
        data () {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    .clasp-wrap {
        margin-top: 3px;
        margin-right: 5px;
        .edit-video-left-tile {
            position: relative;
            height: 35px;
            line-height: 35px;
            background-color: #B9B9B9;
            color: #fff;
            font-size: 18px;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
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
        .clasp-container {
            height: 130px;
            background: #E1E1E1;
            text-align: center;
            line-height: 12vh;
            color: #B8B3B3;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
        }
    }
</style>


