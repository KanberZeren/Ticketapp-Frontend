import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewTicketView from '../views/NewTicketView.vue'
import TicketBearbeitenView from '@/views/TicketBearbeitenView.vue'
import ItServiceSupportView from '../views/ItServiceSupportView.vue'
import BackendSupportView from '../views/BackendSupportView.vue'
import ServiceCenterView from '../views/ServiceCenterView.vue'
import LoginPage from '@/components/LoginPage.vue'
import TicketAnzeige from '@/components/TicketAnzeige.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/NewTicket',
    name: 'NewTicket',
    component: NewTicketView
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
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ticket/:ticketnummer',
    name: 'TicketAnzeige',
    component: TicketAnzeige,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
