export const GET_TRIPS = 'GET_TRIPS';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_ERROR = 'GET_TRIPS_ERROR';
export const ADD_TRIP = 'ADD_TRIP';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const ADD_TRIP_ERROR = 'ADD_TRIP_ERROR';
import { Trip } from '../models';

export function getTrips() {
  return {
    type: GET_TRIPS
  }
}

export function addTrip(trip: Trip) {
  return {
    type: ADD_TRIP,
    payload: trip
  }
}

const initialState = {
  trips: [],
  pending: false,
  error: null
}

export function tripReducer( state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_TRIPS:
      return Object.assign({}, state, {pending: true, error: null})
    case GET_TRIPS_SUCCESS:
      console.log('GET_TRIPS_SUCCESS');
      console.log(payload);
      console.log(state);
      let newState = Object.assign({}, state, {trips: payload, pending: false})
      console.log(newState);
      return newState;
    case GET_TRIPS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"})
    case ADD_TRIP:
      console.log('ADD_TRIP');
      return Object.assign({}, state, {pending: true, error: null})
    case ADD_TRIP_SUCCESS:
      console.log('ADD_TRIP_SUCCESS');
      return Object.assign({}, state, {trips: Object.assign({}, state.trips, payload), pending: false})
    case ADD_TRIP_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"})
    default:
      return state;
  }
}
