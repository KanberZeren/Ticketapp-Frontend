<script>
import axios from 'axios'

export default {
  getAllTickets () {
    return axios.get('https://ticketapp-backend-yhar.onrender.com/tickets')
  },
  getTicket: async (ticketId) => {
    return await axios.get(`https://ticketapp-backend-yhar.onrender.com/ticket/${ticketId}`)
  },
  updateTicket: async (ticketId, updatedTicket) => {
    return await axios.put(`https://ticketapp-backend-yhar.onrender.com/ticket/${ticketId}`, updatedTicket)
  },
  deleteTicket (ticketId) {
    return axios.delete(`https://ticketapp-backend-yhar.onrender.com/ticket/${ticketId}`)
  },
  getTicketByTicketnummer (ticketnummer) {
    return axios.get(`https://ticketapp-backend-yhar.onrender.com/ticketByTicketnummer/${ticketnummer}`)
  }
}
</script>

<style scoped>
</style>
