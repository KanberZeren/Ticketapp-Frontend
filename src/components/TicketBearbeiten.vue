<template>
  <div class="ticket-edit">
    <h1 class="text-center mb-4">Ticket bearbeiten</h1>
    <form @submit.prevent="submitForm" class="ticket-form">
      <div class="form-group">
        <label for="betreff">Betreff:</label>
        <input type="text" v-model="editedTicket.betreff" class="form-control" required>
      </div>

      <div class="form-group">
        <label for="nachricht">Nachricht:</label>
        <textarea v-model="editedTicket.nachricht" class="form-control" rows="6" required></textarea>
      </div>

      <div class="form-group">
        <label for="kommentar">Kommentar:</label>
        <textarea v-model="editedTicket.kommentar" class="form-control" rows="6" required></textarea>
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
      <div v-if="saveSuccess" class="alert alert-success mt-3">
        Ihr Ticket wurde erfolgreich gespeichert!
      </div>
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
        status: '',
        kommentar: ''
      },
      saveSuccess: false
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
        this.saveSuccess = true
      } catch (error) {
        console.error('Fehler beim Aktualisieren des Tickets:', error)
      }
    }
  }
}
</script>

<style scoped>
.ticket-edit {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Übernahme aus body */
}

.ticket-form {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: #f8f9fa;
}

.btn-primary {
  background-color: #e8716d;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
}

.btn-primary:hover {
  background-color: #e4554f;
}

.alert {
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
}

h1{
  color: #e8716d;
}
</style>
