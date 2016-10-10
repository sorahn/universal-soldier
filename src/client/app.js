import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { configureStore } from './store'
import routes from './routes'

import 'normalize-css/normalize.css'

const state = window.__initialState__ || undefined
const store = configureStore(browserHistory, state)
const history = syncHistoryWithStore(browserHistory, store)

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </Provider>
)

render(<App />, document.getElementById('root'))
