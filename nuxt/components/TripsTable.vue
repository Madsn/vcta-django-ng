<template>
  <div>
    <table class="table table-striped table-hover" v-if="tripState.trips.length > 0">
      <thead>
      <tr>
        <th>Day</th>
        <th>Distance</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="trip in tripState.trips">
        <td>{{ trip.date }}</td>
        <td>{{ trip.distance }}</td>
        <td>
          <i v-on:click="deleteTrip(trip.id)" class="fa fa-trash clickable" aria-hidden="true" title="Delete"></i>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    computed: {
      tripState () { return this.$store.state.tripState }
    },
    methods: {
      deleteTrip (id) {
        this.$store.commit('deleteTrip', id)
      }
    }
  }
</script>
<style>
</style>
