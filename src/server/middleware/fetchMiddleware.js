import fetch from 'isomorphic-fetch'

export default async function fetchMiddleware (ctx) {
  console.log(ctx)
  ctx.body = await fetch(ctx.path).then(r => r.json()).catch(e => e)
  return
}
