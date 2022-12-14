import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/auth/LoginView.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import(/* webpackChunkName: "signup" */ "../views/auth/NewAccountView.vue")
  },
  {
    path: "/me",
    name: "profile",
    component: () => import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue")
  },
  {
    path: "/me/tickets",
    name: "personalTickets",
    component: () => import(/* webpackChunkName: "personalTickets" */ "../views/PersonalTicketsView.vue")
  },
  {
    path: "/new",
    name: "TicketCreator",
    component: () => import(/* webpackChunkName: "TicketCreator" */ "../views/TicketCreator.vue")
  },
  {
    path: "/tickets/:id",
    name: "TicketViewer",
    component: () => import(/* webpackChunkName: "TicketViewer" */ "../views/TicketViewer.vue")
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
