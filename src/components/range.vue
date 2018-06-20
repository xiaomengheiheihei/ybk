<template>
    <div class="range-wrap">
        <div class="range-con">
            <span class="range-bar"></span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'range',
        data () {
            return {

            }
        },
        props: {
            rangeObj: {
                type: Object,
                default () {
                    return {
                        direction: level,
                        isPlayBar: true,
                        isScale: false,
                    }
                }
            }
        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
    .range-wrap {
        position: relative;
        .range-con {
            position: absolute;
        }
    }
</style>

