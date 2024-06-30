import { mount } from '@vue/test-utils'
import TicketListe from '@/components/TicketListe.vue'
import ticketService from '@/router/ticketService'

jest.mock('@/router/ticketService', () => ({
  deleteTicket: jest.fn(),
  getTicket: jest.fn() // Mock getTicket method for retry attempt
}))

describe('TicketListe.vue', () => {
  let wrapper

  beforeEach(() => {
    // Mock data for testing
    const tickets = [
      {
        id: 1,
        ticketnummer: 'T001',
        betreff: 'Test Ticket 1',
        nachricht: 'Dies ist ein Test Ticket 1',
        status: 'OFFEN',
        erstelltAm: '2023-01-01T10:00:00'
      },
      {
        id: 2,
        ticketnummer: 'T002',
        betreff: 'Test Ticket 2',
        nachricht: 'Dies ist ein Test Ticket 2',
        status: 'GELÖST',
        erstelltAm: '2023-01-02T11:00:00'
      }
    ]

    wrapper = mount(TicketListe, {
      data () {
        return {
          tickets: tickets
        }
      }
    })
  })

  it('renders tickets correctly from API', async () => {
    await wrapper.vm.$nextTick()

    // Check if tickets are rendered
    const renderedTickets = wrapper.findAll('tbody tr')
    expect(renderedTickets).toHaveLength(2) // Check if two tickets are rendered

    // Check if specific ticket data is rendered correctly
    const firstTicketColumns = renderedTickets[0].findAll('td')
    expect(firstTicketColumns[0].text()).toBe('1') // Check ID
    expect(firstTicketColumns[1].text()).toBe('T001') // Check Ticketnummer
    expect(firstTicketColumns[2].text()).toBe('Test Ticket 1') // Check Betreff
    expect(firstTicketColumns[3].text()).toBe('Dies ist ein Test Ticket 1') // Check Nachricht
    expect(firstTicketColumns[4].text()).toBe('OFFEN') // Check Status

    // Check Erstellt am (formatted)
    const formattedDateTime = wrapper.vm.formatDateTime('2023-01-01T10:00:00')
    expect(firstTicketColumns[5].text()).toContain(formattedDateTime)
  })

  it('fails to fetch a deleted ticket', async () => {
    await wrapper.vm.$nextTick()

    // Mock delete response
    ticketService.deleteTicket.mockResolvedValue()

    // Simulate delete button click
    const deleteButton = wrapper.find('.forms_button-danger')
    await deleteButton.trigger('click')

    // Check if deleteTicket method is called with correct ticket ID
    expect(ticketService.deleteTicket).toHaveBeenCalledWith(1)

    // Await next tick to allow component to update
    await wrapper.vm.$nextTick()

    // Mock unsuccessful getTicket response (ticket not found)
    ticketService.getTicket.mockRejectedValue(new Error('Ticket not found'))

    // Attempt to get the deleted ticket again (could be part of your component logic)
    const deletedTicketId = 1 // Assuming the ID of the deleted ticket
    try {
      await wrapper.vm.$nextTick()
      await ticketService.getTicket(deletedTicketId)
    } catch (error) {
      // Check if the error message matches the expected error
      expect(error.message).toBe('Ticket not found')
    }
  })
})
