<template>
    <div class="edit-video-wrap">
        <div class="edit-video-container">
            <div class="edit-video-top">
                <div class="edit-top-left">
                    <div class="qn-logo">
                        <a href="#"><img src="../assets/logo.png" alt="七牛云"></a>
                    </div>
                    <span class="edit-title">云播控1.0</span>
                </div>
                <div class="edit-top-right">
                    <div class="edit-top-save-time">剩余时长：<span>01:30:45</span></div>
                    <div class="edit-top-icon-con">
                        <span class="edit-add">续期</span>
                        <span class="edit-lock"></span>
                        <span class="edit-setting-ico"></span>
                    </div>
                </div>
                <div class="edit-top-time">
                    2018年05月24日<span class="week">星期四</span><span class="time">12:30:34</span>
                    <span class="edit-start-btn"></span>
                </div>
            </div>
            <el-row class="edit-video-con">
                <el-col :span="12">
                    <div class="edit-video-left-con">
                        <div class="edit-video-left-tile">视频矩阵<span></span></div>
                        <el-row class="video-item-live">
                            <el-col :span="6">
                                <Player :isLive = 1
                                        :playerData=playerData
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player>
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 1
                                        :playerData=playerData1
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player>
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 1
                                        :playerData=playerData2
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player>
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 1
                                        :playerData=playerData3
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player>
                            </el-col>
                        </el-row>
                        <el-row class="video-item-live">
                            <el-col :span="6">
                                <Player :isLive = 1
                                        :playerData=playerData
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player>
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 1
                                        :playerData=playerData
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player>
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 1
                                        :playerData=playerData
                                        :isAdd = true
                                        :isBlank = false
                                        >
                                </Player>
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 1
                                        :playerData=playerData
                                        :isAdd = true
                                        :isBlank = true
                                        >
                                </Player>
                            </el-col>
                        </el-row>
                        <el-row class="video-item-live">
                            <el-col :span="6">
                                <Player :isLive = 0
                                        :playerData=playerData
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player>  
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 0
                                        :playerData=playerData
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player> 
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 0
                                        :playerData=playerData
                                        :isAdd = true
                                        :isBlank = false
                                        >
                                </Player> 
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 0
                                        :playerData=playerData
                                        :isAdd = true
                                        :isBlank = true
                                        >
                                </Player> 
                            </el-col>
                        </el-row>
                    </div>
                    <el-row class="windows-con-w">
                        <el-col :span="12">
                            <Windows></Windows>
                        </el-col>
                        <el-col :span="12">
                            <Clasp></Clasp>
                        </el-col>
                    </el-row>
                    <Mixer></Mixer>
                </el-col>
                <el-col :span="12">
                    <div class="edit-video-right-con">
                        <Preview></Preview>
                        <el-row>
                            <el-col :span="12">
                                <Effect></Effect>
                            </el-col>
                            <el-col :span="12">
                                <PlayControl></PlayControl>
                            </el-col> 
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <ResourceCenter></ResourceCenter>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import Windows from '@/components/window.vue'
    import Player from '@/components/player.vue'
    import Clasp from '@/components/clasp.vue'
    import Mixer from '@/components/mixer.vue'
    import Preview from '@/components/preview.vue'
    import Effect from '@/components/effect.vue'
    import PlayControl from '@/components/playControl.vue'
    import ResourceCenter from '@/components/resourceCenter.vue'
    export default {
        name: 'editVideo',
        data () {
            return {
                playerData: {
                    index: 1,
                    title: 'CAM1',
                    signalIntensity: 4,
                    source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                },
                playerData1: {
                    index: 2,
                    title: 'CAM2',
                    signalIntensity: 3,
                    source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                },
                playerData2: {
                    index: 3,
                    title: 'CAM3',
                    signalIntensity: 2,
                    source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                },
                playerData3: {
                    index: 4,
                    title: 'CAM4',
                    signalIntensity: 1,
                    source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                }
            }
        },
        components: {
            Windows,
            Player,
            Clasp,
            Mixer,
            Preview,
            Effect,
            PlayControl,
            ResourceCenter,
        }
    }
</script>
<style lang="scss" scoped>
    .edit-video-wrap {
        width: 100%;
        background-color: #332e2e;
        .edit-video-container {
            position: relative;
            .edit-video-top {
                background-color: #1E2124;
                margin: 0 10px;
                color: #fff;
                overflow: hidden;
                .edit-top-left {
                    float: left;
                    overflow: hidden;
                    height: 60px;
                    margin-left: 20px;
                    width: 50%;
                    a {
                        float: left;
                        img {
                            margin-top: 6px;
                        }
                    }
                    span {
                        float: left;
                        line-height: 60px;
                        margin-left: 20px;
                        font-size: 24px;
                    }
                }
                .edit-top-right {
                    position: relative;
                    float: right;
                    overflow: hidden;
                    height: 60px;
                    .edit-top-save-time {
                        float: left;
                        font-size: 20px;
                        line-height: 60px;
                        margin-right: 220px;
                    }
                    .edit-top-icon-con {
                        overflow: hidden;
                        float: left;
                        transform: translate3d(0, 50%, 0);
                        .edit-add {
                            float: left;
                            padding: 3px 15px;
                            border: 1px solid #fff;
                            border-radius: 5px;
                            margin-top: 3px;
                        }
                        .edit-lock {
                            width: 30px;
                            height: 30px;
                            float: left;
                            background-image: url('../assets/lock.png');
                            background-repeat: no-repeat;
                            background-size: 100%;
                            margin: 0 30px 0 27px;
                        }
                        .edit-setting-ico {
                            width: 30px;
                            height: 30px;
                            float: left;
                            background-image: url('../assets/setting01.png');
                            background-repeat: no-repeat;
                            background-size: 100%;
                            margin-right: 20px;
                        }
                    }
                }
                .edit-top-time {
                    position: relative;
                    clear: both;
                    height: 60px;
                    line-height: 60px;
                    color: #0BE235;
                    background-color: #2E3741;
                    font-size: 24px;
                    .week {
                        padding: 0 10px;
                    }
                    .edit-start-btn {
                        position: absolute;
                        right: 20px;
                        top: 50%;
                        transform: translate3d(0, -50%, 0);
                        width: 30px;
                        height: 30px;
                        background: url('../assets/play.png') no-repeat center 100%;
                    }
                }
            }
        }
        .edit-video-con {
            margin: 0 10px;
            .edit-video-left-con {
                background-color: #1E2124;
                border-radius: 15px;
                margin-top: 5px;
                overflow: hidden;
                margin-right: 5px;
                .edit-video-left-tile {
                    font-size: 20px;
                    position: relative;
                    color: #fff;
                    height: 36px;
                    line-height: 36px;
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
                    margin-bottom: 1px;
                    >div:nth-child(2) {
                        padding-left: 2px;
                    }
                    >div:nth-child(3) {
                        padding-left: 2px;
                    }
                    >div:nth-child(4) {
                        padding-left: 2px;
                    }
                }
            }
        }
    }
</style>



