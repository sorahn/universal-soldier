import React from 'react'
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'

import {
  routerReducer as routing,
  routerMiddleware as router
} from 'react-router-redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

import * as reducers from './reducers'

export function configureStore(history, initialState) {

  const reducer = combineReducers({
    ...reducers,
    routing: routing
  })

  const middlewares = [ router(history), thunk ]

  if (__CLIENT__) {
    middlewares.push(logger({
      collapsed: true,
      predicate: true,
    }))
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares)
    )
  )

  return store
}
