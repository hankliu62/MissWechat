var config = require('./webpack.base.config');
var cssLoaders = require('./loaders/css-loaders');
var webpack = require('webpack');

config.devtool = 'eval';
config.vue = config.vue || {};
config.vue.loaders = config.vue.loaders || {};
cssLoaders({
  sourceMap: false,
  extract: true
}).forEach(function (loader) {
  config.vue.loaders[loader.key] = loader.value;
});

config.plugins.push(
  new webpack.HotModuleReplacementPlugin()
);

module.exports = config;
