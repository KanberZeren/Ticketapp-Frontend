<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-8 mx-auto">
        <h2 class="text-center mt-4 mb-4">Neues Ticket erstellen</h2>
        <div id="ticketBox">
          <div id="ticketBoxCenter">
            <form v-if="!ticket" @submit.prevent="saveTicket" class="ticket-form">
              <div class="form-group">
                <label for="betreff" class="mt-3">Betreff</label>
                <input v-model="betreff" id="mainIssue" type="text" required class="form-control" />
              </div>

              <div class="form-group">
                <label for="nachricht" class="mt-3">Nachricht</label>
                <textarea v-model="nachricht" id="details" required class="form-control" rows="2"></textarea>
              </div>

              <div class="text-center">
                <p id="errMsg" class="text-center mt-2"></p>
                <button type="submit" class="btn btn-secondary text-center mt-2">Erstellen</button>
              </div>
            </form>

            <div v-if="ticket" class="ticket-info">
              <p class="mb-4 mt-5"><strong>Ticketnummer:</strong> {{ ticket.ticketnummer }}</p>
              <p class="mb-4" ><strong>Betreff:</strong> {{ ticket.betreff }}</p>
              <p class="mb-4" ><strong>Nachricht:</strong> {{ ticket.nachricht }}</p>
              <p class="mb-4" ><strong>Status:</strong> {{ ticket.status }}</p>
              <p class="mb-4" ><strong>Erstellt am:</strong> {{ ticket.erstelltAm }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BASE_PATH } from '@/config'
import axios from 'axios'

export default {
  data () {
    return {
      betreff: '',
      nachricht: '',
      ticket: null
    }
  },
  methods: {
    async saveTicket () {
      try {
        const response = await axios.post(`${BASE_PATH}/ticket`, {
          betreff: this.betreff,
          nachricht: this.nachricht,
          status: 'OFFEN'
        })
        console.log('Ticket created:', response.data)
        this.ticket = response.data
      } catch (error) {
        console.error('Error creating ticket:', error)
        this.ticket = null
      }
    }
  }
}
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}

#ticketBox {
  padding: 1em;
  background: #bdc3c7;
  background-color: lightgrey;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: 50vh;
  box-sizing: border-box;
}

#confirmation {
  display: none;
}

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

.created-at, .ticket-number {
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

.ticket-info {
  text-align: left;
  padding-left: 150px;
}
</style>
