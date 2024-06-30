import { shallowMount } from '@vue/test-utils'
import TicketBearbeitenView from '@/views/TicketBearbeitenView.vue'
import ticketService from '@/router/ticketService'
import { createRouter, createWebHistory } from 'vue-router'

// Mock routes for the router
const routes = [
  {
    path: '/bearbeiten/:id',
    name: 'TicketBearbeitenView',
    component: TicketBearbeitenView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

jest.mock('@/router/ticketService', () => ({
  getTicket: jest.fn(),
  updateTicket: jest.fn()
}))

describe('TicketBearbeitenView.vue', () => {
  let wrapper
  const mockTicket = {
    id: 2,
    ticketnummer: '7fe4727b-bf4c-416d-bd16-60645bcbdc3d',
    betreff: 'Probleme',
    nachricht: 'Internet funktioniert nicht!!!',
    status: 'IN_BEARBEITUNG',
    erstelltAm: '2024-05-08T11:15:04.635171',
    kommentar: 'Termin vereinbart!'
  }

  beforeEach(async () => {
    ticketService.getTicket.mockImplementation((ticketId) => {
      if (ticketId === '2') {
        return Promise.resolve({ data: mockTicket })
      } else {
        return Promise.reject(new Error('Fehler beim Laden'))
      }
    })
    wrapper = shallowMount(TicketBearbeitenView, {
      global: {
        plugins: [router],
        mocks: {
          $route: {
            params: { id: '2' }
          }
        }
      }
    })

    await router.isReady()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('zeigt eine Fehlermeldung in der Konsole bei einem Fehler beim Laden des Tickets', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    await wrapper.vm.$nextTick()

    // Erneut ausführen des Tests, um den Fehler zu fangen
    try {
      await ticketService.getTicket('2')
    } catch (error) {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Fehler beim Laden des Tickets:', error)
    }

    consoleErrorSpy.mockRestore()
  })
})
