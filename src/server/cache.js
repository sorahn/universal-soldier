import cash from 'koa-cash'
import convert from 'koa-convert'
import lruCache from 'lru-cache'
import objectHash from 'object-hash'

const cache = lruCache({
  maxAge: 60 * 1000 // 1 minute cache
})

const hash = ctx => {
  const {
    headers: { 'user-agent': userAgent },
    url,
  } = ctx.request

  // Hash the storage key by the url, and the userAgent
  return objectHash({ url, userAgent })
}

const get = (key, maxAge) =>  cache.get(key, maxAge)

const set = (key, value) => cache.set(key, value)

export default convert(cash({ hash, get, set }))
