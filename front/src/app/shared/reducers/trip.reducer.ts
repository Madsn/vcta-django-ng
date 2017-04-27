export const GET_TRIPS = "GET_TRIPS";
export const GET_TRIPS_SUCCESS = "GET_TRIPS_SUCCESS";
export const GET_TRIPS_ERROR = "GET_TRIPS_ERROR";
import { Trip } from '../core.models';

export function getTrips() {
  return {
    type: GET_TRIPS
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
      return Object.assign({}, state, {trips: payload, pending: false})
    case GET_TRIPS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"})
    default:
      return state;
  }
}
