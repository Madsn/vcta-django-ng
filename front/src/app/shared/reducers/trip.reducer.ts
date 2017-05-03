export const GET_TRIPS = 'GET_TRIPS';
export const GET_TRIPS_SUCCESS = 'GET_TRIPS_SUCCESS';
export const GET_TRIPS_ERROR = 'GET_TRIPS_ERROR';
export const ADD_TRIP = 'ADD_TRIP';
export const ADD_TRIP_SUCCESS = 'ADD_TRIP_SUCCESS';
export const ADD_TRIP_ERROR = 'ADD_TRIP_ERROR';
export const DELETE_TRIP = 'DELETE_TRIP';
export const DELETE_TRIP_SUCCESS = 'DELETE_TRIP_SUCCESS';
export const DELETE_TRIP_ERROR = 'DELETE_TRIP_ERROR';
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

export function deleteTrip(trip: Trip) {
  return {
    type: DELETE_TRIP,
    payload: trip
  }
}

const initialState = {
  trips: [],
  pending: false,
  error: null,
  deleteError: null
}

export function tripReducer( state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_TRIPS:
      return Object.assign({}, state, {pending: true, error: null});
    case GET_TRIPS_SUCCESS:
      let newState = Object.assign({}, state, {trips: payload, pending: false});
      return newState;
    case GET_TRIPS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
    case ADD_TRIP:
      return Object.assign({}, state, {pending: true, error: null});
    case ADD_TRIP_SUCCESS:
      let newState2 = Object.assign({}, state, {trips: insertTrip(state.trips, payload), pending: false});
      return newState2;
    case ADD_TRIP_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
    case DELETE_TRIP:
      // Optimistically remove Trip immediately
      return Object.assign({}, state, {trips: state.trips.filter((t) => {return t.id != payload.id}),
                                      deleteError: null});
    case DELETE_TRIP_SUCCESS:
      return Object.assign({}, state, {deleteError: null});
    case DELETE_TRIP_ERROR:
      if (payload.error == 'Not found.') {
        // Trip doesn't exist on server - ignore
        return Object.assign({}, state, {deleteError: payload.error});
        //return state;
      } else {
        // Rollback - re-insert trip that was attempted deleted
        return Object.assign({}, state, {trips: insertTrip(state.trips, payload.trip), deleteError: payload.error});
      }
    default:
      return state;
  }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function insertTrip(trips: Trip[], newTrip: Trip) {
  trips.splice(locationOf(newTrip, trips, tripCompare) + 1, 0, newTrip);
  return trips;
}

function locationOf(element, array, comparer, start?, end?) {
    if (array.length === 0)
        return -1;

    start = start || 0;
    end = end || array.length;
    var pivot = (start + end) >> 1;  // should be faster than dividing by 2

    var c = comparer(element, array[pivot]);
    if (end - start <= 1) return c == -1 ? pivot - 1 : pivot;

    switch (c) {
        case -1: return locationOf(element, array, comparer, start, pivot);
        case 0: return pivot;
        case 1: return locationOf(element, array, comparer, pivot, end);
    };
};

const tripCompare = function(a: Trip, b: Trip) {
  if (a.date < b.date) return 1;
  else if (a.date > b.date) return -1;
  else {
    if (a.last_updated < b.last_updated) return 1;
    else if (a.last_updated > b.last_updated) return -1;
  }
  return 0;
}
