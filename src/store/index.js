import Cookies from "js-cookie";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: Cookies.get("token") || "",
    refreshToken: Cookies.get("refreshToken") || "",
    user: Cookies.get("user") || "",
  },
  mutations: {
    setauth(state, payload) {
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      state.user = payload.user;
    },
  },
  actions: {
    refreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        const data = {
          grant_type: "refresh_token",
          refresh_token: state.refreshToken,
        };
        axios
          .post(
            "https://securetoken.googleapis.com/v1/token?key=AIzaSyDgctRRmWxeGm9SBIw2o4DKiH498CW-PYw",
            data
          )
          .then((response) => {
            console.log(response.data);
            Cookies.set("token", response.data.idToken);
            console.log(response.data.refreshToken);
            Cookies.set("refreshToken", response.data.refreshToken);
            console.log(response.data.user);
            Cookies.set("user", response.data.user);
            commit("setauth", response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  modules: {},
  getters: {
    isLoggedIn: (state) => {
      return state.token;
    },
    username: (state) => {
      console.log(state.user);
      return state.user;
    },
  },
});
