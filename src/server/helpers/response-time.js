const responseTime = async (ctx, next) => {
  // Mark the request start time.
  const start = new Date()

  // Yeild the request into the app.
  await next()

  // After the app is finished, it finishes going through here, and sets the
  // generation time in the header.
  const ms = new Date() - start
  ctx.set('X-Response-Time', ms + 'ms')

  // Also log the time in the node output
  console.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

export default responseTime
