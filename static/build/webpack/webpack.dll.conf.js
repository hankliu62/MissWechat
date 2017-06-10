const os = require('os');
const path = require('path');
const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-parallel-uglify-plugin');

const isDebug = process.env.NODE_ENV === 'development';
const outputPath = isDebug ? path.join(__dirname, '../../../dist/dll/dev') : path.join(__dirname, '../../../dist/dll/dist');

// 资源依赖包，提前编译
const lib = [
  'vue',
  'vue-resource',
  'vue-slider',
  'vuex',
  'vuex-router-sync',
  'autosize',
  'bootstrap',
  'colorjoe',
  'fetch-jsonp',
  'cropperjs',
  'element-ui',
  'headroom.js',
  'lodash',
  'simditor'
];

const plugin = [
  new webpack.DllPlugin({
    /**
     * path
     * 定义 manifest 文件生成的位置
     * [name]的部分由entry的名字替换
     */
    path: path.join(outputPath, 'manifest.json'),
    /**
     * name
     * dll bundle 输出到那个全局变量上
     * 和 output.library 一样即可。
     */
    name: '[name]',
    context: __dirname
  }),
  new webpack.optimize.OccurenceOrderPlugin()
];

if (!isDebug) {
  plugin.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
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
      mangle: {
        except: ['$', 'exports', 'require']
      },
      compressor: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      },
      output: { comments: false }
    })
  )
}

module.exports = {
  devtool: '#source-map',
  entry: {
    lib: lib
  },
  output: {
    path: outputPath,
    filename: '[name].dll.js',
    /**
     * output.library
     * 将会定义为 window.${output.library}
     * 在这次的例子中，将会定义为`window.lib_[hash]_library`
     */
    library: '[name]_[hash]',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: plugin
};
