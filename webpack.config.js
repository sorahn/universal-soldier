import path from 'path'
import webpack from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default {
  devtool: 'source-map',
  entry: [ './src/client/app.js' ],
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
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),
    new CopyWebpackPlugin([
      { from: 'node_modules/normalize-css/normalize.css', to: '.'}
    ]),
    new CompressionPlugin()
  ],
}
