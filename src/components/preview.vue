<template>
    <div class="preview-wrap">
        <div class="edit-video-left-tile">预览区</div>
        <div class="preview-player-con">
            <el-row>
                <el-col :span="12">
                    <div class="play-left">
                        <Player
                            :isLive = 1
                            :playerData=playerData
                            :isAdd = false
                            :isBlank = false
                            :isPreview = true
                        ></Player>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="play-right">
                        <Player
                            :isLive = 1
                            :playerData=playerData
                            :isAdd = false
                            :isBlank = false
                            :isRed= true
                            :isPreview = true
                        ></Player>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import Player from '@/components/player.vue'
    export default {
        name: 'Preview',
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
    .preview-wrap {
        overflow: hidden;
        border-radius: 15px;
        margin-top: 5px;
        background: #1E2124;
        .edit-video-left-tile {
            position: relative;
            height: 3.6vh;
            line-height: 3.6vh;
            color: #fff;
            font-size: 18px;
        }
        .preview-player-con {
            .play-left {
                margin-right: 2px;
            }
        }
    }
</style>

