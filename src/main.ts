import Vue from 'vue'
import App from './App.vue'
 import Vuex from 'vuex'
import storeModules from './store'

import num2Thousands from '@/utils/num2Thousands'
import { RPX } from '@/service/info'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: storeModules
})

Vue.config.productionTip = false
Vue.prototype.RPX = RPX

Vue.filter('num2Thousands', num2Thousands)

new Vue({
  store,
  render: (h) => h(App)
}).$mount()
