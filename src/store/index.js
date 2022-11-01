import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: JSON.parse(localStorage.getItem("user")) || null,
      token:localStorage.getItem("token") || null
    }
  },
  mutations: {
    SET_USER(state,payload){
        state.user = payload;
    },
    SET_TOKEN(state,payload){
        state.token = payload;
    },
    REMOVE_USER(state){
        state.user = "";
    },
    REMOVE_TOKEN(state){
        state.token = "";
    }
  }
})

export default store;