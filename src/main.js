import './plugins'
import './components'
import Vue from 'vue'
import fps from 'fps-indicator'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

fps({
  position: 'top-right',
  style: `
    font-size: 24px;
  `,
})

new Vue({
  router,
  store,
  ...App,
}).$mount('#app')
