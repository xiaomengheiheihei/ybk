import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      playerListStatus: [],
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
      changePlayStatus (state, id) {
        for (let i = 0; i < state.playerListStatus.length; i++) {
          if (state.playerListStatus[i].id === id) {
            state.playerListStatus[i].status = !state.playerListStatus[i].status;
          }
        }
      },
      CHANGEVOL (state, obj) {
        for (let i = 0; i < state.playerListStatus.length; i++) {
          if (state.playerListStatus[i].id === obj.index) {
            state.playerListStatus[i].vol = obj.vol;
          }
        }
      },
      ADDPLAYLIST (state, obj) {
        state.playerListStatus.push(obj);
      },
      CHANGEPVW (state, obj) {
        Object.assign(state.pvw, obj);
        // state.pvw = {...state.pvw, obj};
      },
      CHANGEPGMN (state, obj) {
        // state.pgm = {...state.pgm, obj};
        Object.assign(state.pgm, obj);
      },
      CHANGEPGMFIRST (state, id) {
        state.pgm.seqNo = id;
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
      commit('CHANGEPGMN', obj);
    },
    changePgmFirst ({commit}, id) {
      commit('CHANGEPGMFIRST',id)
    }
  }
})
