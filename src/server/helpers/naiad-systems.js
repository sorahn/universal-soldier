import {
  get as $get,
  post as $post
} from '../../shared/helpers/icf-fetch'

export const get = url => async ctx => {
  // @TODO
  // This is just here so I don't accidentally try to request all 14MB of
  // search results @_@
  const query = {
    results_per_page: 20,
    ...ctx.request.query
  }

  await $get(url, query)
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
