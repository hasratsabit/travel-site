
var gulp = require('gulp');
var webpack = require('webpack');

// Automates the webpack testing and logs any error
// It has the modernizer packages as it's dependency. 
gulp.task('scripts', ['modernizr'], function(callback) {
  webpack(require('../../webpack.config.js'), function(err, stats) {
    if(err) {
      console.log(err.toString());
    }
      console.log(stats.toString());
    // The callback tells gulp webpack is finnished.
    callback();
  });
});
