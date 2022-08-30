import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    refreshToken: localStorage.getItem("refreshToken") || "",
  },
  mutations: {
    setauth(state, payload) {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
    },
  },
  actions: {},
  modules: {},
  getters: {
    isLoggedIn: (state) => {
      return state.token;
    },
  },
});
