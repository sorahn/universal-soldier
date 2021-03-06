import Router from 'koa-router'

import {
  getMiddleware,
  loadComponentData,
  matchReactRoute,
  postMiddleware,
  renderApplication,
} from './middleware'

// Build the router
const router = new Router()

router.get('/proxy/get/*', getMiddleware)
router.post('/proxy/post/*', postMiddleware)

// Load the main route for everything else.
router.get('*', matchReactRoute, loadComponentData, renderApplication)

export default router
