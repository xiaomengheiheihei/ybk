<template>
    <div class="effect-wrap">
        <div class="edit-video-left-tile">切换特效</div>
        <div class="effect-container">
            <ul>
                <li>
                    <div class="title">滑行：</div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="title">拉伸：</div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="title">淡入淡出：</div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="title">条纹：</div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                    <div class="list">
                        <div class="con">
                            <div class="fir">A</div>
                            <div class="sec">B</div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="title"></div>
                    <div class="list">
                        <div class="con">
                            无
                        </div>
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
            return {}
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
            height: 32px;
            line-height: 32px;
            color: #fff;
            font-size: 18px;
        }
        .effect-container {
            padding: 20px 0;
            box-sizing: border-box;
            height: 229px;
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
                    height: 40px;
                    line-height: 40px;
                    .title {
                        align-self: flex-end;
                        width: 27%;
                        text-align: right;
                    }
                    .list {
                        margin-right: 30px;
                        .con {
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            width: 30px;
                            height: 30px;
                            border-radius: 5px;
                            overflow: hidden;
                            .fir {
                                flex-grow: 1;
                                background-color: rgb(209, 200, 200);
                            }
                            .sec {
                                flex-grow: 1;
                                background-color: rgb(115, 121, 126);
                            }
                        }
                    }
                }
            }
        }
    }
</style>

