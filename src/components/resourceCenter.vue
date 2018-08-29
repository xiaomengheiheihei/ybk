<template>
    <div class="resource-wrap" :class="isMore ? 'resource-more-wrap' : ''">
        <div class="edit-video-left-tile"><span @click="showMore" class="more" :class="isMore ? 'more-tran' : ''"></span>图文控制台<span class="history-icon"></span><span class="add"></span><span class="setting"></span></div>
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
    </div>
</template>
<script>
    export default {
        name: 'ResourceCenter',
        data () {
            return {
                isMore: false,
            }
        },
        methods: {
            showMore () {
                this.isMore = !this.isMore;
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


