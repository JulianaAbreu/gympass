import { combineReducers } from 'redux';
import { handle } from 'redux-pack';

import types from './types';

const listInitialState = {
  error: null,
  isLoading: false,
  data: [],
};

function listBranchesReducer(state = listInitialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.LIST_BRANCHES:
      return handle(state, action, {
        start: (prevState) => ({ ...prevState, isLoading: true, error: null }),
        failure: (prevState) => ({ ...prevState, error: payload }),
        finish: (prevState) => ({ ...prevState, isLoading: false }),
        success: (prevState) => ({ ...prevState, data: payload }),
      });

    default:
      return state;
  }
}

export default combineReducers({
  listBranches: listBranchesReducer,
});
