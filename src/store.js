import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      ybkId: 0,
      playerDataList: [],
      playerListStatus: [],     // 所有播放器数据
      pgm: {},                 
      pvw: {},
      mutis: [],            // 多视窗界面数据
      playSync: true,       // 音视频是否同步切换
      settingStatus: false,   // 设置视频浮层状态
      currentTime: 0,       // 保存当前时间
  },
  getters: {
    playerCon: state => {
      return state.playerListStatus;
    },
    getPlayerListStatus: (state) => (index) =>  {
      return state.playerListStatus.find(i => i.id === index);
    },
    getVol: (state, getters) => {
      return getters.getPlayerListStatus.vol;
    },
    getPvw: state => {
      return state.pvw;
    },
    getPgm: state => {
      return state.pgm;
    },
    getPlaySync: state => {
      return state.playSync;
    },
    getMutis: state => state.mutis
  },
  mutations: {
      changePlayStatus (state, id) {        // 改变播放器播放状态
        for (let i = 0; i < state.playerListStatus.length; i++) {
          if (state.playerListStatus[i].id === id) {
            state.playerListStatus[i].status = !state.playerListStatus[i].status;
          }
        }
      },
      CHANGEVOL (state, obj) {            //  改变播放器声音
        for (let i = 0; i < state.playerListStatus.length; i++) {
          if (state.playerListStatus[i].id === obj.index) {
            state.playerListStatus[i].vol = obj.vol;
          }
        }
      },
      CHANGEMUTE (state, obj) {       // 改变音频状态
        let list = state.playerListStatus;
        for(let i = 0; i < list.length; i++) {
          if (obj.type === 'mute') {    // 单独设置某一路静音
            if (obj.id === list[i].playerId) {
              list[i].isMute == 0 ? list[i].isMute = 1 : list[i].isMute = 0;
            }
          } else {          // 切换音频，当前音频取消静音，其他路音频静音
            list[i].isMute = 1;
            if (obj.id === list[i].playerId) {
              list[i].isMute = 0;
            }
          }
        }
      },
      CHANGEPVWPGM (state, obj) {       // 改变pvw和pgm输出线路
        let arr = state.playerListStatus;
        for (let i = 0; i < arr.length; i++) {
          switch (obj.type) {   // 0 pvw 1 pgm
            case 0:
              arr[i].isPvw === 1 ? arr[i].isPvw = 0 : '';
              arr[i].id === obj.index ? arr[i].isPvw = 1 : '';
              break;
            case 1:
              arr[i].isPgm === 1 ? arr[i].isPgm = 0 : '';
              arr[i].id === obj.index ? arr[i].isPgm = 1 : '';
              if (state.playSync) {
                arr[i].isMute === 1 ? '' : arr[i].isMute = 1;
                arr[i].id === obj.index ? arr[i].isMute = 0 : '';
              }
              if (arr[i].id === obj.index ) {
                  state.pgm.obj.url = arr[i].url;
              }
              break;
          }
        }
        let arrs = state.playerDataList;
        for (let i = 0; i < arrs.length; i++) {
          switch (obj.type) {   // 0 pvw 1 pgm
            case 0:
              arrs[i].isPvw === 1 ? arrs[i].isPvw = 0 : '';
              arrs[i].id === obj.id ? arrs[i].isPvw = 1 : '';
              break;
            case 1:
              arrs[i].isPgm === 1 ? arrs[i].isPgm = 0 : '';
              arrs[i].id === obj.id ? arrs[i].isPgm = 1 : '';
              break;
          }
        }
        // 清楚所有多视窗的pvw和pgm选中
        for (let item of state.mutis) {
          if (obj.type === 0) {   // 清除pvw选中
            item.isPvw === 1 ? item.isPvw = 0 : '';
          } else {          // 清楚pgm
            item.isPgm === 1 ? item.isPgm = 0 : '';
          }
        }
      },
      ADDPLAYLIST (state, obj) {
        state.playerListStatus.push(obj);
      },
      ADDPLAYERDATA (state, arr) {
        state.playerDataList = [...arr];
      },
      CHANGEPVW (state, obj) {
        state.pvw.obj.title = obj.title;
        state.pvw.obj.isPvw = 1;
      },
      CHANGEPGM (state, obj) {
        state.pgm.obj.title = obj.title;
        state.pgm.obj.isPgm = 1;
      },
      ADDPVW (state, obj) {
        state.pvw = {...state.pvw, obj};
      },
      ADDPGM (state, obj) {
        state.pgm = {...state.pgm, obj};
      },
      CHANGEPLAYSYNC(state, bol){      // 改变音视频同步切换状态
        state.playSync = bol;
      },
      ADDLIVEPLAYERURL (state, obj) {
        let arr = state.playerListStatus;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].playerId === obj.id) {
            arr[i].url = obj.url;
            arr[i].title = obj.title;
          }
        }
      },
      ADDYBKID (state, id) {
        state.ybkId = id;
      },
      CHANGESETTINGSTATUS (state) {
        state.settingStatus = !state.settingStatus;
      },
      SAVETIME (state, time) {
        state.currentTime = time;
      },
      ADDMUTIS (state, arr) {   // 添加视窗信息
        state.mutis = [...arr];
      },
      CHANGEMUTIS (state, obj) {
        let mutis = state.mutis;
        for (let value of mutis) {
          if (value.id === obj.id) {
            value.overlay = JSON.parse(obj.overlay);
            value.title = obj.title;
          }
        }
      },
      CHANGETOPVW (state, id) {
        for (let value of state.mutis) {
          value.isPvw = 0;
          if (value.id === id) {
            value.isPvw = 1;
          }
        }
      },
      CHANGETOPGM (state, id) {
        for (let value of state.mutis) {
          value.isPgm = 0;
          if (value.id === id) {
            value.isPgm = 1;
          }
        }
      },
      CHANGEVIDEOPGM (state) {
        for (let value of state.playerListStatus) {
          value.isPgm === 1 ? value.isPgm = 0 : '';   
        }
        for (let value of state.playerDataList) {
          value.isPgm === 1 ? value.isPgm = 0 : '';   
        }
      },
      CHANGEVIDEOPVW (state) {
        for (let value of state.playerListStatus) {
          value.isPvw === 1 ? value.isPvw = 0 : '';   
        }
        for (let value of state.playerDataList) {
          value.isPvw === 1 ? value.isPvw = 0 : '';   
        }
      } 
  },
  actions: {
    changeVol ({commit},obj) {
      commit("CHANGEVOL", obj);
    },
    addPlayList ({commit}, obj) {
      commit('ADDPLAYLIST', obj);
    },
    changePvw ({commit}, obj) {
      commit('CHANGEPVW', obj);
    },
    changePgm ({commit}, obj) {
      commit('CHANGEPGM', obj);
    },
    addPvw ({commit}, obj) {
      commit('ADDPVW', obj);
    },
    addPgm ({commit}, obj) {
      commit('ADDPGM', obj);
    },
    changepvwpgm ({commit}, obj) {
      commit('CHANGEPVWPGM', obj);
    },
    addplayerdata ({commit}, arr) {
      commit('ADDPLAYERDATA', arr);
    },
    changemute ({commit}, obj) {
      commit('CHANGEMUTE', obj);
    },
    changePlaySync({commit}, bol) {
      commit('CHANGEPLAYSYNC', bol)
    },
    addLivePlayerUrl({commit}, obj) {
      commit('ADDLIVEPLAYERURL', obj)
    },
    addYbkId ({commit}, id) {
      commit('ADDYBKID', id)
    },
    changeSettingStatus ({commit}) {
      commit('CHANGESETTINGSTATUS');
    },
    saveTime ({commit}, time) {
      commit('SAVETIME', time)
    },
    addMutis ({commit}, arr) {
      commit('ADDMUTIS', arr);
    },
    changeMutis ({commit}, obj) {
      commit('CHANGEMUTIS', obj)
    },
    changeToPvw({commit}, id) {
      commit('CHANGETOPVW', id)
    },
    changeToPgm({commit}, id) {
      commit('CHANGETOPGM', id)
    },
    changeVideoPgm ({commit}) {
      commit('CHANGEVIDEOPGM')
    },
    changeVideoPvw ({commit}) {
      commit('CHANGEVIDEOPVW')
    }
  }
})
