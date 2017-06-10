var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var prodConfig = require('./webpack.prod.conf');

webpack(prodConfig, function (error, stats) {
  if (error) {
    if (console.error) {
      console.error(error);
    }
  }

  if (console.log) {
    // show build info to console
    console.log(stats.toString({ chunks: false, color: true }));
  }

  // save build info to file
  fs.writeFile(
    path.join(prodConfig.commonPath.distDir, '__build_info__'),
    stats.toString({ color: false })
  );
});
