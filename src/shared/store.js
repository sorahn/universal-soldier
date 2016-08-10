import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import * as reducers from './reducers'

export function configureStore(history, initialState) {

  const reducer = combineReducers({ ...reducers })
  const middlewares = [ routerMiddleware(history), thunk ]

  if (__CLIENT__) {
    const logger = createLogger({
      collapsed: true,
      predicate: true
    })

    middlewares.push(logger)
  }

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store
}
