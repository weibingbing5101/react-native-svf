'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var HasteResolverPlugin = require('haste-resolver-webpack-plugin');

var IP = '0.0.0.0';
var PORT = 6868;
var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname, '..');
var PROD = 'production';
var DEV = 'development';
let isProd = NODE_ENV === 'production';

var config = {
  paths: {
    src: path.join(ROOT_PATH, '.'),
    index: path.join(ROOT_PATH, 'index.web'),
  },
};

var babelConfig = {
  cacheDirectory: true,
  plugins: ['transform-class-properties' ],
  presets: ['es2015', 'react', 'stage-0']
}

module.exports = {
  ip: IP,
  port: PORT,
  //devtool: 'source-map',
  resolve: {
    alias: {
      'react-native': 'react-web',
      'ReactNativeART': 'react-art',
    },
    extensions: ['', '.js', '.jsx'],
  },
  entry: isProd ? [
    //'babel-polyfill',
    config.paths.index
  ] : [
    'webpack-dev-server/client?http://' + IP + ':' + PORT,
    'webpack/hot/only-dev-server',
    config.paths.index,
  ],
  output: {
    path: path.join(__dirname, 'output'),
    filename: 'bundle.js'
  },
  plugins: [
    new HasteResolverPlugin({
      platform: 'web',
      nodeModules: ['react-web']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(isProd ? PROD : DEV),
      }
    }),
    isProd ? new webpack.ProvidePlugin({
      React: "react"
    }) : new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.json$/,
      loader: 'json',
    }, {

      test: /\.jsx?$/,
      loader: 'babel',
      /* loaders: ['react-hot', 'babel-loader?' + JSON.stringify({
         presets: ['es2015', 'stage-0', 'react'],  // 开启ES6、部分ES7、react特性, preset相当于预置的插件集合
       })],  // react-hot-loader可以不用刷新页面, 如果用普通的dev-server的话会自动刷新页面*/
      
      
     
      include: [config.paths.src],
      exclude: [/node_modules/],
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: [ 'transform-decorators-legacy' ],
        presets: ['es2015', 'react', 'stage-0']
      },

      //loaders: ['react-hot', 'babel?'+JSON.stringify(babelConfig)],
      /* query: {
         presets: ['es2015', 'react', 'stage-3']
       }*/
      /*plugins: ['transform-class-properties' ],
      presets: ['es2015', 'react', 'stage-0'],
      cacheDirectory: true
*/

    },{
      test: /.(gif|jpg|png$)/,
      loader: 'file?name=/static/images/img-[hash].[ext]'
    },]
  }
};