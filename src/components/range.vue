<template>
    <div class="range-wrap">
        <div class="range-con range-l" :style = "{height: rangeObj.height}">
            <span v-if="disabled" ref="sliderBar" class="range-bar range-bar-disable"><span class="range-bar-s"></span></span>
            <span v-if="!disabled" @mousedown.stop="change" ref="sliderBar" :class="ischoosed ? 'range-bar-red': ''" class="range-bar"><span :class="ischoosed ? 'range-bar-s-red': ''" class="range-bar-s"></span></span>
            <div ref="silderProgress" class="progress" :class="ischoosed ? 'progress-red' : ''"></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'range',
        data () {
            return {
                distance: 0,
            }
        },
        props: {
            rangeObj: {
                type: Object,
                default () {
                    return {
                        direction: 'level',
                        isPlayBar: true,
                        isScale: false,
                        height: '50px',
                    }
                }
            },
            value: null,
            disabled: {
                type: Boolean,
                required: false,
                default: false,
            },
            ischoosed: Boolean,
        },
        model: {
            prop: 'value',
            event: 'changeValue',
        },
        computed: {
            sliderBar () {
                return this.$refs.sliderBar;
            },
            silderProgress () {
                return this.$refs.silderProgress;
            },
            distances () {
                return 88 - this.value * 88;
            }
        },
        mounted () {
            if (this.value !== null) {
                this.sliderBar.style.top = this.distances + '%';
                this.silderProgress.style.height = 100 - this.distances - this.sliderBar.offsetWidth / 2 + '%';
            }
        },
        methods: {
            change (e) {
                let diffY = e.clientY - this.sliderBar.offsetTop;
                document.onmousemove = (e) => {
                    this.distance = e.clientY - diffY - this.sliderBar.offsetWidth;
                    this.distance < 0 ? this.distance = 0 : '';
                    this.distance > 88 ? this.distance = 88 : '';
                    this.sliderBar.style.top = this.distance + '%';
                    this.silderProgress.style.height = 100 - this.distance - this.sliderBar.offsetWidth / 2 + '%';
                };
                document.onmouseup = (e)=> {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    this.$emit('change', this.changeDistanceToValue());
                }
            },
            changeDistanceToValue () {
                let tempValue = 0;
                let temp = (this.distance / 88).toFixed(1);
                if (temp <= 0.1 & temp > 0) {
                    temp = 0.1;
                }
                tempValue  = 1 - temp;
                if (tempValue < 0.1 && tempValue > 0) {
                    tempValue = 0.1;
                }
                return tempValue == 0 ? tempValue :  tempValue.toFixed(1);
            }
        },
        watch: {
            value () {
                this.sliderBar.style.top = this.distances + '%';
                if (this.value != 0) {      
                    this.silderProgress.style.height = 100 - this.distances - this.sliderBar.offsetWidth / 2 + '%';
                } else {
                     this.silderProgress.style.height = '0%';
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .range-wrap {
        position: relative;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        .range-con {
            .range-bar {
                position: absolute;
                bottom: -2px;
                left: 50%;
                transform: translateX(-50%);
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: rgba(41,162,41,0.3);
                cursor: pointer;
                transition: top .1s linear;
                z-index: 10;
                margin-top: -25%;
                .range-bar-s {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 17px;
                    height:17px;
                    transform: translate3d(-50%, -50%, 0);
                    border-radius: 50%;
                    background: #00FF00;
                }
                .range-bar-s-red {
                    background: #D0021B;
                }
            }
            .range-bar-red {
                background: rgba(208,2,27,0.3);
            }
            .range-bar-disable {
                cursor: not-allowed;
            }
            .progress {
                position: absolute;
                width: 4px;
                height: 0;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                background: #29A229;
                transition: height .1s linear;
                border-radius: 50px;
            }
            .progress-red {
                background: #96081A;
            }
        }
        .range-l {
            width: 4px;
            height: 50px;
            background: rgba(0,0,0,0.2);
            border-radius: 50px;
            margin: 0 auto;
            border-radius: 50px;
        }
    }
</style>

