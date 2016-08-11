global.__CLIENT__ = false
global.__SERVER__ = true

import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import convert from 'koa-convert'
import userAgent from 'koa-useragent'
import kcors from 'kcors'
import path from 'path'
import lruCache from 'lru-cache'
import cash from 'koa-cash'
import hash from 'object-hash'

import router from './router'

import * as api from './api'
import responseTime from './middleware/response-time'
import {
  loadComponentData,
  matchReactRoute,
  renderApplication
} from './middleware'

// Set up Koa
const app = new Koa()
const cache = lruCache({
  maxAge: 60 * 1000 // 1 minute cache
})

app.use(responseTime)
app.use(convert(userAgent()))
app.use(kcors())

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

// This serves all the files in 'public' as static assets.
const assets = serve(path.resolve(__dirname + '/../../public'))
app.use(mount('/public', assets))

app.use(router.routes())

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on http://127.0.0.1:3000')
})
