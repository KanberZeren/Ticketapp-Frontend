<template>
  <div class="container">
    <h1 class="text-center mt-4 mb-4">Willkommen in unserem Service-Center</h1>

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
body {
  background-color: #f0f8ff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  padding: 20px;
  text-align: center;
  background: #b5b5b5;
}

.services {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 30px;
}

.service-card {
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  text-align: left;
}

.service-card h2 {
  color: #e8716d;
}

.service-card p {
  color: #6c757d; /* Farbe für Text anpassen */
}
</style>
