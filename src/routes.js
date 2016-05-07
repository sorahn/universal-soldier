import React from 'react'
import { Route, IndexRoute, Link } from 'react-router'

/* container components */
import { App, Search } from './containers'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Search} />
    <Route path="/page/:page" component={Search} />
  </Route>
)

export default routes
