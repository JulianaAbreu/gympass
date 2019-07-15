import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from './reducer';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const middleware = [reduxPackMiddleware, routerMiddleware(history)];

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(...middleware)),
  );
  return store;
}
