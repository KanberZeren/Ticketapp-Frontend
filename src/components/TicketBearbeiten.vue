<template>
  <div>
    <h1>Ticket bearbeiten</h1>
    <form @submit.prevent="submitForm">
      <label for="betreff">Betreff:</label>
      <input type="text" v-model="editedTicket.betreff" required>
      <br>
      <label for="nachricht">Nachricht:</label>
      <textarea v-model="editedTicket.nachricht" required></textarea>
      <br>
      <label for="status">Status:</label>
      <select v-model="editedTicket.status" required>
        <option value="GELÖST">Gelöst</option>
        <option value="OFFEN">Offen</option>
        <option value="WARTEND">Wartend</option>
        <option value="IN_BEARBEITUNG">In Bearbeitung</option>
      </select>
      <br>
      <button type="submit">Speichern</button>
    </form>
  </div>
</template>

<script>
import ticketService from '@/router/ticketService'
export default {
  data () {
    return {
      editedTicket: {
        betreff: '',
        nachricht: '',
        status: ''
      }
    }
  },
  created () {
    this.loadTicket()
  },
  methods: {
    async loadTicket () {
      try {
        const ticketId = this.$route.params.id
        const response = await ticketService.getTicket(ticketId)
        console.log('Geladene Ticketdaten:', response.data)
        this.editedTicket = { ...response.data }
      } catch (error) {
        console.error('Fehler beim Laden des Tickets:', error)
      }
    },
    async submitForm () {
      try {
        const ticketId = this.$route.params.id
        await ticketService.updateTicket(ticketId, this.editedTicket)
        this.$router.push({ name: 'TicketListe' })
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Tickets:', error)
      }
    }
  }
}
</script>

<style>
</style>
