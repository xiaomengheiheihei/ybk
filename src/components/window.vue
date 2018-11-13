<template>
    <div class="window-wrap">
        <div class="edit-video-left-con">
            <div class="edit-video-left-tile">视窗效果<span class="add" @click="addNew()"></span><span class="setting" @click="settingVideo"></span></div>
            <el-row class="video-item-live">
                <el-col :span="12" class="video-item-live-fir" 
                :class="
                i === 0 && v.isPvw && v.isPgm ? 'video-item-live-fir-l-r' : '' 
                || i === 1 && v.isPvw && v.isPgm ? 'video-item-live-fir-r-r' : ''
                || i === 0  && v.isPvw ? 'video-item-live-fir-l' : '' 
                || i === 1  && v.isPvw ? 'video-item-live-fir-r' : ''
                || i === 0  && v.isPgm ? 'video-item-live-fir-l-r' : '' 
                || i === 1  && v.isPgm ? 'video-item-live-fir-r-r' : ''" 
                v-if="mutis.length > 0" 
                :style="i === 0 ? {'border-right': '1px solid #000'} : ''"
                v-for="(v, i) in mutis" :key="i">
                    <div class="template01" @click="chooseMutisPvw(i,v.id)" @dblclick.stop="chooseMutisPgm(i,v.id)" v-if="v.overlay">
                        <div class="template01-item" v-if="v.overlay !== ''" v-for="(item, index) in JSON.parse(v.overlay)" 
                        :key="index"
                        :style="{top: item.y + 'px',left: item.x+ 'px',width: item.w + 'px', height: item.h + 'px',
                        lineHeight: item.h + 'px'}"
                        :class="[item.borLeft ? 'bor-left' : '' , item.borTop ? 'bor-top': '' 
                        , item.borRight ? 'bor-right' : '', item.borBottom ? 'bor-bottom' : '']">{{item.channel + 1}}</div>
                        <transition name="fade">
                            <div class="edit-wrap" v-show="settingStatus && v.isPgm === 0 && v.isPvw === 0">
                                <div class="delete" @click.stop="deleteVideo(v)"><i class="ybk-icon icon-iconfontshanchu"></i></div>
                                <div class="editar" @click.stop="editMutis(v)"><i class="ybk-icon icon-501"></i></div>
                            </div>
                        </transition>
                    </div>
                    <div class="template-add" v-if="!v.overlay">
                        <!-- <div class="add-video" @click="addNew(v)">
                            <div class="add-h"></div>
                            <div class="add-d"></div>
                        </div> -->
                    </div>
                    <el-row class="play-bar-wrap">
                        <el-col :span="8">
                            {{v.id ? v.id : i === 0 ? 13 : 14}}
                        </el-col>
                        <el-col :span="8" class="play-item-title">
                            {{v.title ? v.title : i === 0 ? 'MUTI1' : 'MUTI2'}}
                        </el-col>
                        <el-col :span="8" class="btn-wrap">
                            <div class="btn01 btn" :class="v.overlay === '' ? 'single-grap' : ''"></div>
                            <div class="btn02 btn" :class="v.overlay === '' ? 'single-grap' : ''"></div>
                            <div class="btn03 btn" :class="v.overlay === '' ? 'single-grap' : ''"></div>
                            <div class="btn04 btn" :class="v.overlay === '' ? 'single-grap' : ''"></div>
                        </el-col>
                    </el-row>
                </el-col>
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
                            <select name="" :id="i" v-if="selectedList.length > 0" v-model="selectedList[i].id" @change="fn(i, $event)">
                                <option v-for="(item, index) in playerData" 
                                    :key="index" 
                                    v-if="index < 12" 
                                    :name = "item.id"
                                    :value="item.id">
                                    {{ item.title }}
                                </option>
                            </select>
                            <el-radio v-model="radio" :label="radioList[i]" @change="changeVol">音频</el-radio>
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
                settingStatus: false,       // 是否显示编辑视窗
                modifyId: 0,                // 等待修改的视窗id        
                clickTimer: null,     
                choosedItemObj: null,       // 当前选中的
            }
        },
        computed: {
            playerData () {
                return this.$store.getters.playerCon;
            },
            choosedItem () {
                return this.$refs.modelItem;
            },
            mutis () {
                return this.$store.getters.getMutis;
            }
        },
        components: {
           
        },
        mounted () {
            this.changePlayerData();
        },
        methods: {
            addNew () {
                this.dialogVisible = !this.dialogVisible;
                for (let item of this.mutis) {
                    if (item.overlay === '') {
                        this.modifyId = item.id;
                        break;
                    }
                }
            },
            chooseItem (i) {
                let list = this.mutisList;
                list.forEach((value, index) => {
                    if (index === i) {
                        value.isChoose = true;
                        this.choosedItemObj = value.mutis;
                    } else {
                       value.isChoose = false; 
                    }
                });
                for (let j = 0; j < this.choosedItemObj.length; j++) {
                    this.choosedItemObj[j].channel = this.selectedList[j].id-1;
                }
            },
            updataMutis () {
                let obj = {
                    id: this.modifyId,
                    title: this.nameValue,
                    overlay: '',
                    width: 197,
                    height: 110
                };
                this.mutisList.forEach((v, i) => {
                    if (v.isChoose) {
                       v.title = obj.title;
                    }
                });
                for (let j = 0; j < this.choosedItemObj.length; j++) {
                    if (j + 1 == this.radio) {
                        this.choosedItemObj[j].is_mute = false;
                    }
                }
                obj.overlay = JSON.stringify(this.choosedItemObj);
                this.http.post('./biz/ybk/setMutiInfo',obj)
                .then((res) => {
                    if (res.code === 200) {
                        this.dialogVisible = false;
                        // 修改成功后修改本地视窗信息
                        this.$store.dispatch('changeMutis', obj);
                        this.settingStatus = false;
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
                    case 8:
                        result = 'I'
                        break;
                    case 9:
                        result = 'G'
                        break;
                    case 10:
                        result = 'K'
                        break;
                    case 11:
                        result = 'L'
                        break;
                }
                return result;
            },
            settingVideo () {           // 修改或删除视频矩阵
                this.settingStatus = !this.settingStatus;
            },
            deleteVideo (v) {            // 删除多视窗
                this.modifyId = v.id;
                let obj = {
                    id: this.modifyId,
                    title: this.nameValue,
                    overlay: "",
                };
                this.http.post('./biz/ybk/setMutiInfo',obj)
                .then((res) => {
                    if (res.code === 200) {
                        // 修改成功后修改本地视窗信息
                        this.$store.dispatch('changeMutis', obj);
                        this.settingStatus = false;
                    }
                })
                .catch((err) => {

                });
            },
            editMutis (v) {              // 编辑多视窗
                this.dialogVisible = true;
                this.modifyId = v.id;
            },
            chooseMutisPvw (i,id) {            // 选择多视窗pvw
                clearTimeout(this.clickTimer);
                this.clickTimer = setTimeout(() => {
                    this.http.post('./biz/ybk/switch2PVW', {id:id})
                    .then((response) => {
                        this.$store.dispatch('changeToPvw', id);
                        this.$store.dispatch('changeVideoPvw');
                        // 当选中多视窗窗口后去除视频频道的选中
                    })
                    .catch((error) => {
                        //this.$loading.end();
                    });
                },300)
            },
            chooseMutisPgm (i,id) {         // 选择多视窗pgm
                clearTimeout(this.clickTimer);
                let sync = Number(this.$store.state.playSync);
                this.http.post('./biz/ybk/switch2PGM', {"id":id,sync: sync})
                .then((response) => {
                    this.$store.dispatch('changeToPgm', id);
                    this.$store.dispatch('changeVideoPgm');
                }).catch((error) => {

                });
            },
            changePlayerData () {
                for (let value of this.playerData) {
                    if (value.id < 13) {
                        let obj = {
                            title: value.title,
                            id: value.id
                        }
                        this.selectedList.push(obj);
                        this.radioList.push(value.id);
                    }
                }
            },
            fn (i, ele) {
                this.choosedItemObj[i].channel = parseInt(ele.target.value) - 1;
            },
            changeVol () {
                console.log(this.radio);
            }
        },
        watch: {
            playerData () {
                this.changePlayerData();
            },
            mutis () {
                for(let v of this.mutis) {
                    v.overlay = typeof v.overlay === 'string' && v.overlay  ? JSON.parse(v.overlay) : v.overlay;
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
                background-image: linear-gradient(-180deg, #393737 0%, #1E1C1C 100%);
                color: #fff;
                font-size: 18px;
                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
                .setting {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translate3d(0, -50%, 0);
                    width: 22px;
                    height: 22px;
                    background: url('../assets/setting02.png') no-repeat center 100%;
                }
                .add {
                    position: absolute;
                    right: 35px;
                    top: 50%;
                    transform: translate3d(0, -60%, 0);
                    width: 22px;
                    height: 22px;
                    background: url('../assets/add.png') no-repeat center 100%; 
                }
                span {
                    cursor: pointer;
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
                    background: #353535;
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
                            background-color: #0a0a0a;
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
                    background-color: #2B2B2B;
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
                    position: relative;
                    box-sizing: border-box;
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
                        .edit-wrap {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            z-index: 10;
                            top: 0;
                            left: 0;
                            background-color: rgba(247, 66, 66, 0.5);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            .delete {
                                margin-right: 40px;
                                i {
                                    font-size: 40px;
                                    color: #fff;
                                }
                            }
                            .editar {
                                i {
                                    font-size: 33px;
                                    color: #fff;
                                    margin-top: -3px;
                                    display: block;
                                }
                            }
                        }
                    }
                }
                .video-item-live-fir-r::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 98%;
                    height: 98%;
                    border: 1px solid #00FF00;
                    border-bottom-right-radius: 10px;
                    pointer-events: none;
                }
                .video-item-live-fir-l::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 98%;
                    height: 98%;
                    border: 1px solid #00FF00;
                    border-bottom-left-radius: 15px;
                    pointer-events: none;
                }
                .video-item-live-fir-r-r::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 98%;
                    height: 98%;
                    border: 1px solid #FF0000;
                    border-bottom-right-radius: 10px;
                    pointer-events: none;
                }
                .video-item-live-fir-l-r::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 98%;
                    height: 98%;
                    border: 1px solid #FF0000;
                    border-bottom-left-radius: 15px;
                    pointer-events: none;
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



