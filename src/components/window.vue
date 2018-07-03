<template>
    <div class="window-wrap">
        <div class="edit-video-left-con">
            <div class="edit-video-left-tile">视窗效果<span></span></div>
            <el-row class="video-item-live">
                <el-col :span="12" class="video-item-live-fir">
                    <div class="template01">
                        <div class="template01-item">CAM1</div>
                        <div class="template01-item">CAM2</div>
                        <div class="template01-item">CAM3</div>
                        <div class="template01-item">CAM4</div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <!-- <Player :isLive = 1
                            :playerData=playerData
                            :isAdd = true
                            :isBlank = false
                            >
                    </Player> -->
                    <div class="template-add">
                        <div class="add-video">
                            <div class="add-h"></div>
                            <div class="add-d"></div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'window',
        data () {
            return {
                
            }
        },
        components: {
           
        }
    }
</script>
<style lang="scss" scoped>
    $border1pxfff: 1px solid #fff;
    .window-wrap {
        margin-top: 3px;
        padding-right: 2px;
        .edit-video-left-con {
            .edit-video-left-tile {
                position: relative;
                height: 35px;
                line-height: 35px;
                background-color: #1E2124;
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
            .video-item-live {
                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 15px;
                overflow: hidden;
                .template-add {
                    height: 131px;
                    background-color: #5D5D5D;
                    position: relative;
                    .add-video {
                        position: absolute;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background-color: #fff;
                        top: 50%;
                        left: 50%;
                        transform: translate3d(-50%, -50%, 0);
                        .add-h {
                            width: 26px;
                            height: 3px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate3d(-50%, -50%, 0);
                            background: #5D5D5D;
                        }
                        .add-d {
                            width: 3px;
                            height: 26px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate3d(-50%, -50%, 0);
                            background: #5D5D5D;
                        }
                    }
                }
                .video-item-live-fir {
                    padding-right: 2px;
                    .template01 {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-wrap: wrap;
                        height: 131px;
                        .template01-item {
                            width: 50%;
                            height: 50%;
                            background-color: #5D5D5D;
                            color: #fff;
                            line-height: 65px;
                            box-sizing: border-box;
                        }
                        .template01-item:first-child {
                            border-right: $border1pxfff;
                            border-bottom: $border1pxfff;
                        }
                        .template01-item:nth-child(2) {
                            border-bottom: $border1pxfff;
                        }
                        .template01-item:nth-child(3){
                            border-right: $border1pxfff;
                        }
                    }
                }
            }
        }
    }
</style>


