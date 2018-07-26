<template>
    <div class="window-wrap">
        <div class="edit-video-left-con">
            <div class="edit-video-left-tile">视窗效果<span @click="dialogVisible = true"></span></div>
            <el-row class="video-item-live">
                <el-col :span="12" class="video-item-live-fir" v-if="mutis.length > 0" v-for="(v, i) in mutis" :key="i">
                    <div class="template01">
                        <div class="template01-item" v-if="v.overlay !== ''" v-for="(item, index) in v.overlay" 
                        :key="index"
                        :style="{top: item.y + 'px',left: item.x+ 'px',width: item.w + 'px', height: item.h + 'px',
                        lineHeight: item.h + 'px'}"
                        :class="[item.borLeft ? 'bor-left' : '' , item.borTop ? 'bor-top': '' 
                        , item.borRight ? 'bor-right' : '', item.borBottom ? 'bor-bottom' : '']">{{Number(item.channel)+1}}</div>
                    </div>
                    <div class="template-add" v-if="v.overlay === ''">
                        <div class="add-video" @click="addNew">
                            <div class="add-h"></div>
                            <div class="add-d"></div>
                        </div>
                    </div>
                    <el-row class="play-bar-wrap">
                        <el-col :span="8">
                            {{v.id}}
                        </el-col>
                        <el-col :span="8" class="play-item-title">
                            {{v.title}}
                        </el-col>
                        <el-col :span="8" class="btn-wrap">
                            <div class="btn01 btn"></div>
                            <div class="btn02 btn"></div>
                            <div class="btn03 btn"></div>
                            <div class="btn04 btn"></div>
                        </el-col>
                    </el-row>
                </el-col>
                <!-- <el-col :span="12">
                    <div class="template-add">
                        <div class="add-video" @click="addNew">
                            <div class="add-h"></div>
                            <div class="add-d"></div>
                        </div>
                    </div>
                    <el-row class="play-bar-wrap">
                        <el-col :span="8">
                            12
                        </el-col>
                        <el-col :span="8" class="play-item-title">
                            win1
                        </el-col>
                        <el-col :span="8" class="btn-wrap">
                            <div class="btn01 btn"></div>
                            <div class="btn02 btn"></div>
                            <div class="btn03 btn single-grap"></div>
                            <div class="btn04 btn"></div>
                        </el-col>
                    </el-row>
                </el-col> -->
            </el-row>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="70%"
            :show-close="false"
            >
            <div slot="title" class="title">
                添加视窗效果
                <span @click="dialogVisible = false">关闭</span>
            </div>
            <div class="content">
                <div class="name-wrap">
                    <label for="item-name">名称：</label>
                    <input type="text" id="item-name" v-model="nameValue">
                </div>
                <div class="item-num-wrap">
                    <span class="item-num-text">视窗数：</span>
                    <select name="" id="" v-model ="itemNum">
                        <option :value="item.name" v-for="(item, index) in optionList" :key="index">{{ item.name }}</option>
                    </select>
                    <!-- <el-select class="select-wrap" v-model="itemNum" placeholder="请选择">
                        <el-option
                        v-for="item in optionList"
                        :key="item.name"
                        :label="item.id"
                        :value="item.name">
                        </el-option>
                    </el-select> -->
                </div>
                <div class="item-show-wrap">
                    <ul class="list">
                        <li class="model-item-wrap" @click="chooseItem(i)" 
                        ref="modelItem" v-for="(v, i) in mutisList" :key="i" 
                        :class="v.isChoose ? 'bor-g-3' : ''" v-show="v.mutis.length == itemNum">
                            <div class="model-item" 
                            v-for="(item, index) in v.mutis" :key="index"
                            :style="{top: item.y + 'px',left: item.x+ 'px',width: item.w + 'px', height: item.h + 'px',
                            lineHeight: item.h + 'px'}"
                            >{{changeNum(item.channel)}}</div>
                        </li>
                    </ul>
                    <span class="custom-btn">自定义</span>
                </div>
                <div class="select-audio-wrap">
                    <h3>输入源</h3>
                    <div class="select-audios-content">
                        <div class="input-audio-item" v-for="(v, i) in Number(itemNum)" :key="i">
                            <span class="index">{{changeNum(i)}}</span>
                            <select name="" id="" v-model ="selectedList[i]">
                                <option v-for="(item, index) in playerData" :key="index" v-if="index < 12" :value="item.title">{{ item.title }}</option>
                            </select>
                            <el-radio v-model="radio" :label="radioList[i]">音频</el-radio>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button class="cancel-btn" @click="dialogVisible = false">取 消</el-button>
                <el-button class="add-btn" type="primary" @click="updataMutis">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'window',
        data () {
            return {
                dialogVisible: false,
                nameValue: 'WIN1',
                itemNum: 4,
                optionList: [
                    {
                        id: 2,
                        name: '2',
                    },
                    {
                        id: 3,
                        name: '3',
                    },
                    {
                        id: 4,
                        name: '4',
                    },
                    {
                        id: 5,
                        name: '5',
                    },
                    {
                        id: 6,
                        name: '6',
                    },
                    {
                        id: 7,
                        name: '7',
                    },
                    {
                        id: 8,
                        name: '8',
                    }
                ],
                mutisList: [
                    {   
                        id: 21,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/2,
                                h: 110,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/2,
                                h: 110,
                                x: 197/2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
 
                        ]
                    },          // 2路
                    {   
                        id: 24,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/3,
                                h: 110,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/3,
                                h: 110,
                                x: 197/3,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/3,
                                h: 110,
                                x: 197/3 * 2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 3路
                    {   
                        id: 25,
                        ybkId: 1,
                        isChoose: false,
                        title: "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/2,
                                h: 110,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/2,
                                h: 55,
                                x: 197/2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: true,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/2,
                                h: 55,
                                x: 197/2,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 3路
                    {   
                        id: 20,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/2,
                                h: 55,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: true,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/2,
                                h: 55,
                                x: 0,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/2,
                                h: 55,
                                x: 197/2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: true,
                            },
                            {
                                channel: 3,
                                is_mute: true,
                                w: 197/2,
                                h: 55,
                                x: 197/2,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 4路
                    {   
                        id: 22,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197,
                                h: 55,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: true,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 0,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 3,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3*2,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 4路
                    {   
                        id: 23,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/3*2,
                                h: 110,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/3,
                                h: 110/3,
                                x: 197/3*2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: true,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/3,
                                h: 110/3,
                                x: 197/3*2,
                                y: 110/3,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: true,
                            },
                            {
                                channel: 3,
                                is_mute: true,
                                w: 197/3,
                                h: 110/3,
                                x: 197/3*2,
                                y: 110/3 * 2,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 4路
                    {   
                        id: 26,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/2,
                                h: 55,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: true,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/2,
                                h: 55,
                                x: 197/2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: true,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 0,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 3,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 4,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3*2,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 5路
                    {   
                        id: 27,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3*2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                            {
                                channel: 3,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 0,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: true,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 4,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: true,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 5,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3*2,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: true,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 6路
                    {   
                        id: 28,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: true,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: true,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/3,
                                h: 55,
                                x: 197/3*2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: true,
                            },
                            {
                                channel: 3,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 0,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 4,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 5,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4*2,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 6,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4*3,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 7路
                    {   
                        id: 29,
                        "ybkId": 1,
                        isChoose: false,
                        "title": "MUTI1",
                        mutis: [
                            {
                                channel: 0,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 0,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: true,
                            },
                            {
                                channel: 1,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: true,
                            },
                            {
                                channel: 2,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4*2,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: true,
                            },
                            {
                                channel: 3,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4*3,
                                y: 0,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: true,
                            },
                            {
                                channel: 4,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 0,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 5,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 6,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4*2,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: true,
                                borBottom: false,
                            },
                            {
                                channel: 7,
                                is_mute: true,
                                w: 197/4,
                                h: 55,
                                x: 197/4*3,
                                y: 55,
                                z: 0,
                                borLeft: false,
                                borTop: false,
                                borRight: false,
                                borBottom: false,
                            },
                        ]
                    },          // 8路
                ],
                radioList: [],
                radio: 1,
                selectedList: [],
            }
        },
        props: {
            mutis: Array,
        },
        computed: {
            playerData () {
                return this.$store.getters.playerCon;
            },
            choosedItem () {
                return this.$refs.modelItem;
            }
        },
        components: {
           
        },
        mounted () {
            setTimeout(()=>{
                console.log(this.mutis);
            },5000)
        },
        methods: {
            addNew () {
                this.dialogVisible = !this.dialogVisible;
            },
            chooseItem (i) {
                let list = this.mutisList;
                list.forEach((value, index) => {
                    if (index === i) {
                        value.isChoose = true;
                    } else {
                       value.isChoose = false; 
                    }
                });
            },
            updataMutis () {
                let obj = {
                    id: 14,
                    title: '',
                    overlay: '',
                };
                this.mutisList.forEach((v, i) => {
                    if (v.isChoose) {
                       obj.title = v.title;
                       obj.overlay = JSON.stringify(v.mutis);
                    }
                });
                this.http.post('./biz/ybk/setMutiInfo',obj)
                .then((res) => {
                    if (res.code === 0) {
                        this.dialogVisible = false;
                    }
                })
                .catch((err) => {

                });
            },
            changeNum (num) {
                let result = '';
                switch (num) {
                    case 0:
                        result = 'A'
                        break;
                    case 1:
                        result = 'B'
                        break;
                    case 2:
                        result = 'C'
                        break;
                    case 3:
                        result = 'D'
                        break;
                    case 4:
                        result = 'E'
                        break;
                    case 5:
                        result = 'F'
                        break;
                    case 6:
                        result = 'G'
                        break;
                    case 7:
                        result = 'H'
                        break;
                }
                return result;
            }
        },
        watch: {
            playerData () {
                for (let value of this.playerData) {
                    if (value.id < 13) {
                        this.selectedList.push(value.title);
                        this.radioList.push(value.id);
                    }
                }
            },
            mutis () {
                for(let v of this.mutis) {
                    v.overlay = JSON.parse(v.overlay);
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    $border1pxfff: 1px solid #A9A5A5;
    .window-wrap {
        .bor-g-3 {
            border: 3px solid #00FF00;
        }
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
                 .play-bar-wrap {
                    text-align: left;
                    font-size: 12px;
                    color: #fff;
                    height: 20px;
                    line-height: 20px;
                    padding: 0 5px;
                    background-color: #686F76;
                    >.el-col-8 {
                        position: relative;
                        overflow: hidden;
                        .btn {
                            background-color: #0BE235;
                            width: 2px;
                            float: right;
                            margin: 0 1px;
                        }
                        .btn04 {
                            height: 3px;
                        }
                        .btn03 {
                            height: 6px;
                        }
                        .btn02 {
                            height: 9px;
                        }
                        .btn01 {
                            height: 14px;
                        }
                        .single-grap {
                            background-color: #332e2e;
                        }
                    }
                    .play-item-title {
                        text-align: center;
                    }
                    .start-btn {
                        text-align: right;
                    }
                    .btn-wrap {
                        transform: rotateX(180deg) rotateY(-360deg);
                        margin-top: 2px;
                    }
                }
                .template-add {
                    height: 110px;
                    background-color: #5D5D5D;
                    position: relative;
                    .add-video {
                        position: absolute;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        background-color: #fff;
                        top: 50%;
                        left: 50%;
                        transform: translate3d(-50%, -50%, 0);
                        .add-h {
                            width: 26px;
                            height: 3px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate3d(-50%, -50%, 0);
                            background: #5D5D5D;
                        }
                        .add-d {
                            width: 3px;
                            height: 26px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate3d(-50%, -50%, 0);
                            background: #5D5D5D;
                        }
                    }
                }
                .video-item-live-fir {
                    padding-right: 2px;
                    .template01 {
                        // display: flex;
                        // justify-content: center;
                        // align-items: center;
                        // flex-wrap: wrap;
                        height: 110px;
                        position: relative;
                        .template01-item {
                            background-color: #5D5D5D;
                            color: #fff;
                            box-sizing: border-box;
                            position: absolute;
                        }
                        .bor-left {
                            border-left: $border1pxfff;
                        }
                        .bor-top {
                            border-top: $border1pxfff;
                        }
                        .bor-right{
                            border-right: $border1pxfff;
                        }
                        .bor-bottom{
                            border-bottom: $border1pxfff;
                        }
                    }
                }
            }
        }
        .el-dialog__header {
            .title {
                color: #fff;
                font-size: 18px;
                text-align: left;
                position: relative;
                height: 40px;
                line-height: 40px;
                padding: 0 30px;
                span {
                    position: absolute;
                    right: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
                span::before {
                    content: '';
                    height: 40px;
                    background: #979797;
                    width: 1px;
                    position: absolute;
                    left: -30px;
                    top: 0;
                }
            }
        }
        .el-dialog__body {
            .content {
                text-align: left;
                color: #fff;
                padding: 20px 30px;
                margin-bottom: 30px;
                .name-wrap {
                    label {
                        margin-right: 20px;
                        font-size: 16px;
                    }
                    input {
                        appearance: none;
                        border: 0;
                        box-shadow: 0px 0px 3px #ccc;
                        outline: none;
                        height: 30px;
                        width: 25%;
                    }
                }
                .item-num-wrap {
                    margin-top: 30px;
                    .item-num-text {
                        margin-right: 20px;
                    }
                    select {
                        width: 120px;
                        height: 30px;
                        appearance: none;
                        outline: none;
                        padding-left: 15px;
                        border: 0;
                        box-shadow: 0px 0px 3px #ccc;
                        border-radius: 0;
                    }
                    .select-wrap {
                        width: 120px;
                        height: 30px;
                    }
                }
                .item-show-wrap {
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    ul {
                        list-style: none;
                        padding: 20px 20px 5px 20px;
                        border: 1px solid #ccc;
                        display: inline-block;
                        margin: 0;
                        width: 80%;
                        height: 130px;
                        overflow-y: scroll;
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                        flex-wrap: wrap;
                        .model-item-wrap {
                            position: relative;
                            height: 110px;
                            width: 197px;
                            margin-bottom: 30px;
                            margin-right: 30px;
                            overflow: hidden;
                            .model-item {
                                position: absolute;
                                border: 1px solid rgb(80, 79, 79);
                                text-align: center;
                                background-color: #333;
                            }
                        }
                    }
                    span {
                        padding: 10px 20px;
                        background-color: #1E2124;
                        border-radius: 6px;
                        margin-left: 30px;
                        cursor: pointer;
                    }
                }
                .select-audio-wrap {
                    .select-audios-content {
                        padding: 5px 20px;
                        border: 1px solid #ccc;
                        width: 80%;
                        .input-audio-item {
                            color: #fff;
                            height: 30px;
                            line-height: 30px;
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            select {
                                margin: 0 20px;
                                width: 100px;
                                outline: none;
                                border-radius: 3px;
                            }
                        }
                    }
                }
            }
        }
        .dialog-footer {
            .cancel-btn {
                background: #D8D8D8;
                border-radius: 50px;
                height: 50px;
                width: 120px;
                font-size: 20px;
                color: #333333;
                outline: none;
            }
            .add-btn {
                background: #333333;
                border-radius: 50px;
                height: 50px;
                width: 120px;
                font-size: 20px;
                color: #fff;
                outline: none;
                border: 0;
                margin-left: 40px;
            }
        }
    }
</style>
<style lang="scss">
.input-audio-item {
    .el-radio {
        .el-radio__label {
            color: #fff;
        }
    }
}
</style>



