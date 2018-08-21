// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const webpackBase = require('../webpack/webpack.base')
const { join } = require('path')

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push(
    Object.assign({}, webpackBase.standardPreLoader, {
      include: [
        join(__dirname, '..', 'stories'),
        join(__dirname, '..', 'src')
      ]
    }),
    webpackBase.cssLoader,
    webpackBase.fileLoader,
    webpackBase.urlLoader
  )

  storybookBaseConfig.resolve = webpackBase.resolve

  return storybookBaseConfig
}
