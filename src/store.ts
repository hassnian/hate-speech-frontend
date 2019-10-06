import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    msg: 'fuck bitch hello',
  },
  mutations: {
    changeMsg(state:any, msg:string) {
      state.msg = msg;
    },
  },
  actions: {

  },
});
