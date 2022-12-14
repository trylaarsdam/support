import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navAppearance: {
      sidebar: false,
      appBar: true,
      darkMode: false,
    },
    signedInUser: {

    },
    signedIn: false,
    
  },
  getters: {
  },
  mutations: {
    showSidebar(state) {
      state.navAppearance.sidebar = true
    },
    hideSidebar(state) {
      state.navAppearance.sidebar = false
    },
    showAppBar(state) {
      state.navAppearance.appBar = true
    },
    hideAppBar(state) {
      state.navAppearance.appBar = false
    },
    setUser(state, user) {
      state.signedInUser = user
    }
  },
  actions: {
  },
  modules: {
  },
})
