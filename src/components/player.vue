<template>
    <div class="qn-player">
        <div class="video-player-con" :class="isAdd ? 'video-player-con-n' : '' || isPreview ? 'video-player-con-l' : ''
        || playerData.isPgm === 1 ? 'bor-2-r' : '' || playerData.isPvw === 1 ? 'bor-2-g' : ''">
            <transition name="fade">
                <div class="setting-bg" v-if="isSetting && 
                !playerData.isPgm && !playerData.isPvw && playerData.url != ''">
                    <div class="delete" @click="deleteVideo"><i class="ybk-icon icon-iconfontshanchu"></i></div>
                    <div class="editar" @click="dialogVisible = !dialogVisible"><i class="ybk-icon icon-501"></i></div>
                </div>
            </transition>
            <video ref="player" loop="true" v-if="playerData.url !== '' && playerData.fileType === 1" v-show="!isAdd" preload="auto" height="100%" width="100%"
            :src="playerData.url" @click.stop="addPvw" @dblclick="addPgm"
            ></video>
            <img :src="playerData.url" v-if="playerData.url !== '' && playerData.fileType === 2" @click.stop="addPvw" @dblclick="addPgm" width="100%" height="100%" alt="">
            <!-- <div v-if="isAdd && !isBlank" class="add-video" @click="dialogVisible = !dialogVisible">
                <div class="add-h"></div>
                <div class="add-d"></div>
            </div> -->
        </div>
        <el-row class="play-bar-wrap" :class="isPreview &&  !isRed ? 'play-bar-wrap-h' : '' || isPreview &&  isRed ? 'play-bar-wrap-r' : ''">
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
                <div class="btn01 btn" :class="playerData.url === '' ? 'single-grap' : ''"></div>
                <div class="btn02 btn" :class="playerData.url === '' ? 'single-grap' : ''"></div>
                <div class="btn03 btn" :class="playerData.url === '' ? 'single-grap' : ''"></div>
                <div class="btn04 btn" :class="playerData.url === '' ? 'single-grap' : ''"></div>
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
            <div class="contral-wrap" 
                @click="playBtnHandel()" 
                :class="!isStart ? 'contral-wrap-start' : '' "
                v-if="playerData.fileType === 1">
                <div class="h01" v-show="isStart"></div>
                <div class="h02" v-show="isStart"></div>
            </div>
            <!-- <input ref="range"  type="range" value="0"> -->
            <div v-if="playerData.fileType === 1" class="range" ref="slider" @click="changeProgress($event)"><span class="range-btn" ref="range"></span></div>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="70%"
            :show-close="false"
            >
            <div slot="title" class="title">
                添加本地内容
                <span @click="dialogVisible = false">关闭</span>
            </div>
            <div class="content">
                <div class="name">名称：<input type="text" v-model="uploadTitle" :placeholder="playerData.title"></div>
                <div class="radio-wrap">
                    <template>
                        <div class="radio01">
                            <el-radio v-model="steamRadio" label="1">添加图片：支持的格式有bmp、jpg、png</el-radio>
                        </div>
                        <div class="detail-wrap" v-show="steamRadio == 1">
                            <div class="detail-con">{{ filePathi }}</div>
                            <span class="copy-btn">上传</span>
                            <input type="file" id="add-image" accept="image/png,image/bmp,image/jpg" @input="addImage($event)" placeholder="">
                        </div>
                        <div class="radio02">
                            <el-radio v-model="steamRadio" label="2">添加视频：支持的格式有avi、mkv、mp4、mpeg、wmv</el-radio>
                        </div>
                        <div class="pull-wrap" v-show="steamRadio == 2">
                            <div class="file-z">{{ filePathv }}</div>
                            <span @click="upload">上传</span>
                            <input type="file" id="add-video" accept="video/mp4,video/ogg,video/flv" @input="addVideo" placeholder="">
                        </div>
                        <div class="preview-wrap">
                            <!-- <Flash v-if="addLivePLayerData != null"  :isLive= 1
                                    :playerData= addLivePLayerData
                                    :isAdd = false
                                    :isBlank = false
                                    :height = '133'>
                            </Flash> -->
                            <player v-if="previewPlayerData.url != '' && previewPlayerData.fileType === 1" :isLive = 0
                                    :playerData = previewPlayerData
                                    :isAdd = false
                                    :isBlank = false
                                    >
                            </player>
                            <img width="100%" height="100%" v-if="uploadImg !== ''" :src="uploadImg" alt="">
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
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
                <el-button class="add-btn" type="primary" @click="updated">添 加</el-button>
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
            isSetting: {
                type: Boolean,
                require: false,
                default: false,
            }
        },
        data () {
            return {
                value1: true,
                value2: true,
                dialogVisible: false,   // 控制添加对话框显示
                steamRadio: '1',           // 直播流选择
                monitor01: false,        // 监控切换
                monitor02: false,
                isStart: false,
                timer: null,        // 控件定时器
                tempStep: 0,        // 每秒走的距离
                left: 0,            // 滑块距离父元素左边距离
                addLivePLayerData: null,
                filePathv: '',       // 上传视频路径
                filePathi: '',         // 上传图片路径
                uploadTitle: this.playerData.title,     // 上传文件标题
                uploadData: null,          // 上传文件
                uploadImg: '',              // 上传图片地址
                loadVideo: true,            // true为上传video，false为图片
                previewPlayerData: {
                    title: this.playerData.title,
                    url: '',
                    seqNo: this.playerData.seqNo,
                    fileType: 1,
                },                          // 上传视频预览数据
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
                return this.playerData.url === '' ? '' : this.$refs.player;
            },
            range () {
                return this.$refs.range;
            },
            vol () {
                return this.$store.getters.getPlayerListStatus(this.playerData.seqNo+1);
            },
            slider () {
                return this.$refs.slider;
            }
        },
        created () {
            
        },
        mounted () {
            let that = this;       
            if (!!this.player) {
                this.player.oncanplay = function () {                   // 视频可以播放时
                    let duration = Math.floor(that.player.duration);    // 视频总时长
                    that.tempStep = 140 / duration;
                    // 设置初始声音
                    that.player.volume = 0;
                }
                this.player.ontimeupdate = function () {            // 当目前播放位置更改时
                    if (!!that.vol) {
                        if (that.vol.isListening && that.player) {
                            that.player.volume = that.vol.vol
                        } else {
                            that.player.volume = 0;
                        }  
                    } 
                    that.changeProgressBar(that.player.currentTime);
                }
                this.player.onended = () => {
                    this.player.currentTime = 0;
                    this.isStart = !this.isStart; 
                }
            }
        },
        methods: {
            // 定义播放暂停按钮
            playBtnHandel () {
                if (this.playerData.fileType === 2 || !this.player) { return false; }
                this.isStart = !this.isStart;       // 改变播放状态
                if (!this.playerData.status) {      // 预览窗口
                    this.isStart ? this.player.play() : this.player.pause();
                    return;
                }
                this.$store.commit('changePlayStatus', this.playerData.seqNo + 1);
                let index = this.playerData.seqNo + 1;
                this.$store.getters.getPlayerListStatus(index).status ? this.player.play() : this.player.pause();
            },
            changeProgressBar (currentTime) {      // 当播放时间改变时改变进度条
                this.left = currentTime / this.player.duration * 100;
                // if (this.left > 0) {
                //     this.range.style.transform = 'translateX(-2px)';
                // }
                if (this.range.offsetLeft <= this.slider.offsetWidth - this.range.offsetWidth+2) {
                    this.range.style.left = this.left + '%';
                }
                if (this.left / 100 * this.slider.offsetWidth <= this.slider.offsetWidth - this.range.offsetWidth+2) {
                    this.range.style.left = this.left + '%';
                }
                // this.sliderLeft.style.width = this.left + '%';
            },
            handleClose () {    // 添加直播源
                this.$confirm('确认关闭？')
                    .then(_ => {
                        console.log('ok')
                    })
                    .catch(_ => {});
            },
            changeProgress (event) {
                // let currentProgress = event.offsetX * player.duration / 140;
                // clearInterval(timer);
                // range.style.left = event.offsetX + 'px';
                // player.currentTime = currentProgress;
                let l = event.offsetX * this.player.duration / this.slider.offsetWidth;
                this.player.currentTime = l;
            },
            addPgm () {
                clearTimeout(this.clickTimer);
                this.http.post('./biz/ybk/switch2PGM', {id: this.playerData.id,sync: Number(this.$store.state.playSync)})
                .then((response) => {
                    this.$store.dispatch('changePgm', this.playerData);
                    this.playerData.isPgm = 1;
                    let tempObj = {
                        id: this.playerData.id,
                        type: 1,
                        index: this.playerData.seqNo+1,
                    };
                    // if (this.player) {
                    //     this.$store.dispatch('saveTime', this.player.currentTime);
                    // }
                    this.$store.dispatch('changepvwpgm', tempObj);
                })
                .catch((error) => {

                });
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

                    });
                }, 300)
            },
            addImage (e) {
                this.filePathi =  e.target.value;//window.webkitURL.createObjectURL(e.target.files[0]);
                this.uploadData = e.target.files[0];
                this.loadVideo = false;
                this.playerData.fileType = 2;
                let reader = new FileReader();
                reader.readAsDataURL(this.uploadData);
                reader.onload = (e) => {
                    this.uploadImg = reader.result;
                    // this.playerData.url = reader.result;
                }
                this.upload();
            },
             getObjectURL(file) {       // 获取blod url地址
                let url = null;
                if (window.createObjcectURL != undefined) {
                    url = window.createOjcectURL(file);
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;
            },
            addVideo (e) {
                this.filePathv = e.target.value;
                // this.playerData.url = this.getObjectURL(e.target.files[0]);
                this.playerData.fileType = 1;
                this.uploadData = e.target.files[0];
                this.loadVideo = true;
                this.upload();
            },
            upload () {
                this.$loading();
                let data = new FormData();
                let fileType = this.loadVideo ? 1 : 2;
                data.append('file', this.uploadData);
                // data.append('title', this.uploadTitle);
                // data.append('id', this.playerData.id);
                data.append('fileType', fileType);
                this.http.post('./biz/ybk/upload', data)
                .then((res) => {
                    this.$loading.end();
                   this.loadVideo ? this.previewPlayerData.url = res.data : this.uploadImg = res.data;
                })
                .catch((err)=> {
                    this.$loading.end();
                });
            },
            updated () {
                this.$loading();
                let data = {
                    id: this.playerData.id,
                    url: this.loadVideo ? this.previewPlayerData.url : this.uploadImg,
                    title: this.uploadTitle,
                    streamType: '1',
                    fileType: this.loadVideo ? 1 : 2,
                };
                this.http.post('./biz/ybk/setChannelInfo', data)
                .then((res) => {
                    this.$loading.end();
                    this.dialogVisible = false;
                    this.playerData.url = this.loadVideo ? this.previewPlayerData.url : this.uploadImg;
                    this.playerData.title = this.uploadTitle;
                    this.$store.dispatch('changeSettingStatus', 0);
                })
                .catch((err)=> {
                    this.$loading.end();
                });
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
    height: 117%;
    border: 1px solid #FF0000;
    pointer-events: none;
    z-index: 100;
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
.bor-2-g::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 99%;
    height: 117%;
    border: 1px solid #00FF00;
    pointer-events: none;
    z-index: 100;
}
.video-player-con {
    background-color: #2b2b2b;
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
        background-color: #2b2b2b;
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
    background-color: #2b2b2b;
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
            background-color: #0a0a0a;
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
    background-image: linear-gradient(-1deg, rgba(28,48, 83, 0.5) 0%, rgba(45,83,132,0.5) 60%);
    height: 30px;
    line-height: 30px;
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
            width: 10px;
            height: 10px;
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
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .file-z {
                height: 40px;
                line-height: 40px;
                width: 65%;
                font-size: 18px;
                color: #4A4A4A;
                background-color: #fff;
            }
            input {
                height: 40px;
                line-height: 40px;
                width: 80px;
                font-size: 18px;
                color: #4A4A4A;
                padding-left: 5px;
                outline: none;
                opacity: 0;
                margin-left: 35px;
            }
            span{
                margin-left: 30px;
                font-size: 18px;
                color: #fff;
                padding: 5px 15px;
                border-radius: 6px;
                background: #333333;
                cursor: pointer;
                position: absolute;
                left: 68%;
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
            position: relative;
            input {
                opacity: 0;
                width: 80px;
                height: 40px;
                margin-left: 35px;
            }
            .detail-con {
                width: 65%;
                height: 40px;
                line-height: 40px;
                background-color: #fff;
                font-size: 18px;
                color: #4A4A4A;
                padding-left: 15px;
            }
            span {
                background: #333333;
                border-radius: 6px;
                padding: 5px 15px; 
                cursor: pointer;
                margin-left: 30px;
                font-size: 18px;
                position: absolute;
                left: 68%;
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



