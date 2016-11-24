var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (options) {
  var generateExtractLoaders = function (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader += '-loader';
        extraParamChar = '?';
      }

      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
    }).join('!');

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
    }

    return ['vue-style-loader', sourceLoader].join('!');
  }

  return [
    { key: 'css', value: generateExtractLoaders(['css']) },
    { key: 'less', value: generateExtractLoaders(['css', 'less']) },
    { key: 'sass', value: generateExtractLoaders(['css', 'sass?indentedSyntax']) },
    { key: 'scss', value: generateExtractLoaders(['css', 'sass']) },
    { key: 'stylus', value: generateExtractLoaders(['css', 'stylus']) },
    { key: 'styl', value: generateExtractLoaders(['css', 'stylus']) },
  ];
}
