import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('aframe')
require('aframe-orbit-controls')
require('aframe-text-geometry-component')

Vue.config.productionTip = false

Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-plane'
]

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')