import fetch from 'isomorphic-fetch'

const getPackages = async ctx => {
  const { keyword = '' } = ctx.request.query
  const registryUrl = 'https://registry.npmjs.org'
  const viewsPath = '-/_view'
  const keywordView = 'byKeyword'
  const query = `startkey=["${keyword}"]&endkey=["${keyword}",{}]&group_level=3`
  const url = [registryUrl, viewsPath, keywordView].join('/') + '?' + query

  await fetch(url)
    .then(response => response.json())
    .then(json => ctx.body = json)
    .catch(error => {
      console.error('error: ' + error)
      ctx.error = error
    })
}

export default {
  verb: 'get',
  route: '/api/npmPackages',
  actions: [ getPackages ],
}
