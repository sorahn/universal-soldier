import fetch from 'isomorphic-fetch'

const getPackage = async ctx => {
  const { packageName = '' } = ctx.request.query
  const registryUrl = 'https://registry.npmjs.org'
  const url = [registryUrl, packageName].join('/');

  await fetch(url)
    .then(response => response.json())
    .then(json => ctx.body = json)
    .catch(error => {
      console.error("error: " + error)
      ctx.error = error
    })
}

export default {
  verb: 'get',
  route: '/api/npmPackage',
  actions: [ getPackage ],
}
