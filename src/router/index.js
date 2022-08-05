import Vue from 'vue'
import VueRouter from 'vue-router'
 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/home/cn',
    
  },
  {
    path: '/home/:language',
    name: 'home',
    component: () => import('../views/Home.vue'),
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
  {
    path:'/Agent/:language',
    name:'Agent',
    component:()=> import("../views/Agent.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
