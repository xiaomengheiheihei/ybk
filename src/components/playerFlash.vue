<template>
    <div class="flash-player-wrap"
        :class="playerData.isPgm === 1 && !isPvw && !isPgm ? 'bor-2-r' : '' || playerData.isPvw === 1 && !isPvw ? 'bor-2-g' : ''
        || isPgm ? 'bor-2-r-l' : '' || isPvw ? 'bor-2-g-l' : ''"
        :style="isPreview ? {height: '223px'} : {}">
        <div class="video-player-con" 
            :class="isAdd ? 'video-player-con-n' : '' || isPreview ? 'video-player-con-l' : ''">
            <div class="bg" v-if="!isPreview && addLivePLayerData === null && playerData.url != ''" v-show="vol" 
                @click.stop="addPvw" @dblclick.stop="addPgm"></div>
            <div class="setting-bg" v-if="isSetting && !isPreview && 
            !playerData.isPgm && !playerData.isPvw && playerData.url != ''">
                <div class="delete" @click="deleteVideo"><i class="ybk-icon icon-iconfontshanchu"></i></div>
                <div class="editar" @click="dialogVisible = !dialogVisible"><i class="ybk-icon icon-501"></i></div>
            </div>
            <video-player v-if="playerData.url != '' && addLivePLayerData === null" v-show="!isAdd" class="vjs-custom-skin" 
                    ref="videoPlayer" 
                    :options= playerOptions
                    @timeupdate="onTimeupdate"
                    @play ="changeWidth"
                    :playsinline = true>
            </video-player>
            <Flash v-if="addLivePLayerData != null && playerData.url != ''"  
                :isLive= 1
                :playerData= playerData
                :isAdd = false
                :isBlank = false
                :isPlayBar = 'true'
                :height = '110'>
            </Flash>
            <!-- <div v-if="isAdd && !isBlank" class="add-video" @click="dialogVisible = !dialogVisible">
                <div class="add-h"></div>
                <div class="add-d"></div>
            </div> -->
        </div>
        <el-row v-if="(showBar || playerData.url != '') && !isPlayBar" class="play-bar-wrap" :class="isPreview &&  !isRed ? 'play-bar-wrap-h' : '' || isPreview &&  isRed ? 'play-bar-wrap-r' : ''">
            <el-col :span="8" v-if="!isPreview">
                {{ playerData.seqNo+1 }}
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
                    v-model="value1"
                    @change = "closePvw"
                    active-color="#60A960"
                    inactive-color="#5D5D5D">
                </el-switch>
            </el-col>
        </el-row>
         <el-dialog
            :visible.sync="dialogVisible"
            width="60%"
            :show-close="false"
            >
            <div slot="title" class="title">
                添加直播源
                <span @click="dialogVisible = false">关闭</span>
            </div>
            <div class="content">
                <div class="name">名称：<input type="text" :placeholder="playerData.title"></div>
                <div class="radio-wrap">
                    <template>
                        <div class="radio01">
                            <el-radio v-model="steamRadio" label="1">推流直播：请将下列地址配置在采集设备中</el-radio>
                        </div>
                        <div class="detail-wrap" v-show="steamRadio == 1">
                            <div class="detail-con" :copyData = "addUrl">{{ addUrl }}</div>
                            <span class="copy-btn" v-clipboard:copy="addUrl" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span>
                        </div>
                        <div class="radio02">
                            <el-radio v-model="steamRadio" label="2">拉流直播：支持的协议有rtmp、flv、m3u8、hls</el-radio>
                        </div>
                        <div class="pull-wrap" v-show="steamRadio == 2">
                            <input type="text" ref="pull" id="pull-stream" placeholder="请输入拉流地址"><span @click="addLivePlay">添加</span>
                        </div>
                        <div class="preview-wrap">
                            <Flash v-if="addLivePLayerData != null"  :isLive= 1
                                    :playerData= addLivePLayerData
                                    :isAdd = false
                                    :isBlank = false
                                    :height = '133'>
                            </Flash>
                        </div>
                    </template>
                </div>
                <div class="switch-wrap">
                    <div class="switch01">
                        <span>智能黄暴监控：</span>
                        <el-switch
                            v-model="monitor01"
                            active-color="#13ce66"
                            inactive-color="#383B3C">
                        </el-switch>
                    </div>
                    <div class="switch02">
                        <span>信号质量监控：</span>
                        <el-switch
                            v-model="monitor02"
                            active-color="#13ce66"
                            inactive-color="#383B3C">
                        </el-switch>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
                <el-button class="add-btn" type="primary" @click="addLiveList">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import 'videojs-flash'
    import 'videojs-contrib-hls'
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
            height: '',
            isPgm: {
                type: Boolean,
                required: false,
                default: false,
            },
            isPvw: {
                type: Boolean,
                required: false,
                default: false,
            },
            isPlayBar: {
                type: Boolean,
                require: false,
                default: false,
            },
            isSetting: {
                type: Boolean,
                require: false,
                default: false,
            }
        },
        data() {
            return {
                initialized: false,
                playerOptions: {
                    techOrder: ['html5', 'flash'],
                    height: this.height,
                    muted: true,
                    sources: [
                        {
                            type: "video/mp4",
                            src: (this.playerData.url.indexOf('http') >= 0 && this.playerData.url.indexOf('.m3u8') < 0) ? 
                            this.playerData.url : '',     // 非rtmp协议用h5播放
                        },
                        {
                            withCredentials: false,
                            type: 'application/x-mpegURL',
                            src: this.playerData.url.indexOf('.m3u8') >= 0 ? this.playerData.url : '',
                        },
                        {
                            type: "rtmp/mp4",
                            src: this.playerData.url, //"rtmp://live.hkstv.hk.lxdns.com/live/hks"
                        },
                    ],
                    flash: {
                        hls: {withCredentials: false},
                        swf: './video-js.swf'
                    },
                    loop:true,
                    language: 'zh-CN',
                    overNative: true,
                    sourceOrder: true,
                    autoplay: true,
                    controls: false,
                    poster: "",
                },
                value2: true,
                value1: true,
                dialogVisible: false,   // 控制添加对话框显示
                steamRadio: '1',           // 直播流选择
                monitor01: false,        // 监控切换
                monitor02: false,
                addLivePLayerData: null,
                clickTimer: null,
                addUrl: window.location.href,
                showBar: true,          // 是否显示播控按钮
            }
        },
        computed: {
            player() {
                return this.$refs.videoPlayer ? this.$refs.videoPlayer.player : undefined;
            },
            vol () {
                return this.$store.getters.getPlayerListStatus(13);
            },
            listening () {
                return this.$store.getters.getPlayerListStatus(this.playerData.seqNo+1);
            },
            pullSteam () {
                return this.$refs.pull;
            }
        },
        components: {
            videoPlayer
        },
        mounted () {
            this.isPgm && this.player && this.player.volume(0.5);
            !this.isPgm && this.player && this.player.volume(0);
        },
        methods: {
            onTimeupdate(e) {
                // this.isPgm && console.log(this.player.currentTime());
                this.isPgm && this.player && this.player.volume(this.vol.vol);
                if (this.listening && !this.isPgm) {
                    this.listening.isListening ? this.player && this.player.volume(this.listening.vol) : this.player.volume(0);
                } 
            },
            addPvw () {
                clearTimeout(this.clickTimer);
                this.clickTimer = setTimeout(() => {
                    this.http.post('./biz/ybk/switch2PVW', {id:this.playerData.id})
                    .then((response) => {
                        this.$store.dispatch('changePvw', this.playerData);
                        this.playerData.isPvw = 1;
                        let tempObj = {
                            id: this.playerData.id,
                            type: 0,
                            index: this.playerData.seqNo+1,
                        };
                        this.$store.dispatch('changepvwpgm', tempObj);
                    })
                    .catch((error) => {
                        //this.$loading.end();
                    });
                }, 300)
            },
            addLiveList () {    // 添加直播源
                if (this.addLivePLayerData === null) return;
                this.playerData.url = this.addLivePLayerData.url;
                this.dialogVisible = false;
                this.showBar = !this.showBar;
                let obj = {
                    id: this.addLivePLayerData.id,
                    title: this.addLivePLayerData.title,
                    url: this.addLivePLayerData.url,
                }
                this.$store.dispatch('changeSettingStatus', 0);
                this.$store.dispatch('addLivePlayerUrl', obj);
            },
            addLivePlay () {
                this.$loading();
                let data = {
                    id: this.playerData.id,
                    url: this.pullSteam.value,
                    title: this.playerData.title,
                    streamType: '1',
                };
                this.http.post('./biz/ybk/setChannelInfo',data)
                .then((response) => {
                    if(response.code === 0) {
                        this.$loading.end();
                        this.addLivePLayerData = JSON.parse(JSON.stringify(this.playerData ));
                        this.addLivePLayerData.isPvw = 0;
                        this.addLivePLayerData.isPgm = 0;
                        this.addLivePLayerData.url =  this.pullSteam.value;  
                    }
                })
                .catch((error) => {
                    this.$loading.end();
                    console.error(error + '请求数据有误');
                });
            },
            closePvw () {
                if (!this.value1) {
                    //this.player.pause();
                    this.player.el_.style.opacity = 0;
                }
                if (this.value1) {
                    //this.player.play();
                    this.player.el_.style.opacity = 1;
                }
            },
            addPgm () {
                clearTimeout(this.clickTimer);
                let sync = Number(this.$store.state.playSync);
                this.http.post('./biz/ybk/switch2PGM', {"id": this.playerData.id,sync: sync})
                .then((response) => {
                    this.$store.dispatch('changePgm', this.playerData);
                    this.playerData.isPgm = 1;
                    let tempObj = {
                        id: this.playerData.id,
                        type: 1,
                        index: this.playerData.seqNo+1,
                    };
                    this.$store.dispatch('changepvwpgm', tempObj);
                })
                .catch((error) => {

                });
            },
            changeWidth () {
                setTimeout(() => {
                    this.player.el().style.width = '99%';
                    setTimeout (() => {
                        this.player.el().style.width = '100%';
                    },500);
                },500);
            },
            onCopy: function (e) {
                this.$alert(e.text + '已复制到您的剪切板！', '复制成功', {
                    confirmButtonText: '确定',
                    callback: ()=>{}
                })
            },
            onError: function (e) {
                this.$alert('已复制到剪切板失败，请稍后重试！', '复制失败', {
                    confirmButtonText: '确定',
                    callback: ()=>{}
                })
            },
            deleteVideo () {
                this.$loading();
                let data = {
                    id: this.playerData.id,
                    url: '',
                    title: this.playerData.title,
                    streamType: '1',
                }
                this.http.post('./biz/ybk/setChannelInfo',data)
                .then((response) => {
                    if(response.code === 0) {
                        this.$loading.end();
                        this.playerData.url = '';
                        this.$alert('删除成功！', '温馨提示', {
                            confirmButtonText: '确定',
                            callback: ()=>{}
                        })
                        this.$store.dispatch('changeSettingStatus', 0);
                    }
                })
                .catch((error) => {
                    this.$loading.end();
                    console.error(error + '请求数据有误');
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .video-js {
        width: 100% !important;
    }
    .setting-bg {
        background-color: rgba(247, 66, 66, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 101%;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        .delete {
            margin-right: 40px;
            i {
                font-size: 40px;
                color: #fff;
            }
        }
        .editar {
            i {
                font-size: 33px;
                color: #fff;
                margin-top: -7px;
                display: block;
            }
        }
    }
    .bor-2-r::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 99%;
        height: 116%;
        border: 1px solid #FF0000;
        pointer-events: none;
    }
    .bor-2-g::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 99%;
        height: 116%;
        border: 1px solid #00FF00;
        pointer-events: none;
    }
    .bor-2-r-l::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 99.5%;
        height: 100%;
        border: 1px solid #FF0000;
        pointer-events: none;
    }
    .bor-2-g-l::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 99.5%;
        height: 100%;
        border: 1px solid #00FF00;
        pointer-events: none;
    }
    .flash-player-wrap {
        position: relative;
        height: 110px;
        .video-player-con {
            position: relative;
            min-height: 110px;
            background-color: #2b2b2b;
            .bg {
                position: absolute;
                left: 0;
                top: 0;
                background:transparent;
                width: 100%;
                height: 100%;
                z-index: 1;
            }   
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
    }
    .play-bar-wrap {
    text-align: left;
    font-size: 12px;
    color: #fff;
    height: 20px;
    line-height: 20px;
    padding: 0 5px;
    background: #353535;
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
.video-player-con-n {
    background-color: #2b2b2b;
}
.video-player-con-l {
    height: 223px;
}
.play-bar-wrap-h {
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: #15D315;
    font-size: 20px;
    font-weight: bold;
}
.play-bar-wrap-r {
    height: 40px;
    line-height: 40px;
    padding: 0 5px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: #FF0000;
    font-size: 20px;
    font-weight: bold;
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
.content {
    color: #fff;
    text-align: left;
    padding: 50px 30px 20px 30px;
    font-size: 18px;
    .name {
        input {
            outline: none;
            vertical-align: middle;
            appearance: none;
            height: 30px;
            width: 200px;
            font-size: 18px;
            padding-left: 5px;
            border: 1px solid #979797;
        }
    }
    .radio-wrap {
        margin-top: 30px;
        .preview-wrap {
            height: 133px;
            width: 235px;
            margin-top: 15px;
        }
        .radio01, .radio02 {
            margin-bottom: 15px;
        }
        .pull-wrap {
            margin-top: 15px;
            margin-bottom: 10px;
            input {
                height: 40px;
                line-height: 40px;
                width: 65%;
                font-size: 18px;
                color: #4A4A4A;
                padding-left: 5px;
                outline: none;
            }
            span{
                margin-left: 30px;
                font-size: 18px;
                color: #fff;
                padding: 5px 15px;
                border-radius: 6px;
                background: #333333;
                cursor: pointer;
            }
        }
        .el-radio {
            color: #fff;
            
        }
        .detail-wrap {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 15px 0;
            .detail-con {
                width: 70%;
                border: 1px solid #4A4848;
                margin-right: 30px;
                line-height: 1.5em;
                color: #ddd;
                font-size: 18px;
                word-break: break-all;
                padding: 10px;
            }
            span {
                background: #333333;
                border-radius: 6px;
                padding: 8px 15px; 
                cursor: pointer;
            }
        }
    }
    .switch-wrap {
        margin-top: 40px;
        .switch02 {
            margin-top: 30px;
        }
    }
}
.dialog-footer {
    .cancel-btn {
        background: #D8D8D8;
        border-radius: 50px;
        height: 50px;
        width: 120px;
        font-size: 20px;
        color: #333333;
        outline: none;
    }
    .add-btn {
        background: #333333;
        border-radius: 50px;
        height: 50px;
        width: 120px;
        font-size: 20px;
        color: #fff;
        outline: none;
        border: 0;
        margin-left: 40px;
    }
}
</style>


