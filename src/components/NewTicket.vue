<template>
  <div class="user">
    <div class="user_options-container">
      <div class="user_options-text">
        <div class="user_options-unregistered">
          <h2 class="user_unregistered-title">Neues Ticket erstellen</h2>
          <form v-if="!ticket" @submit.prevent="saveTicket" class="forms_form">
            <div class="forms_field">
              <input v-model="betreff" type="text" placeholder="Betreff" class="forms_field-input" required autofocus />
            </div>
            <div class="forms_field">
              <textarea v-model="nachricht" placeholder="Nachricht" class="forms_field-input" rows="2" required></textarea>
            </div>
            <div class="forms_buttons">
              <input type="submit" value="Erstellen" class="forms_buttons-action">
            </div>
          </form>
          <div v-if="ticket" class="ticket-info">
            <p><strong>Ticketnummer:</strong> {{ ticket.ticketnummer }}</p>
            <p><strong>Betreff:</strong> {{ ticket.betreff }}</p>
            <p><strong>Nachricht:</strong> {{ ticket.nachricht }}</p>
            <p><strong>Status:</strong> {{ ticket.status }}</p>
            <p><strong>Erstellt am:</strong> {{ formatDate(ticket.erstelltAm) }}</p>
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
    },
    formatDate (date) {
      const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(date).toLocaleDateString('de-DE', options)
    }
  }
}
</script>

<style scoped>
.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #ccc;
}

.user_options-container {
  position: relative;
  width: 80%;
}

.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(60, 59, 59, 0.85);
  border-radius: 3px;
  color: #fff;
  font-weight: 300;
  padding: 75px 45px;
}

.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
}

.user_options-unregistered {
  width: 100%;
}

.forms_field {
  margin-bottom: 20px;
}

.forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #555;
  letter-spacing: 0.1rem;
  transition: border-color 0.2s ease-in-out;
}

.forms_field-input:focus {
  border-color: #333;
}

.forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}

.forms_buttons-action {
  background-color: #e8716d;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}

.ticket-info {
  margin-top: 20px;
  padding-left: 0;
}

.ticket-info p {
  margin-bottom: 10px;
}
</style>
