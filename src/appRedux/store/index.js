import { applyMiddleware, compose, createStore} from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk';
import createRootReducer from '../reducers'
import { composeWithDevTools } from '@redux-devtools/extension';

const createBrowserHistory = require('history').createBrowserHistory;


export const history = createBrowserHistory();

const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware];

//TODO: remove composeWithDevTools in production
export default function configureStore(preloadedState = {}) {
  return  createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middlewares
      ),
    ),
  );
}
