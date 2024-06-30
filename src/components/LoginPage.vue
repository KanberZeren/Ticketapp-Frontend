<template>
  <div class="login">
    <section class="user">
      <div class="user_options-container">
        <div class="user_options-text">
          <div class="user_options-unregistered">
            <h2 class="user_unregistered-title">Don't have an account?</h2>
            <p class="user_unregistered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
            <button class="user_unregistered-signup" id="signup-button">Sign up</button>
          </div>

          <div class="user_options-registered">
            <h2 class="user_registered-title">Have an account?</h2>
            <p class="user_registered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
            <button class="user_registered-login" id="login-button">Login</button>
          </div>
        </div>

        <div class="user_options-forms" id="user_options-forms">
          <div class="user_forms-login">
            <h2 class="forms_title">Login</h2>
            <form class="forms_form" @submit.prevent="login">
              <fieldset class="forms_fieldset">
                <div class="forms_field">
                  <input type="text" v-model="username" placeholder="Username" class="forms_field-input" required autofocus />
                </div>
                <div class="forms_field">
                  <input type="password" v-model="password" placeholder="Password" class="forms_field-input" required />
                </div>
              </fieldset>
              <div class="forms_buttons">
                <input type="submit" value="Log In" class="forms_buttons-action">
              </div>
            </form>
          </div>
          <div class="user_forms-signup">
            <h2 class="forms_title">Sign Up</h2>
            <form @submit.prevent="registerEmployee" class="forms_form">
              <fieldset class="forms_fieldset">
                <div class="forms_field-split">
                  <div class="forms_field-half">
                    <input v-model="vorname" type="text" placeholder="Vorname" class="forms_field-input" required />
                  </div>
                  <div class="forms_field-half">
                    <input v-model="nachname" type="text" placeholder="Nachname" class="forms_field-input" required />
                  </div>
                </div>
                <div class="forms_field-split">
                  <div class="forms_field-half">
                    <input v-model="personalnummer" type="text" placeholder="Personalnummer" class="forms_field-input" required />
                  </div>
                  <div class="forms_field-half">
                    <input v-model="benutzername" type="text" placeholder="Benutzername" class="forms_field-input" required />
                  </div>
                </div>
                <div class="forms_field-split">
                  <div class="forms_field-half">
                    <input v-model="mailadresse" type="email" placeholder="Email" class="forms_field-input" required />
                  </div>
                  <div class="forms_field-half">
                    <div class="forms_field-select-container">
                      <select v-model="mitarbeiterBereich" class="forms_field-select" required>
                        <option value="" disabled hidden>Mitarbeiter Bereich</option>
                        <option value="FACHLICHER_MITARBEITER">Fachlicher Mitarbeiter</option>
                        <option value="IT_MITARBEITER">IT-Mitarbeiter</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="forms_field">
                  <input v-model="passwort" type="password" placeholder="Password" class="forms_field-input" required />
                </div>
              </fieldset>
              <div class="forms_buttons">
                <input type="submit" value="Sign up" class="forms_buttons-action">
                <div v-if="registrationSuccess" class="success-message">
                  <p>Registration successful! You can now proceed to the login page.</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue'
import { BASE_PATH } from '@/config'
import axios from 'axios'

export default {
  setup () {
    const vorname = ref('')
    const nachname = ref('')
    const personalnummer = ref('')
    const mailadresse = ref('')
    const benutzername = ref('')
    const passwort = ref('')
    const mitarbeiterBereich = ref('')
    const registrationSuccess = ref(false)

    const registerEmployee = async () => {
      try {
        const response = await axios.post(`${BASE_PATH}/mitarbeiter`, {
          vorname: vorname.value,
          nachname: nachname.value,
          personalnummer: personalnummer.value,
          mailadresse: mailadresse.value,
          benutzername: benutzername.value,
          passwort: passwort.value,
          mitarbeiterBereich: mitarbeiterBereich.value
        })
        console.log('Employee registered:', response.data)
        registrationSuccess.value = true
      } catch (error) {
        console.error('Error registering employee:', error)
      }
    }

    return {
      vorname,
      nachname,
      personalnummer,
      mailadresse,
      benutzername,
      passwort,
      mitarbeiterBereich,
      registrationSuccess,
      registerEmployee
    }
  },
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
      axios.post(`${BASE_PATH}/login`, credentials)
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
  },
  mounted () {
    const signupButton = document.getElementById('signup-button')
    const loginButton = document.getElementById('login-button')
    const userForms = document.getElementById('user_options-forms')

    signupButton.addEventListener('click', () => {
      userForms.classList.remove('bounceRight')
      userForms.classList.add('bounceLeft')
    }, false)

    loginButton.addEventListener('click', () => {
      userForms.classList.remove('bounceLeft')
      userForms.classList.add('bounceRight')
    }, false)
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  line-height: 1em;
}

button {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}

input {
  background-color: transparent;
  padding: 0;
  border: 0;
  outline: 0;
}

input[type="submit"] {
  cursor: pointer;
}

input::placeholder {
  font-size: 0.85rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  letter-spacing: 0.1rem;
  color: #ccc;
}

@keyframes bounceLeft {
  0% {
    transform: translate3d(100%, -50%, 0);
  }
  50% {
    transform: translate3d(-30px, -50%, 0);
  }
  100% {
    transform: translate3d(0, -50%, 0);
  }
}

@keyframes bounceRight {
  0% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(calc(100% + 30px), -50%, 0);
  }
  100% {
    transform: translate3d(100%, -50%, 0);
  }
}

@keyframes showSignUp {
  100% {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }
}

.user {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #ccc;
  background-size: cover;
}

.user_options-container {
  position: relative;
  width: 80%;
}

.user_options-text {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: rgba(34, 34, 34, 0.85);
  border-radius: 3px;
}

.user_options-registered,
.user_options-unregistered {
  width: 50%;
  padding: 75px 45px;
  color: #fff;
  font-weight: 300;
}

.user_registered-title,
.user_unregistered-title {
  margin-bottom: 15px;
  font-size: 1.66rem;
  line-height: 1em;
}

.user_unregistered-text,
.user_registered-text {
  font-size: 0.83rem;
  line-height: 1.4em;
}

.user_registered-login,
.user_unregistered-signup {
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px 30px;
  color: #fff;
  text-transform: uppercase;
  line-height: 1em;
  letter-spacing: 0.2rem;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.user_registered-login:hover,
.user_unregistered-signup:hover {
  color: rgba(34, 34, 34, 0.85);
  background-color: #ccc;
}

.user_options-forms {
  position: absolute;
  top: 50%;
  left: 30px;
  width: calc(50% - 30px);
  min-height: 420px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transform: translate3d(100%, -50%, 0);
  transition: transform 0.4s ease-in-out;
}

.user_forms-login {
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
}

.forms_title {
  margin-bottom: 40px;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1em;
  text-transform: uppercase;
  color: #e8716d;
  letter-spacing: 0.1rem;
}

.forms_field {
  &:not(:last-of-type) {
    margin-bottom: 20px;
  }
}

.forms_field-input {
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #555;
  letter-spacing: 0.1rem;
  transition: border-color 0.2s ease-in-out;
}

.forms_field-select {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 6px 20px 6px 6px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  color: #555;
  letter-spacing: 0.1rem;
  transition: border-color 0.2s ease-in-out;
  background-color: transparent;
  appearance: none;
  -webkit-appearance: none;
}

.forms_field-select:focus {
  border-color: #333;
  outline: none;
}

.forms_field-select option {
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  background-color: #fff;
  color: #555;
}

.forms_field-select-container {
  position: relative;
}

.forms_field-select option:hover {
  background-color: #f0f0f0;
}

.forms_field-select option[disabled] {
  color: #aaa;
}

.forms_field-select option[disabled]:hover {
  background-color: transparent;
}

.forms_field-select-container::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #555;
}

.forms_field-split {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.forms_field-half {
  width: calc(50% - 10px);
}

.forms_field-input:focus {
  border-color: #333;
}

.forms_buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;
}

.forms_buttons-forgot {
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.1rem;
  color: #ccc;
  text-decoration: underline;
  transition: color 0.2s ease-in-out;
}

.forms_buttons-forgot:hover {
  color: #bbb;
}

.forms_buttons-action {
  background-color: #e8716d;
  border-radius: 3px;
  padding: 10px 35px;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  transition: background-color 0.2s ease-in-out;
}

.forms_buttons-action:hover {
  background-color: #d0605c;
}

.user_forms-signup,
.user_forms-login {
  position: absolute;
  top: 70px;
  left: 40px;
  width: calc(100% - 80px);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
}

.user_forms-signup {
  transform: translate3d(120px, 0, 0);
}

.user_forms-login {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  visibility: visible;
}

.user_options-forms.bounceLeft {
  animation: bounceLeft 1s forwards;
}

.user_options-forms.bounceLeft .user_forms-signup {
  animation: showSignUp 1s forwards;
}

.user_options-forms.bounceLeft .user_forms-login {
  opacity: 0;
  visibility: hidden;
  transform: translate3d(-120px, 0, 0);
}

.user_options-forms.bounceRight {
  animation: bounceRight 1s forwards;
}
</style>
