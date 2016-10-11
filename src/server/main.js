global.__CLIENT__ = false
global.__SERVER__ = true

import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'
import convert from 'koa-convert'
import userAgent from 'koa-useragent'
import kcors from 'kcors'
import path from 'path'

import cache from './cache'
import router from './router'

import { responseTime } from './middleware'

// Set up Koa
const app = new Koa()

app.use(responseTime)
app.use(convert(userAgent()))
app.use(kcors())
app.use(cache)

// This serves all the files in 'public' as static assets.
const assets = serve(path.resolve(__dirname + '/../../public'))
app.use(mount('/public', assets))
app.use(router.routes())

app.listen(8181, 'localhost', function (err) {
  if (err) {
    console.log(err)
    return
  }

  console.log('Node server listening on http://localhost:8181/')
})
