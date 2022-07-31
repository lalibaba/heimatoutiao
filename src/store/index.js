import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/util/storage.js'
import { getToken, setToken } from '@/util/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // tokenObj: JSON.parse(localStorage.getItem('HEIMA_TOKEN')) || {}
    tokenObj: getToken() || {}
  },
  getters: {},
  mutations: {
    TOKEN(state, Payload) {
      state.tokenObj = Payload //存入vuex仓库,确保页面token数据是同步的
      // localStorage.setItem('HEIMA_TOKEN', JSON.stringify(Payload))
      setToken(Payload)
    }
  },
  actions: {},
  modules: {}
})
