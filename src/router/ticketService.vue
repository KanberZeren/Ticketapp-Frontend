<script>
import axios from 'axios'
import { BASE_PATH } from '@/config'
export default {
  getAllTickets () {
    return axios.get(`${BASE_PATH}/tickets`)
  },
  getTicket: async (ticketId) => {
    return await axios.get(`${BASE_PATH}/ticket/${ticketId}`)
  },
  updateTicket: async (ticketId, updatedTicket) => {
    return await axios.put(`${BASE_PATH}/ticket/${ticketId}`, updatedTicket)
  },
  deleteTicket (ticketId) {
    return axios.delete(`${BASE_PATH}/ticket/${ticketId}`)
  },
  getTicketByTicketnummer (ticketnummer) {
    return axios.get(`${BASE_PATH}/ticketByTicketnummer/${ticketnummer}`)
  }
}
</script>

<style scoped>
</style>
