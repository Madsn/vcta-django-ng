import axios from 'axios'

export const state = () => ({
  tripState: {
    trips: [],
    error: {},
    loadedFrom: null,
    tripsLoadedTimestamp: null
  }
})

export const mutations = {
  setTripState (state, newState) {
    state.tripState = newState
  },
  deleteTrip (state, id) {
    axios.delete('http://localhost:8000/api/trip/' + id)
      .then((res) => {
        let index = state.tripState.trips.findIndex((a) => {
          return a.id === id
        })
        state.tripState.trips.splice(index, 1)
      })
  }
}
