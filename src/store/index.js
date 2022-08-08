import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/util/storage.js'
import { getToken, setToken } from '@/util/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('HEIMA_TOKEN')) || {}
    tokenObj: getToken() || {},
    KWHistory: storage.get('HEIMA_kwHistory') || []
  },
  getters: {},
  mutations: {
    //保存token
    TOKEN(state, Payload) {
      state.tokenObj = Payload //存入vuex仓库,确保页面token数据是同步的
      setToken(Payload)
    },
    //保存搜索历史
    KWHistory(state, KWHistory) {
      state.KWHistory = KWHistory
      storage.set('HEIMA_kwHistory', KWHistory)
    }
  },
  actions: {},
  modules: {}
})
