import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import repositories from '../ducks/repositories';

export function createRootReducer(history) {
  return combineReducers({
    repositories,
    router: connectRouter(history),
  });
}
