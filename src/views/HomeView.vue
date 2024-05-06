<template>
  <div class="home">
    <HomePage msg="Welcome to our Ticketsystem!"/>
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
  }
}
</script>

<style>
</style>
