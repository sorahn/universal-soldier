import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'normalize-css/normalize.css'

import { configureStore } from './store'
import routes from './routes'
import theme from './theme'

injectTapEventPlugin()

const state = window.__initialState__ || undefined
const store = configureStore(browserHistory, state)
const history = syncHistoryWithStore(browserHistory, store)

const muiTheme = getMuiTheme(theme)

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </Provider>
)

render(<App />, document.getElementById('root'))
