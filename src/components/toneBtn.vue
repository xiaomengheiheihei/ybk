<template>
    <div class="tone-btn-wrap" :class="l ? 'tone-btn-wrap-s' : '' || vols.isMute === 0 || settingMute? 'bor-1-r': ''" @dblclick="switchVol" >
        <div class="tone-btn-top">{{ title }}</div>
        <div class="tone-btn-con">
            <div class="tone-btn-container">
                <input v-if="index < 13 || index == 14" ref="volRange" 
                type="range" @input="changeVol" max="1" min="0" step="0.1" name="" id="" :value="isMuted" :disabled = disabled>
                <input v-if="index == 13" ref="volRange" type="range" @input="changeVol" max="1" min="0" step="0.1" name="" id="" :value="vols.vol">
            </div>
            <div class="tone-btn-bottom">
                <p class="void-icon" v-if="index < 13 || index == 14" :class="(isMuted === 0 || vols.vol == 0) ? 'void-icon-ss' : ''" @click="isMute"></p>
                <p class="void-icon" v-if="index == 13" :class="vols.vol == 0 ? 'void-icon-ss' : ''" @click="isMute"></p>
                <p v-if="index != 13" class="void-icon-s" :class="vols.isListening ? 'void-icon-star' : '' " @click="tryListen"></p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Mixer',
        data () {
            return {
                lastVol: 0,
                settingMute: false,
            }
        },
        props: {
            l: Boolean,
            title: String,
            index: Number,
        },
        computed: {
           volRange () {
               return this.$refs.volRange;
           },
           vols () {
               return this.$store.getters.getPlayerListStatus(this.index);
           },
           isPgm () {
               return this.$store.getters.getPlayerListStatus(this.index).isPgm;
           },
           isMuted () {
               return this.vols.isMute === 1 ? 0 : this.vols.vol;
           },
           changeSync () {
               return this.$store.getters.getPlaySync;
           },
           disabled () {
               return (this.isPgm === 1 && this.changeSync ? false : true) &&
               (this.vols.isMute === 0 && !this.changeSync ? false : true);
           },
        },
        mounted () {
           
        },
        methods: {
            changeVol () {
                if (this.index === 13) {
                    let obj = {index: this.index, vol: this.volRange.value};
                    this.$store.dispatch("changeVol", obj);
                } else if(!this.vols.isListening) {
                    let req = {
                        id: this.vols.playerId,
                        volume: this.volRange.value
                    }
                    this.http.post('./biz/ybk/setVolume', req)
                    .then((res)=> {
                        if(res.code === 0) {
                            this.$message({
                                message: '修改音量成功！',
                                type: 'success'
                            });
                        }
                        let obj = {index: this.index, vol: this.volRange.value};
                    this.$store.dispatch("changeVol", obj);
                    })
                    .catch((err) => {
                        this.$message.error('修改音量失败，请重试！');
                    });
                }
            },
            tryListen () {  // 试听
                if (this. vols.status && !this.vols.isListening) {
                    this.lastVol = this.volRange.value;
                    this.vols.vol = 1;
                    this.vols.isListening = !this.vols.isListening;
                } else if (this. vols.status) {
                    this.vols.vol = this.lastVol;
                    this.vols.isListening = !this.vols.isListening;
                }
            },
            isMute () {
                if (this.isMuted === 0) {   // 取消静音
                    this.http.post('./biz/ybk/setMute', {id:this.vols.playerId,mute: 0})
                    .then((res)=> {
                        if(res.code == 0) {
                            let obj = {
                                id: this.vols.playerId,
                                type: 'mute'
                            }
                            this.$store.dispatch('changemute', obj);
                            this.settingMute = false;
                        }
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
                } else {
                    this.http.post('./biz/ybk/setMute', {id:this.vols.playerId,mute: 1})
                    .then((res)=> {
                        if(res.code == 0) {
                            let obj = {
                                id: this.vols.playerId,
                                type: 'mute'
                            }
                            this.$store.dispatch('changemute', obj);
                            this.settingMute = true;
                        }
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
                }
                if (this.vols.vol != 0) {
                    this.lastVol = this.volRange.value;
                    this.vols.vol = 0;
                } else {
                    this.vols.vol = this.lastVol
                }
            },
            switchVol () {      // 双击切换音频输出
                if (this.vols.url === '') {return false}        // 如果音频不存在
                if (this.vols.id === 13) {return false}
                if (this.changeSync) {      // 音视频同步切换
                    let sync = Number(this.$store.state.playSync);
                    this.http.post('./biz/ybk/switch2PGM', {"id": this.vols.playerId,sync: sync})
                    .then((response) => {
                        this.$store.dispatch('changePgm', this.vols);
                        this.vols.isPgm = 1;
                        let tempObj = {
                            id: this.vols.playerId,
                            type: 1,
                            index: this.vols.id,
                        };
                        this.$store.dispatch('changepvwpgm', tempObj);
                    })
                    .catch((error) => {

                    });
                } else {                    // 音视频可不同步切换，选中后其他路静音
                    let sync = Number(this.$store.state.playSync);
                    this.http.post('./biz/ybk/setMute', {id:this.vols.playerId,mute: 0,sync: sync})
                    .then((res)=> {
                        if(res.code == 0) {
                            let obj = {
                                id: this.vols.playerId,
                                type: 'switch'
                            }
                            this.$store.dispatch('changemute', obj);
                        }
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .bor-1-r {
        border: 1px solid red;
    }
    .tone-btn-wrap {
        position: relative;
        width: 35px;
        height: 160px;
        background: #D8D8D8;
        border-radius: 10px;
        margin-left: 10px;
        overflow: hidden;
        box-sizing: border-box;
        .tone-btn-top {
            height: 25px;
            background: #3B3C3E;
            color: #FFF;
            line-height: 25px;
        }
        float: left;
        .tone-btn-con {
            .tone-btn-container {
                background: url('../assets/scale.png') no-repeat left center;
                background-size: contain;
                height: 80px;
                margin-top: 15px;
                input {
                    transform: rotate(-90deg) translateY(-50%);
                    transform-origin: 0 0;
                    width: 82px;
                    position: absolute;
                    bottom: 35px;
                    left: 50%;
                    margin: auto;
                }
                input[type=range] {
                    -webkit-appearance: none;
                    outline: none;
                    background:  rgb(139, 145, 150);
                    border-radius: 5px;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                }  
                ::-webkit-slider-runnable-track {
                    background:  rgb(139, 145, 150);
                    height: 4px;
                    border-radius: 5px;
                }
                ::-webkit-slider-thumb {
                    width: 15px;
                    height: 15px;
                    border: 3px solid #BEBCBC;
                    border-radius: 100%;
                    background-color: #717070;
                    transform: translateY(-32%);
                    margin-top: -1px;
                    // box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
                }
            }
            .tone-btn-bottom {
                p {
                    position: absolute;
                    bottom: 7px;
                    left: 50%;
                    width: 10px;
                    height: 12px;
                    transform: translateX(-50%);
                }
                .void-icon {
                    background: url('../assets/void-start.png') no-repeat center;
                    background-size: contain;
                }
                .void-icon-ss {
                    background: url('../assets/void-end.png') no-repeat left center;
                    background-size: 70%;
                }    
                .void-icon-s {
                    bottom: -7px;
                    background: url('../assets/er.png') no-repeat center; 
                    background-size: contain; 
                }
                .void-icon-star {
                    background: url('../assets/er-s.png') no-repeat center; 
                    background-size: contain; 
                }
            }
        }
    }
    .tone-btn-wrap-s {
        width: 35px;
    }
</style>


