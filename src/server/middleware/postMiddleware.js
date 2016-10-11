import { fetchWrapper } from '../../helpers'

const transformPathToApiRoute = path => {
  const clippedPath = path.replace('/proxy/get/', '')
  const [ subdomain, ...parts ] = clippedPath.split('/')
  const apiRoute = parts.join('/')

  return `http://${subdomain}.api.naiadsystems.com/${apiRoute}`
}

export default async function postMiddleware (ctx) {
  const { body } = ctx.request

  const path = transformPathToApiRoute(ctx.path)
  console.log(path, body)

  ctx.body = { response: 'it worked' }
  // ctx.body = await fetchWrapper(path, {
  //   method: 'post',
  //   body,
  // })
}
