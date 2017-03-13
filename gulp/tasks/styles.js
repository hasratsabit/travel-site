var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var mixins = require('postcss-mixins');
var hexrgba = require('postcss-hexrgba');

// Src, Dest, and Pipe
gulp.task('styles', function() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    // This avoids server-stop when there is an error
    .on('error', function(errorInfo) {
      console.log(errorInfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
})

// browserSync: We can copy the browser url and paste in a different browser and can see live action in as many browsers as we want.
   // UI Port: We can use the second UI port in the iphone to check the viewport
