<template>
    <div class="mixer-wrap">
        <div class="edit-video-left-tile">调音台</div>
        <div class="mixer-container">
            <el-row align="middle" class="con-tt">
                <el-col :span="19" class="left">
                    <Tone   :title = v.title
                            :index = v.id
                            v-for="(v, i) in playerList" :key="i" v-if="i < 12">
                    </Tone>
                </el-col>
                <el-col :span="5" class="right">
                    <Tone   :l= l
                            :title = ii.title
                            :index = ii.id
                            v-for="(ii, vv) in playerList" :key="vv" v-if="vv === 13">
                    </Tone>
                    <Tone   :title = pgmTitle
                            :index = ii.id
                            v-for="(ii, vv) in playerList" :key="vv" v-if="vv === 12">
                    </Tone>
                </el-col>
            </el-row>
        </div>
    </div> 
</template>
<script>
    import Tone from '@/components/toneBtn.vue'
    export default {
        name: 'Mixer',
        data () {
            return {
                l: true,
                pgmTitle: 'PGM'
            }
        },
        computed: {
            playerList () {
                return this.$store.getters.playerCon;
            }
        },
        components: {
            Tone,   
        },
        mounted () {
            console.log(this.playerList)
        }
    }
</script>
<style lang="scss" scoped>
    .mixer-wrap {
        border-radius: 15px;
        margin-top: 3px;
        overflow: hidden;
        margin-right: 5px;
        .edit-video-left-tile {
            position: relative;
            height: 35px;
            line-height: 35px;
            background-color: #1E2124;
            color: #fff;
            font-size: 18px;
        }
        .mixer-container {
            height: 200px;
            background-color:#5D5D5D;
            display: flex;
            align-items: center;
            .con-tt {
                width: 100%;
                .left {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }
                .right {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding-right: 10px;
                    padding-left: 40px;
                }
            }
        }
    }
</style>

