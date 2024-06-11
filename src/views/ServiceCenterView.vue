<template>
  <div class="ServiceCenter">
    <h1>Willkommen in unserem Service-Center</h1>

    <section class="services">
      <div class="service-card">
        <h2>Technischer Support</h2>
        <p>Wir bieten technischen Support für alle unsere Produkte. Kontaktieren Sie uns, wenn Sie Hilfe bei Installationen, Fehlersuche oder anderen technischen Problemen benötigen.</p>
      </div>

      <div class="service-card">
        <h2>Kundenservice</h2>
        <p>Unser engagiertes Kundenservice-Team steht Ihnen für alle Anfragen, Feedback oder Anliegen zur Verfügung. Zögern Sie nicht, uns für schnelle Hilfe zu kontaktieren.</p>
      </div>

      <div class="service-card">
        <h2>Servicezeiten</h2>
        <p>Unsere Servicezeiten sind von Montag bis Freitag, 9:00 Uhr bis 17:00 Uhr. Während dieser Zeiten stehen wir Ihnen gerne zur Verfügung, um Ihre Anfragen zu bearbeiten.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ServiceCenter {
  padding: 20px;
  text-align: center;
  background: #96c1e2;
}
.services {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
}
.service-card {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
}
.service-card h2 {
  color: #007bff;
}
.service-card p {
  color: #6c757d;
}
</style>
