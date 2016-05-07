import path from 'path'

export default {
  devtool: 'source-map',
  entry: [ './client.js' ],
  output: {
    filename: '[name].js',
    path: path.resolve('build'),
    publicPath: '/public/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
}
