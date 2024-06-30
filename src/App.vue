<template>
  <div id="app">
    <!-- Überprüfung des aktuellen Pfads -->
    <NavBar v-if="!isRootPath"></NavBar>
    <router-view class="main-content"></router-view>
    <!--<FooterBar></FooterBar>-->
    <FooterBar class="footer"/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: 'App',
  components: { FooterBar, NavBar },
  computed: {
    isRootPath () {
      return this.$route.path === '/'
    }
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #ccc;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.main-content {
  flex: 1;
}
</style>
