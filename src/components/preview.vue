<template>
    <div class="preview-wrap">
        <div class="edit-video-left-tile">预览区</div>
        <div class="preview-player-con">
            <el-row>
                <el-col :span="12">
                    <div class="play-left">
                        <Flash  :isLive= '1'
                                :playerData= 'pvwData'
                                :isAdd = 'false'
                                :isBlank = 'false'
                                :isPreview = 'true'
                                :isRed = 'false'
                                :height = '223'>
                        </Flash>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="play-right">
                        <Flash  :isLive= '1'
                                :playerData = 'pgmData'
                                :isAdd = 'false'
                                :isBlank = 'false'
                                :isPreview = 'true'
                                :isRed = 'true'
                                :height = '223'>
                        </Flash>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    import Player from '@/components/player.vue'
    import Flash from '@/components/playerFlash.vue'
    export default {
        name: 'Preview',
        data () {
            return {}
        },
        props: {
            pvwData: Object,
            pgmData: Object,
        },
        components: {
            Player,
            Flash,
        },
        computed: {
            // pgm () {
            //     return this.$store.getters.getPgm;
            // },
            // pvw () {
            //     return this.$store.getters.getPvw;
            // }
        },
        mounted () {
            console.log(this.pvwData);
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
            height: 35px;
            line-height: 35px;
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

