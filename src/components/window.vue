<template>
    <div class="window-wrap">
        <div class="edit-video-left-con">
            <div class="edit-video-left-tile">视窗效果<span></span></div>
            <el-row class="video-item-live">
                <el-col :span="12" class="video-item-live-fir">
                    <Player :isLive = 1
                            :playerData=playerData
                            :isAdd = false
                            :isBlank = false
                            >
                    </Player> 
                </el-col>
                <el-col :span="12">
                    <Player :isLive = 1
                            :playerData=playerData
                            :isAdd = true
                            :isBlank = false
                            >
                    </Player>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import Player from '@/components/player.vue'
    export default {
        name: 'window',
        data () {
            return {
                playerData: {
                    index: 1,
                    title: 'CAM1',
                    signalIntensity: 4,
                    source: 'http://220.170.49.104/13/b/j/v/s/bjvsnuxilfqzafjsojwhzjypnbhbqn/hd.yinyuetai.com/154F016315F0AB7C8179594EFD0252C9.mp4?sc=96c65e474c339711',
                },
            }
        },
        components: {
            Player,
        }
    }
</script>
<style lang="scss" scoped>
    .window-wrap {
        margin-top: 3px;
        padding-right: 2px;
        .edit-video-left-con {
            .edit-video-left-tile {
                position: relative;
                height: 35px;
                line-height: 35px;
                background-color: #1E2124;
                color: #fff;
                font-size: 18px;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                span {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translate3d(0, -50%, 0);
                    width: 22px;
                    height: 22px;
                    background: url('../assets/setting02.png') no-repeat center 100%;
                }
            }
            .video-item-live {
                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 15px;
                overflow: hidden;
                .video-item-live-fir {
                    padding-right: 2px;
                }
            }
        }
    }
</style>


