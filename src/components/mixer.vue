<template>
    <div class="mixer-wrap">
        <div class="edit-video-left-tile">调音台</div>
        <div class="mixer-container">
            <el-row align="middle" class="con-tt">
                <el-col :span="19" class="left">
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                    <Tone></Tone>
                </el-col>
                <el-col :span="5" class="right">
                    <Tone :l=true></Tone>
                    <Tone></Tone>
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
                
            }
        },
        components: {
            Tone,   
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
            height: 3.6vh;
            line-height: 3.6vh;
            background-color: #1E2124;
            color: #fff;
            font-size: 18px;
        }
        .mixer-container {
            height: 19.1vh;
            background-color:#5D5D5D;
            display: flex;
            align-items: center;
            .con-tt {
                width: 100%;
                .left {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                }
                .right {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding-right: 10px;
                }
            }
        }
    }
</style>

