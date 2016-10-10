import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import promiseMiddleware from 'redux-promise-middleware'

import * as reducers from './reducers'

export function configureStore(history, initialState) {
  const reducer = combineReducers({ ...reducers })
  const router = routerMiddleware(history)
  const promise = promiseMiddleware()

  const middleware = [ promise, router, thunk ]

  if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({ collapsed: true })
    middleware.push(logger)
  }

  const enhancers = [ applyMiddleware(...middleware) ]
  const store = createStore(reducer, initialState, compose(...enhancers))

  return store
}
