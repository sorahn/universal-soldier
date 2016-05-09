import React from 'react'
import serialize from 'serialize-javascript'

export default ({ content, store }) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no' />
      <link href='/public/normalize.css' rel='stylesheet' />
    </head>
    <body>
      <div id='mount' dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
      <script src='/public/bundle.js' />
    </body>
  </html>
)

