import React from 'react'
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware
} from 'redux'

import {
  routerReducer as routing,
  routerMiddleware,
} from 'react-router-redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { reducer as form } from 'redux-form'

import * as reducers from './reducers'

export function configureStore(history, initialState) {

  const reducer = combineReducers({
    ...reducers, form, routing
  })

  const middlewares = [ routerMiddleware(history), thunk ]

  if (__CLIENT__) {
    middlewares.push(logger({
      collapsed: true
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
