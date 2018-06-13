<template>
    <div class="qn-player">
        <div class="video-player-con" :class="isAdd ? 'video-player-con-n' : '' || isPreview ? 'video-player-con-l' : ''">
            <video v-show="!isAdd" preload="auto" height="100%" width="100%" 
            autoplay="autoplay" 
            :src="playerData.source"></video>
            <div v-if="isAdd && !isBlank" class="add-video">
                <div class="add-h"></div>
                <div class="add-d"></div>
            </div>
        </div>
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
        <div v-if="isLive != 1" class="slider-bar-wrap">
            <div class="contral-wrap">
                <div class="h01"></div>
                <div class="h02"></div>
            </div>
            <input type="range" value="0">
        </div>
    </div>
</template>
<script>
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
            }
        },
        data () {
            return {
                value1: true,
                value2: true
            }
        }
    }
</script>
<style lang="scss" scoped>
.video-player-con {
    position: relative;
    min-height: 100px;
    height: 100px;
    video {
        display: block;
        object-fit: fill;
        width: 100%;
        height: 100%;
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
    min-height: 250px;
    height: 250px;
}
.play-bar-wrap {
    text-align: left;
    font-size: 12px;
    color: #fff;
    padding: 3px 5px 0;
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
    height: 37px;
    line-height: 37px;
    padding: 0 5px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: #00FF00;
}
.play-bar-wrap-r {
    height: 37px;
    line-height: 37px;
    padding: 0 5px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: #FF0000;
}
.slider-bar-wrap {
    background: #1C2F43;
    height: 25px;
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
    }
    input[type=range] {
        -webkit-appearance: none;
        background-color: #fff;
        outline: none;
        vertical-align: bottom;
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }  
    ::-webkit-slider-runnable-track {
        border: 1px solid #fff;
        background: #fff;
        height: 1px;
    }
    ::-webkit-slider-thumb {
        background-color: #34538b;
        border: 3px solid #fff;
        width: 3px;
        border-radius: 50%;
        transform: translateY(-50%);
    }
}
.play-item-title {
    font-size: 14px;
}
</style>


