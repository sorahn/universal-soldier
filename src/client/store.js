import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'

export function configureStore(history, initialState) {

  const reducer = combineReducers({ ...reducers })
  const middlewares = [ routerMiddleware(history), thunk ]

  if (__CLIENT__) {
    const logger = createLogger({ collapsed: true, predicate: true })
    middlewares.push(logger)
  }

  const enhancers = [ applyMiddleware(...middlewares) ]
  const store = createStore(reducer, initialState, compose(...enhancers))

  return store
}
