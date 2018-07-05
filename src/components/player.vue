<template>
    <div class="qn-player">
        <div class="video-player-con" :class="isAdd ? 'video-player-con-n' : '' || isPreview ? 'video-player-con-l' : ''
        || playerData.isPvw === 1 ? 'bor-2-g' : '' || playerData.isPgm === 1 ? 'bor-2-r' : ''">
            <video ref="player" v-show="!isAdd" preload="auto" height="100%" width="100%"
            :src="playerData.url" @click.stop="addPvw" @dblclick="addPgm"
            ></video>
            <div v-if="isAdd && !isBlank" class="add-video" @click="dialogVisible = !dialogVisible">
                <div class="add-h"></div>
                <div class="add-d"></div>
            </div>
        </div>
        <el-row class="play-bar-wrap" :class="isPreview &&  !isRed ? 'play-bar-wrap-h' : '' || isPreview &&  isRed ? 'play-bar-wrap-r' : ''">
            <el-col :span="8" v-if="!isPreview">
                {{ playerData.seqNo }}
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
        <div v-if="isLive != 1" class="slider-bar-wrap">
            <div class="contral-wrap" @click="playBtnHandel()" :class="isStart ? 'contral-wrap-start' : '' ">
                <div class="h01" v-show="!isStart"></div>
                <div class="h02" v-show="!isStart"></div>
            </div>
            <!-- <input ref="range"  type="range" value="0"> -->
            <div class="range" @click="changeProgress(player,range,timer,$event)"><span class="range-btn" ref="range"></span></div>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="70%"
            :show-close="false"
            >
            <div slot="title" class="title">
                添加直播源
                <span @click="dialogVisible = false">关闭</span>
            </div>
            <div class="content">
                <div class="name">名称：<input type="text" placeholder="请输入直播源名称"></div>
                <div class="radio-wrap">
                    <template>
                        <div class="radio01">
                            <el-radio v-model="steamRadio" label="1">推流直播：请将下列地址配置在采集设备中</el-radio>
                        </div>
                        <div class="detail-wrap" v-show="steamRadio == 1">
                            <div class="detail-con"></div>
                            <span class="copy-btn">复制</span>
                        </div>
                        <div class="radio02">
                            <el-radio v-model="steamRadio" label="2">拉流直播：支持的协议有rtmp、flv、m3u8、hls</el-radio>
                        </div>
                        <div class="pull-wrap" v-show="steamRadio == 2">
                            <input type="text" id="pull-stream" placeholder="请输入拉流地址"><span @click="addLivePlay">添加</span>
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
                <el-button class="add-btn" type="primary" @click="dialogVisible = false">添 加</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import Flash from '@/components/playerFlash.vue'
    export default {
        name: 'player',
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
        data () {
            return {
                value1: true,
                value2: true,
                dialogVisible: false,   // 控制添加对话框显示
                steamRadio: '1',           // 直播流选择
                monitor01: true,        // 监控切换
                monitor02: false,
                isStart: false,
                timer: null,        // 控件定时器
                tempStep: 0,        // 每秒走的距离
                left: 0,            // 滑块距离父元素左边距离
                addLivePLayerData: null,
            }
        },
        components: {
            Flash,
        },
        computed: {
            playerStatus () {
                return this.$store.state.playerListStatus;
            },
            player () {
                return this.$refs.player;
            },
            range () {
                return this.$refs.range;
            },
            vol () {
                return this.$store.getters.getPlayerListStatus(this.playerData.seqNo+8);
            }
        },
        created () {
            
        },
        mounted () {
            let that = this;
            
            this.player.oncanplay = function () {                   // 视频可以播放时
                let duration = Math.floor(that.player.duration);    // 视频总时长
                that.tempStep = 140 / duration;
                // 设置初始声音
                that.player ? that.player.volume = that.vol.vol : '';
            };
            this.player.onplay = function () {                  // 开始播放时
                that.timer = setInterval(() => {
                    that.range ? that.range.style.left =  that.left + that.tempStep + 'px' : '';
                    that.left = that.left + that.tempStep;
                }, 1000);
            }
            this.player.ontimeupdate = function () {            // 当目前播放位置更改时
                that.player ? that.player.volume = that.vol.vol : '';
            };
            this.player.onended = function () {                 // 视频结束清除定时器
                that.range.style.left = 0+'px';
                that.player.currentTime = 0;
                clearInterval(that.timer);
            }
            this.player.onpause = function () {
                clearInterval(that.timer);
            }
            this.player.onseeked = function () {        // 跳跃到新位置时改变left值
                clearInterval(that.timer);
                that.left = that.range.offsetLeft;
                if(that.player.currentTime == 0 )  return;
                that.timer = setInterval(() => {
                    that.range ? that.range.style.left =  that.left + that.tempStep + 'px' : '';
                    that.left = that.left + that.tempStep;
                }, 1000);
            }
        },
        methods: {
            // 定义播放暂停按钮
            playBtnHandel () {
                this.isStart = !this.isStart;       // 改变播放状态
                this.$store.commit('changePlayStatus', this.playerData.seqNo);
                let index = this.playerData.seqNo;
                this.$store.getters.getPlayerListStatus(index).status ? this.player.play() : this.player.pause();
            },
            handleClose () {    // 添加直播源
                this.$confirm('确认关闭？')
                    .then(_ => {
                        console.log('ok')
                    })
                    .catch(_ => {});
            },
            changeProgress (player,range,timer,event) {
                let currentProgress = event.offsetX * player.duration / 140;
                clearInterval(timer);
                range.style.left = event.offsetX + 'px';
                player.currentTime = currentProgress;
            },
            addLivePlay () {
                this.http.get('/api/data', {})
                .then((response) => {
                    this.addLivePLayerData = response.data;
                    console.log(this.addLivePLayerData)
                })
                .catch((error) => {
                    console.error(error + '请求数据有误');
                });
            },
            addPgm () {
                clearTimeout(this.clickTimer);
                this.http.post('/api/addPVW', {})
                .then((response) => {
                    this.$store.dispatch('changePgm', this.playerData);
                    this.playerData.isPgm = 1;
                    let tempObj = {
                        id: this.playerData.id,
                        type: 1,
                        index: this.playerData.seqNo+8,
                    };
                    this.$store.dispatch('changepvwpgm', tempObj);
                })
                .catch((error) => {

                });
            },
            addPvw () {
                clearTimeout(this.clickTimer);
                this.clickTimer = setTimeout(() => {
                    this.http.post('/api/addPVW', {})
                    .then((response) => {
                        this.$store.dispatch('changePvw', this.playerData);
                        this.playerData.isPvw = 1;
                        let tempObj = {
                            id: this.playerData.id,
                            type: 0,
                            index: this.playerData.seqNo+8,
                        };
                        this.$store.dispatch('changepvwpgm', tempObj);
                    })
                    .catch((error) => {

                    });
                }, 300)
            },
        },
        watch: {
           
        }
    }
</script>
<style lang="scss" scoped>
.bor-2-r::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 99%;
    height: 99%;
    border: 1px solid #FF0000;
    pointer-events: none;
    z-index: 100;
}
.bor-2-g::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 99%;
    height: 99%;
    border: 1px solid #00FF00;
    pointer-events: none;
    z-index: 100;
}
.video-player-con {
    .none {
        display: none;
    }
    position: relative;
    height: 110px;
    video {
        display: block;
        object-fit: fill;
        width: 100%;
        height: 100%;
        background-color: #5D5D5D;
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
.video-player-con-n {
    background-color: #5D5D5D;
}
.video-player-con-l {
    height: 223px;
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
.slider-bar-wrap {
    background: #1C2F43;
    height: 20px;
    line-height: 20px;
    position: relative;
    .contral-wrap {
        position: absolute;
        width: 20px;
        height: 10px;
        top: 50%;
        left: 5px;
        transform: translate3d(0, -50% ,0);
        div {
            height: 10px;
            width: 2px;
            margin: 0 2px;
            background-color: #fff;
            float: left;
        }
    }
    .contral-wrap-start {
        width: 0;
        height: 0;
        border: 6px solid #fff;
        border-left-color: #fff;
        border-right: 6px solid transparent;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        left: 10px;
    }
    .range {
        position: absolute;
        width: 140px;
        height: 1px;
        background-color: #fff;
        top: 50%;
        left: 25px;
        transform: translateY(-50%);
        span {
            position: absolute;
            left: 0;
            top: 50%;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: #f4f6fa;
            transform: translateY(-50%);
            transition: all .3s ease;
        }
    }
}
.play-item-title {
    font-size: 14px;
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
                height: 50px;
                border: 1px solid #4A4848;
                margin-right: 30px;
            }
            span {
                background: #333333;
                border-radius: 6px;
                padding: 8px 15px; 
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
<style lang="scss">
    .el-dialog__header {
        padding: 0;
       background: #333333;
    }
    .el-dialog {
        background: #6A6B6D !important;
    }
    .el-dialog__body {
        padding: 0 !important; 
    }
    .el-radio__label {
        font-size: 18px !important;
    }
    .el-dialog__footer {
        border-top: 1px solid #fff;
        padding-top: 20px !important;
    }
</style>



