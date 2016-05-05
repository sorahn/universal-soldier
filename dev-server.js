import Koa from 'koa'
import Router from 'koa-router'
import serve from 'koa-static'
import send from 'koa-send'
import mount from 'koa-mount'

import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackConfig from './webpack.config.dev'

const app = new Koa()
const router = new Router()

const assets = serve(__dirname + '/public', )

router.get('*', async ctx => await send(ctx, 'index.html'))


/* api endpoints */

// const npmPackages = require('./src/api/routes/npmPackages')
// app.use('/api/npmPackages', npmPackages)

// const npmPackage = require('./src/api/routes/npmPackage')
// app.use('/api/npmPackage', npmPackage)

// app.use(webpackDevMiddleware(webpack(webpackConfig), {
//   publicPath: webpackConfig.output.publicPath,
//   stats: { colors: true }
// }))

app.use(mount('/public', assets))
app.use(router.routes())

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('listening on http://127.0.0.1:3000')
})
