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
                    {{ date.day }}<span class="week">{{ date.week }}</span><span class="time">{{ date.time }}</span>
                    <span class="edit-start-btn"></span>
                </div>
            </div>
            <el-row class="edit-video-con">
                <el-col :span="12">
                    <div class="edit-video-left-con">
                        <div class="edit-video-left-tile">视频矩阵<span></span></div>
                        <el-row class="video-item-live">
                            <el-col :span="6" v-for="(item, index) in playerDataList" :key="index" 
                                    :style="index < 4 ? {marginBottom: '1px'} : {}"
                                    >
                                <Flash  :isLive= 1
                                        :playerData= item
                                        :isAdd = true
                                        :isBlank = false
                                        :height = '110'
                                        v-if="playerDataList.find(i => i.url === '').id === item.id">
                                </Flash>
                                <Flash  :isLive= 1
                                        :playerData= item
                                        :isAdd = false
                                        :isBlank = false
                                        :height = '110'
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
                                        v-if="localPlayerData.find(i => i.url === '').id === item.id">
                                </Player>
                                <Player :isLive = 0
                                        :playerData=item
                                        :isAdd = false
                                        :isBlank = false
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
                    <Mixer></Mixer>
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
    import Flash from '@/components/playerFlash.vue'
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
        },
        computed: {
            
        },
        beforeCreate () {
            // this.$loading({
            //     lock: true,
            //     text: '玩儿命加载中...',
            //     spinner: 'el-icon-loading',
            //     background: 'rgba(255, 255, 255, 1)'
            // });
        },
        created () {
            this.http.get('/biz/ybkBase/1', {})
            .then((response) => {
                // 组装store所需信息
                this.createStorePlayList(response.data.lives);
                this.createStorePlayList(response.data.locals, true);
                this.playerDataList = response.data.lives;
                this.localPlayerData = response.data.locals;
                this.$store.dispatch('addplayerdata', this.playerDataList.concat(this.localPlayerData));
                // this.pvwData(response.data.lives.concat(response.data.locals), response.data);
                response.data.pgm.isPgm = 1;
                response.data.pgm.volume = 0.5;
                this.$store.dispatch('addPgm', response.data.pgm);
                response.data.pvw.isPvw = 1;
                this.$store.dispatch('addPvw', response.data.pvw);
                this.addPgm(response.data.pgm);
                this.addDubbing();
            })
            .catch((error) => {
                console.error(error + '请求数据有误');
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
                let week = weekArr[date.getDay()];
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
            createStorePlayList (original, islocal = false) {
                for (let i = 0; i < original.length; i++) {
                    let obj = {};
                    islocal ? obj.id = original[i].seqNo + 8 : obj.id = original[i].seqNo;
                    islocal ? obj.status = false : obj.status = true;
                    obj.isListening = false;
                    obj.playerId = original[i].id;
                    obj.vol = original[i].volume;
                    obj.title = original[i].title;
                    obj.isPvw = original[i].isPvw;
                    obj.isPgm = original[i].isPgm;
                    obj.url = original[i].url;
                    this.$store.dispatch('addPlayList', obj);
                }
            },
            addPgm (pgm) {
                let obj = {};
                obj.id = 13,
                obj.status = false;
                obj.vol = pgm.volume;
                obj.title = pgm.title;
                obj.isPvw = '0';
                obj.isPgm = '0';
                obj.playerId = pgm.pgmId;
                obj.isListening = false;
                obj.url = pgm.url;
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
                obj.url = '';
                this.$store.dispatch('addPlayList', obj);
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
                        }
                        span {
                            float: left;
                            line-height: 45px;
                            margin-left: 20px;
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
                        justify-content: space-between;
                        align-items: center;
                        .edit-top-save-time {
                            padding-left: 15%;
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
                    height: 45px;
                    line-height: 45px;
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
            // margin: 0 10px;
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
                    height: 35px;
                    line-height: 35px;
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



