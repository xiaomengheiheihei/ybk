<template>
    <div class="range-wrap">
        <div class="range-con range-l">
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
            .range-bar {
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #d8d8d8;
                box-shadow: 1px 1px #ccc;
            }
        }
        .range-l {
            width: 4px;
            height: 50px;
            background: #bbb;
            margin: 0 auto;
        }
    }
</style>

