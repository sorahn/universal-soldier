import React from 'react'
import serialize from 'serialize-javascript'

export default ({ content, store }) => (
  <html>
    <head>
    </head>
    <body>
      <div id='mount' dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src='/public/bundle.js' />
    </body>
  </html>
)

