<template>
  <div class="it-service-support">
    <section class="support-container">
      <div class="support-options">
        <div class="support-option">
          <h2 class="option-title">Kontaktinformationen</h2>
          <p class="info-text">E-Mail: support@example.com<br>Telefon: +123456789</p>
        </div>
        <div class="support-option">
          <h2 class="option-title">Serviceverfügbarkeit</h2>
          <p class="info-text">Unser IT-Support-Team ist von Montag bis Freitag, 9 bis 17 Uhr erreichbar.</p>
        </div>
      </div>

      <div class="support-forms">
        <!--div class="form-section">
          <h2 class="section-title">Kontaktieren Sie uns</h2>
          <form class="contact-form" @submit.prevent="contactSupport">
            <div class="form-field">
              <input type="text" v-model="name" placeholder="Ihr Name" class="form-input" required autofocus />
            </div>
            <div class="form-field">
              <input type="email" v-model="email" placeholder="Ihre E-Mail" class="form-input" required />
            </div>
            <div class="form-field">
              <textarea v-model="message" placeholder="Ihre Nachricht" class="form-input" rows="4" required></textarea>
            </div>
            <div class="form-actions">
              <input type="submit" value="Nachricht senden" class="form-submit">
            </div>
          </form>
          <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </div-->

        <div class="info-section">
          <div class="info-item">
            <h3 class="info-title">IT-Support FAQ</h3>
            <ul class="faq-list">
              <li v-for="(faq, index) in faqs" :key="index" class="faq-item">
                <button @click="toggleAnswer(index)" class="faq-question">{{ faq.question }}</button>
                <p v-if="faq.expanded" class="faq-answer">{{ faq.answer }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'Wie setze ich mein Passwort zurück?',
    answer: 'Um Ihr Passwort zurückzusetzen, gehen Sie zur Anmeldeseite und klicken Sie auf "Passwort vergessen". Befolgen Sie die Anweisungen, um Ihr Passwort zurückzusetzen.',
    expanded: false
  },
  {
    question: 'Welche sind Ihre Supportzeiten?',
    answer: 'Unser IT-Support-Team ist von Montag bis Freitag von 9 bis 17 Uhr erreichbar.',
    expanded: false
  },
  {
    question: 'Wie kann ich den Support kontaktieren?',
    answer: 'Sie können unser Support-Team per E-Mail unter support@example.com oder telefonisch unter +123456789 kontaktieren.',
    expanded: false
  }
])

const toggleAnswer = (index) => {
  faqs.value[index].expanded = !faqs.value[index].expanded
}
</script>

<style scoped>
.it-service-support {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.support-container {
  width: 80%;
  max-width: 1200px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.support-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.support-option {
  flex: 1;
  padding: 20px;
  background-color: #e0e0e0;
  border-radius: 8px;
  text-align: center;
}

.option-title {
  margin-bottom: 10px;
  font-size: 1.8rem;
  color: #333;
}

.info-text {
  font-size: 1rem;
  color: #555;
}

.support-forms {
  display: flex;
}

.form-section {
  flex: 1;
  margin-right: 40px;
}

.section-title {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #e8716d;
}

.contact-form {
  width: 100%;
}

.form-field {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #e8716d;
}

.form-submit {
  padding: 12px 40px;
  background-color: #e8716d;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-submit:hover {
  background-color: #d0605c;
}

.info-section {
  flex: 1;
}

.info-item {
  margin-bottom: 20px;
}

.info-title {
  font-size: 1.5rem;
  color: #e8716d;
}

.faq-list {
  list-style-type: none;
  padding: 0;
}

.faq-item {
  margin-bottom: 20px;
}

.faq-question {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 8px;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
  text-decoration: underline;
  padding: 0;
  transition: color 0.3s ease;
}

.faq-question:hover {
  color: #e8716d;
}

.faq-answer {
  font-size: 1rem;
  color: #555;
  padding: 10px 0;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
}

.success-message {
  color: green;
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 20px;
}
</style>
