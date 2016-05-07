global.__CLIENT__ = false
global.__SERVER__ = true

import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import mount from 'koa-mount'

import * as apiRoutes from './src/api/routes'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { configureStore } from './src/store'
import routes from './src/routes'
import Html from './src/components/Html'

import fetch from 'isomorphic-fetch'

const app = new Koa()
const router = new Router()

const assets = serve(__dirname + '/public', )
app.use(mount('/public', assets))

// Assign a route from our exported route objects.
const assign = ({ verb, route, actions }) => {
  console.log(verb, route, actions)
  router[verb](route, ...actions)
}

// Iterate over all the routes, and assign them.
Object.keys(apiRoutes).map(i => assign(apiRoutes[i]))

const checkRoute = (ctx, next) => {
  console.log('one')

  // Creates a history object in node memory
  const memoryHistory = createMemoryHistory(ctx.request.path)

  // Create the store with the current history, and save it to ctx.
  const store = configureStore(memoryHistory)

  // Create the react history object.
  const history = syncHistoryWithStore(memoryHistory, store)

  const options = {
    history,
    routes,
    location: ctx.request.url,
  }

  match(options, (error, redirect, props) => {
    // Not sure if this is working
    if (error) {
      return ctx.throw(500, error.message)
    }

    if (redirect) {
      return ctx.redirect(302, redirect.pathname + redirect.search)
    }
    // --

    ctx.history = memoryHistory
    ctx.store = store
    ctx.props = props
  })

  return next()
}

const fetchData = (ctx) => {
  console.log('three')
  const { query, components, params } = ctx.props
  const { store } = ctx

  return new Promise((resolve, reject) => {
    // This is the component that is matched in the routes.
    const comp = components[components.length - 1].WrappedComponent
    const url = ctx.request.protocol + '://' + ctx.request.get('host')

    resolve(comp.fetchData({ params, store, url }))
  })
}

const render = async ctx => {
  console.log('two')
  await fetchData(ctx)
    .then(() => {
      console.log('four')
      const store = configureStore(ctx.history, ctx.store.getState())
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...ctx.props}/>
        </Provider>
      )

      const html = renderToString(<Html content={content} store={store}/>)

      ctx.body = `<!doctype html>\n${html}`
    })
    .catch(function (error) {
      /* do something with error */
      console.log(error.stack);
    })
}

router.get('*', checkRoute, render)


app.use(router.routes())

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on http://127.0.0.1:3000')
})
