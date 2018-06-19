<template>
    <div class="edit-video-wrap">
        <div class="edit-video-container">
            <div class="edit-video-top">
                <div class="edit-video-top-con">
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
                            <span class="edit-lock" :class="{'edit-lock-f' : !isLock}" @click="changeLock"></span>
                            <span class="edit-setting-ico"></span>
                        </div>
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
                            <el-col :span="6" v-for="(item, index) in playerDataList" :key="index" :style="index < 4 ? {marginBottom: '1px'} : {}">
                                <Player :isLive = 1
                                        :playerData= item
                                        :isAdd = item.isAdd
                                        :isBlank = item.isBlank
                                        >
                                </Player>
                            </el-col>
                        </el-row>
                        <el-row class="video-item-live">
                            <el-col :span="6">
                                <Player :isLive = 0
                                        :playerData=playerDataList[3]
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player>  
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 0
                                        :playerData=playerDataList[3]
                                        :isAdd = false
                                        :isBlank = false
                                        >
                                </Player> 
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 0
                                        :playerData=playerDataList[3]
                                        :isAdd = true
                                        :isBlank = false
                                        >
                                </Player> 
                            </el-col>
                            <el-col :span="6">
                                <Player :isLive = 0
                                        :playerData=playerDataList[3]
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
                playerDataList: [
                    {
                        index: 1,
                        title: 'CAM1',
                        signalIntensity: 4,
                        vol: 55,
                        isAdd: false,
                        isBlank: false,
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    },
                    {
                        index: 2,               // 视频矩阵索引
                        title: 'CAM2',          // title
                        signalIntensity: 3,     // 信号强度
                        vol: 55,                // 音量
                        isAdd: false,           // 是否显示新增图标
                        isBlank: false,         // 是否空白
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    },
                    {
                        index: 3,
                        title: 'CAM3',
                        signalIntensity: 2,
                        vol: 55,
                        isBlank: false,
                        isAdd: false,
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    },
                    {
                        index: 4,
                        title: 'CAM4',
                        vol: 55,
                        isAdd: false,
                        isBlank: false,
                        signalIntensity: 1,
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    },
                    {
                        index: 4,
                        title: 'CAM4',
                        vol: 55,
                        isAdd: false,
                        isBlank: false,
                        signalIntensity: 1,
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    },
                    {
                        index: 4,
                        title: 'CAM4',
                        vol: 55,
                        isAdd: false,
                        isBlank: false,
                        signalIntensity: 1,
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    },
                    {
                        index: 4,
                        title: 'CAM4',
                        vol: 55,
                        isAdd: true,
                        isBlank: false,
                        signalIntensity: 1,
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    },
                    {
                        index: 4,
                        title: 'CAM4',
                        vol: 55,
                        isAdd: true,
                        isBlank: true,
                        signalIntensity: 1,
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    }
                ],
                localPlayerData: [      // 本地视频数据
                    {
                        index: 1,
                        title: 'CAM1',
                        signalIntensity: 4,
                        vol: 55,
                        source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                    }
                ],
                isLock: true,
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
        },
        beforeCreate () {
            var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
            if(typeof rfs != "undefined" && rfs) {
                rfs.call(el);
            };
            return;
        },
        created () {
            this.http.get('/get/config', {token: ''})
            .then((response) => {
                //if (response.success == 1) {
                    console.log(response);
            })
            .catch((error) => {
                console.error(error + '请求数据有误');
            });
            this.$store.commit('changePlay', this.playerDataList);
        },
        methods: {
            changeLock (event) {
                this.isLock = !this.isLock;
            }
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
                .edit-video-top-con {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .edit-top-left {
                        overflow: hidden;
                        height: 6.5vh;
                        padding-left: 20px;
                        width: 50%;
                        a {
                            float: left;
                        }
                        span {
                            float: left;
                            line-height: 6.5vh;
                            margin-left: 20px;
                            font-size: 24px;
                            box-sizing: border-box;
                        }
                    }
                    .edit-top-right {
                        position: relative;
                        overflow: hidden;
                        height: 6.5vh;
                        width: 50%;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .edit-top-save-time {
                            padding-left: 15%;
                            font-size: 20px;
                            line-height: 6.5vh;
                        }
                        .edit-top-icon-con {
                            overflow: hidden;
                            
                            .edit-add {
                                float: left;
                                padding: 3px 15px;
                                border: 1px solid #fff;
                                border-radius: 5px;
                            }
                            .edit-lock {
                                width: 20px;
                                height: 20px;
                                float: left;
                                background-image: url('../assets/lock.png');
                                background-repeat: no-repeat;
                                background-size: 100%;
                                margin: 0 30px 0 27px;
                            }
                            .edit-lock-f {
                                background-image: url('../assets/unlock.png');
                            }
                            .edit-setting-ico {
                                width: 20px;
                                height: 20px;
                                float: left;
                                background-image: url('../assets/setting01.png');
                                background-repeat: no-repeat;
                                background-size: 100%;
                                margin-right: 20px;
                            }
                        }
                    }
                }
                .edit-top-time {
                    position: relative;
                    clear: both;
                    height: 6vh;
                    line-height: 6vh;
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
                        width: 20px;
                        height: 20px;
                        background: url('../assets/play.png') no-repeat center 100%;
                        background-size: contain;
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
                    height: 3.6vh;
                    line-height: 3.6vh;
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
                    >div:nth-child(6) {
                        padding-left: 2px;
                    }
                    >div:nth-child(7) {
                        padding-left: 2px;
                    }
                    >div:nth-child(8) {
                        padding-left: 2px;
                    }
                }
            }
        }
    }
</style>



