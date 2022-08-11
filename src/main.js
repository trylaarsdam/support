import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'

Vue.use(Vuesax, {
  // options here
})

import './assets/vuesax.css' //Vuesax styles
import './assets/material-icons.css';
import './assets/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
