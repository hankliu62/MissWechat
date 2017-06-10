const os = require('os');
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.base.conf');
const cssLoaders = require('./loaders/css-loaders');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5HashPlugin = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-parallel-uglify-plugin');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const SOURCE_MAP = false;

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
  new CleanWebpackPlugin(['static'], {
    root: path.resolve(__dirname, '../../../dist/'),
    verbose: true
  }),
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': { // 设置成生产环境
      NODE_ENV: '"production"'
    }
  }),
  // new webpack.DllReferencePlugin({
  //   context: path.join(__dirname),
  //   manifest: require('../../../dist/dll/dist/manifest.json'),
  // }),
  new ExtractTextPlugin('[name].[contenthash:6].css', {
    allChunks: true // 若要按需加载 CSS 则请注释掉该行
  }),
  new HtmlWebpackPlugin({
    title: 'Miss 小店',
    filename: 'index.html',
    template: config.commonPath.templateHtml,
    // chunks: ['app', 'vendors'],   // 配置该html文件要添加的模块
    minify: {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true
    }
  }),
  // new AddAssetHtmlPlugin({
  //   filepath: require.resolve('../../../dist/dll/dist/lib.dll.js'),
  //   hash: true
  // }),
  // gzip uglify
  new CompressionWebpackPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.(js|html|css)$/,
    threshold: 10240,
    minRatio: 0.8
  }),
  // 增强 uglifyPlugin 替代webpack.optimize.UglifyJsPlugin
  new UglifyJsParallelPlugin({
    workers: os.cpus().length,
    mangle: true,
    compressor: {
      warnings: false,
      drop_console: true,
      drop_debugger: true
    }
  }),
  new WebpackMd5HashPlugin()
);

module.exports = config;
