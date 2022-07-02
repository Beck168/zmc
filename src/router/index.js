import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/home/en',
    
  },
  {
    path: '/home/:language',
    name: 'home',
    component: Home,
  },
  {
    path: '/Product/:language',
    name: 'Product',
    component: () => import('../views/Product.vue')
  },
  {
    path:'/SecurityCheck/:language',
    name:'SecurityCheck',
   
    component:()=> import('../views/SecurityCheck.vue')
  },
  {
    path:'/BrandIntroduction/:language',
    name:'BrandIntroduction',
    component:()=> import("../views/BrandIntroduction.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
