<template>
    <div class="list-wrap">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                width="120"
                label="名称">
            </el-table-column>
            <el-table-column
                prop="time"
                label="累计时长/购买时长">
            </el-table-column>
            <el-table-column
                prop="type"
                align=“left”
                width="100"
                label="类型">
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开启时间">
            </el-table-column>
            <el-table-column
                prop="expressTime"
                label="到期时间">
            </el-table-column>
            <el-table-column
                prop="status"
                width="100"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="bugTime"
                label="购买时间">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                <a @click="handleEdit()">进入控制台</a>
                <a @click="handleDelete()">停止</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default {
        name: 'ListDetail',
        data () {
            return {
                tableData: [{
                    time: '2小时',
                    name: '试用播控台',
                    type: '适用',
                    startTime: '',
                    expressTime: '',
                    status: '已开启',
                    bugTime: '',
                }]
            }
        },
        props: {

        },
        created() {
           let time = window.localStorage.getItem('startTime');
           this.tableData[0].startTime = timetrans(parseInt(time));
           let express = parseInt(time) + 2 * 60 * 60 * 1000;
           this.tableData[0].expressTime = timetrans(express);
           this.tableData[0].bugTime = timetrans(express);
        },
        methods: {
            handleEdit () {
                this.$router.push({ path: 'editVideo' })
            },
            handleDelete () {

            }
        }
    }
    function timetrans(date){
        var date = new Date(date);//如果date为13位不需要乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
    }
</script>
<style lang="scss" scoped>
    .list-wrap {
        padding: 20px;
        background-color: #eee;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
</style>



