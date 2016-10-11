import { fetchMiddleware } from '../middleware'
import fetch from 'isomorphic-fetch'

export default {
  verb: 'get',
  route: '/api/search/v1/list',
  actions: [ fetchMiddleware ]
}
