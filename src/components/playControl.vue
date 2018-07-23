<template>
    <div class="play-control-wrap">
        <div class="edit-video-left-tile">播控区</div>
        <div class="play-container">
            <div class="play-con-top">
                <div class="bt">应急<br>切换</div>
            </div>
            <div class="play-con-bottom">
                <el-slider class="slider-input"
                v-model="sliderValue"
                vertical
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
                        if(res.code == 0) {
                            this.$store.dispatch('changePlaySync', this.isSync);
                        }
                    })
                    .catch((err)=> {
                        console.log(err);
                    })
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
            height: 278px;
            background: rgb(34, 37, 41);
            .play-con-top {
                position: relative;
                width: 55%;
                flex-grow: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                .bt {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    word-break: break-all;
                    padding: 15px;
                    overflow: hidden;
                    color: #fff;
                    font-size: 16px;
                    background: #FF0000;
                    box-shadow: 3px 3px 40px #FF0000;
                    cursor: pointer;
                    moz-user-select: -moz-none; 
                    -moz-user-select: none; 
                    -o-user-select:none; 
                    -khtml-user-select:none; 
                    -webkit-user-select:none; 
                    -ms-user-select:none; 
                    user-select:none;
                }
            }
            .play-con-bottom {
                flex-grow: 1;
                border-left: 1px solid #4d4b4b;
                display: flex;
                width: 50%;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .slider-input {
                    margin-bottom: 30px;
                }
            }
        }
    }
</style>


