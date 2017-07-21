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
            <TripsTable/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import TripsTable from '~components/TripsTable.vue'
  const TRIPS_CACHE_MAX_AGE_MS = 15 * 1000

  function fetchTrips (store, loadedFrom) {
    return axios.get('http://localhost:8000/api/trip/')
      .then((res) => {
        const data = res.data
        store.commit('setTripState', {trips: data, tripsLoadedTimestamp: Date.now(), loadedFrom: loadedFrom})
        return
      })
      .catch((err) => {
        console.error('Error fetching trips: ', err)
        store.commit('setTripState', {error: {statusCode: 500, message: err.message}})
        return
      })
  }

  export default {
    components: {
      TripsTable
    },
    computed: {
      tripState () {
        return this.$store.state.tripState
      }
    },
    asyncData (context) {
      // If rendering server side, fetch the trips data
      console.log('asyncdata called, ', context.isServer)
      if (context.isServer) {
        return fetchTrips(context.store, 'Server')
      }
    },
    mounted () {
      // If rendering client side, fetch trips data only if the last fetch
      // was more than TRIPS_CACHE_MAX_AGE ago. ('mounted' is only called in the browser)
      let tripsAge = Date.now() - this.tripState.tripsLoadedTimestamp
      if (!this.tripState.tripsLoadedTimestamp ||
        tripsAge > TRIPS_CACHE_MAX_AGE_MS ||
        !this.tripState.trips ||
        this.tripState.trips.length === 0) {
        fetchTrips(this.$store, 'Client')
      } else {
        console.log('Using trips from cache. Age: ' + tripsAge + ' ms. Age limit: ' + TRIPS_CACHE_MAX_AGE_MS)
      }
    }
  }
</script>

<style>
</style>
