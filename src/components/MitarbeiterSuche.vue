<!-- src/components/SearchEmployee.vue -->

<template>
  <div>
    <label for="id">Suche nach Id:</label>
    <input v-model="id" type="text" id="id">
    <button @click="searchEmployee">Suchen</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: ''
    }
  },
  methods: {
    searchEmployee () {
      // Hier kannst du die Personalnummer an das Backend senden
      // und die entsprechenden Daten abrufen und anzeigen
      this.$emit('search', this.id)
    }
  }
}
</script>

<style scoped>
</style>
