var webpack = require('webpack');
var config  = require('./webpack.config.static');


config.plugins = config.plugins.concat([


  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('sit'),
      'DEBUG': false
    }
  })


]);


module.exports = config;

