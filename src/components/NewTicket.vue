<template>
  <div class="NewTicket">
    <h1>Create New Ticket</h1>
    <form @submit.prevent="saveTicket">
      <label for="betreff">Betreff:</label>
      <input v-model="betreff" type="text" required />

      <label for="nachricht">Nachricht:</label>
      <textarea v-model="nachricht" required></textarea>

      <label for="status">Status:</label>
      <select v-model="status" required>
        <option value="OFFEN">Offen</option>
        <option value="GELÖST">Gelöst</option>
        <option value="WARTEND">Wartend</option>
        <option value="IN_BEARBEITUNG">in Bearbeitung</option>
      </select>

      <!-- Display the created at time after saving a new ticket -->
      <div v-if="erstelltAm">
        <label>Erstellt am:</label>
        <span>{{ erstelltAm }}</span>
      </div>

      <button type="submit">Speichern</button>
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
      status: 'Offen', // default set "Offen" da Ticket neu erstell und somit noch nicht bearbeitet sein kann
      erstelltAm: null
    }
  },
  methods: {
    async saveTicket () {
      try {
        const response = await axios.post('http://localhost:8080/ticket', {
          betreff: this.betreff,
          nachricht: this.nachricht,
          status: this.status
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
</style>
