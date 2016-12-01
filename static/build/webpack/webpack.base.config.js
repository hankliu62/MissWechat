var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var staticPath = path.resolve(__dirname, '../../');
var nodeModulesPath = path.resolve(staticPath, '../node_modules')

var commonPath = {
  distDir: path.resolve(staticPath, '../dist'),
  templateHtml: path.join(staticPath, 'template.html')
};

module.exports = {
  commonPath,
  entry: {
    app: path.join(staticPath, 'index.js'),
    vender: [
      'vue',
      'vue-router',
      'vue-resource'
    ]
  },
  output: {
    path: path.resolve(commonPath.distDir, 'static'), // 打包输出目录
    publicPath: '/static/' // webpack-dev-server访问的路径
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
      { test: /.(png|jpe?g|gif|svg)/, loader: 'url', exclude: /node_modules/ },
      { test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/, exclude: /^node_modules$/, loader: 'file-loader?name=[name].[ext]'}
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'app']
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Miss 小店',
      filename: 'index.html',
      template: commonPath.templateHtml
    }),
    new webpack.NoErrorsPlugin()
  ]
};
