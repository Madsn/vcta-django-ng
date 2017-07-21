<template>
  <div>
    <p>Hello world</p>
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
          <i class="fa fa-trash" aria-hidden="true" title="Delete"></i>
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
    }
  }
</script>
