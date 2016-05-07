import { get } from '../helpers/naiad-systems'

export default {
  verb: 'get',
  route: '/api/search/v1/list',
  actions: [get('http://api.naiadsystems.com/search/v1/list')]
}
