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
                    <el-row class="play-bar-wrap">
                        <el-col :span="8">
                            12
                        </el-col>
                        <el-col :span="8" class="play-item-title">
                            win1
                        </el-col>
                        <el-col :span="8" class="btn-wrap">
                            <div class="btn01 btn"></div>
                            <div class="btn02 btn"></div>
                            <div class="btn03 btn single-grap"></div>
                            <div class="btn04 btn"></div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <!-- <Player :isLive = 1
                            :playerData=playerData
                            :isAdd = true
                            :isBlank = false
                            >
                    </Player> -->
                    <div class="template-add">
                        <div class="add-video" @click="addNew">
                            <div class="add-h"></div>
                            <div class="add-d"></div>
                        </div>
                    </div>
                    <el-row class="play-bar-wrap">
                        <el-col :span="8">
                            12
                        </el-col>
                        <el-col :span="8" class="play-item-title">
                            win1
                        </el-col>
                        <el-col :span="8" class="btn-wrap">
                            <div class="btn01 btn"></div>
                            <div class="btn02 btn"></div>
                            <div class="btn03 btn single-grap"></div>
                            <div class="btn04 btn"></div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="70%"
            :show-close="false"
            >
            <div slot="title" class="title">
                添加画中画
                <span @click="dialogVisible = false">关闭</span>
            </div>
            <div class="content">
                
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
                <el-button class="add-btn" type="primary" @click="dialogVisible = false">添 加</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'window',
        data () {
            return {
                dialogVisible: false,
            }
        },
        components: {
           
        },
        methods: {
            addNew () {
                this.dialogVisible = !this.dialogVisible;
            }
        }
    }
</script>
<style lang="scss" scoped>
    $border1pxfff: 1px solid #A9A5A5;
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
                 .play-bar-wrap {
                    text-align: left;
                    font-size: 12px;
                    color: #fff;
                    height: 20px;
                    line-height: 20px;
                    padding: 0 5px;
                    background-color: #686F76;
                    >.el-col-8 {
                        position: relative;
                        overflow: hidden;
                        .btn {
                            background-color: #0BE235;
                            width: 2px;
                            float: right;
                            margin: 0 1px;
                        }
                        .btn04 {
                            height: 3px;
                        }
                        .btn03 {
                            height: 6px;
                        }
                        .btn02 {
                            height: 9px;
                        }
                        .btn01 {
                            height: 14px;
                        }
                        .single-grap {
                            background-color: #332e2e;
                        }
                    }
                    .play-item-title {
                        text-align: center;
                    }
                    .start-btn {
                        text-align: right;
                    }
                    .btn-wrap {
                        transform: rotateX(180deg) rotateY(-360deg);
                        margin-top: 2px;
                    }
                }
                .template-add {
                    height: 110px;
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
                        height: 110px;
                        .template01-item {
                            width: 50%;
                            height: 50%;
                            background-color: #5D5D5D;
                            color: #fff;
                            line-height: 56px;
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
        .el-dialog__header {
            .title {
                color: #fff;
                font-size: 18px;
                text-align: left;
                position: relative;
                height: 40px;
                line-height: 40px;
                padding: 0 30px;
                span {
                    position: absolute;
                    right: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
                span::before {
                    content: '';
                    height: 40px;
                    background: #979797;
                    width: 1px;
                    position: absolute;
                    left: -30px;
                    top: 0;
                }
            }
        }
    }
</style>


