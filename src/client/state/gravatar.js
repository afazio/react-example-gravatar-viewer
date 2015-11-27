import Immutable from 'immutable';
import { createReducer } from 'redux-immutablejs';

export const initialState = Immutable.Map({
  fetched: false,
  exists: false,
  size: '250'
});

export const actions = {
  GRAVATAR_CHANGE_SIZE: 'GRAVATAR_CHANGE_SIZE',
  GRAVATAR_FETCHING: 'GRAVATAR_FETCHING',
  GRAVATAR_FETCHED_SUCCESS: 'GRAVATAR_FETCHED_SUCCESS',
  GRAVATAR_FETCHED_FAIL: 'GRAVATAR_FETCHED_FAIL'
}

export const actionCreators = {
  gravatarFetching: () => {
    return {type: actions.GRAVATAR_FETCHING};
  },

  gravatarFetchedSuccess: () => {
    return {type: actions.GRAVATAR_FETCHED_SUCCESS};
  },

  gravatarFetchedFail: () => {
    return {type: actions.GRAVATAR_FETCHED_FAIL};
  },

  gravatarChangeSize: (size) => {
    return {type: actions.GRAVATAR_CHANGE_SIZE, size};
  }
}

export default createReducer(initialState, {
  [actions.GRAVATAR_CHANGE_SIZE]: (domain, action) => {
    return domain.merge({size: action.size})
  },

  [actions.GRAVATAR_FETCHING]: (domain, action) => {
    return domain.merge({fetched: false});
  },

  [actions.GRAVATAR_FETCHED_SUCCESS]: (domain, action) => {
    return domain.merge({fetched: true, exists: true});
  },

  [actions.GRAVATAR_FETCHED_FAIL]: (domain, action) => {
    return domain.merge({fetched: true, exists: false});
  }
});
