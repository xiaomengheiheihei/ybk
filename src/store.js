import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      player: '',       // 播放器信息
      playerStatus: {
        id: 1,        // 视频索引
        status: 0,    // 0暂停，1播放
      }
  },
  mutations: {
      changePlay (state, currentData) {
        // 将播放数据同步给store
        state.player = currentData;
      }
  },
  actions: {

  }
})
