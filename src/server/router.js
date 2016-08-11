import Router from 'koa-router'

import * as api from './api'
import {
  loadComponentData,
  matchReactRoute,
  renderApplication
} from './middleware'

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
router.get('*', matchReactRoute, loadComponentData, renderApplication)

export default router
