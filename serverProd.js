import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import mount from 'koa-mount'

import * as apiRoutes from './src/api/routes'

import serialize from 'serialize-javascript'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { configureStore } from './src/store'
import routes from './src/routes'

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

const HTML = ({ content, store }) => (
  <html>
    <head>
      <link rel='stylesheet' type='text/css' href='/public/style.css' />
    </head>
    <body>
      <div id='mount' dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src='/public/vendor.js' />
      <script src='/public/bundle.js' />
    </body>
  </html>
)

router.get('*', async ctx => {

  const memoryHistory = createMemoryHistory(ctx.request.path)
  let store = configureStore(memoryHistory )
  const history = syncHistoryWithStore(memoryHistory, store)

  // @TODO how to do this better with ES6
  let stuff = {}
  match({ history, routes , location: ctx.request.url }, (error, redirect, props) => {
    stuff = {error, redirect, props}
  })

  const { error, redirect, props } = stuff

  await fetchData().then( ()=> {
    store = configureStore(memoryHistory, store.getState() )
    const content = renderToString(
      <Provider store={store}>
        <RouterContext {...props}/>
      </Provider>
    )

    ctx.body = '<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>)
  }).catch(function (error) {
    /* do something with error */
    console.log(error.stack);
  });

  /* fetch data promise */
  function fetchData () {
    let { query, params } = props;
    return new Promise(function(resolve, reject) {
      let comp = props.components[props.components.length - 1].WrappedComponent;
      let url = ctx.request.protocol + '://' + ctx.request.get('host')
      resolve(comp.fetchData({ params, store, url }));
    });
  }


  /* react router match history */

  // match({ history, routes , location: ctx.request.url }, (error, redirectLocation, renderProps) => {

  //   if (error) {
  //     ctx.throw(500, error.message)
  //   } else if (redirectLocation) {
  //     ctx.redirect(302, redirectLocation.pathname + redirectLocation.search)
  //   } else if (renderProps) {

  //     /* call static fetchData on the container component */
  //     fetchData().then( ()=> {
  //       store = configureStore(memoryHistory, store.getState() )
  //       const content = renderToString(
  //         <Provider store={store}>
  //           <RouterContext {...renderProps}/>
  //         </Provider>
  //       )

  //       ctx.body = '<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>)
  //     }).catch(function (error) {
  //       /* do something with error */
  //       console.log(error.stack);
  //     });

  //     /* fetch data promise */
  //     function fetchData () {
  //       let { query, params } = renderProps;
  //       return new Promise(function(resolve, reject) {
  //         let comp = renderProps.components[renderProps.components.length - 1].WrappedComponent;
  //         let url = ctx.request.protocol + '://' + ctx.request.get('host')
  //         resolve(comp.fetchData({ params, store, url }));
  //       });
  //     }
  //   }
  // })
})

app.use(router.routes())

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on http://127.0.0.1:3000')
})
