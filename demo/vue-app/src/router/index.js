import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import TimeSeriesChartView from '../views/TimeSeriesChartView.vue'
import CirclePackingChartView from '../views/CirclePackingChartView.vue'
import MapboxMapView from '../views/MapboxMapView.vue'
import BubbleChart from '../views/BubbleChart.vue'

Vue.use(VueRouter)

const routes = [{
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
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
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
    },
    {
        path: '/employmentbysector',
        name: 'Employment by Sector and Country',
        component: CirclePackingChartView
    },
    {
        path: '/mapboxmap',
        name: 'Mapbox Map',
        component: MapboxMapView
    },
    {
        path: '/bubblechart',
        name: 'Bar Chart',
        component: BubbleChart
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router