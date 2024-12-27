import { createWebHistory, createRouter } from 'vue-router'

import AppHome from '../views/AppHome.vue'
import AppPageProfile from '../views/AppPageProfile.vue'
import AppFriends from '../views/AppFriends.vue'
import AppSurvey from '../views/AppSurvey.vue'
import HomeFeed from '../views/HomeFeed.vue'
import ProfileMain from '../views/ProfileMain.vue'
import ProfileQuestions from '../views/ProfileQuestions.vue'
import ProfileStats from '../views/ProfileStats.vue'
import ProfileActivity from '../views/ProfileActivity.vue'

const routes = [
  { 
    name: 'currentFriends',
    path: '/friends', 
    redirect: '/friends/current'
  },
  { 
    path: '/friends/:list',  
    props: true,
    children: [
      { 
        name: 'friends',
        path: '', 
        component: AppFriends,
        props: true,
        name: 'friends',   
        meta: {
          title: 'Amigos'
        },
      }
    ]
  },
  { 
    name: 'profile',
    path: '/profile/:id', 
    component: AppPageProfile,
    props: true,
    meta: {
      title: 'Perfil'
    },
    children: [
      { 
        name: 'profileQuestions',
        path: 'questions', 
        component: ProfileQuestions,
        props: true,
        meta: {
          title: 'Perfil',
          detailsView: true
        }
      },
      { 
        name: 'profileStats',
        path: 'stats', 
        component: ProfileStats,
        props: true,
        meta: {
          title: 'Perfil',
          detailsView: true
        }
      },
      { 
        name: 'profileActivity',
        path: 'activity', 
        component: ProfileActivity,
        props: true,
        meta: {
          title: 'Perfil',
          detailsView: true
        }
      },
      { 
        name: 'profileMain',
        alias: 'info',
        path: '', 
        component: ProfileMain,
        props: true,
        meta: {
          title: 'Perfil',
          detailsView: true
        }
      },
    ]
  },
  { 
    path: '/questions/:id',
    children: [      
      { 
        name: 'survey',
        path: '', 
        component: AppSurvey,
        props: true,
        meta: {
          title: 'Preguntas'
        }
      },
    ]
  },
  { 
    path: '', 
    alias: '/feed',
    component: AppHome,
    meta: {
      title: 'Inicio'
    },
    children: [
      { 
        name: 'feed',
        path: '', 
        component: HomeFeed,
        meta: {
          title: 'Inicio'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: 'active',
  routes,
})

export default router