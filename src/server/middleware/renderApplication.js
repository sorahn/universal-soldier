import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'

import { configureStore } from '../../client/store'
import { HTML } from '../components'

export default async function renderApplication (ctx) {
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
