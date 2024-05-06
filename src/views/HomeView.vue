<template>
  <div class="home">
    <HomePage msg="Welcome to our Ticketsystem!"/>
    <button @click="goToNewTicketView">Neues Ticket erstellen</button>
    <TicketListe/>
  </div>
</template>

<script>

import HomePage from '@/components/HomePage.vue'
// import axios from 'axios'
import TicketListe from '@/components/TicketListe.vue'

export default {
  name: 'HomeView',
  components: {
    HomePage,
    TicketListe
  },
  methods: {
    goToNewTicketView () {
      this.$router.push({ name: 'NewTicket' })
    }
  }
}
</script>

<style>
</style>
