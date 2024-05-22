<template>
  <div>
    <h2>Ticket Anzeige</h2>
    <div v-if="ticket">
      <p><strong>Ticketnummer:</strong> {{ ticket.ticketnummer }}</p>
      <p><strong>Betreff:</strong> {{ ticket.betreff }}</p>
      <p><strong>Nachricht:</strong> {{ ticket.nachricht }}</p>
      <p><strong>Status:</strong> {{ ticket.status }}</p>
      <p><strong>Erstellt am:</strong> {{ ticket.erstelltAm }}</p>
    </div>
    <div v-else>
      <p>Ticket nicht gefunden oder ein Fehler ist aufgetreten</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TicketAnzeige',
  data () {
    return {
      tickets: [],
      searchTerm: ''
    }
  },
  created () {
    this.loadTicket()
  },
  methods: {
    async loadTicket () {
      const ticketnummer = this.$route.query.ticketnummer
      try {
        const response = await axios.get(`https://ticketapp-backend-yhar.onrender.com/ticket/${ticketnummer}`)
        this.ticket = response.data
      } catch (error) {
        console.error('Fehler beim Laden des Tickets:', error)
        this.ticket = null
      }
    }
  }
}
</script>
