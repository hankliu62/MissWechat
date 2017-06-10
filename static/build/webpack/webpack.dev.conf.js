const os = require('os');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.conf');
const cssLoaders = require('./loaders/css-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HappyPackPluginDecorator = require('./plugins/happypack-plugins');

config.output.filename = '[name].chunk.js'; // 输出文件名
config.output.chunkFilename = '[id].[hash].js'; // 输出chunk文件名
config.output.publicPath = '/';

config.devtool = 'eval';
config.vue = config.vue || {};
config.vue.loaders = config.vue.loaders || {};

// 分离出 CSS 文件: ExtractTextPlugin
cssLoaders({
  sourceMap: false,
  extract: true,
  happyPack: true
}).forEach(function (loader) {
  config.vue.loaders[loader.key] = loader.value;
});

config.vue.loaders.js = HappyPackPluginDecorator.SplitToHappyLoaders(config.vue.loaders.js)

function generateLoaderName(name) {
  if (name.indexOf('-loader') !== -1) {
    return name
  }

  return `${name.trim()}-loader`;
}

config.module.loaders = HappyPackPluginDecorator.ReplaceToHappyLoaders(config.module.loaders);

// add hot-reload related code to entry chunk
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  config.entry.app
];

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.DllReferencePlugin({
  //   context: path.join(__dirname),
  //   manifest: require('../../../dist/dll/dev/manifest.json'),
  // }),
  ...HappyPackPluginDecorator.GetHappyPackPlugins(),
  new ExtractTextPlugin('app.min.css'),
  new HtmlWebpackPlugin({
    title: 'Miss 小店',
    filename: 'index.html',
    template: config.commonPath.templateHtml
  }),
  // new AddAssetHtmlPlugin({
  //   filepath: require.resolve('../../../dist/dll/dev/lib.dll.js'),
  //   hash: true
  // }),
  new ProgressBarPlugin({summary: false}),
  new VisualizerPlugin({
    filename: './statistics.html'
  })
);

module.exports = config;
