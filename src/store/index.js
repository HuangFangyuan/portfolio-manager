import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex);

const state = {
  login: false,
  userId:0,
  role:'manager',
  userName:'Test'
};

export default new Vuex.Store({
  state,
  mutations,
  getters
})
