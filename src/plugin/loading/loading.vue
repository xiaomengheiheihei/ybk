<template>
    <transition :name="animateName">
        <div v-show="isShow" class="loading-wrap loading-bg">
            <div class="__loading">
                <div class="loading-content">
                    <i class="ybk-icon icon-loading"></i>
                </div>
                <!-- text自定义插槽，默认文案为玩儿命加载中。。。 -->
                <div class="loading-text">
                    <slot>
                        <div class="text">加载中...</div>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Loading',
        data () {
            return {
                isShow: true,
                hasAnimate: true,
            }
        },
        computed: {
            animateName () {
                return this.hasAnimate ? 'opacity' : ''
            }
        },
        mounted () {

        },
        methods: {
            /**
             * 显示动画loading
             */
            show() {
                this.isShow = true
            },
            /**
             * 隐藏动画loading
             */
            hide() {
                this.isShow = false
            },
            /**
             * 开启动画效果
             */
            opemAnimate() {
                this.hasAnimate = true
            },
            /**
             * 去除动画效果
             * @return {Promise} 返回promise
             */
            removeAnimate() {
                return new Promise((resolve) => {
                    this.hasAnimate = false
                    resolve()
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .loading-bg {
        position: fixed;
        z-index: 2000;
        background-color: rgba(0, 0, 0, .8);
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .loading-wrap {
        .__loading {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);
            font-size: 16px;
            .loading-text {
                color: #fff;
                margin-top: 10px;
            }
            .loading-content {
                text-align: center;
                i {
                    font-size: 30px;
                    animation: rotating 2s linear infinite;
                    transition: transform .3s;
                    display: inline-block;
                    color: #fff;
                    position: relative;
                }
            }
        }
    }
    @keyframes rotating {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>


