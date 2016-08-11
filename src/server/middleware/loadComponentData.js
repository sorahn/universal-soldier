export default async function loadComponentData (ctx, next) {
  console.log('koa: step 2 - loadData')

  const {
    props: { components, params },
    request,
    store,
  } = ctx

  // Just run the next router handler if we're not preloading any data.
  if (request.query.preload === 'false') {
    return next()
  }

  const url = `${request.protocol}://${request.get('host')}`

  // This is the component that is matched in the routes.  We're going to look
  // for a static method called 'fetchData' on this component to load the
  // data on the server.
  const comp = components[components.length - 1].WrappedComponent || {}

  // Set a default function that just resolves a promise with the options you
  // feed into it if there is no fetchData method on the component
  const { fetchData = options => Promise.resolve(options) } = comp

  const searchParams = {
    params,
    preloaded: true
  }

  const fetchOptions = {
    headers: {
      'user-agent': request.headers['user-agent']
    }
  }

  const options = { fetchOptions, searchParams, store }

  // Fetch the data, then return the next route handler.
  return await fetchData(options).then(() => next())
}
