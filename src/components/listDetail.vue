<template>
    <div class="list-wrap">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="date"
                label="名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="累计时长/购买时长"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                align=“left”
                label="类型">
            </el-table-column>
            <el-table-column
                prop="address"
                label="开启时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="到期时间">
            </el-table-column>
            <el-table-column
                prop="address"
                label="状态">
            </el-table-column>
            <el-table-column
                prop="address"
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
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        props: {

        },
        create() {

        },
        methods: {
            handleEdit () {
                this.$router.push({ path: 'editVideo' })
            },
            handleDelete () {

            }
        }
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



