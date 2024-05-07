<template>
  <div class="ticket-container">
    <h1 class="mb-4">Alle Tickets</h1>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex">
        <select v-model="currentFilter" class="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <option value="OFFEN">Offen</option>
          <option value="all">Alle</option>
          <option value="GELÖST">Gelöst</option>
          <option value="IN_BEARBEITUNG">in Bearbeitung</option>
        </select>
      </div>
      <button @click="goToNewTicketView" class="btn btn-primary">Neues Ticket</button>
      <div class="d-flex">
        <input v-model="searchTerm" type="text" class="form-control" placeholder="Ticketnummer eingeben">
        <button @click="searchTicket" class="btn btn-outline-primary">Suchen</button>
      </div>
    </div>
    <table class="table table-striped table-hover">
      <thead class="thead-pastel-blue">
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
          <button @click="deleteTicket(ticket.id)" class="btn btn-danger">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
            </svg>
          </button>
          <router-link :to="{ name: 'TicketBearbeitenView', params: { id: ticket.id } }">
            <button class="btn btn-primary">
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
      try {
        const response = await ticketService.getTicketByTicketnummer(this.searchTerm)
        this.tickets = response.data ? [response.data] : []
      } catch (error) {
        console.error('Fehler beim Suchen des Tickets:', error)
      }
    }
  }
}
</script>

<style scoped>
.ticket-container {
  margin: auto;
  margin-left: 20px;
  flex-direction: column;
  padding: 20px;
}

.new-ticket-btn {
  background-color: #87CEEB;
  border: none;
  color: white;
  padding: 15px 15px;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.btn-primary {
  margin-right: 10px;
}

.thead-pastel-blue {
  background-color: #87CEEB;
  color: white;
}

body.dark-mode .new-ticket-btn {
  background-color: #555;
}

</style>
