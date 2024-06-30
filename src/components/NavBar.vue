<template>
  <nav class="navbar">
    <div class="icon">
      <router-link class="logo" to="/home">Tiqetta</router-link>
    </div>
    <div class="menu">
      <ul>
        <li><router-link to="/home">HOME</router-link></li>
        <li><router-link to="/ItServiceSupport">IT SUPPORT</router-link></li>
        <li><router-link to="/ServiceCenter">SERVICE CENTER</router-link></li>
      </ul>
    </div>
    <div class="profile">
      <router-link class="avatar" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </svg>
      </router-link>
    </div>
  </nav>
</template>

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

<style scoped>
* {
  margin: 0;
  padding: 0;
  background-color: #ccc
}

.navbar {
  width: 1200px;
  height: 75px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon {
  display: flex;
  align-items: center;
}

.logo {
  color: #e8716d;
  font-size: 35px;
  font-family: Arial;
  padding-left: 20px;
  text-decoration: none;
}

.menu {
  display: flex;
}

.menu ul {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu ul li {
  list-style: none;
  margin-left: 62px;
  font-size: 14px;
}

.menu ul li a {
  text-decoration: none;
  color: #fff;
  font-family: Arial;
  font-weight: bold;
  transition: 0.4s ease-in-out;
}

.menu ul li a:hover {
  color: #e8716d;
}

.search {
  display: flex;
  align-items: center;
}

.srch {
  font-family: 'Times New Roman';
  width: 200px;
  height: 40px;
  background: transparent;
  border: 1px solid #e8716d;
  color: #fff;
  font-size: 16px;
  padding: 10px;
  border-right: none;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.btn {
  width: 100px;
  height: 40px;
  background: #e8716d;
  border: 2px solid #e8716d;
  color: #fff;
  font-size: 15px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  transition: 0.2s ease;
  cursor: pointer;
}

.btn:hover {
  color: #000;
}

.btn:focus,
.srch:focus {
  outline: none;
}

.profile {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.avatar {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: 0.3s ease;
}

.avatar svg {
  fill: #e8716d;
}

.avatar:hover svg {
  fill: #fff;
}
</style>
