<script>
export default {
  name: 'NavBar',
  data () {
    return {
      searchQuery: ''
    }
  },
  methods: {
    searchTickets () {
      if (this.searchQuery) {
        this.$router.push({ name: 'TicketAnzeige', params: { ticketnummer: this.searchQuery } })
      }
    }
  }
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.png" alt="Tiqetta" class="logo" to="/">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="a--bs-scroll-height: 100px;">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
              </svg>
            </router-link>
          </li>
          <li class="nav-link">
            <router-link class="avatar navbar-link active" ria-current="page" to="/login">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
              </svg>
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Contacts
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li><router-link class="dropdown dropdown-item" to="/ItServiceSupport">IT-Service-Support</router-link></li>
              <li><router-link class="dropdown dropdown-item" to="/BackendSupport">Backend-Support</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link class="dropdown dropdown-item" to="/ServiceCenter">Service-Center</router-link></li>
            </ul>
          </li>
          <router-link class="nav-link" :class="{ active: $route.path === '/NewTicket' }" to="/NewTicket">
            Create Ticket
          </router-link>
        </ul>
        <form class="d-flex" @submit.prevent="searchTickets">
          <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Ticketnummer" aria-label="Search">
          <button class="btn btn-outline-light" type="submit">Suchen</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.logo{
  width: 138px;
  height: 50px;
}
.nav-link{
  font-size: 20px;
}
.bg{
  background-color: #2c3e50;
}
.dropdown{
  color: #2382d6;
}
.nav-link.active {
  color: #2382d6;
}
.avatar{
  color: white;
}
</style>
