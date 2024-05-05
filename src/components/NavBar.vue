<script>
export default {
  name: 'NavBar'
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">TicketApp</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="a--bs-scroll-height: 100px;">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/NewTicket">Create Ticket</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Notification">Notification</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Contacts
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li><router-link class="dropdown-item" to="/ItServiceSupport">IT-Service-Support</router-link></li>
              <li><router-link class="dropdown-item" to="/BackendSupport">Backend-Support</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><router-link class="dropdown-item" to="/ServiceCenter">Service-Center</router-link></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>
</style>
