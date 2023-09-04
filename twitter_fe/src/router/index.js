import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LeaderboadView from '@/views/LeaderboardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegistrationView from '@/views/RegistrationView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/leaderboad',
      name: 'leaderboad',
      component: LeaderboadView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      props: {
        pageName: "Login Page"
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView,
      props: {
        pageName: "Registration Page"
      }
    }
  ]
})

export default router
