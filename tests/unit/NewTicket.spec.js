// NewTicket.spec.js
import { mount } from '@vue/test-utils'
import NewTicket from '@/components/NewTicket.vue'
import axios from 'axios'

jest.mock('axios', () => ({
  post: jest.fn()
}))

describe('NewTicket.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(NewTicket)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('handles error when creating a ticket', async () => {
    axios.post.mockRejectedValue(new Error('Failed to create ticket'))

    const betreffInput = wrapper.find('input[type="text"]')
    const nachrichtInput = wrapper.find('textarea')
    const form = wrapper.find('form')

    // Set input values
    await betreffInput.setValue('Test Betreff')
    await nachrichtInput.setValue('Test Nachricht')

    // Submit the form
    await form.trigger('submit.prevent')

    // Wait for Vue to update the DOM
    await wrapper.vm.$nextTick()

    // Assert that ticket-info is not displayed
    const ticketInfo = wrapper.find('.ticket-info')
    expect(ticketInfo.exists()).toBe(false)

    // Assert error handling
    expect(wrapper.vm.ticket).toBeNull()
  })
})
