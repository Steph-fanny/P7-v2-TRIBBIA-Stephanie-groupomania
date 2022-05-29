
import { createRouter, createWebHashHistory } from 'vue-router'

import homePage from '@/views/homePage.vue'
import loginUser from '@/views/loginUser.vue'
import signupUser from '@/views/signupUser.vue'
import accountUser from '@/views/accountUser.vue'
import forumPage from '@/views/forumPage.vue'
import listPostPage from '@/views/listPostPage.vue'
import listUsersAdmin from '@/views/listUsersAdmin.vue'



const routes = [
  {
    //chemin 
    path: '/',
    name: 'homePage',
    // view correspondante
    component: homePage
  },
  {
    path: '/login',
    name: 'login',
    component : loginUser    
  },

  {
    path: '/signup',
    name: 'signup',
    component : signupUser   
  },
  {
    path: '/account/user',
    name: 'accounts',
    component : accountUser 
  },

  {
    path: '/forum',
    name: 'forumPage',
    component :forumPage 
  },
  {
    path: '/listPostPage',
    name: 'listPostPage',
    component : listPostPage
  },
  {
    path: '/listUsers',
    name: 'listUsersAdmin',
    component : listUsersAdmin
  },
  
]

const router = createRouter({
  // option de create router : rajouter des # pour les liens
  history: createWebHashHistory(),
  routes,

})

export default router
