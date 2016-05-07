import React from 'react'
import serialize from 'serialize-javascript'

const style = `
   body {
    font-family: "Helvetica Neue", sans-serif;
  }
`

export default ({ content, store }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no" />
      <style type="text/css" dangerouslySetInnerHTML={{ __html: style }} />
    </head>
    <body>
      <div id='mount' dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
      <script src='/public/bundle.js' />
    </body>
  </html>
)

