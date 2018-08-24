const { join } = require('path')
const { dependencies } = require('../package.json')

const paths = {
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist')
}

const regexNodeModulesStr = '[\\\\/]node_modules[\\\\/]'
const regexReactStr = '(react(-dom)?|fbjs|preact(-compat)?)+'

const vendors = Object.keys(dependencies).filter((value) => !(new RegExp(regexReactStr).test(value)))

module.exports = {
  paths,

  entry: {
    main: [join(paths.src, 'index.js')]
  },

  output: {
    path: paths.root,
    filename: '[name].bundle.[hash].js',
    publicPath: ''
  },

  htmlPlugin: {
    title: 'Markdown Editor',
    template: join(paths.src, 'html', 'template.html'),
    chunksSortMode: (chunk1, chunk2) => {
      const order = ['react', 'vendors', 'main']
      const left = order.indexOf(chunk1.names[0])
      const right = order.indexOf(chunk2.names[0])
      return left - right
    }
  },

  vendorsSplitTest: () => {
    if (vendors.length === 0) return /^$/

    return new RegExp(`${regexNodeModulesStr}(${vendors.join('|').replace(/\./gi, '\\.')})+`)
  },

  reactSplitTest: () => new RegExp(`${regexNodeModulesStr}${regexReactStr}`),

  standardPreLoader: {
    enforce: 'pre',
    test: /\.js$/,
    include: paths.src,
    use: {
      loader: 'standard-loader',
      options: {
        parser: 'babel-eslint'
      }
    }
  },

  jsLoader: {
    test: /\.js$/,
    include: paths.src,
    use: 'babel-loader'
  },

  cssLoader: {
    test: /\.s?[ac]ss$/,
    include: paths.src,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  },

  fileLoader: {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name][sha256:hash:base64:8].[ext]',
          outputPath: 'media',
          path: 'media'
        }
      }
    ]
  },

  urlLoader: {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: paths.src,
      components: join(paths.src, 'components'),
      sass: join(paths.src, 'sass')
    }
  }
}
