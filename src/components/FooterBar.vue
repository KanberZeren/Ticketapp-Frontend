<script>
export default {
  name: 'FooterBar'
}
</script>
<template>
  <footer class="py-3 my-4 footer">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="/" class="nav-link px-2 text-muted">Home</a></li>
      <li class="nav-item"><a href="/ServiceCenter" class="nav-link px-2 text-muted">Kontakt</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">LinkedIn</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Impressum</a></li>
    </ul>
    <p class="text-center text-muted">© 2024 Tiqetta GmbH</p>
  </footer>
</template>

<style scoped>
.footer {
  padding: 20px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  bottom: 0;
  width: 100%;
}
.footer p {
  color: #fff;
  margin: 15px 0 10px 0;
  font-size: 1rem;
  font-weight: 300;
}
</style>
