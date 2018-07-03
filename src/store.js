import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      playerDataList: [],
      playerListStatus: [],     // 所有播放器数据
      pgm: {},                 
      pvw: {},
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
    }
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
      CHANGEPVWPGM (state, obj) {       // 改变pvw和pgm输出线路
        let arr = state.playerListStatus;
        for (let i = 0; i < arr.length; i++) {
          arr[i].isPvw === 1 ? arr[i].isPvw = 0 : '';
          arr[i].isPgm === 1 ? arr[i].isPgm = 0 : '';
          switch (obj.type) {   // 0 pvw 1 pgm
            case 0:
              arr[i].id === obj.id ? arr[i].isPvw = 1 : '';
              break;
            case 1:
              arr[i].id === obj.id ? arr[i].isPgm = 1 : '';
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
      },
      ADDPLAYLIST (state, obj) {
        state.playerListStatus.push(obj);
      },
      ADDPLAYERDATA (state, arr) {
        state.playerDataList = [...arr];
      },
      CHANGEPVW (state, obj) {
        state.pvw = {...state.pvw, obj};
      },
      CHANGEPGMN (state, obj) {
        state.pgm = {...state.pgm, obj};
      },
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
      commit('CHANGEPGMN', obj);
    },
    changepvwpgm ({commit}, obj) {
      commit('CHANGEPVWPGM', obj);
    },
    addplayerdata ({commit}, arr) {
      commit('ADDPLAYERDATA', arr);
    }
  }
})
