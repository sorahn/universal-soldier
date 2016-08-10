import {
  get as $get,
  post as $post
} from './icf-fetch'

export const get = url => async ctx => {
  // this response is already cashed if `true` is returned,
  // so this middleware will automatically serve this response from cache
  if (await ctx.cashed()) {
    console.log('LRU - HIT', url)
    return
  }

  // @TODO
  // This is just here so I don't accidentally try to request all 14MB of
  // search results @_@
  const query = {
    results_per_page: 20,
    ...ctx.request.query
  }

  await $get(url, query, {
      headers: {
        'user-agent': ctx.request.headers['user-agent']
      }
    })
    .then(response => ctx.body = response)
    .catch(error => {
      ctx.throw(500, error.message)
    })
}

export const post = url => async ctx => {
  await $post(url, ctx.request.body)
    .then(response => ctx.body = response)
    .catch(error => {
      ctx.throw(500, error.message)
    })
}
