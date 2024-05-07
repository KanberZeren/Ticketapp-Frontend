import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewTicketView from '../views/NewTicketView.vue'
import TicketBearbeitenView from '@/views/TicketBearbeitenView.vue'
import NotificationView from '../views/NotificationView.vue'
import ItServiceSupportView from '../views/ItServiceSupportView.vue'
import BackendSupportView from '../views/BackendSupportView.vue'
import ServiceCenterView from '../views/ServiceCenterView.vue'
import LoginPage from '@/components/LoginPage.vue'
import TicketAnzeige from '@/components/TicketAnzeige.vue'
import RegistrationPage from '@/components/RegistrationPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/NewTicket',
    name: 'NewTicket',
    component: NewTicketView
  },
  {
    path: '/Notification',
    name: 'Notification',
    component: NotificationView
  },
  {
    path: '/ItServiceSupport',
    name: 'ItServiceSupport',
    component: ItServiceSupportView
  },
  {
    path: '/BackendSupport',
    name: 'BackendSupport',
    component: BackendSupportView
  },
  {
    path: '/ServiceCenter',
    name: 'ServiceCenter',
    component: ServiceCenterView
  },
  {
    path: '/bearbeiten/:id',
    name: 'TicketBearbeitenView',
    component: TicketBearbeitenView,
    props: true
  },
  {
    path: '/Login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/ticket/:ticketnummer',
    name: 'TicketAnzeige',
    component: TicketAnzeige,
    props: true
  },
  {
    path: '/RegistrationPage',
    name: 'RegistrationPage',
    component: RegistrationPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
