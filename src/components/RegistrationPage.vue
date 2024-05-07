<template>
  <div class="registration-page">
    <h1>Register as New Employee</h1>
    <form @submit.prevent="registerEmployee" class="registration-form">
      <div class="form-group">
        <label for="vorname">First Name:</label>
        <input v-model="vorname" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="nachname">Last Name:</label>
        <input v-model="nachname" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="personalnummer">Employee ID:</label>
        <input v-model="personalnummer" type="number" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="mailadresse">Email Address:</label>
        <input v-model="mailadresse" type="email" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="benutzername">Username:</label>
        <input v-model="benutzername" type="text" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="passwort">Password:</label>
        <input v-model="passwort" type="password" class="form-control" required />
      </div>

      <div class="form-group">
        <label for="mitarbeiterBereich">Employee Area:</label>
        <select v-model="mitarbeiterBereich" class="form-control" required>
          <option value="FACHLICHER_MITARBEITER">Fachlicher Mitarbeiter</option>
          <option value="IT_MITARBEITER">IT-Mitarbeiter</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Register</button>
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
.registration-page {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.registration-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 4px;
}
</style>
