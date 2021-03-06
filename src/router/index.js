import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Person from '@/views/Person.vue'
import Editcxt from '@/views/Editcxt.vue'
import Index from '@/views/Index.vue'
import Register from '@/views/Register.vue'
import Article from '@/views/Article.vue'
import Comment from '@/views/Comment.vue'
import Search from '@/views/Search.vue'
import Category from '@/views/Category.vue'
import Follow from '@/views/Follow.vue'
import Alist from '@/views/Alist.vue'
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
  },
  {
    name: 'Editcxt',
    path: '/editcxt/:id',
    component: Editcxt
  },
  {
    name: 'Index',
    path: '/',
    component: Index
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'Article',
    path: '/article/:id',
    component: Article
  },
  {
    name: 'Comment',
    path: '/comment/:id',
    component: Comment
  },
  {
    name: 'Search',
    path: '/search',
    component: Search
  },
  {
    name: 'Category',
    path: '/category',
    component: Category
  },
  {
    name: 'Follow',
    path: '/follow',
    component: Follow
  },
  {
    name: 'Alist',
    path: '/alist',
    component: Alist
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/person') !== -1) {
    let token = localStorage.getItem('toutiao_tt_token')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
  next()
})
export default router
