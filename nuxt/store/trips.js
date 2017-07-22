export const state = () => ({
  trips: [],
  error: {},
})

export const mutations = {
  setState (state, newState) {
    if (newState.trips) {
      state.trips = newState.trips
    }
    state.error = newState.error
  },
  deleteTrip (state, id) {
    let index = state.trips.findIndex((a) => {
      return a.id === id
    })
    state.trips.splice(index, 1)
  },
  deleteTripError (state, error) {
    state.error = error
  }
}

import axios from 'axios'

export const actions = {
  deleteTrip (context, id) {
    axios.delete('http://localhost:8000/api/trip/' + id)
      .then((res) => {
        context.commit('deleteTrip', id)
      })
      .catch((err) => {
        context.commit('deleteTripError', err)
      })
  },
  getTrips (context) {
    axios.get('http://localhost:8000/api/trip/')
      .then((res) => {
        const data = res.data
        context.commit('setState', {trips: data})
      })
      .catch((err) => {
        console.error('Error fetching trips: ', err)
        context.commit('setState', {error: {statusCode: 500, message: err.message}})
      })
  }
}
