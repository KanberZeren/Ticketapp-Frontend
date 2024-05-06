<template>
  <div>
    <h2>Mitarbeiterliste</h2>
    <ul>
      <li v-for="employee in employeeList" :key="employee.id">
        {{ employee.vorname }} {{ employee.nachname }} - Personalnummer: {{ employee.personalnummer }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      employeeList: []
    }
  },
  mounted () {
    this.fetchEmployeeData()
  },
  methods: {
    fetchEmployeeData () {
      axios.get('http://localhost:8080/mitarbeiter')
        .then(response => {
          this.employeeList = response.data
        })
        .catch(error => {
          console.error('Fehler beim Abrufen der Mitarbeiterdaten', error)
        })
    }
  }
}
</script>

<style scoped>
</style>
