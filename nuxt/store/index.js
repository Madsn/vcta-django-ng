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
  }
}
