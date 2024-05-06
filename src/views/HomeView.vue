<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomePage msg="Welcome to our Ticket Application!"/>
    <button @click="testCommunication">Test Kommunikation</button>
  </div>
</template>

<script>

import HomePage from '@/components/HomePage.vue'
import axios from 'axios'

export default {
  name: 'HomeView',
  components: {
    HomePage
  },
  data () {
    return {
      employeeList: []
    }
  },
  methods: {
    testCommunication () {
      axios.get('http://localhost:8080/test')
        .then(response => {
          console.log('Kommunikationstest erfolgreich:', response.data)
          alert(response.data)
        })
        .catch(error => {
          console.error('Fehler bei der Kommunikationstest-Anfrage', error)
          alert('Fehler bei der Kommunikation mit dem Backend!')
        })
    },
    fetchEmployeeData (id) {
      axios.get(`http://localhost:8080/mitarbeiter/${id}`)
        .then(response => {
          if (response.data) {
            this.employeeList = [response.data]
          } else {
            console.log('Kein Mitarbeiter mit dieser ID')
          }
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Mitarbeiterdaten', error)
        })
    }
  }
}
</script>

<style>
</style>
