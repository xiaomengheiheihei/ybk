<template>
    <div class="tone-btn-wrap" :class="l ? 'tone-btn-wrap-s' : ''">
        <div class="tone-btn-top">GVM</div>
        <div class="tone-btn-con">
            <div class="tone-btn-container">
                <p class="void-num03">-100</p>
                <p class="void-num02">-50</p>
                <p class="void-num01">-0</p>
                <input type="range" name="" id="" value="0">
            </div>
            <div class="tone-btn-bottom">
                <p class="void-icon"></p>
                <p class="void-icon-s"></p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Mixer',
        props: {
            l: Boolean,
        },
    }
</script>
<style lang="scss" scoped>
    .tone-btn-wrap {
        position: relative;
        width: 35px;
        height: 165px;
        background: #D8D8D8;
        border-radius: 10px;
        margin-left: 10px;
        overflow: hidden;
        .tone-btn-top {
            height: 26px;
            background: #575B60;
            color: #FFF;
            line-height: 26px;
        }
        float: left;
        .tone-btn-con {
            .tone-btn-container {
                input {
                    transform: rotate(-90deg) translateX(33px) translateY(14px);
                    transform-origin: 0 0;
                    width: 84px;
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
                    height: 27px;
                }
            }
            .tone-btn-bottom {
                p {
                    position: absolute;
                    bottom: 5px;
                    left: 50%;
                    width: 10px;
                    height: 12px;
                    transform: translateX(-50%);
                }
                .void-icon {
                    background: url('../assets/void-start.png') no-repeat center 100%;
                }   
                .void-icon-s {
                    bottom: -10px;
                    background: url('../assets/er.png') no-repeat center 100%;  
                }
            }
        }
    }
    .tone-btn-wrap-s {
        width: 35px;
    }
</style>


