import React from 'react'
import serialize from 'serialize-javascript'

export default ({ content, store }) => (
  <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no' />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
      <script src='http://localhost:3000/static/js/bundle.js' async />
      <link href='https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css' rel='stylesheet' />
    </head>
    <body>
      <div id='root' dangerouslySetInnerHTML={{ __html: content }} />
    </body>
  </html>
)

