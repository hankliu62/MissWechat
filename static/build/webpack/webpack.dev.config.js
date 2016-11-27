var config = require('./webpack.base.config');
var cssLoaders = require('./loaders/css-loaders');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

config.output.filename = '[name].chunk.js'; // 输出文件名
config.output.chunkFilename = '[id].[hash].js'; // 输出chunk文件名
config.output.publicPath = '/';

config.devtool = 'eval';
config.vue = config.vue || {};
config.vue.loaders = config.vue.loaders || {};

// 分离出 CSS 文件: ExtractTextPlugin
cssLoaders({
  sourceMap: false,
  extract: true
}).forEach(function (loader) {
  config.vue.loaders[loader.key] = loader.value;
});

// add hot-reload related code to entry chunk
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  config.entry.app
];

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin('app.min.css')
);

module.exports = config;
