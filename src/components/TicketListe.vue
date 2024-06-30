<template>
  <div class="ticket-container">
    <div class="forms_field-row">
      <div class="forms_field">
        <select v-model="currentFilter" class="forms_field-select" required>
          <option value="OFFEN">Offen</option>
          <option value="all">Alle</option>
          <option value="GELÖST">Gelöst</option>
          <option value="IN_BEARBEITUNG">In Bearbeitung</option>
        </select>
      </div>
      <button @click="goToNewTicketView" class="forms_button">Neues Ticket erstellen</button>
    </div>
    <div class="forms_field-row">
      <input v-model="searchTerm" type="text" class="forms_field-input" placeholder="Ticketnummer eingeben">
      <button @click="searchTicket" class="forms_button">Suchen</button>
    </div>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th>ID</th>
        <th>Ticketnummer</th>
        <th>Betreff</th>
        <th>Nachricht</th>
        <th>Status</th>
        <th>Erstellt am</th>
        <th>Optionen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="ticket in filteredTickets" :key="ticket.id">
        <td>{{ ticket.id }}</td>
        <td>{{ ticket.ticketnummer }}</td>
        <td>{{ ticket.betreff }}</td>
        <td>{{ ticket.nachricht }}</td>
        <td>{{ ticket.status }}</td>
        <td>{{ formatDateTime(ticket.erstelltAm) }}</td>
        <td>
          <button @click="deleteTicket(ticket.id)" class="forms_button-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </button>
          <router-link :to="{ name: 'TicketBearbeitenView', params: { id: ticket.id } }">
            <button class="forms_button-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
              </svg>
            </button>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ticketService from '@/router/ticketService'

export default {
  data () {
    return {
      tickets: [],
      currentFilter: 'all',
      searchTerm: ''
    }
  },
  created () {
    this.fetchTickets()
  },
  computed: {
    filteredTickets () {
      let filtered = this.tickets

      if (this.currentFilter !== 'all') {
        filtered = filtered.filter(ticket => ticket.status === this.currentFilter)
      }

      if (this.searchTerm) {
        filtered = filtered.filter(ticket => ticket.ticketnummer.includes(this.searchTerm))
      }

      return filtered
    }
  },
  methods: {
    async fetchTickets () {
      try {
        const response = await ticketService.getAllTickets()
        this.tickets = response.data
      } catch (error) {
        console.error('Fehler beim Abrufen der Tickets:', error)
      }
    },
    formatDateTime (dateTimeString) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      const dateTime = new Date(dateTimeString)
      return dateTime.toLocaleDateString('de-DE', options)
    },
    async deleteTicket (ticketId) {
      try {
        await ticketService.deleteTicket(ticketId)
        this.fetchTickets()
      } catch (error) {
        console.error('Fehler beim Löschen des Tickets:', error)
      }
    },
    editTicket (ticketId) {
      this.$router.push({ name: 'TicketBearbeitenView', params: { id: ticketId } })
    },
    goToNewTicketView () {
      this.$router.push({ name: 'NewTicket' })
    },
    async searchTicket () {
      if (this.searchTerm) {
        try {
          const response = await ticketService.getTicketByTicketnummer(this.searchTerm)
          const searchedTickets = response.data ? [response.data] : []
          this.tickets = searchedTickets
          this.currentFilter = 'all'
        } catch (error) {
          console.error('Fehler beim Suchen des Tickets:', error)
        }
      }
    }
  }
}
</script>

<style scoped>
.ticket-container {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.forms_title {
  font-size: 2rem;
  font-family: 'Montserrat', sans-serif;
  margin-bottom: 20px;
  color: #333;
}

.forms_field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.forms_field-half {
  flex: 1;
  margin-right: 10px;
}

.forms_field-select {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #555;
}

.forms_field-input {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #555;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: fixed;
}

.table th, .table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table th {
  background-color: #f0f8ff; /* light blue */
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
}

.table td {
  font-size: 1rem;
}

.forms_button {
  padding: 10px 20px;
  background-color: #e8716d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.forms_button:hover {
  background-color: #e4554f;
}

.forms_button-primary {
  padding: 8px 16px;
  background-color: #78a882;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.forms_button-primary:hover {
  background-color: #6ddc87;
}

.forms_button-danger {
  padding: 8px 16px;
  background-color: #d1535b;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.forms_button-danger:hover {
  background-color: #c82333;
}

.table th {
  background-color: #e8716d;
  color: #fff; /* Weiß oder eine andere passende Textfarbe */
  font-size: 1.1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .forms_field-row {
    flex-direction: column;
  }

  .forms_field-half {
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>
