<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" class="login-button">Login</button>
      <button @click="goToRegistrationPage" class="btn-link">hier Registrieren</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const credentials = {
        benutzername: this.username,
        passwort: this.password
      }
      axios.post('https://ticketapp-backend-yhar.onrender.com/login', credentials)
        .then(response => {
          if (response.status === 200 && response.data === 'Login successful') {
            this.$router.push({ name: 'home' })
          } else {
            alert('Invalid username or password')
          }
        })
        .catch(error => {
          console.error('Error during login:', error)
          alert('Invalid username or password')
        })
    },
    goToRegistrationPage () {
      this.$router.push({ name: 'RegistrationPage' })
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

.btn-link{
  background-color: white;
  color: #2382d6;
}
</style>
