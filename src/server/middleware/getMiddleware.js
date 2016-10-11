import fetch from 'isomorphic-fetch'

export default async function getMiddleware (ctx) {
  ctx.body = await fetch(ctx.path).then(r => r.json()).catch(e => e)
  return
}
