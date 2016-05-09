global.__CLIENT__ = false
global.__SERVER__ = true

import React from 'react'
import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import mount from 'koa-mount'
import convert from 'koa-convert'
import userAgent from 'koa-useragent'
import path from 'path'
import * as api from './api'
import all from './routes/all'
import responseTime from './helpers/response-time'
import lruCache from 'lru-cache'
import cash from 'koa-cash'
import hash from 'object-hash'

// Build the router
const router = new Router()

// Assign a route from our exported route objects.
const assign = ({ verb, route, actions }) => {
  console.log('register route -', verb, route)
  router[verb](route, ...actions)
}

// Iterate over all the routes, and assign them.
Object.keys(api).map(i => assign(api[i]))

// Load the main route for everything else.
router.get('*', ...all.actions)

// Set up Koa
const app = new Koa()
const cache = lruCache({
  maxAge: 1000 // 30 second cache
})

app.use(responseTime)
app.use(convert(userAgent()))


app.use(convert(cash({
  hash: (ctx) => {
    const {
      headers: { 'user-agent': userAgent },
      url,
    } = ctx.request

    // Hash the storage key by the url, and the userAgent
    return hash({ url, userAgent })
  },
  get: (key, maxAge) =>  cache.get(key, maxAge),
  set: (key, value) => cache.set(key, value),
})))

const assets = serve(path.resolve(__dirname + '/../../public'))
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
