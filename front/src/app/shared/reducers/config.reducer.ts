export const GET_CONFIGS = 'GET_CONFIGS';
export const GET_CONFIGS_SUCCESS = 'GET_CONFIGS_SUCCESS';
export const GET_CONFIGS_ERROR = 'GET_CONFIGS_ERROR';
import { Config } from '../models';

export function getConfigs() {
  return {
    type: GET_CONFIGS
  }
}

const initialState = {
  configs: [],
  pending: false,
  error: null,
};

export function configReducer( state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_CONFIGS:
      return Object.assign({}, state, {pending: true, error: null});
    case GET_CONFIGS_SUCCESS:
      let newState = Object.assign({}, state, {trips: payload, pending: false});
      return newState;
    case GET_CONFIGS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
    default:
      return state;
  }
}

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

