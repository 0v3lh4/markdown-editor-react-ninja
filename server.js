const webpackDev = require('./webpack/webpack.dev')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

new WebpackDevServer(
  webpack(webpackDev),
  webpackDev.devServer
).listen(webpackDev.devServer.port, '0.0.0.0', err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening on http://localhost:${webpackDev.devServer.port}`)
})
