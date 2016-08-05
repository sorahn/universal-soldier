import React from 'react'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Provider } from 'react-redux'

import { configureStore } from '../../shared/store'
import routes from '../../shared/routes'
import { HTML } from '../components'

const matchRoute = async (ctx, next) => {
  console.log('koa: step 1 - match route')

  // Request cached? All done.
  if (await ctx.cashed()) {
    console.log('koa: step 2 - cache hit - ', ctx.url)
    return
  }

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

    // Error! *esplode*
    if (error) {
      ctx.status = 500
      ctx.throw(error.message)
      console.log('throw')
      return
    }

    // matching '/search' with no parameter is marked in
    // react-router as a redirect.  This happens here.
    if (redirect) {
      ctx.status = 302
      ctx.redirect(redirect.pathname + redirect.search)
      return
    }

    // The next function that runs needs these 3 objects
    ctx.history = memoryHistory
    ctx.store = store
    ctx.props = props
  })

  // If the props were set, we can proceed.
  if (ctx.props) {
    return next()
  }
}

// This will look for a `fetchData` static on the react class that the
// router matches.  It will call that function to
const loadData = async (ctx, next) => {
  console.log('koa: step 2 - loadData')

  const {
    props: { components, params },
    request,
    store,
  } = ctx

  // Just run the next router handler if we're not preloading any data.
  if (request.query.preload === 'false') {
    return next()
  }

  const url = `${request.protocol}://${request.get('host')}`

  // This is the component that is matched in the routes.
  const comp = components[components.length - 1].WrappedComponent

  // Set a default function that just returns the options you feed into it if
  // there is no fetchData method on the component
  const { fetchData = options => options } = comp

  // Gotta pass the user agent through too
  const options = {
    headers: request.headers,
    params,
    store,
    url,
  }

  // Fetch the data, then return the next route handler.
  return await fetchData(options).then(() => next())
}

const render = async ctx => {
  console.log('koa: step 3 - render')

  const store = configureStore(ctx.history, {
    ...ctx.store.getState(),

    // Stuff the whole userAgent object into the reducers so we can use
    // it to try and guess the width of the client.
    userAgent: ctx.state.userAgent
  })

  const content = renderToString(
    <Provider store={store}>
      <RouterContext {...ctx.props} />
    </Provider>
  )

  const html = renderToString(<HTML content={content} store={store}/>)

  ctx.body = `<!doctype html>\n${html}`
}

export default {
  verb: 'get',
  route: '*',
  actions: [ matchRoute, loadData, render ]
}
