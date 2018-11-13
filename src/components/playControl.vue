<template>
    <div class="play-control-wrap">
        <div class="edit-video-left-tile">播控区</div>
        <div class="play-container">
            <div class="play-con-top">
                <div class="bt" @click="selectedShim">应急<br>切换</div>
            </div>
            <div class="play-con-bottom">
                <span class="tips" :class="showTips ? 'tips-active' : ''">切换成功</span>
                <el-slider class="slider-input"
                v-model="sliderValue"
                vertical
                @change="changeRange"
                :show-tooltip="false"
                height="150px">
                </el-slider>
                <el-checkbox @change="changeSync" v-model="isSync">音视频同步切换</el-checkbox>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'PlayControl',
        data () {
            return {
                isSync: true,
                sliderValue: 0,
                showTips: false,
                ybkId: this.$router.history.current.query.id
            }
        },
        mounted () {
            
        },
        computed: {
            sync () {
                return this.$store.state.playSync
            }
        },
        methods: {
            changeSync (sync) {
                this.http.post('./biz/ybk/setAudioVedioSync', {id:this.$store.state.ybkId,sync: Number(this.isSync)})
                    .then((res)=> {
                        if(res.code == 200) {
                            this.$store.dispatch('changePlaySync', this.isSync);
                        }
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
            },
            changeRange (num) {
                if (num > 0) {
                   if (num === 100) {
                        let pvwObj = {
                            id: 0,
                            title: '',
                            playerId: 0,
                        };
                        this.showTips = true;
                        let playList = this.$store.state.playerListStatus;
                        playList.forEach(e => {
                            if (e.isPvw == 1) {
                                pvwObj.id = e.id;
                                pvwObj.title = e.title;
                                pvwObj.playerId = e.playerId;
                            }
                        });
                        let sync = Number(this.$store.state.playSync);
                        this.http.post('./biz/ybk/switch2PGM', {"id": pvwObj.id,sync: sync})
                        .then((response) => {
                            this.$store.dispatch('changePgm', pvwObj);
                            // this.playerData.isPgm = 1;
                            let tempObj = {
                                id: pvwObj.playerId,
                                type: 1,
                                index: pvwObj.id,
                            };
                            this.$store.dispatch('changepvwpgm', tempObj);
                            this.sliderValue = 0;
                            setTimeout(()=>{
                                this.showTips = false;
                            },2000);
                        })
                        .catch((error) => {

                        });
                   }
                }
            },
            selectedShim () {
                let data = {
                    id: this.ybkId,
                    opt: "1",
                };
                this.http.post('./biz/ybk/switch2EMG', data)
                .then((res) => {
                    if (res.code === 200) {
                        this.$alert('切换成功！', '切换成功', {
                            confirmButtonText: '确定',
                            callback: ()=>{}
                        })
                    } else {
                        this.$alert('切换至垫片失败，请稍后重试！', '切换失败', {
                            confirmButtonText: '确定',
                            callback: ()=>{}
                        })
                    }
                })
                .catch((err)=> {
                    this.$alert('切换至垫片失败，请稍后重试！', '切换失败', {
                        confirmButtonText: '确定',
                        callback: ()=>{}
                    })
                });
            }
        },
        watch: {
           sync () {
              this.isSync =  this.sync;
           } 
        }
    }
</script>
<style lang="scss" scoped>
    .play-control-wrap {
        overflow: hidden;
        border-radius: 15px;
        margin-top: 5px;
        background: #1E2124;
        .edit-video-left-tile {
            position: relative;
            height: 35px;
            line-height: 35px;
            background-image: linear-gradient(-180deg, #393737 0%, #1E1C1C 100%);
            color: #fff;
            font-size: 18px;
        }
        .play-container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            flex-grow: 1;
            flex-direction: row;
            height: 287px;
            .play-con-top {
                position: relative;
                width: 55%;
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(56,57,57,0.9);
                .bt {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    word-break: break-all;
                    padding: 15px;
                    overflow: hidden;
                    color: #fff;
                    font-size: 16px;
                    cursor: pointer;
                    moz-user-select: -moz-none; 
                    -moz-user-select: none; 
                    -o-user-select:none; 
                    -khtml-user-select:none; 
                    -webkit-user-select:none; 
                    -ms-user-select:none; 
                    user-select:none;
                    background: url('../assets/select.png') no-repeat center;
                    background-size: contain;
                }
            }
            .play-con-bottom {
                flex-grow: 1;
                margin-left: 2px;
                display: flex;
                width: 50%;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                background-color: rgba(56,57,57,0.8);
                position: relative;
                .tips {
                    position: absolute;
                    right: -100%;
                    top: 12px;
                    color: #fff;
                    transition: right .2s ease;
                }
                .tips-active {
                    right: 20px;
                }
                .slider-input {
                    margin-bottom: 30px;
                }
            }
        }
    }
</style>
<style>
    /* .play-con-bottom .el-checkbox__input .el-checkbox__inner {
        background-color: #6ADD24 !important;
        border-color: #6ADD24 !important;
    } */
    .play-con-bottom .el-checkbox__label {
        color: #fff !important;
    } 
    .play-con-bottom .el-slider__button {
        border: 0 !important;
        border-radius: 3px !important;
        width: 41px !important;
        height: 26px !important;
        background: url('../assets/slider.png') no-repeat center !important;
    }
    .play-con-bottom .el-slider__button.dragging, .el-slider__button.hover, .el-slider__button:hover {
        transform: scale(1.1) !important;
    }
    .play-con-bottom .el-slider__runway {
        background: rgba(0,0,0,0.5) !important;
    }
    .play-con-bottom .el-slider__bar {
        background: #6ADD24 !important;
    }
</style>



