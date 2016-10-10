import React from 'react'
import { renderToString } from 'react-dom/server'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { configureStore } from '../../client/store'
import { HTML } from '../components'



export default async function renderApplication (ctx) {
  console.log('koa: step 3 - render')

  const store = configureStore(ctx.history, ctx.store.getState())
  const muiTheme = getMuiTheme({ userAgent: ctx.request.get('user-agent') })

  const content = renderToString(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <RouterContext {...ctx.props} />
      </MuiThemeProvider>
    </Provider>
  )

  const html = renderToString(<HTML content={content} store={store}/>)

  ctx.body = `<!doctype html>\n${html}`
}
