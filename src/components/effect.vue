<template>
    <div class="effect-wrap">
        <div class="edit-video-left-tile">切换特效</div>
        <div class="effect-container">
            <ul>
                <li>
                    <div class="title">滑行：</div>
                    <div class="list">
                        <div class="con slider01" :class="{slider01_t:1===effectIndex}" @click="changeEffect(1)"></div>
                    </div>
                    <div class="list">
                        <div class="con slider02" :class="{slider02_t:2===effectIndex}" @click="changeEffect(2)"></div>
                    </div>
                    <div class="list">
                        <div class="con slider03" :class="{slider03_t:3===effectIndex}" @click="changeEffect(3)"></div>
                    </div>
                    <div class="list">
                        <div class="con slider04" :class="{slider04_t:4===effectIndex}" @click="changeEffect(4)"></div>
                    </div>
                </li>
                <li>
                    <div class="title">拉伸：</div>
                    <div class="list">
                        <div class="con stretching01" :class="{stretching01_t:5===effectIndex}" @click="changeEffect(5)"></div>
                    </div>
                    <div class="list">
                        <div class="con stretching02" :class="{stretching02_t:6===effectIndex}" @click="changeEffect(6)"></div>
                    </div>
                    <div class="list">
                        <div class="con stretching03" :class="{stretching03_t:7===effectIndex}" @click="changeEffect(7)"></div>
                    </div>
                    <div class="list">
                        <div class="con stretching04" :class="{stretching04_t:8===effectIndex}" @click="changeEffect(8)"></div>
                    </div>
                    <div class="list">
                        <div class="con stretching05" :class="{stretching05_t:9===effectIndex}" @click="changeEffect(9)"></div>
                    </div>
                </li>
                <li>
                    <div class="title">淡入淡出：</div>
                    <div class="list">
                        <div class="con fadeIN" :class="{fadeIN_t:10===effectIndex}" @click="changeEffect(10)"></div>
                    </div>
                    <div class="list">
                        <div class="con fadeOUT" :class="{fadeOUT_t:11===effectIndex}" @click="changeEffect(11)"></div>
                    </div>
                </li>
                <li>
                    <div class="title">条纹：</div>
                    <div class="list">
                        <div class="con stripe01" :class="{stripe01_t:12===effectIndex}" @click="changeEffect(12)"></div>
                    </div>
                    <div class="list">
                        <div class="con stripe02" :class="{stripe02_t:14===effectIndex}" @click="changeEffect(14)"></div>
                    </div>
                </li>
                <li>
                    <div class="title"></div>
                    <div class="list">
                        <div class="con no-ef" :class="{noeff_t:0===effectIndex}" @click="changeEffect(0)"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Effect',
        data () {
            return {
                effectIndex: 0,     // 控制特效选中 从0-14
            }
        },
        methods: {
            changeEffect(id) {
                this.effectIndex = id;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .effect-wrap {
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
        .effect-container {
            padding: 15px 0;
            box-sizing: border-box;
            height: 278px;
            background: rgb(42, 46, 49);
            ul {
                list-style: none;
                margin: 0;
                padding: 0;
                 
                li {
                    list-style: none;
                    color: #fff;
                    font-size: 16px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: 45px;
                    line-height: 45px;
                    .title {
                        align-self: flex-end;
                        width: 27%;
                        text-align: right;
                    }
                    .list {
                        margin-right: 25px;
                        .con {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            width: 30px;
                            height: 30px;
                            border-radius: 5px;
                            overflow: hidden;
                            cursor: pointer;
                            .fir {
                                flex-grow: 1;
                                background-color: rgb(209, 200, 200);
                            }
                            .sec {
                                flex-grow: 1;
                                background-color: rgb(115, 121, 126);
                            }
                        }
                        .slider01 {
                            background: url('../assets/slider01.png') no-repeat center;
                            background-size: contain;
                        }
                        .slider01_t {
                            background: url('../assets/slider01-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .slider02 {
                            background: url('../assets/slider02.png') no-repeat center;
                            background-size: contain;
                        }
                        .slider02_t {
                            background: url('../assets/slider02-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .slider03 {
                            background: url('../assets/slider03.png') no-repeat center;
                            background-size: contain;
                        }
                        .slider03_t {
                            background: url('../assets/slider03-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .slider04 {
                            background: url('../assets/slider04.png') no-repeat center;
                            background-size: contain;
                        }
                        .slider04_t {
                            background: url('../assets/slider04-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching01 {
                            background: url('../assets/stretching01.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching01_t {
                            background: url('../assets/stretching01-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching02 {
                            background: url('../assets/stretching02.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching02_t {
                            background: url('../assets/stretching02-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching03 {
                            background: url('../assets/stretching03.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching03_t {
                            background: url('../assets/stretching03-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching04 {
                            background: url('../assets/stretching04.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching04_t {
                            background: url('../assets/stretching04-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching05 {
                            background: url('../assets/stretching05.png') no-repeat center;
                            background-size: contain;
                        }
                        .stretching05_t {
                            background: url('../assets/stretching05-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .no-ef {
                            background: url('../assets/no-eff.png') no-repeat center;
                            background-size: contain;
                        }
                        .noeff_t {
                            background: url('../assets/no-eff-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .fadeIN {
                            background: url('../assets/fadein.png') no-repeat center;
                            background-size: contain;
                        }
                        .fadeIN_t {
                            background: url('../assets/fadein-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .fadeOUT {
                            background: url('../assets/fadeout.png') no-repeat center;
                            background-size: contain;
                        }
                        .fadeOUT_t {
                            background: url('../assets/fadeout-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .stripe01 {
                            background: url('../assets/stripe01.png') no-repeat center;
                            background-size: contain;
                        }
                        .stripe01_t {
                            background: url('../assets/stripe01-t.png') no-repeat center;
                            background-size: contain;
                        }
                        .stripe02 {
                            background: url('../assets/stripe02.png') no-repeat center;
                            background-size: contain;
                        }
                        .stripe02_t {
                            background: url('../assets/stripe02-t.png') no-repeat center;
                            background-size: contain;
                        }
                    }
                }
            }
        }
    }
</style>

