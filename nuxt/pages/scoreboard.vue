<template>
  <div>
    <h2>Scoreboard</h2>
    <ul>
      <li v-for="trip in tripState.trips">
        {{ trip.id }} - {{ trip.date }} - {{ trip.distance }} - {{ trip.user }}
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  let TRIPS_CACHE_MAX_AGE_MS = 15 * 1000

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
    data () {
      return {
        tripState: this.$store.state.tripState
      }
    },
    asyncData (context) {
      // If rendering server side, fetch the trips data
      if (context.isServer) {
        return fetchTrips(context.store, 'Server')
      }
    },
    mounted () {
      // If rendering client side, fetch trips data only if the last fetch
      // was more than TRIPS_CACHE_MAX_AGE ago.
      let tripsAge = Date.now() - this.tripState.tripsLoadedTimestamp
      if (!this.tripState.tripsLoadedTimestamp ||
            Date.now() - this.tripState.tripsLoadedTimestamp > TRIPS_CACHE_MAX_AGE_MS ||
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
