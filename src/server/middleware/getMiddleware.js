import { fetchWrapper } from '../../helpers'

const transformPathToApiRoute = path => {
  const clippedPath = path.replace('/proxy/get/', '')
  const [ subdomain, ...parts ] = clippedPath.split('/')
  const apiRoute = parts.join('/')

  return `http://${subdomain}.api.naiadsystems.com/${apiRoute}`
}

export default async function getMiddleware (ctx) {
  if (await ctx.cashed()) {
    return
  }

  const path = transformPathToApiRoute(ctx.path)
  ctx.body = await fetchWrapper(path + '?' + ctx.querystring)
  return
}
