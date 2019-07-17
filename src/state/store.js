import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import { routerMiddleware } from 'connected-react-router';
import { createRootReducer } from './reducer';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const middleware = [reduxPackMiddleware, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (
    isDevelopment &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line
  ) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line
  }

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );
  return store;
}
