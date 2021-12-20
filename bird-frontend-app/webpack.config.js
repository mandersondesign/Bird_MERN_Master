const path = require('path')
const webpack = require('webpack')
const HappyPack = require('happypack')
const _ = require('lodash')
const autoprefixer = require('autoprefixer')
// const TerserPlugin =  require('terser-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const VersionPlugin = require('./webpack.version.js')
const { props } = require('./version.js')

const nodeEnv = process.env.NODE_ENV || 'development'
const appEnv = process.env.APPLICATION_ENV || 'development'
const isProd = nodeEnv === 'production'
const name = process.env.NAME || 'main'

const plugins = [
  new HappyPack({
    id: 'js',
    verbose: false,
    threads: 4,
    loaders: ['babel-loader'],
  }),

  new HappyPack({
    id: 'styles',
    verbose: false,
    threads: 2,
    loaders: ['style-loader', 'raw-loader', 'less-loader', 'sass-loader'],
  }),

  new HappyPack({
    id: 'modules',
    verbose: false,
    threads: 2,
    loaders: [
      {
        loader: 'style-loader',
        options: { sourceMap: !isProd, insertAt: 'top' },
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: { sourceMap: !isProd, plugins: () => [autoprefixer()] },
      },
      {
        loader: 'less-loader',
        options: { sourceMap: !isProd },
      },
      {
        loader: 'sass-loader',
        options: { sourceMap: !isProd },
      },
    ],
  }),

  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
      APPLICATION_ENV: JSON.stringify(appEnv),
      VER: JSON.stringify(props.version),
      HASH: JSON.stringify(props.hash),
      NAME: JSON.stringify(name),
    },
  }),

  new webpack.NamedModulesPlugin(),
  new VersionPlugin(props),
  new ProgressBarPlugin(),
  new SpriteLoaderPlugin({
    plainSprite: true,
  }),
]

if (isProd) {
  // plugins.push(new UglifyJsPlugin({ parallel: true }))
} else {
  plugins.push(new webpack.SourceMapDevToolPlugin())
  plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }))
}

const entry = isProd
  ? ['babel-polyfill', './src/index.js']
  : [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js',
  ]

const modulePaths = {
  config: './config',
  api: './src/api',
  assets: './src/assets',
  components: './src/components',
  helpers: './src/helpers',
  modules: './src/modules',
  sprites: './src/sprites',
  utils: './src/utils',
  pagesFeet: './src/components/dashboard/PagesFleetFeet',
  hooks: './src/hooks',
}

const localGlobalStylesReg = /styles[\\\/][^]+.(css|less)/

const noCssModulesStylePaths = modulePath => localGlobalStylesReg.test(modulePath) || /antd/.test(modulePath)

let namePath = 'static'

if (name === 'feet') {
  namePath = 'fleetfeet'
} else if (name === 'marketing') {
  namePath = 'marketing'
}

module.exports = {

  mode: isProd ? 'production' : 'development',

  performance: { hints: isProd ? false : 'warning' },

  entry: {
    entry,
  },

  output: {
    path: path.join(__dirname, namePath),
    filename: 'bundle.js',
    publicPath: '/',
  },

  optimization: {
    // minimize: true,
    // minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]|[\\!/]antd[\\/]/,
          name: 'vendor',
          filename: 'vendor.bundle.js',
          chunks: 'all',
        },
      },
    },
  },

  resolve: {
    extensions: ['.js', '.scss', '.less'],
    alias: {
      ..._.mapValues(modulePaths, str => path.join(process.cwd(), ...str.split('/'))),
      'react-dom': '@hot-loader/react-dom',
    },
  },

  plugins,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: __dirname,
        exclude: /node_modules/,
        use: ['happypack/loader?id=js'],
      },
      {
        test: /\.(css|less)$/,
        exclude: noCssModulesStylePaths,
        use: [
          {
            loader: 'style-loader',
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]__[local]--[hash:base64:5]',
              },
              localsConvention: 'camelCase',
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: !isProd },
          },
          {
            loader: 'less-loader',
            options: {
              paths: [path.resolve(__dirname, 'src/styles')],
              sourceMap: !isProd,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        include: noCssModulesStylePaths,
        use: [
          {
            loader: 'style-loader',
            options: {},
          },
          {
            loader: 'css-loader',
            options: {},
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: !isProd },
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'menu-item-active-bg': '#f3f3f3',
                'menu-highlight-color': '#ffffff',
              },
              sourceMap: !isProd,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(svg)$/,
        include: path.resolve(__dirname, modulePaths.sprites),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: '/static/media/',
              spriteFilename: 'sprites.[hash:8].svg',
            },
          },
          'svgo-loader',
        ],
      },
      {
        test: /\.svg$/,
        exclude: path.resolve(__dirname, modulePaths.sprites),
        loader: 'svg-react-loader',
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|otf|woff(2)?)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
}
