<template>
    <div class="clasp-wrap">
        <div class="edit-video-left-tile">抠像特效<span class="add"></span><span class="setting"></span></div>
        <!-- <div class="clasp-container">此功能需要权限</div> -->
        <div class="clasp-container">
            <div class="clasp-item">
                <div class="clasp-content"></div>
                <el-row class="play-bar-wrap">
                    <el-col :span="8">
                        {{15}}
                    </el-col>
                    <el-col :span="8" class="play-item-title">
                        FX1
                    </el-col>
                    <el-col :span="8" class="btn-wrap">
                        <div class="btn01 btn"></div>
                        <div class="btn02 btn"></div>
                        <div class="btn03 btn"></div>
                        <div class="btn04 btn"></div>
                    </el-col>
                </el-row>
            </div>
            <div class="clasp-item">
                <div class="clasp-content"></div>
                <el-row class="play-bar-wrap">
                    <el-col :span="8">
                        {{16}}
                    </el-col>
                    <el-col :span="8" class="play-item-title">
                        FX2
                    </el-col>
                    <el-col :span="8" class="btn-wrap">
                        <div class="btn01 btn single-grap"></div>
                        <div class="btn02 btn single-grap"></div>
                        <div class="btn03 btn single-grap"></div>
                        <div class="btn04 btn single-grap"></div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Clasp',
        data () {
            return {}
        }
    }
</script>
<style lang="scss" scoped>
    .clasp-wrap {
        margin-top: 3px;
        margin-right: 5px;
        .edit-video-left-tile {
            position: relative;
            height: 35px;
            line-height: 35px;
            background-image: linear-gradient(-180deg, #393737 0%, #1E1C1C 100%);
            color: #fff;
            font-size: 18px;
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            .setting {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translate3d(0, -50%, 0);
                width: 22px;
                height: 22px;
                background: url('../assets/setting02.png') no-repeat center 100%;
            }
            .add {
                position: absolute;
                right: 35px;
                top: 50%;
                transform: translate3d(0, -60%, 0);
                width: 22px;
                height: 22px;
                background: url('../assets/add.png') no-repeat center 100%; 
            }
            span {
                cursor: pointer;
            }
        }
        .clasp-container {
            height: 130px;
            background: #E1E1E1;
            text-align: center;
            line-height: 12vh;
            color: #B8B3B3;
            border-bottom-left-radius: 15px;
            border-bottom-right-radius: 15px;
            overflow: hidden;
            .clasp-item {
                float: left;
                width: 50%;
                background: #2B2B2B;
                box-sizing: border-box;
                .clasp-content {
                    height: 110px;
                    
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
            }
            .clasp-item:first-child {
                .clasp-content {
                    background: url('../assets/crsp.png') no-repeat center 100%; 
                }
            }
            .clasp-item:first-child {
                border-right: 1px solid #000;
            }
        }
    }
</style>


