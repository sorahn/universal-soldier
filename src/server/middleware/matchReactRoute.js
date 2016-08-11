import { createMemoryHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore } from '../../client/store'
import routes from '../../client/routes'

export default async function matchRoute (ctx, next) {
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
