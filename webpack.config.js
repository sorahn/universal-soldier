import path from 'path'
import webpack from 'webpack'

export default {
  devtool: 'source-map',
  entry: [ './src/client/app.js' ],
  output: {
    filename: 'bundle.js',
    path: path.resolve('public'),
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),
  ],
}
