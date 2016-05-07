import path from 'path'

export default {
  devtool: 'source-map',
  entry: [ './client.js' ],
  output: {
    filename: 'bundle.js',
    path: path.resolve('public'),
    publicPath: '/public/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
}
