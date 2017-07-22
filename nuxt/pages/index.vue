<template>
  <div>
    <div class="row">
      <div class="col-md-5">
        <div class="card dashboard-card">
          <div class="card-header">
            Team invitations
          </div>
          <div class="card-block">
            <p>You currently have no team invitations</p>
          </div>
        </div>
      </div>
      <div class="col-md-7">

        <div class="card dashboard-card">
          <div class="card-header">
            Trips
          </div>
          <div class="card-block">
            <TripsTable />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TripsTable from '~components/TripsTable.vue'

  export default {
    components: {
      TripsTable
    },
    computed: {
      tripState () {
        return this.$store.state.trips
      }
    },
    mounted () {
      this.$store.dispatch('trips/getTrips')
    }
  }
</script>

<style>
</style>
