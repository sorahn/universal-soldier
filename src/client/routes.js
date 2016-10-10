import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

/* container components */
import { App } from './components'
import { Search } from './components/search'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Search} />
    <Route path='/page/:page_number' component={Search} />
    <Route path='/search/:keyword(/page/:page_number)' component={Search} />
    <Route path='/cam/:nickname' component={props => {
      return <div>Hello {props.params.nickname}</div>
    }} />

    <Redirect from='/search' to='/' />
  </Route>
)

export default routes

