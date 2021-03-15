import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('aframe')
require('aframe-orbit-controls')
require('aframe-text-geometry-component')
require('aframe-aabb-collider-component')

/* App.config.isCustomElement = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-box',
  'a-plane',
  'a-assets',
  'a-mixin',
  'a-cone',
  'a-sky',
  'a-sphere',
  'a-gltf-model',
  'a-asset-item'
] */

const app = createApp(App).use(router).use(store)

// app.config.isCustomElement = tag => tag.startsWith('a-')

app.mount('#app')
