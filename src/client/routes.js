import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

/* container components */
import { Application } from './components'
import { Search } from './components/search'

const routes = (
  <Route path='/' component={Application}>
    <IndexRoute component={Search} />
    <Route
      basePath='/'
      component={Search}
      path='/page/:page_number'
    />
    <Route
      basePath='/search'
      baseParams={[ 'keyword' ]}
      component={Search}
      path='/search/:keyword(/page/:page_number)'
    />
    <Route path='/cam/:nickname' component={props => {
      return <div>Hello {props.params.nickname}</div>
    }} />

    <Redirect from='/search' to='/' />
  </Route>
)

export default routes

