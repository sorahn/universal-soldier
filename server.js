global.__CLIENT__ = false
global.__SERVER__ = true

import React from 'react'
import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import mount from 'koa-mount'
import convert from 'koa-convert'
import userAgent from 'koa-useragent'
import * as apiRoutes from './src/api/routes'
import main from './src/api/main'

// Build the router
const router = new Router()

// Assign a route from our exported route objects.
const assign = ({ verb, route, actions }) => {
  console.log(verb, route, actions)
  router[verb](route, ...actions)
}

// Iterate over all the routes, and assign them.
Object.keys(apiRoutes).map(i => assign(apiRoutes[i]))

// Load the main route for everything else.
router.get('*', ...main.actions)

// Set up Koa
const app = new Koa()
app.use(convert(userAgent()))

const assets = serve(__dirname + '/public')
app.use(mount('/public', assets))

// Tell koa to use the routes.
app.use(router.routes())

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on http://127.0.0.1:3000')
})
