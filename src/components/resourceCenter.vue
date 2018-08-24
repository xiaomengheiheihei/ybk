<template>
    <div class="resource-wrap" :class="isMore ? 'resource-more-wrap' : ''">
        <div class="edit-video-left-tile"><span @click="showMore" class="more" :class="isMore ? 'more-tran' : ''"></span>图文控制台<span class="history-icon"></span><span class="add"></span><span class="setting"></span></div>
        <div class="resource-cationer" :class="isMore ? 'resource-cationer-more' : ''">

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
            height: 200px;
            background: #2b2b2b;
            transition: height .3s linear;
        }
        .resource-cationer-more {
            height: 530px;
        }
    }
    .resource-more-wrap {
        position: relative;
        z-index: 100;
        transform: translateY(-332px);
    }
</style>


