export const GET_CONFIGS = 'GET_CONFIGS';
export const GET_CONFIGS_SUCCESS = 'GET_CONFIGS_SUCCESS';
export const GET_CONFIGS_ERROR = 'GET_CONFIGS_ERROR';

export function getConfigs() {
  return {
    type: GET_CONFIGS
  }
}

const initialState = {
  config: null,
  pending: false,
  error: null,
};

export function configReducer( state = initialState, { type, payload } ) {
  switch( type ) {
    case GET_CONFIGS:
      return Object.assign({}, state, {pending: true, error: null});
    case GET_CONFIGS_SUCCESS:
      console.log("reducer: got config - ", payload[0]);
      let newState = Object.assign({}, state, {config: payload[0], pending: false});
      return newState;
    case GET_CONFIGS_ERROR:
      return Object.assign({}, state, {pending: false, error: "Error"});
    default:
      return state;
  }
}
