var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var staticPath = path.resolve(__dirname, '../../');
var nodeModulesPath = path.resolve(staticPath, '../node_modules')

var commonPath = {
  distDir: path.resolve(staticPath, '../dist'),
  templateHtml: path.join(staticPath, 'template.html'),
  depsDir: path.join(staticPath, '../deps')
};

var depsFiles = [
  path.join(commonPath.depsDir, 'lib-flexible/flexible.js'),
  path.join(commonPath.depsDir, 'qiniu-jssdk/plupload.full.min.js'),
  path.join(commonPath.depsDir, 'qiniu-jssdk/qiniu.min.js'),
  path.join(commonPath.depsDir, 'simditor/jquery.min.js'),
  path.join(commonPath.depsDir, 'simditor/module.js'),
  path.join(commonPath.depsDir, 'simditor/hotkeys.js'),
  path.join(commonPath.depsDir, 'simditor/uploader.js'),
  path.join(commonPath.depsDir, 'simditor/simditor.js')
]

module.exports = {
  commonPath,
  entry: {
    app: path.join(staticPath, 'index.js'),
    vender: [
      'vue',
      'vue-router',
      'vue-resource'
    ]
    // deps: depsFiles
  },
  output: {
    path: path.resolve(commonPath.distDir, 'static'), // 打包输出目录
    publicPath: '/' // webpack-dev-server访问的路径
  },
  resolve: {
    extensions: ['', '.js', '.vue']
  },
  resolveLoader: {
    root: nodeModulesPath
  },
  module: {
    preLoaders: [
      { test: /\.(vue|js)$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.vue$/, loader: 'vue', exclude: /node_modules/ },
      { test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /.(png|jpe?g|gif|svg|webp)/, loader: 'url', exclude: /node_modules/ },
      { test: /\.(eot|woff|svg|ttf|woff2|appcache)(\?|$)/, loader: 'file-loader?name=[name].[ext]', exclude: /^node_modules$/}
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      less: 'vue-style!css!less',
      sass: 'vue-style!css!sass'
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 100 versions']
      })
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter'),
    rules: {
      'no-new': 0,
      'no-unused-vars': 0
    }
  },
  stats: {
    children: false
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender.min',
      chunks: ['vender', 'app']
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: 'deps', to: 'deps' }
    ]),
    new webpack.NoErrorsPlugin()
  ]
};
