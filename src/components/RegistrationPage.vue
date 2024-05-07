<template>
  <div class="registration-page">
    <h1>Register as New Employee</h1>
    <form @submit.prevent="registerEmployee">
      <label for="vorname">First Name:</label>
      <input v-model="vorname" type="text" required />

      <label for="nachname">Last Name:</label>
      <input v-model="nachname" type="text" required />

      <label for="personalnummer">Employee ID:</label>
      <input v-model="personalnummer" type="number" required />

      <label for="mailadresse">Email Address:</label>
      <input v-model="mailadresse" type="email" required />

      <label for="benutzername">Username:</label>
      <input v-model="benutzername" type="text" required />

      <label for="passwort">Password:</label>
      <input v-model="passwort" type="password" required />

      <label for="mitarbeiterBereich">Employee Area:</label>
      <select v-model="mitarbeiterBereich" required>
        <option value="FACHLICHER_MITARBEITER">Fachlicher Mitarbeiter</option>
        <option value="IT_MITARBEITER">IT-Mitarbeiter</option>
      </select>

      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const vorname = ref('')
const nachname = ref('')
const personalnummer = ref(0)
const mailadresse = ref('')
const benutzername = ref('')
const passwort = ref('')
const mitarbeiterBereich = ref('FACHLICHER_MITARBEITER') // default
const registerEmployee = async () => {
  try {
    const response = await axios.post('http://localhost:8080/mitarbeiter', {
      vorname: vorname.value,
      nachname: nachname.value,
      personalnummer: personalnummer.value,
      mailadresse: mailadresse.value,
      benutzername: benutzername.value,
      passwort: passwort.value,
      mitarbeiterBereich: mitarbeiterBereich.value
    })
    console.log('Employee registered:', response.data)
    // Für später: redirect to SuccsessPage
  } catch (error) {
    console.error('Error registering employee:', error)
  }
}
</script>

<style scoped>
</style>
