<template>
    <div class="play-control-wrap">
        <div class="edit-video-left-tile">播控区</div>
        <div class="play-container">
            <div class="play-con-top">
                <div class="bt">应急切换</div>
            </div>
            <div class="play-con-bottom">
                <input type="range" name="" id="">
                <el-checkbox v-model="checked">音视频同步切换</el-checkbox>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PlayControl',
        data () {
            return {
                checked: true
            }
        }
    }
</script>
<style lang="scss" scoped>
    .play-control-wrap {
        overflow: hidden;
        border-radius: 15px;
        margin-top: 5px;
        background: #1E2124;
        .edit-video-left-tile {
            position: relative;
            height: 36px;
            line-height: 36px;
            color: #fff;
            font-size: 18px;
        }
        .play-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            flex-grow: 1;
            height: 225px;
            background: rgb(34, 37, 41);
            .play-con-top {
                position: relative;
                width: 100%;
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                .bt {
                    width: 180px;
                    height: 40px;
                    line-height: 40px;
                    color: #fff;
                    border-radius: 40px;
                    background: #FF0000;
                }
            }
            .play-con-bottom {
                flex-grow: 1;
                border-top: 1px solid #4d4b4b;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                input {
                    display: block;
                }
            }
        }
    }
</style>


