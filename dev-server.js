import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import send from 'koa-send'
import mount from 'koa-mount'

import * as routes from './src/api/routes'

import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackConfig from './webpack.config.dev'

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
Object.keys(routes).map(i => assign(routes[i]))

// Everyone else gets index.html
router.get('*', async ctx => await send(ctx, 'index.html'))

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}))


app.use(router.routes())

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('listening on http://127.0.0.1:3000')
})
