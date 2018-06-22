<template>
    <div class="tone-btn-wrap" :class="l ? 'tone-btn-wrap-s' : ''">
        <div class="tone-btn-top">GVM</div>
        <div class="tone-btn-con">
            <div class="tone-btn-container">
                <p class="void-num03">-100</p>
                <p class="void-num02">-50</p>
                <p class="void-num01">-0</p>
                <input type="range" name="" id="" value="0">
                <!-- <Range :rangeObj=rangeData></Range> -->
                <div class="range">
                    <div class="range-btn"></div>
                </div>
            </div>
            <div class="tone-btn-bottom">
                <p class="void-icon"></p>
                <p class="void-icon-s"></p>
            </div>
        </div>
    </div>
</template>
<script>
    import Range from '@/components/range.vue'
    export default {
        name: 'Mixer',
        data () {
            return {
                rangeData: {
                    direction: 'level',
                    isPlayBar: false,
                    isScale: true,
                }
            }
        },
        props: {
            l: Boolean,
        },
        components: {
            Range,
        }
    }
</script>
<style lang="scss" scoped>
    .tone-btn-wrap {
        position: relative;
        width: 35px;
        height: 160px;
        background: #D8D8D8;
        border-radius: 10px;
        margin-left: 10px;
        overflow: hidden;
        .tone-btn-top {
            height: 25px;
            background: #575B60;
            color: #FFF;
            line-height: 25px;
        }
        float: left;
        .tone-btn-con {
            .tone-btn-container {
                input {
                    transform: rotate(-90deg) translateY(-50%);
                    transform-origin: 0 0;
                    width: 74px;
                    position: absolute;
                    bottom: 40px;
                    left: 50%;
                    margin: auto;
                }
                input[type=range] {
                    -webkit-appearance: none;
                    outline: none;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                }  
                ::-webkit-slider-runnable-track {
                    background:  rgb(139, 145, 150);
                    height: 4px;
                }
                ::-webkit-slider-thumb {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background-color: rgb(104, 99, 99);
                    transform: translateY(-25%);
                    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4);
                }
                p {
                    text-align: left;
                    transform:scale(0.6);
                    width: 0;
                    height: 20px;
                }
                // .range {
                //     width: 4px;
                //     height: 70px;
                //     background: rgb(62, 65, 70);
                //     margin: 0 auto;
                //     .range-btn {
                //         width: 10px;
                //         height: 10px;
                //         border-radius: 50%;
                //         background: rgb(125, 129, 133);
                //     }
                // }
            }
            .tone-btn-bottom {
                p {
                    position: absolute;
                    bottom: 3px;
                    left: 50%;
                    width: 10px;
                    height: 12px;
                    transform: translateX(-50%);
                }
                .void-icon {
                    background: url('../assets/void-start.png') no-repeat center;
                    background-size: contain;
                }   
                .void-icon-s {
                    bottom: -7px;
                    background: url('../assets/er.png') no-repeat center; 
                    background-size: contain; 
                }
            }
        }
    }
    .tone-btn-wrap-s {
        width: 35px;
    }
</style>


