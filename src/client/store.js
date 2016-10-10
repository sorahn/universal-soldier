import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'

export function configureStore(history, initialState) {
  const reducer = combineReducers({ ...reducers })
  const router = routerMiddleware(history)
  const middleware = [ router, thunk ]

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({ collapsed: true })
    middleware.push(logger)
  }

  const enhancers = [ applyMiddleware(...middleware) ]
  const store = createStore(reducer, initialState, compose(...enhancers))

  return store
}
