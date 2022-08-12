import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'

Vue.use(Vuesax, {
  // options here
})

import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'material-icons/css/material-icons.css';
import './assets/global.css'

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import {auth, onAuthStateChanged} from "@/functions/auth"
const api = require("@/functions/api-requests.js");
const config = require("../config.json")

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(`Signed in UID: ${uid}`);

    // Get user DB doc
    await api.updateAPIAuth()
    let response = await api.axios.get(config["api-hostname"] + "/api/v1/accounts/" + uid);
    if(response.data.status == "success") {
      console.log(response.data.user)
      app.$store.commit("setUser", response.data.user)
    } else {
      console.log(response.data)
    }
  } else {
    // User is signed out
    console.log("No user signed in");
  }
});