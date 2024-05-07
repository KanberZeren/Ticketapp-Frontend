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
export default {
  name: 'TicketAnzeige',
  data () {
    return {
      ticket: null
    }
  },
  created () {
    this.loadTicket()
  },
  watch: {
    '$route.params.ticketnummer': 'loadTicket'
  },
  methods: {
    async loadTicket () {
      const ticketnummer = this.$route.params.ticketnummer
      try {
        if (!this.$service) {
          console.error('Service nicht korrekt initialisiert.')
          return
        }
        this.ticket = await this.$service.getTicketByTicketnummer(ticketnummer)
        if (!this.ticket) {
          console.warn('Ticket nicht gefunden:', ticketnummer)
        }
      } catch (error) {
        console.error('Fehler beim Laden des Tickets:', error)
        this.ticket = null
      }
    }
  }
}
</script>
