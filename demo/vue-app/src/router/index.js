import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import TimeSeriesChartView from '../views/TimeSeriesChartView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/employment',
    name: 'Employment',
    component: Dashboard
  },
  {
    path: '/wagegap',
    name: 'Wage Gap',
    component: Dashboard
  },
  {
    path: '/monthlywages',
    name: 'Monthly Wages',
    component: TimeSeriesChartView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router