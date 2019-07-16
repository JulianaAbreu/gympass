import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import repositories from '../ducks/repositories';
import commits from '../ducks/commits';
import branches from '../ducks/branches';

export function createRootReducer(history) {
  return combineReducers({
    repositories,
    commits,
    branches,
    router: connectRouter(history),
  });
}
