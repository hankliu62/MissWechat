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
    { key: 'css', value: generateExtractLoaders(['css', `autoprefixer?{ browsers: ['last 100 versions'] }`]) },
    { key: 'less', value: generateExtractLoaders(['css', 'less', `autoprefixer?{ browsers: ['last 100 versions'] }`]) },
    { key: 'sass', value: generateExtractLoaders(['css', 'sass?indentedSyntax', `autoprefixer?{ browsers: ['last 100 versions'] }`]) },
    { key: 'scss', value: generateExtractLoaders(['css', 'sass', `autoprefixer?{ browsers: ['last 100 versions'] }`]) },
    { key: 'stylus', value: generateExtractLoaders(['css', 'stylus', `autoprefixer?{ browsers: ['last 100 versions'] }`]) },
    { key: 'styl', value: generateExtractLoaders(['css', 'stylus', `autoprefixer?{ browsers: ['last 100 versions'] }`]) }
  ];
}
