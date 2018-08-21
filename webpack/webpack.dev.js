const webpack = require('webpack')
const base = require('./webpack.base')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const LISTEN_PORT = 3000

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: {
    main: [
      ...base.entry.main,
      `webpack-dev-server/client?http://0.0.0.0:${LISTEN_PORT}`,
      'webpack/hot/only-dev-server'
    ]
  },

  output: base.output,

  devServer: {
    publicPath: base.output.publicPath,
    historyApiFallback: true,
    stats: {
      colors: true,
      stats: 'verbose'
    },
    hot: true,
    port: LISTEN_PORT
  },

  plugins: [
    new HtmlWebpackPlugin(base.htmlPlugin),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      DEBUG: true
    }),
    new DashboardPlugin()
  ],

  module: {
    rules: [
      base.standardPreLoader,
      base.jsLoader,
      base.cssLoader,
      base.fileLoader,
      base.urlLoader
    ]
  },

  resolve: base.resolve
}
