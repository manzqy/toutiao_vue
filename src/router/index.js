import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Person from '@/views/Person.vue'
Vue.use(VueRouter)

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Person',
    path: '/person/:id',
    component: Person
  }
]
const router = new VueRouter({
  routes
})
export default router
