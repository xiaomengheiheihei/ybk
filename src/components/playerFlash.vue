<template>
    <div class="flash-player-wrap">
        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" 
                      @ready="onPlayerReadied" 
                      @timeupdate="onTimeupdate"
                      :playsinline= true>
        </video-player>
        <el-row class="play-bar-wrap" :class="isPreview &&  !isRed ? 'play-bar-wrap-h' : '' || isPreview &&  isRed ? 'play-bar-wrap-r' : ''">
            <el-col :span="8" v-if="!isPreview">
                {{ playerData.index }}
            </el-col>
            <el-col :span="8" v-if="isPreview">
                {{ playerData.title }}
            </el-col>
            <el-col :span="8" class="play-item-title" v-if="!isPreview">
                {{ playerData.title }}
            </el-col>
            <el-col :span="8" class="play-item-title" v-if="isPreview && !isRed">
                PVW
            </el-col>
            <el-col :span="8" class="play-item-title" v-if="isPreview && isRed">
                PGM
            </el-col>
            <el-col :span="8" class="btn-wrap" v-if="!isPreview">
                <div class="btn01 btn" :class="playerData.signalIntensity <= 3 ? 'single-grap' : ''"></div>
                <div class="btn02 btn" :class="playerData.signalIntensity <= 2 ? 'single-grap' : ''"></div>
                <div class="btn03 btn" :class="playerData.signalIntensity <= 1 ? 'single-grap' : ''"></div>
                <div class="btn04 btn"></div>
            </el-col>
            <el-col :span="8" class="start-btn" v-if="isPreview && !isRed">
                <el-switch
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import 'videojs-flash'
    import { videoPlayer } from 'vue-video-player';
    require('video.js/dist/video-js.css')
    require('vue-video-player/src/custom-theme.css')
    export default {
        name: "Flash",
        props: {
            isLive: Number,         // 是否直播，1为直播，0为本地视频
            playerData: Object,     // 视频数据
            isAdd: Boolean,         // 是否新增
            isBlank: Boolean,       // 是否空白
            isPreview: {            // 是否为预览
                type: Boolean,
                required: false,
                default: false
            },
            isRed: {                // 是否变红
                type: Boolean,
                required: false,
                default: false
            },
        },
        data() {
            return {
                initialized: false,
                playerOptions: {
                    height: '110',
                    sources: [
                        {
                            type: "rtmp/mp4",
                            src: "rtmp://live.hkstv.hk.lxdns.com/live/hks"
                        },
                        {
                            type: "",
                            src: ""
                        }
                    ],
                    flash: {
                        swf: '/video-js.swf'
                    },
                    language: 'zh-CN',
                    overNative: true,
                    sourceOrder: true,
                    techOrder: ['flash','html5'],
                    autoplay: true,
                    controls: false,
                    poster: ""
                }
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer.player
            },
        },
        components: {
            videoPlayer
        },
        methods: {
            onPlayerReadied() {
            if (!this.initialized) {
                this.initialized = true
                this.currentTech = this.player.techName_
            }
            },
            // record current time
            onTimeupdate(e) {
                //console.log('currentTime', e.cache_.currentTime)
            },
        }
    }
</script>
<style lang="scss" scoped>
    .flash-player-wrap {
        height: 110px;
    }
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
.play-bar-wrap-h {
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: #00FF00;
}
.play-bar-wrap-r {
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: #FF0000;
}
</style>


