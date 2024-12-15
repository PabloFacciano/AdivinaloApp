import { createWebHistory, createRouter } from 'vue-router'

import AppHome from '../views/AppHome.vue'
import AppPageProfile from '../views/AppPageProfile.vue'
import AppFriends from '../views/AppFriends.vue'
import AppSurvey from '../views/AppSurvey.vue'
import HomeFeed from '../components/HomeFeed.vue'
import ProfileMain from '../components/ProfileMain.vue'
import ProfileQuestions from '../components/ProfileQuestions.vue'
import ProfileStats from '../components/ProfileStats.vue'
import ProfileActivity from '../components/ProfileActivity.vue'

const routes = [
  { 
    path: '/friends', 
    redirect: '/friends/current'
  },
  { 
    path: '/friends/:list',  
    props: true,
    children: [
      { 
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
    path: '/profile/:id', 
    component: AppPageProfile,
    props: true,
    meta: {
      title: 'Perfil'
    },
    children: [
      { 
        path: 'questions', 
        component: ProfileQuestions,
        props: true,
        meta: {
          title: 'Perfil',
          detailsView: true
        }
      },
      { 
        path: 'stats', 
        component: ProfileStats,
        props: true,
        meta: {
          title: 'Perfil',
          detailsView: true
        }
      },
      { 
        path: 'activity', 
        component: ProfileActivity,
        props: true,
        meta: {
          title: 'Perfil',
          detailsView: true
        }
      },
      { 
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