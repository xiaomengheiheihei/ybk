<template>
    <div class="resource-wrap" :class="isMore ? 'resource-more-wrap' : ''">
        <div class="edit-video-left-tile">
            <span @click="showMore" class="more" :class="isMore ? 'more-tran' : ''"></span>
            图文控制台
            <span class="history-icon"></span>
            <span class="add" @click="addResource"></span>
            <span class="setting"></span>
        </div>
        <div class="resource-cationer">
            <div class="resource-top">
                <div class="resource-top-item">
                    <div class="item-content">
                        <span class="length">20:31:24</span>
                    </div>
                    <div class="item-bottom">
                        <div class="title">CLOCK1</div>
                        <span class="item-icon"><i class="ybk-icon icon-xunhuan_xian"></i>180s</span>  
                    </div>
                </div>
                <div class="resource-top-item">
                    <div class="item-content">
                        <span class="length">20:31:24</span>
                    </div>
                    <div class="item-bottom">
                        <div class="title">CLOCK2</div>
                        <span class="item-icon"><i class="ybk-icon icon-xiangyou"></i></span>  
                    </div>
                </div>
            </div>
            <div class="resource-bottom-wrap">
                <div class="resource-bottom-top">
                    <div class="resource-bottom-item" v-for="(v,i) in 4" :key="i">
                        <div class="item-content"></div>
                        <div class="item-bottom">
                            <div class="title">CLOCK1</div>
                            <span class="item-icon"><i class="ybk-icon icon-xunhuan_xian"></i>180s</span>  
                        </div>
                    </div>
                </div>
                <div class="resource-bottom-content">
                    <div class="resource-bottom-item" v-for="(v,i) in 8" :key="i">
                        <div class="item-content"></div>
                        <div class="item-bottom">
                            <div class="title">CLOCK1</div>
                            <span class="item-icon"><i class="ybk-icon icon-xunhuan_xian"></i>180s</span>  
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
            title="添加包装效果"
            :visible.sync="dialogVisible"
            width="40%"
            class="resource-dialog-wrap"
            append-to-body
            :before-close="handleClose">
            <div class="resource-d-wrap">
                <h4>包装模版选择：</h4>
                <section class="resource-template-wrap">
                    <div class="time-wrap">
                        <div class="time-title title">时钟</div>
                        <ul class="time-list list">
                            <li class="time-item item">
                                <div class="container">
                                    <div class="clock-template-wrap01">13:14:15</div>
                                </div>
                                <div class="c-title">时钟1</div>
                            </li>
                            <li class="time-item item">
                                <div class="container">
                                    <div class="cuttime-template-wrap01">13:14:15</div>
                                </div>
                                <div class="c-title">倒计时1</div>
                            </li>
                            <li class="time-item item">
                                <div class="container">
                                    <div class="cuttime-template-wrap02">13:14:15</div>
                                </div>
                                <div class="c-title">倒计时2</div>
                            </li>
                        </ul>
                    </div>
                    <div class="subtitle-wrap">
                        <div class="subtitle-title title">字幕</div>
                        <ul class="time-list list">
                            <li class="time-item item">
                                <div class="container"></div>
                                <div class="c-title">字幕1</div>
                            </li>
                            <li class="time-item item">
                                <div class="container"></div>
                                <div class="c-title">题图1</div>
                            </li>
                        </ul>
                    </div>
                </section>
                <h4>内容替换：</h4>
                <section class="content-change">
                    <div class="r-content">
                        <label for="r-title">标题：</label>
                        <input type="text" id="r-title" placeholder="请输入标题">
                    </div>
                </section>
                <section class="r-effect-wrap">
                    <section class="anmation">
                        <div class="r-d-title">动画效果：</div>
                        <div class="anmation-c r-effect-c">
                            <div class="up-an-wrap anmation-c-c">
                                <span>上场动画：</span>
                                <select name="" id="">
                                    <option selected value="0">左侧飞出</option>
                                    <option value="1">右侧飞出</option>
                                </select>
                            </div>
                            <div class="anmation-c-c down-an-wrap">
                                <span>下场动画：</span>
                                <select name="" id="">
                                    <option value="0">左侧飞出</option>
                                    <option selected value="1">右侧飞出</option>
                                </select>
                            </div>
                            <div class="stay-tiam anmation-c-c">
                                <span>停留时长：</span>
                                <input type="text" name="" id="stay-time-input" value="20">秒
                            </div>
                        </div>
                    </section>
                    <section class="an-event">
                        <div class="r-d-title">动画事件：</div>
                        <div class="an-event-c r-effect-c">
                            <div class="an-event-c-w">
                                <div class="radio-list">
                                    <el-radio-group v-model="subtitleStayTime">
                                        <el-radio :label="0">单次</el-radio>
                                        <el-radio :label="1">循环</el-radio>
                                        <el-radio :label="2">常挂</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="an-event-c-r">
                                    <el-switch
                                        v-model="playReceive"
                                        inactive-color="rgb(110, 212, 243)"
                                        inactive-text="播放收纳">
                                    </el-switch>
                                    <div class="subtitle-loop-time">每<input type="text" name="" value="120" id="">秒</div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="change-an">
                        <div class="r-d-title">调整</div>
                        <div class="change-an-c r-effect-c">
                            <div class="r-position change-an-item">
                                位置：  x <input type="number" value="0" name="" id="r-postion-x"> y <input type="number" value="0" name="" id="r-postion-y">
                            </div>
                            <div class="r-size change-an-item">
                                尺寸：  w <input type="number" value="640" name="" id="r-postion-w"> h <input type="number" value="360" name="" id="r-postion-h">
                            </div>
                            <div class="change-an-item">
                                层级：<span class="m-top">置顶</span><span class="m-bottom">置底</span>
                            </div>
                        </div>
                    </section>
                    <section class="r-preview-wrap">
                        <div class="r-d-title">预览</div>
                        
                    </section>
                </section>
            </div>
            <div class="r-item-title-wrap">
                名称：  <input type="text" name="" id="r-item-title" placeholder="请输入名称">
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="resource-cancel" @click="dialogVisible = false">取 消</el-button>
                <el-button class="resource-sure" type="primary" @click="dialogVisible = false">添 加</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'ResourceCenter',
        data () {
            return {
                isMore: false,
                dialogVisible: false,
                playReceive: true,          // 播放收纳
                subtitleStayTime: 0,        // 字幕停留时间
            }
        },
        methods: {
            showMore () {
                this.isMore = !this.isMore;
            },
            addResource () {
                this.dialogVisible = true;
            },
            handleClose () {
                this.dialogVisible = !this.dialogVisible;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .resource-wrap {
        border-radius: 15px;
        margin-top: 3px;
        margin-right: 5px;
        transition: transform .5s linear;
        overflow: hidden;
        height: 235px;
        position: relative;
        z-index: 100;
        .edit-video-left-tile {
            position: relative;
            height: 35px;
            line-height: 35px;
            background-image: linear-gradient(-180deg, #393737 0%, #1E1C1C 100%);
            color: #fff;
            font-size: 18px;
            .more {
                display: inline-block;
                width: 22px;
                height: 22px;
                background: url('../assets/more_arra.png') no-repeat 100%;
                background-position: center;
                vertical-align: middle;
                margin-right: 5px;
                transition: all .3s linear;
            }
            .more-tran {
                transform: rotate(180deg);
            }
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
            .history-icon {
                position: absolute;
                right: 62px;
                top: 50%;
                transform: translate3d(0, -60%, 0);
                width: 22px;
                height: 22px;
                background: url('../assets/history_icon.png') no-repeat center 100%; 
            }
            span {
                cursor: pointer;
            }
        }
        .resource-cationer {
            text-align: left;
            height: 530px;
            background: #2b2b2b;
            transition: height .3s linear;
            .resource-top, .resource-bottom-wrap {
                overflow-x: scroll;
                overflow-y: hidden;
                width: 100%;
                white-space: nowrap;
                padding-bottom: 8px;
                .resource-top-item, .resource-bottom-item{
                    display: inline-block;
                    width: 25%;
                    height: 150px;
                    margin-right: 1px;
                    .item-content {
                        position: relative;
                        height: 125px;
                        background-color: #000;
                        .length {
                            position: absolute;
                            top: 10px;
                            left: 10px;
                            width: 70px;
                            height: 25px;
                            background-image: linear-gradient(-180deg, #9152EF 0%, #7452D3 97%);
                            border-radius: 50px;
                            color: #fff;
                            text-align: center;
                            line-height: 25px;
                        }
                    }
                    .item-bottom {
                        position: relative;
                        height: 25px;
                        line-height: 25px;
                        background: #353535;
                        color: #fff;
                        text-align: center;
                        .item-icon {
                            position: absolute;
                            right: 5px;
                            top: 0;
                            height: 25px;
                            line-height: 25px;
                            i {
                                font-size: 12px;
                                display: inline-block;
                                padding-right: 5px;
                            }
                            .icon-xiangyou {
                                font-size: 16px;
                            }
                        }
                    }
                }
            }
            .resource-top::-webkit-scrollbar, .resource-bottom-wrap::-webkit-scrollbar {
                width: 6px;
                height: 6px;
                background-color: #ACACAC;;
                border-radius: 4px;
            }
            .resource-top::-webkit-scrollbar-thumb, .resource-bottom-wrap::-webkit-scrollbar-thumb {
                background-color: #696666;
                border-radius: 4px;
            }
            .resource-bottom-wrap {
                margin-top: 10px;
                padding-bottom: 25px;
            }
        }
    }
    .resource-more-wrap {
        transform: translateY(-332px);
        overflow: auto;
        height: 100%;
    }
</style>
<style>
    .resource-dialog-wrap .el-dialog .el-dialog__title {
        color: #fff;
    }
    .resource-dialog-wrap .el-dialog__footer .resource-cancel {
        background: #D8D8D8;
        border-radius: 50px;
        height: 50px;
        width: 120px;
        font-size: 20px;
        color: #333333;
        outline: none;
    }
    .resource-dialog-wrap .el-dialog__footer .resource-sure {
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
    .resource-dialog-wrap .resource-d-wrap {
        padding: 0 20px;
    }
    .resource-dialog-wrap .resource-d-wrap h4 {
        color: #fff;
        font-weight: normal;
        margin-bottom: 10px;
    }
    .resource-dialog-wrap .resource-d-wrap .resource-template-wrap {
        border: 1px solid #ccc;
        padding: 10px 20px;
        height: 330px;
        overflow-y: scroll;
        margin-bottom: 30px;
    }
    .resource-dialog-wrap .resource-d-wrap .resource-template-wrap .title {
        color: #fff;
        border-bottom: 1px solid #ccc;
    }
    .resource-dialog-wrap .resource-d-wrap .resource-template-wrap .list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        list-style: none;
        padding: 10px 0;
        margin: 0;
    }
    .resource-dialog-wrap .resource-d-wrap .resource-template-wrap .list .item {
        width: 31%;
        color: #fff;
    }
    .resource-dialog-wrap .resource-d-wrap .resource-template-wrap .list .item:nth-child(2) {
        padding: 0 20px;
    }
    .resource-dialog-wrap .resource-d-wrap .resource-template-wrap .list .item .container {
        position: relative;
        width: 100%;
        height: 100px;
        background-color: #413f3f;
    }
    .resource-dialog-wrap .resource-d-wrap .resource-template-wrap .list .item .c-title {
        text-align: center;
        background-color: #D8D8D8;
        color: #333333;
    }
    .resource-dialog-wrap .resource-d-wrap .content-change {
        border: 1px solid #ccc;
        padding: 20px 20px 30px 20px;
        margin-bottom: 30px;
    }
    .resource-dialog-wrap .resource-d-wrap .content-change label {
        color: #fff;
    }
    .resource-dialog-wrap .resource-d-wrap .content-change input {
        outline: none;
        width: 200px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap section {
        width: 45%;
        
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap section .r-d-title {
        color: #fff;
        margin-bottom: 8px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c {
        padding: 10px 20px;
        border: 1px solid #ccc;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .anmation-c-c {
        padding: 5px 0;
        color: #fff;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .anmation-c-c span {
        color: #fff;
        font-size: 12px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .anmation-c-c input {
        width: 20px;
        margin-right: 5px;
        outline: none;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w .radio-list {
        margin-right: 20px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w .radio-list .el-radio {
        display: block;
        color: #fff;
        padding: 7px 0; 
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w .radio-list .el-radio+.el-radio {
        margin: 0;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w .radio-list .el-radio .el-radio__label {
        font-weight: normal;
        font-size: 12px !important;
        padding: 0;
        padding-left: 5px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w .el-switch__label {
        color: #fff;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w .el-switch__label>span {
        font-size: 12px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w .subtitle-loop-time {
        margin-top: 5px;
        color: #fff;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .an-event-c-w .subtitle-loop-time input {
        outline: none;
        width: 25px;
        border-radius: 4px;
        margin: 0 5px;
        border: 1px solid #ccc;
        appearance: none;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .change-an,.resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-preview-wrap {
        margin-top: 15px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item {
        color: #fff;
        font-weight: normal;
        font-size: 12px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item:nth-child(2) {
        padding: 15px 0;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item input {
        display: inline-block;
        width: 25px;
        appearance: none;
        border: 1px solid #ccc;
        outline: none;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item #r-postion-x {
        margin-right: 30px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item #r-postion-w {
        margin-right: 26px;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item input::-webkit-outer-spin-button,
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item input[type="number"]{
        -moz-appearance: textfield;
    }
    .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item .m-top, .resource-dialog-wrap .resource-d-wrap .r-effect-wrap .r-effect-c .change-an-item .m-bottom {
        padding: 3px 15px;
        border-radius: 5px;
        background-color: #3d3c3c;
        display: inline-block;
        margin: 0 10px;
    }
    .r-preview-wrap-c {
        min-height: 114px;
    }
    .r-item-title-wrap {
        margin-top: 30px;
        margin-bottom: 20px;
        padding-left: 20px;
        color: #fff;
    }
    .clock-template-wrap01 {
        position: absolute;
        width: 70%;
        height: 40px;
        line-height: 40px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        text-align: center;
        border-radius: 40px;
        color: #fff;
        background: linear-gradient(to bottom, #e971a4 , #3dc8fb);
    }
    .cuttime-template-wrap01 {
        position: absolute;
        width: 70%;
        height: 40px;
        line-height: 40px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        text-align: center;
        color: #fff;
        background: linear-gradient(to bottom, #043f43 , #32c9fc);
    }
    .cuttime-template-wrap02 {
        position: absolute;
        width: 70%;
        height: 40px;
        line-height: 40px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        text-align: center;
        color: #fff;
        border-bottom-left-radius: 40px;
        border-top-right-radius: 40px;
        background: linear-gradient(to bottom, #919d72 , #3bc8f3);
    }
</style>



