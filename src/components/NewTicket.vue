<template>
  <div class="new-ticket-container">
    <h1>Create New Ticket</h1>
    <form @submit.prevent="saveTicket" class="ticket-form">
      <div class="form-group">
        <label for="betreff">Betreff:</label>
        <input v-model="betreff" type="text" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="nachricht">Nachricht:</label>
        <textarea v-model="nachricht" required class="form-control"></textarea>
      </div>

      <!-- Display the created time after saving a new ticket -->
      <div v-if="erstelltAm" class="form-group">
        <label>Erstellt am:</label>
        <span class="created-at">{{ erstelltAm }}</span>
      </div>

      <button type="submit" class="btn btn-primary">Speichern</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      betreff: '',
      nachricht: '',
      status: 'Offen',
      erstelltAm: null
    }
  },
  methods: {
    async saveTicket () {
      try {
        const response = await axios.post('https://ticketapp-backend-yhar.onrender.com/ticket', {
          betreff: this.betreff,
          nachricht: this.nachricht,
          status: 'OFFEN'
        })
        console.log('Ticket created:', response.data)
        this.erstelltAm = response.data.erstelltAm
      } catch (error) {
        console.error('Error creating ticket:', error)
      }
    }
  }
}
</script>

<style scoped>
.new-ticket-container {
  max-width: 600px;
  margin: auto;
}

.ticket-form {
  display: grid;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.created-at {
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-control:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}
</style>
