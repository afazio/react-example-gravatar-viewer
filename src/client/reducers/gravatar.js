import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

export const initialState = Immutable.Map({
  fetched: false,
  exists: false,
  size: '250'
});

export default createReducer(initialState, {
  'GRAVATAR_CHANGE_SIZE': (domain, action) => {
    return domain.merge({size: action.size})
  },

  'GRAVATAR_FETCHING': (domain, action) => {
    return domain.merge({fetched: false});
  },

  'GRAVATAR_FETCHED_SUCCESS': (domain, action) => {
    return domain.merge({fetched: true, exists: true});
  },

  'GRAVATAR_FETCHED_FAIL': (domain, action) => {
    return domain.merge({fetched: true, exists: false});
  }
});

