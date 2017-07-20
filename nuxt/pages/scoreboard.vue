<template>
  <ul>
    <li v-for="trip in trips">
      {{ trip.id }} - {{ trip.date }} - {{ trip.distance }} - {{ trip.user }}
    </li>
  </ul>
</template>

<script>
  import axios from 'axios'

  export default {
    async asyncData () {
      const { data } = await axios.get('http://localhost:8000/api/trip/')
      return {
        trips: data
      }
    }
  }
</script>

<style>
</style>
