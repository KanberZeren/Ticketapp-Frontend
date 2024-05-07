<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="benutzername">Username:</label>
      <input id="benutzername" v-model="benutzername" type="text" required />

      <label for="passwort">Password:</label>
      <input id="passwort" v-model="passwort" type="password" required />

      <div v-if="error" class="error-message">{{ error }}</div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const benutzername = ref('')
const passwort = ref('')
const error = ref('')
const router = useRouter()
const login = async () => {
  try {
    const response = await axios.post('http://localhost:8080/login', {
      benutzername: benutzername.value,
      passwort: passwort.value
    })
    console.log('Backend Response:', response.data)
    if (response.data === 'Login successful') {
      await router.push('/')
    } else {
      error.value = 'Invalid username or password'
    }
  } catch (error) {
    console.error('Error during login:', error)
    error.value = 'An error occurred during login'
  }
}
</script>

<style scoped>
/* Add your styling here if needed */
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
