<template>
    <div class="edit-video-wrap" v-if="resData !== null">
        <div class="edit-video-container">
            <div class="edit-video-top">
                <div class="edit-video-top-con">
                    <div class="edit-top-left">
                        <div class="qn-logo">
                            <a class="clear" href="#"><img src="../assets/logo.png" alt="七牛云"></a>
                        </div>
                        <span class="edit-title clear">智能播控</span>
                    </div>
                    <div class="edit-top-right">
                        <div class="edit-top-save-time">剩余时长：<span>
                            <count-down :endTime="parseExpressDate.toString()" :callback="cutdown"  endText="已经结束了"></count-down>
                        </span></div>
                        <div class="edit-top-icon-con">
                            <span class="edit-add">续期</span>
                            <span class="edit-lock" :class="{'edit-lock-f' : !isLock}" @click="changeLock"></span>
                            <span class="edit-setting-ico" @click="settingOutput"></span>
                        </div>
                    </div>
                </div>
                <div class="edit-top-time">
                    {{ date.day }}<span class="week">{{ date.week }}</span><span class="time">{{ date.time }}</span>
                    <span class="edit-start-btn"></span>
                </div>
            </div>
            <el-row class="edit-video-con">
                <el-col :span="12">
                    <div class="edit-video-left-con">
                        <div class="edit-video-left-tile">视频矩阵
                            <span class="add" @click="addFlashVideo">
                                <a href="javascript:;" style="display: block;width:100%;height:100%" title="添加直播源"></a>
                            </span>
                            <span class="add01" @click="addH5Video">
                                <a href="javascript:;" style="display: block;width:100%;height:100%" title="添加本地视频"></a>
                            </span>
                            <span class="setting" @click="settingVideo">
                                <a href="javascript:;" style="display: block;width:100%;height:100%" title="编辑视频"></a>
                            </span>
                        </div>
                        <el-row class="video-item-live">
                            <el-col :span="6" v-for="(item, index) in playerDataList" :key="index" 
                                    :style="index < 4 ? {marginBottom: '1px'} : {}"
                                    >
                                <Flash  :isLive= 1
                                        :playerData= item
                                        :isAdd = true
                                        :isBlank = false
                                        :isSetting = "settingStatus"
                                        :height = '110'
                                        ref="flashPlayer"
                                        v-if="(playerDataList.find(i => i.url === '')) ? playerDataList.find(i => i.url === '').id === item.id : ''">
                                </Flash>
                                <Flash  :isLive= 1
                                        :playerData= item
                                        :isAdd = false
                                        :isBlank = false
                                        :height = '110'
                                        ref="flashPlayer"
                                        :isSetting = "settingStatus"
                                        v-else>
                                </Flash>
                            </el-col>
                            
                        </el-row>
                        <el-row class="video-item-live">
                            <el-col :span="6" v-for="(item, index) in localPlayerData" :key="index">
                                <Player :isLive = 0
                                        :playerData=item
                                        :isAdd = true
                                        :isBlank = false
                                        :isSetting = "settingStatus"
                                        ref="h5Player"
                                        v-if="(localPlayerData.find(i => i.url === '')) ? localPlayerData.find(i => i.url === '').id === item.id : ''">
                                </Player>
                                <Player :isLive = 0
                                        :playerData=item
                                        :isAdd = false
                                        :isSetting = "settingStatus"
                                        :isBlank = false
                                        ref="h5Player"
                                        v-else>
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
                    <!-- <Mixer></Mixer> -->
                    <ResourceCenter></ResourceCenter>
                </el-col>
                <el-col :span="12">
                    <div class="edit-video-right-con">
                        <!-- <Preview v-if="pvw && pgm" :pvwData="pvw" :pgmData="pgm"></Preview> -->
                        <Preview></Preview>
                        <el-row>
                            <el-col :span="12">
                                <Effect></Effect>
                            </el-col>
                            <el-col :span="12">
                                <PlayControl></PlayControl>
                            </el-col> 
                        </el-row>
                        <!-- <el-row>
                            <el-col :span="24">
                            </el-col>
                        </el-row> -->
                        <Mixer></Mixer>
                    </div>
                </el-col>
            </el-row>
        </div>
         <el-dialog
            :visible.sync="dialogVisible"
            width="50%"
            :show-close="false"
            >
            <div slot="title" class="title">
                输出设置
                <span @click="dialogVisible = false">关闭</span>
            </div>
            <div class="content">
               <div class="live-setting-wrap">
                   <h3>直播流设置</h3>
                   <div class="output-dpi">
                       <span>输出分辨率：</span>
                       <span class="dpi" v-if="resData">{{resData.resolution.toUpperCase()}}</span>
                   </div>
                   <div><el-radio v-model="pullRadio" label="1">固定地址</el-radio></div>
                   <div class="address-wrap" v-if="pullRadio == 1">
                        <div class="address-con" :copyData = "resData.pgm.url">{{resData.onairUrl}}</div>
                        <span class="copy-btn" 
                            v-clipboard:copy="resData.pgm.url" 
                            v-clipboard:success="onCopy" 
                            v-clipboard:error="onError">
                            复制
                        </span>
                   </div>
                   <div :style="{margin: '20px 0'}"><el-radio v-model="pullRadio" label="0">自定义地址</el-radio></div>
                   <div class="push-wrap" v-if="pullRadio==0">
                       <input type="text" name="" v-model="pushUrl" id="" placeholder="请输入推流地址"> <span>添加</span>
                   </div>
               </div>
               <div class="shim-setting clear">
                   <h3>垫片设置</h3>
                   <div class="shim-left">
                        <el-radio v-model="imgRadio" label="1">图片</el-radio>
                        <div class="shim-img-no">无<img v-if="shimImg" :src="shimImg" ></div>
                        <span>{{shimImg ? '修改':'上传'}}</span>
                        <input @input="addImage" type="file" name="" accept="image/png,image/bmp,image/jpg" id="uploadImg">
                   </div>
                   <div class="shim-right">
                        <el-radio v-model="imgRadio" label="2">视频</el-radio>
                        <div class="shim-img-no"><span v-if="shimPlayerData.url === ''">无</span>
                            <Player v-if="shimPlayerData.url != ''" :isLive = 0
                                    :playerData= shimPlayerData
                                    :isAdd = false
                                    :isBlank = false>
                            </Player> 
                        </div>
                        <div class="video-info" :style="shimPlayerData.url != '' ? {visibility: 'visible'} : {visibility: 'hidden'}">
                            <div class="name"><span>名称：</span><span></span></div>
                            <div class="time"><span>时长：</span><span></span></div>
                        </div>
                        <span>上传</span>
                        <input @input="addVideo" type="file" accept="video/mp4,video/ogg,video/flv" name="" id="uploadVideo">
                   </div>
               </div>
               <div class="delay-setting">
                   <h3>延时设置</h3>
                   <div class="delay-con"><span class="text">延时量：</span><input v-model="delayTime" type="text">秒</div>
               </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
                <el-button class="add-btn" type="primary" @click="addShim">确 定</el-button>
            </span>
        </el-dialog>
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
    import Flash from '@/components/playerFlash.vue'
    import countDown from '@/components/cutDown.vue'
    import { Loading } from 'element-ui'
    export default {
        name: 'editVideo',
        data () {
            return {
                playerDataList: [],
                localPlayerData: [],
                isLock: true,
                date: {
                    day: '',
                    week: '',
                    time: '',
                },
                dialogVisible: false,
                pullRadio: "0",
                imgRadio: "1",
                shimImg: '',    // 垫片图片
                shimPlayerData: {
                    title: 'test',
                    url: '',
                    seqNo: 16,
                    fileType: 1,
                },       // 垫片视频信息
                delayTime: 30,          // 延时设置
                uploadData: null,           // 上传数据
                loadVideo:false,        // 上传是否为视频
                resData: null,
                url: window.location.href,
                pushUrl: '',
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
            Flash,
            countDown
        },
        computed: {
            settingStatus () {
                return this.$store.state.settingStatus;
            },
            flashPlayer () {
                return this.$refs.flashPlayer;
            },
            h5Player () {
                return this.$refs.h5Player;
            },
            parseExpressDate () {
                if (!!this.resData.expireTime) {
                    let date = new Date(this.resData.expireTime.replace(/-/g, '/'));
                    return date.getTime()
                }
            }
        },
        beforeCreate () {
            this.loadingInstance = Loading.service({ fullscreen: true });
            // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            //     loadingInstance.close();
            // });
        },
        created () {
            this.http.get('/biz/ybkBase/' + this.$router.history.current.query.id , {})
            .then((response) => {
               if (response.code === 200) {
                    // 保存音视频同步与否状态
                let isSync = response.data.isSync === 1 ? true : false;  
                this.$store.dispatch('changePlaySync', isSync);
                this.$store.dispatch('addYbkId', response.data.id);
                // 组装store所需信息
                this.createStorePlayList(response.data.lives);
                this.createStorePlayList(response.data.locals, true);
                this.createStorePlayList(response.data.emergencys);
                this.playerDataList = response.data.lives;
                this.localPlayerData = response.data.locals;
                this.$store.dispatch('addplayerdata', this.playerDataList.concat(this.localPlayerData).concat(response.data.emergencys));
                this.$store.dispatch('addMutis', response.data.mutis);
                // this.pvwData(response.data.lives.concat(response.data.locals), response.data);
                response.data.pgm.isPgm = 1;
                response.data.pgm.volume = 0.5;
                this.$store.dispatch('addPgm', response.data.pgm);
                response.data.pvw.isPvw = 1;
                this.$store.dispatch('addPvw', response.data.pvw);
                this.addPgm(response.data.pgm);
                this.addDubbing();
                // 保存视窗效果信息
                // this.mutis = this.mutis.concat(response.data.mutis);
                this.resData = response.data;
                this.pullRadio = this.resData.streamType.toString();
                this.delayTime = this.resData.delay;
                // 垫片信息有则回显
                for (let item of response.data.emergencys) {
                    if (item.fileType === 2) {
                        this.shimImg = item.url;
                    } else {
                        this.shimPlayerData.url = item.url;
                    }
                }
               } else {
                   this.$message.error(response.message);
                   this.$router.push({path: '/setting'})
               }
               this.loadingInstance.close();
            })
            .catch((error) => {
                this.$message.error('网络连接失败，请稍后重试！')
                this.loadingInstance.close();
            });
        },
        mounted () {
            this.$nextTick(() => {
                setInterval(this.getNowDate, 1000);
            });
        },
        methods: {
            changeLock (event) {
                this.isLock = !this.isLock;
                document.body.appendChild(document.createElement('div'))
            },
            getNowDate () {
                let date = new Date();
                let sign = ":";
                let year = date.getFullYear() // 年
                let month = date.getMonth() + 1; // 月
                let day  = date.getDate(); // 日
                let hour = date.getHours(); // 时
                let minutes = date.getMinutes(); // 分
                let seconds = date.getSeconds() //秒
                let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
                let week = weekArr[date.getDay()-1];
                // 给一位数数据前面加 “0”
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (day >= 0 && day <= 9) {
                    day = "0" + day;
                }
                if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
                }
                if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
                }
                if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
                }
                this.date =  {
                    day: year + '年' + month + '月' + day + '日',
                    week: week,
                    time: hour + sign + minutes + sign + seconds,
                }
            },
            cutdown () {
                alert('结束')
            },
            createStorePlayList (original, islocal = false) {
                for (let i = 0; i < original.length; i++) {
                    let obj = {};
                    if (original[i].seqNo > 11) {
                        obj.id = original[i].seqNo + 3;
                    } else if (original[i].seqNo <= 11) {
                        obj.id = original[i].seqNo + 1;
                    }
                    islocal ? obj.status = false : obj.status = true;
                    obj.isListening = false;
                    obj.playerId = original[i].id;
                    obj.vol = original[i].volume;
                    obj.title = original[i].title;
                    obj.isPvw = original[i].isPvw;
                    obj.isPgm = original[i].isPgm;
                    obj.url = original[i].url;
                    obj.isMute = original[i].isMute;
                    this.$store.dispatch('addPlayList', obj);
                }
            },
            addPgm (pgm) {
                let obj = {};
                obj.id = 13;
                obj.status = false;
                obj.vol = pgm.volume;
                obj.title = pgm.title;
                obj.isPvw = '0';
                obj.isPgm = '0';
                obj.pgmId = pgm.pgmId;
                obj.isListening = false;
                obj.url = pgm.url;
                obj.isMute = 1;
                this.$store.dispatch('addPlayList', obj);
            },
            addDubbing () {
                let obj = {};
                obj.id = 14,
                obj.status = false;
                obj.vol = 0;
                obj.title = '配音';
                obj.isPvw = 0;
                obj.isPgm = 0;
                obj.isListening = false;
                obj.isMute = 1;
                obj.url = '';
                this.$store.dispatch('addPlayList', obj);
            },
            settingVideo () {           // 修改或删除视频矩阵
                this.$store.dispatch('changeSettingStatus', 1);
            },
            settingOutput () {          // 设置垫片和输出
                this.dialogVisible = true;
            },
            addImage (e) {          // 上传垫片图片
                this.uploadData = e.target.files[0];
                this.loadVideo = false;
                let reader = new FileReader();
                reader.readAsDataURL(this.uploadData);
                reader.onload = (e) => {
                    this.shimImg = reader.result;
                }
                this.uploaded();
            },
            addVideo (e) {          // 上传垫钱视频
                this.uploadData = e.target.files[0];
                this.loadVideo = true;
                this.uploaded();
            },
            uploaded () {          // 上传垫钱视频
                this.$loading();
                let data = new FormData();
                data.append('file', this.uploadData);
                this.http.post('./biz/ybk/upload', data)
                .then((res) => {
                    this.$loading.end();
                    this.loadVideo ? this.shimPlayerData.url = res.data : this.shimImg = res.data;
                })
                .catch((err)=> {
                    this.$loading.end();
                });
            },
            addShim () {
                this.$loading();
                let data = {
                    ybkId: this.resData.id,
                    streamType: Number(this.pullRadio),
                    onairUrl: this.pushUrl,
                    imgChnUrl: this.imgRadio == 1 ? this.shimImg : '',
                    vedChnUrl: this.imgRadio == 1 ? '' : this.shimPlayerData.url,
                    emergency: this.imgRadio == 1 ? this.resData.emergencys.find(i => i.fileType === 2 ).id :
                    this.resData.emergencys.find(i => i.fileType === 1 ).id,
                    delay: parseInt(this.delayTime),
                    vedChnId:this.resData.emergencys.find(i => i.fileType === 1 ).id,
                    imgChnId: this.resData.emergencys.find(i => i.fileType === 2 ).id,
                }
                this.http.post('./biz/ybk/setOutputInfo', data)
                .then((res) => {
                    this.$loading.end();
                    this.loadVideo ? this.shimPlayerData.url = res.data : this.shimImg = res.data;
                    this.dialogVisible = false;
                })
                .catch((err)=> {
                    this.$loading.end();
                });
            },
            addFlashVideo () {
                let id = 0;
                for (let item of this.flashPlayer) {
                    if (item.playerData.url === '') {
                        item.dialogVisible = true;
                        break;
                    }
                }
            },
            addH5Video () {
               for (let item of this.h5Player) {
                    if (item.playerData.url === '') {
                        item.dialogVisible = true;
                        break;
                    }
                } 
            },
            onCopy: function (e) {
                this.$alert('地址已复制到您的剪切板！', '复制成功', {
                    confirmButtonText: '确定',
                    callback: ()=>{}
                })
            },
            onError: function (e) {
                this.$alert('复制到剪切板失败，请稍后重试！', '复制失败', {
                    confirmButtonText: '确定',
                    callback: ()=>{}
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .edit-video-wrap {
        .clear::after {
            content: '';
            display: block;
            clear: both;
        }
        width: 100%;
        width: 1600px;
        height: 900px;
        position: relative;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        margin: 0 auto;
        background-color: #505050;
        .edit-video-container {
            position: relative;
            .edit-video-top {
                background-image: linear-gradient(-180deg, #393737 0%, #1E1C1C 100%);
                // margin: 0 10px;
                color: #fff;
                .edit-video-top-con {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    .edit-top-left {
                        overflow: hidden;
                        height: 45px;
                        padding-left: 20px;
                        width: 50%;
                        a {
                            float: left;
                            height: 45px;
                            img {
                                height: 80%;
                                margin-top: 4px;
                            }
                        }
                        span {
                            float: left;
                            line-height: 60px;
                            margin-left: 10px;
                            font-size: 24px;
                            box-sizing: border-box;
                        }
                    }
                    .edit-top-right {
                        position: relative;
                        overflow: hidden;
                        height: 45px;
                        width: 50%;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        .edit-top-save-time {
                            margin-right: 30px;
                            font-size: 20px;
                            line-height: 45px;
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
                                margin: 3px 30px 0 27px;
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
                                margin-top: 3px;
                            }
                        }
                    }
                }
                .edit-top-time {
                    position: relative;
                    clear: both;
                    height: 45px;
                    line-height: 45px;
                    color: #0BE235;
                    background-image: linear-gradient(-180deg, rgba(57,55,55,0.7) 0%, rgba(30,28,28,0.7) 100%);
                    font-size: 24px;
                    font-weight: bold;
                    .week {
                        padding: 0 10px;
                    }
                    .edit-start-btn {
                        position: absolute;
                        right: 20px;
                        top: 50%;
                        transform: translate3d(0, -50%, 0);
                        width: 36px;
                        height: 36px;
                        background: url('../assets/play_btn.png') no-repeat center 100%;
                        background-size: contain;
                    }
                }
            }
        }
        .edit-video-con {
            // margin: 0 10px;
            .edit-video-left-con {
                background-color: #1E2124;
                border-radius: 20px;
                margin-top: 2px;
                overflow: hidden;
                margin-right: 5px;
                .edit-video-left-tile {
                    font-size: 20px;
                    position: relative;
                    color: #fff;
                    height: 35px;
                    line-height: 35px;
                    background-image: linear-gradient(-180deg, #393737 0%, #1E1C1C 100%);
                    .setting {
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        transform: translate3d(0, -50%, 0);
                        width: 22px;
                        height: 22px;
                        background: url('../assets/setting02.png') no-repeat center;
                        background-size: contain;
                    }
                    .add { 
                        position: absolute;
                        right: 67px;
                        top: 50%;
                        transform: translate3d(0, -50%, 0);
                        width: 22px;
                        height: 22px;
                        background: url('../assets/addVideo.png') no-repeat center 100%;  
                    }
                    .add01 {
                        position: absolute;
                        right: 37px;
                        top: 50%;
                        transform: translate3d(0, -50%, 0);
                        width: 22px;
                        height: 22px;
                        background: url('../assets/addFile.png') no-repeat center 100%;
                    }
                    span {
                        cursor: pointer;
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
        .content {
            color: #fff;
            text-align: left;
            padding: 20px;
            .live-setting-wrap {
                position: relative;
                padding: 20px;
                padding-top: 10px;
                border: 1px solid rgb(85, 84, 84);
                margin-bottom: 30px;
                h3 {
                    position: absolute;
                    top: -6%;
                    left: 30px;
                    background-color: #6A6B6D;
                    margin: 0;
                    padding: 0 10px;
                }
                .output-dpi {
                    margin: 15px 0;
                    .dpi {
                        padding: 2px 10px;
                        border-radius: 4px;
                        background-color: rgb(68, 70, 68);
                    }
                }
                .address-wrap {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin: 10px 0 0 0;
                    .address-con {
                        width: 70%;
                        border: 1px solid #ccc;
                        padding: 10px 20px;
                        word-break: break-all;
                    }
                    span {
                        padding: 5px 20px;
                        background-color: #332e2e;
                        border-radius: 5px;
                        margin-left: 30px;
                        cursor: pointer;
                    }
                }
                .el-radio {
                    color: #fff;
                }
                .push-wrap {
                    input {
                        appearance: none;
                        border: 1px solid #ccc;
                        height: 30px;
                        padding-left: 10px;
                        outline: none;
                        width: 60%;
                        margin-right: 20px;
                    }
                    span {
                        padding: 3px 10px;
                        background-color: #332e2e;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                }
            }
            .shim-setting {
                position: relative;
                margin: 20px 0;
                padding: 20px;
                padding-top: 10px;
                border: 1px solid rgb(85, 84, 84);
                margin-bottom: 30px;
                h3 {
                    position: absolute;
                    top: -4%;
                    left: 30px;
                    background-color: #6A6B6D;
                    margin: 0;
                    padding: 0 10px;
                    clear: both;
                }
                .shim-left {
                    float: left;
                    width: 50%;
                    padding-top: 20px;
                    span {
                        position: absolute;
                        bottom: 25px;
                        left: 20px;
                        padding: 5px 20px;
                        border-radius: 4px;
                        background-color: #332e2e;
                        cursor: pointer;
                    }
                    #uploadImg {
                        position: absolute;
                        bottom: 25px;
                        opacity: 0;
                        width: 70px;
                        height: 30px;
                        z-index: 1000;
                    }
                }
                .shim-right {
                    float: left;
                    padding-top: 20px;
                    width: 50%;
                    >span {
                        padding: 5px 20px;
                        border-radius: 4px;
                        background-color: #332e2e;
                        cursor: pointer;
                    }
                    .video-info {
                        padding: 10px;
                        border: 1px solid rgb(94, 92, 92);
                        margin-bottom: 20px;
                        width: 240px;
                        box-sizing: border-box;
                    }
                    #uploadVideo {
                        position: relative;
                        bottom: 6px;
                        opacity: 0;
                        width: 70px;
                        height: 30px;
                        z-index: 1000;
                        left: -70px;
                    }
                }
                .shim-img-no {
                    width: 240px;
                    height: 135px;
                    line-height: 135px;
                    margin-top: 15px;
                    margin-bottom: 20px;
                    text-align: center;
                    background-color: rgb(51, 53, 54);
                    position: relative;
                    img {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        z-index: 1;
                    }
                }
                .el-radio {
                    color: #fff;
                }
            }
            .delay-setting {
                position: relative;
                margin: 20px 0;
                padding: 20px;
                padding-top: 10px;
                border: 1px solid rgb(85, 84, 84);
                h3 {
                    position: absolute;
                    top: -18%;
                    left: 30px;
                    background-color: #6A6B6D;
                    margin: 0;
                    padding: 0 10px;
                    clear: both;
                }
                .delay-con {
                    margin-top: 20px;
                    input {
                        width: 40px;
                        appearance: none;
                        border: 1px solid #ccc;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
</style>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>




