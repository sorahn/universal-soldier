import React from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'

import { configureStore } from '../../shared/store'
import routes from '../../shared/routes'
import { HTML } from '../components'

const checkRoute = (ctx, next) => {
  console.log('koa: checkRoute - one')

  // Creates a history object in node memory
  const memoryHistory = createMemoryHistory(ctx.request.path)

  // Create the store with the current history, and save it to ctx.
  const store = configureStore(memoryHistory)

  // Create the react history object.
  const history = syncHistoryWithStore(memoryHistory, store)

  // Options for react-router to match the current route on the server.
  const options = {
    history,
    routes,
    location: ctx.request.url,
  }

  // I think this whole setup with match is weird, but I'm not really sure
  // how to do it better
  match(options, (error, redirect, props) => {
    // Not sure if this is working
    if (error) {
      ctx.throw(500, error.message)
      return
    }

    if (redirect) {
      ctx.redirect(redirect.pathname + redirect.search)
      ctx.status = 302
      return
    }
    // --

    // The next function that runs needs these 3 objects
    ctx.history = memoryHistory
    ctx.store = store
    ctx.props = props
  })

  // If the props were set, call render
  if (ctx.props) {
    return next()
  }
}

// This will look for a `fetchData` static on the react class that the
// router matches.  It will call that function to
const fetchData = ctx => {
  console.log('koa: fetchData - three')
  const { components, params } = ctx.props
  const { store } = ctx

  // This is the component that is matched in the routes.
  const comp = components[components.length - 1].WrappedComponent

  const { fetchData = options => options } = comp

  const url = ctx.request.protocol + '://' + ctx.request.get('host')

  // Gotta pass the user agent through too
  const options = {
    headers: ctx.request.headers,
    params,
    store,
    url,
  }

  return new Promise(resolve => resolve(fetchData(options)))
}

const render = async ctx => {
  console.log('koa: render - two')

  // this response is already cashed if `true` is returned,
  // so this middleware will automatically serve this response from cache
  if (await ctx.cashed()) {
    console.log('LRU - HIT ', ctx.url)
    return
  }

  // If there is no catch, fetch our data from the server (ourself)
  await fetchData(ctx)
    .then(() => {
      console.log('koa: fetchData.then - four')


      const store = configureStore(ctx.history, {
        ...ctx.store.getState(),

        // Stuff the whole userAgent object into the reducers so we can use
        // it to try and guess the width of the client.
        userAgent: ctx.state.userAgent
      })

      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...ctx.props}/>
        </Provider>
      )

      const html = renderToString(<HTML content={content} store={store}/>)

      ctx.body = `<!doctype html>\n${html}`
    })
    .catch(function (error) {
      /* do something with error */
      console.log(error.stack);
    })
}

export default {
  verb: 'get',
  route: '*',
  actions: [ checkRoute, render ]
}
