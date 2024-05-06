<script>
import axios from 'axios'

export default {
  getAllTickets () {
    return axios.get('http://localhost:8080/tickets')
  },
  getTicket: async (ticketId) => {
    return await axios.get(`http://localhost:8080/ticket/${ticketId}`)
  },
  updateTicket: async (ticketId, updatedTicket) => {
    return await axios.put(`http://localhost:8080/ticket/${ticketId}`, updatedTicket)
  },
  deleteTicket (ticketId) {
    return axios.delete(`http://localhost:8080/ticket/${ticketId}`)
  },
  getTicketByTicketnummer (ticketnummer) {
    return axios.get(`http://localhost:8080/ticketByTicketnummer/${ticketnummer}`)
  }
}
</script>

<style scoped>
</style>
