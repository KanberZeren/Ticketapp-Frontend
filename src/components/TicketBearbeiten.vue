<template>
  <div class="ticket-edit">
    <h1>Ticket bearbeiten</h1>
    <form @submit.prevent="submitForm" class="ticket-form">
      <div class="form-group">
        <label for="betreff">Betreff:</label>
        <input type="text" v-model="editedTicket.betreff" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="nachricht">Nachricht:</label>
        <textarea v-model="editedTicket.nachricht" class="form-control" required></textarea>
      </div>

      <div class="form-group">
        <label for="status">Status:</label>
        <select v-model="editedTicket.status" class="form-control" required>
          <option value="GELÖST">Gelöst</option>
          <option value="OFFEN">Offen</option>
          <option value="WARTEND">Wartend</option>
          <option value="IN_BEARBEITUNG">In Bearbeitung</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Speichern</button>
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

<style scoped>
.ticket-edit {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.ticket-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
}
</style>
