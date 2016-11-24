var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var staticPath = path.resolve(__dirname, '../../');
var nodeModulesPath = path.resolve(staticPath, '../node_modules')

var commnPath = {
  distDir: path.resolve(staticPath, '../dist'),
  templateHtml: path.join(staticPath, 'template.html')
};

module.exports = {
  entry: {
    app: path.join(staticPath, 'index.js'),
    vender: [
      'vue',
      'vue-router',
      'vue-resource'
    ]
  },
  output: {
    path: path.resolve(commnPath.distDir, 'static'),
    publicPath: '',
    filename: '[name].[hash].js'
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
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?module!postcss'), exclude: /node_modules/ },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?module!postcss!less'), exclude: /node_modules/ },
      { test: /.(png|jpe?g|gif|svg)/, loader: 'url', exclude: /node_modules/ }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      less: 'vue-style!css!less',
      sass: 'vue-style!css!sass'
    }
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
    new ExtractTextPlugin('app.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Miss 小店',
      filename: 'index.html',
      template: commnPath.templateHtml
    }),
    new webpack.NoErrorsPlugin()
  ],
  postcss: [
    require('autoprefixer')
  ]
};
