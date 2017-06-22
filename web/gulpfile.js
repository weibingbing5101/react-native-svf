

var gulp = require('gulp');

var webpack = require('webpack');

function compile(callback){
	var env = process.env.NODE_ENV;

	var configUrl = './webpack.config.prod.js';
	console.log(configUrl);

	var config = require(configUrl);
	webpack(config, function(err, stats) {
		console.log(err)
		callback()
	})
}

gulp.task('default', compile);
