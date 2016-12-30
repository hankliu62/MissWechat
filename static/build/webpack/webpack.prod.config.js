var path = require('path');
var config = require('./webpack.base.config');
var cssLoaders = require('./loaders/css-loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5HashPlugin = require('webpack-md5-hash');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var SOURCE_MAP = false;

config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = 'chunks/[id].[chunkhash].js';

config.devtool = SOURCE_MAP ? 'source-map' : false;
config.vue = config.vue || {};
config.vue.loaders = config.vue.loaders || {};

// 生产环境下分离出 CSS 文件: ExtractTextPlugin
cssLoaders({
  sourceMap: false,
  extract: true
}).forEach(function (loader) {
  config.vue.loaders[loader.key] = loader.value;
});

config.plugins.push(
  new CleanWebpackPlugin(['dist'], {
    root: path.resolve(__dirname, '../../../'),
    verbose: true
  }),
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': { // 设置成生产环境
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({ // 压缩代码
    compress: {
      warnings: false
    }
  }),
  new ExtractTextPlugin('[name].[contenthash:6].css', {
    allChunks: true // 若要按需加载 CSS 则请注释掉该行
  }),
  new WebpackMd5HashPlugin()
);

module.exports = config;
