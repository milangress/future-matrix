import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
// import { query } from '@oarepo/vue-query-synchronizer'
// reset

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      query: {
        page: 'int:1',
        point: 'array:',
        x: 'int:0',
        y: 'int:0',
        z: 'int:0',
        yAxis: 'commaarray:Transparenz,Opazität',
        xAxis: 'commaarray:Natur über Mensch,Mensch über Natur',
        zAxis: 'commaarray:Berührung,Virtualität'
      }
    },
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
